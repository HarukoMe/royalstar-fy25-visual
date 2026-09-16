from __future__ import annotations

import asyncio
import time
from collections import deque
from dataclasses import dataclass, field
from typing import Any

import psutil

from app.platform.gpu import get_gpu_snapshot
from app.platform.system_info import collect_system_snapshot


@dataclass
class TelemetryHub:
    interval_sec: float = 1.5
    history_len: int = 120
    _cpu_history: deque = field(default_factory=lambda: deque(maxlen=120))
    _ram_history: deque = field(default_factory=lambda: deque(maxlen=120))
    _gpu_history: deque = field(default_factory=lambda: deque(maxlen=120))
    _net_last: tuple[float, int, int] | None = None
    _latest: dict[str, Any] = field(default_factory=dict)
    _task: asyncio.Task | None = field(default=None, repr=False)
    _subscribers: list[asyncio.Queue] = field(default_factory=list, repr=False)

    def snapshot(self) -> dict[str, Any]:
        return dict(self._latest)

    def history(self) -> dict[str, Any]:
        return {
            "cpu": list(self._cpu_history),
            "ram": list(self._ram_history),
            "gpu": list(self._gpu_history),
        }

    def subscribe(self) -> asyncio.Queue:
        q: asyncio.Queue = asyncio.Queue(maxsize=8)
        self._subscribers.append(q)
        return q

    def unsubscribe(self, q: asyncio.Queue) -> None:
        if q in self._subscribers:
            self._subscribers.remove(q)

    async def _broadcast(self, payload: dict[str, Any]) -> None:
        dead = []
        for q in self._subscribers:
            try:
                q.put_nowait(payload)
            except asyncio.QueueFull:
                try:
                    q.get_nowait()
                    q.put_nowait(payload)
                except Exception:
                    dead.append(q)
            except Exception:
                dead.append(q)
        for q in dead:
            self.unsubscribe(q)

    def _collect_once(self) -> dict[str, Any]:
        ts = time.time()
        cpu_pct = psutil.cpu_percent(interval=None)
        if not self._cpu_history:
            psutil.cpu_percent(interval=0.1)
            cpu_pct = psutil.cpu_percent(interval=None)

        mem = psutil.virtual_memory()
        disk_io = None
        try:
            dio = psutil.disk_io_counters()
            if dio:
                disk_io = {
                    "read_bytes": dio.read_bytes,
                    "write_bytes": dio.write_bytes,
                }
        except Exception:
            pass

        net = None
        try:
            nio = psutil.net_io_counters()
            if nio and self._net_last:
                dt = ts - self._net_last[0]
                if dt > 0:
                    net = {
                        "bytes_sent_per_sec": round((nio.bytes_sent - self._net_last[1]) / dt, 1),
                        "bytes_recv_per_sec": round((nio.bytes_recv - self._net_last[2]) / dt, 1),
                    }
            if nio:
                self._net_last = (ts, nio.bytes_sent, nio.bytes_recv)
        except Exception:
            pass

        gpu = get_gpu_snapshot()
        gpu_util = None
        if gpu.get("available") and gpu.get("devices"):
            gpu_util = gpu["devices"][0].get("utilization_gpu")

        self._cpu_history.append({"t": ts, "v": cpu_pct})
        self._ram_history.append({"t": ts, "v": mem.percent})
        if gpu_util is not None:
            self._gpu_history.append({"t": ts, "v": gpu_util})

        payload = {
            "ts": ts,
            "cpu_percent": cpu_pct,
            "memory_percent": mem.percent,
            "memory_used_gb": round(mem.used / (1024**3), 2),
            "memory_available_gb": round(mem.available / (1024**3), 2),
            "gpu": gpu,
            "disk_io": disk_io,
            "network": net,
        }
        self._latest = payload
        return payload

    async def run_loop(self) -> None:
        while True:
            try:
                payload = self._collect_once()
                await self._broadcast({"type": "telemetry", "data": payload})
            except Exception as e:
                await self._broadcast({"type": "error", "message": str(e)})
            await asyncio.sleep(self.interval_sec)

    def start(self) -> None:
        if self._task is None or self._task.done():
            self._collect_once()
            self._task = asyncio.create_task(self.run_loop())

    def stop(self) -> None:
        if self._task and not self._task.done():
            self._task.cancel()


def build_status_summary(telemetry: dict[str, Any], system: dict[str, Any]) -> dict[str, Any]:
    gpu = telemetry.get("gpu") or {}
    gpu_idle = True
    gpu_state = "unavailable"
    if gpu.get("available") and gpu.get("devices"):
        d0 = gpu["devices"][0]
        util = d0.get("utilization_gpu", 0) or 0
        if util >= 50:
            gpu_state = "working"
            gpu_idle = False
        elif util >= 5:
            gpu_state = "light"
            gpu_idle = False
        else:
            gpu_state = "idle"
    alerts = []
    if telemetry.get("memory_percent", 0) > 90:
        alerts.append({"level": "warn", "code": "ram_high", "message": "RAM usage above 90%"})
    if gpu.get("devices"):
        t = gpu["devices"][0].get("temperature_c")
        if t and t >= 83:
            alerts.append({"level": "warn", "code": "gpu_temp", "message": f"GPU temperature {t}°C"})
    return {
        "online": True,
        "hostname": system.get("hostname"),
        "uptime_sec": system.get("uptime_sec"),
        "gpu_state": gpu_state,
        "gpu_idle": gpu_idle,
        "cpu_percent": telemetry.get("cpu_percent"),
        "memory_percent": telemetry.get("memory_percent"),
        "alerts": alerts,
    }
