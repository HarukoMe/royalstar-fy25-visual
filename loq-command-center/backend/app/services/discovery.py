from __future__ import annotations

import socket
import time
from typing import Any

import httpx
import psutil

from app.config import load_merged_config
from app.config import Settings


def _proc_name(pid: int | None) -> str | None:
    if not pid:
        return None
    try:
        return psutil.Process(pid).name()
    except Exception:
        return None


def _match_known(port: int, known: list[dict]) -> dict | None:
    for k in known:
        if k.get("port") == port:
            return k
    return None


def discover_listening_services(settings: Settings) -> list[dict[str, Any]]:
    cfg = load_merged_config(settings)
    svc_cfg = cfg.get("services", {})
    known = svc_cfg.get("known_ports", [])
    hidden = set(svc_cfg.get("hidden", []))
    pinned = {p.get("port"): p for p in svc_cfg.get("pinned", []) if p.get("port")}
    ignore_below = int(svc_cfg.get("ignore_ports_below", 1024))

    by_port: dict[int, dict[str, Any]] = {}

    try:
        conns = psutil.net_connections(kind="inet")
    except (PermissionError, OSError):
        conns = []

    for c in conns:
        if c.status != psutil.CONN_LISTEN:
            continue
        if not c.laddr:
            continue
        port = c.laddr.port
        if port < ignore_below and port not in pinned:
            continue
        if port in hidden:
            continue
        addr = c.laddr.ip
        if addr not in ("0.0.0.0", "127.0.0.1", "::", "::1") and not addr.startswith("127."):
            continue
        if port not in by_port:
            meta = _match_known(port, known) or pinned.get(port)
            name = meta.get("name") if meta else f"Port {port}"
            kind = meta.get("kind") if meta else "unknown"
            by_port[port] = {
                "port": port,
                "name": name,
                "kind": kind,
                "pid": c.pid,
                "process": _proc_name(c.pid),
                "address": addr,
                "local_url": f"http://127.0.0.1:{port}",
                "status": "listening",
                "health": None,
                "pinned": port in pinned,
            }

    for port, pin in pinned.items():
        if port not in by_port:
            by_port[port] = {
                "port": port,
                "name": pin.get("name", f"Port {port}"),
                "kind": pin.get("kind", "pinned"),
                "pid": None,
                "process": None,
                "address": "127.0.0.1",
                "local_url": f"http://127.0.0.1:{port}",
                "status": "offline",
                "health": None,
                "pinned": True,
            }

    services = sorted(by_port.values(), key=lambda s: s["port"])
    _probe_health(services, known)
    return services


def _probe_health(services: list[dict[str, Any]], known: list[dict]) -> None:
    health_map = {k["port"]: k.get("health_path") for k in known if k.get("health_path")}
    with httpx.Client(timeout=1.5) as client:
        for s in services:
            path = health_map.get(s["port"])
            if not path and s["kind"] == "ollama":
                path = "/api/tags"
            if not path:
                continue
            url = f"http://127.0.0.1:{s['port']}{path}"
            try:
                r = client.get(url)
                s["health"] = "ok" if r.status_code < 500 else "degraded"
                s["status"] = "running" if r.status_code < 500 else "unhealthy"
            except Exception:
                if s["status"] == "listening":
                    s["health"] = "unreachable"
                else:
                    s["health"] = "down"
