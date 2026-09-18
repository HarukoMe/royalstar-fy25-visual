from __future__ import annotations

from typing import Any

_client = None
_last_error: str | None = None


def _get_client():
    global _client, _last_error
    if _client is not None:
        return _client
    try:
        import docker

        _client = docker.from_env()
        _client.ping()
        _last_error = None
        return _client
    except Exception as e:
        _last_error = str(e)
        _client = None
        return None


def docker_status() -> dict[str, Any]:
    c = _get_client()
    if not c:
        return {"available": False, "error": _last_error or "Docker not available"}
    try:
        info = c.info()
        return {
            "available": True,
            "containers_running": info.get("ContainersRunning", 0),
            "containers_total": info.get("Containers", 0),
            "images": info.get("Images", 0),
            "server_version": info.get("ServerVersion"),
        }
    except Exception as e:
        return {"available": False, "error": str(e)}


def list_containers() -> list[dict[str, Any]]:
    c = _get_client()
    if not c:
        return []
    out = []
    try:
        for cont in c.containers.list(all=True):
            ports = []
            if cont.ports:
                for private, bindings in cont.ports.items():
                    if bindings:
                        for b in bindings:
                            ports.append(f"{b.get('HostIp', '')}:{b.get('HostPort', '')}->{private}")
                    elif private:
                        ports.append(str(private))
            out.append(
                {
                    "id": cont.short_id,
                    "name": cont.name,
                    "image": cont.image.tags[0] if cont.image.tags else cont.image.short_id,
                    "status": cont.status,
                    "state": cont.attrs.get("State", {}).get("Status"),
                    "created": cont.attrs.get("Created"),
                    "ports": ports,
                }
            )
    except Exception:
        pass
    return out


def container_action(container_id: str, action: str) -> dict[str, Any]:
    allowed = {"start", "stop", "restart"}
    if action not in allowed:
        return {"ok": False, "error": f"Action not allowed: {action}"}
    c = _get_client()
    if not c:
        return {"ok": False, "error": _last_error or "Docker unavailable"}
    try:
        cont = c.containers.get(container_id)
        getattr(cont, action)()
        return {"ok": True, "action": action, "container": cont.name}
    except Exception as e:
        return {"ok": False, "error": str(e)}


def container_logs(container_id: str, tail: int = 100) -> dict[str, Any]:
    tail = max(10, min(tail, 500))
    c = _get_client()
    if not c:
        return {"ok": False, "error": _last_error or "Docker unavailable", "lines": []}
    try:
        cont = c.containers.get(container_id)
        raw = cont.logs(tail=tail, timestamps=True).decode("utf-8", errors="replace")
        lines = raw.splitlines()
        return {"ok": True, "lines": lines}
    except Exception as e:
        return {"ok": False, "error": str(e), "lines": []}
