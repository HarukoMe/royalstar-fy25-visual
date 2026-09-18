from __future__ import annotations

import json
import sqlite3
import time
from pathlib import Path
from typing import Any


class EventStore:
    def __init__(self, db_path: Path):
        self.db_path = db_path
        self.db_path.parent.mkdir(parents=True, exist_ok=True)
        self._init_db()

    def _conn(self) -> sqlite3.Connection:
        c = sqlite3.connect(self.db_path)
        c.row_factory = sqlite3.Row
        return c

    def _init_db(self) -> None:
        with self._conn() as c:
            c.execute(
                """
                CREATE TABLE IF NOT EXISTS events (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    ts REAL NOT NULL,
                    level TEXT NOT NULL,
                    category TEXT NOT NULL,
                    code TEXT NOT NULL,
                    message TEXT NOT NULL,
                    meta TEXT
                )
                """
            )
            c.execute("CREATE INDEX IF NOT EXISTS idx_events_ts ON events(ts DESC)")

    def append(self, level: str, category: str, code: str, message: str, meta: dict | None = None) -> int:
        with self._conn() as c:
            cur = c.execute(
                "INSERT INTO events (ts, level, category, code, message, meta) VALUES (?, ?, ?, ?, ?, ?)",
                (time.time(), level, category, code, message, json.dumps(meta or {})),
            )
            return int(cur.lastrowid)

    def recent(self, limit: int = 80) -> list[dict[str, Any]]:
        limit = max(1, min(limit, 200))
        with self._conn() as c:
            rows = c.execute(
                "SELECT * FROM events ORDER BY ts DESC LIMIT ?",
                (limit,),
            ).fetchall()
        out = []
        for r in rows:
            out.append(
                {
                    "id": r["id"],
                    "ts": r["ts"],
                    "level": r["level"],
                    "category": r["category"],
                    "code": r["code"],
                    "message": r["message"],
                    "meta": json.loads(r["meta"] or "{}"),
                }
            )
        return out


class AlertMonitor:
    """Debounced threshold alerts into the event store."""

    def __init__(self, store: EventStore, thresholds: dict[str, float]):
        self.store = store
        self.thresholds = thresholds
        self._last_fired: dict[str, float] = {}
        self._cooldown_sec = 300

    def _maybe_fire(self, key: str, level: str, category: str, code: str, message: str, meta: dict) -> None:
        now = time.time()
        if key in self._last_fired and now - self._last_fired[key] < self._cooldown_sec:
            return
        self._last_fired[key] = now
        self.store.append(level, category, code, message, meta)

    def evaluate(self, telemetry: dict[str, Any]) -> None:
        gpu = telemetry.get("gpu") or {}
        if gpu.get("devices"):
            d0 = gpu["devices"][0]
            util = d0.get("utilization_gpu") or 0
            temp = d0.get("temperature_c")
            if util >= self.thresholds.get("gpu_util_high", 85):
                self._maybe_fire(
                    "gpu_util",
                    "warn",
                    "gpu",
                    "gpu_util_high",
                    f"GPU utilization sustained high ({util}%)",
                    {"util": util},
                )
            if temp and temp >= self.thresholds.get("gpu_temp_high_c", 83):
                self._maybe_fire(
                    "gpu_temp",
                    "warn",
                    "gpu",
                    "gpu_temp_high",
                    f"GPU temperature {temp}°C",
                    {"temp_c": temp},
                )
        ram = telemetry.get("memory_percent") or 0
        if ram >= self.thresholds.get("ram_used_pct_high", 90):
            self._maybe_fire(
                "ram",
                "warn",
                "system",
                "ram_high",
                f"RAM usage {ram}%",
                {"percent": ram},
            )
