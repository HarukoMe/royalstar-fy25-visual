from __future__ import annotations

import asyncio
import logging
import platform
from contextlib import asynccontextmanager
from pathlib import Path
from typing import Any

from fastapi import Depends, FastAPI, Request, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, JSONResponse
from pydantic import BaseModel, Field

from app import __version__
from app.actions.registry import ActionRegistry
from app.auth.session import (
    SessionManager,
    has_password,
    save_password_hash,
    verify_password,
    SESSION_COOKIE,
)
from app.config import get_settings, load_merged_config
from app.events.store import AlertMonitor, EventStore
from app.integrations import docker_mgr
from app.integrations.ollama_client import ollama_status
from app.outputs.browser import list_outputs
from app.platform.gpu import get_gpu_snapshot, shutdown_nvml
from app.platform.system_info import collect_system_snapshot
from app.projects.discovery import discover_projects
from app.services.discovery import discover_listening_services
from app.telemetry.collector import TelemetryHub, build_status_summary

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
)
logger = logging.getLogger("loq")

settings = get_settings()
cfg = load_merged_config(settings)
event_store = EventStore(settings.data_dir / "events.db")
alert_monitor = AlertMonitor(event_store, cfg.get("thresholds", {}))
telemetry_hub = TelemetryHub(interval_sec=settings.telemetry_interval_sec)
sessions = SessionManager(settings.session_secret, settings.data_dir, settings.require_auth)
actions = ActionRegistry(settings, event_store)

_system_cache: dict[str, Any] = {}
_system_cache_ts = 0.0


def refresh_system_cache() -> dict[str, Any]:
    global _system_cache, _system_cache_ts
    import time

    if time.time() - _system_cache_ts > 30:
        _system_cache = collect_system_snapshot()
        _system_cache_ts = time.time()
    return _system_cache


@asynccontextmanager
async def lifespan(app: FastAPI):
    settings.ensure_dirs()
    event_store.append("info", "system", "startup", f"LOQ Command Center v{__version__} started", {})
    telemetry_hub.start()

    async def alert_loop():
        while True:
            try:
                alert_monitor.evaluate(telemetry_hub.snapshot())
            except Exception:
                pass
            await asyncio.sleep(5)

    task = asyncio.create_task(alert_loop())
    yield
    task.cancel()
    telemetry_hub.stop()
    shutdown_nvml()


app = FastAPI(title="LOQ Command Center", version=__version__, lifespan=lifespan)
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins + ["http://127.0.0.1:8742"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)

FRONTEND_DIST = Path(__file__).resolve().parent.parent.parent / "frontend" / "dist"


def auth_dep(request: Request):
    sessions.require(request)


class LoginBody(BaseModel):
    password: str = Field(min_length=8, max_length=128)


class SetupBody(BaseModel):
    password: str = Field(min_length=8, max_length=128)


class ActionBody(BaseModel):
    action_id: str = Field(min_length=1, max_length=200)
    confirmed: bool = False
    container_id: str | None = None
    params: dict[str, Any] = Field(default_factory=dict)


@app.get("/api/health")
def health():
    return {"ok": True, "version": __version__, "platform": platform.system()}


@app.get("/api/auth/status")
def auth_status():
    return {
        "auth_required": sessions.auth_required(),
        "password_configured": has_password(settings.data_dir),
    }


@app.post("/api/auth/setup")
def auth_setup(body: SetupBody):
    if has_password(settings.data_dir):
        return JSONResponse(status_code=400, content={"error": "Password already configured"})
    save_password_hash(settings.data_dir, body.password)
    token = sessions.create_session_token()
    resp = JSONResponse({"ok": True})
    sessions.set_cookie(resp, token)
    return resp


@app.post("/api/auth/login")
def auth_login(body: LoginBody):
    if not has_password(settings.data_dir):
        return JSONResponse(status_code=400, content={"error": "Password not configured — use setup first"})
    if not verify_password(settings.data_dir, body.password):
        return JSONResponse(status_code=401, content={"error": "Invalid password"})
    token = sessions.create_session_token()
    resp = JSONResponse({"ok": True})
    sessions.set_cookie(resp, token)
    return resp


@app.post("/api/auth/logout")
def auth_logout(request: Request):
    resp = JSONResponse({"ok": True})
    sessions.clear_cookie(resp)
    return resp


@app.get("/api/overview", dependencies=[Depends(auth_dep)])
def overview():
    sys = refresh_system_cache()
    telem = telemetry_hub.snapshot()
    summary = build_status_summary(telem, sys)
    cfg_local = load_merged_config(settings)
    return {
        "machine": {
            "display_name": cfg_local.get("machine", {}).get("display_name", "LOQ"),
            "system": sys,
            "summary": summary,
        },
        "telemetry": telem,
        "services": discover_listening_services(settings)[:40],
        "docker": docker_mgr.docker_status(),
        "ollama": ollama_status(settings),
        "projects_count": len(discover_projects(settings)),
        "events": event_store.recent(15),
        "actions_available": len(actions.list_actions()),
    }


@app.get("/api/system", dependencies=[Depends(auth_dep)])
def system_info():
    return refresh_system_cache()


@app.get("/api/telemetry", dependencies=[Depends(auth_dep)])
def telemetry_now():
    return {"live": telemetry_hub.snapshot(), "history": telemetry_hub.history()}


@app.get("/api/gpu", dependencies=[Depends(auth_dep)])
def gpu_detail():
    return {
        "snapshot": get_gpu_snapshot(),
        "history": telemetry_hub.history().get("gpu", []),
        "live": telemetry_hub.snapshot().get("gpu"),
    }


@app.get("/api/services", dependencies=[Depends(auth_dep)])
def services():
    return discover_listening_services(settings)


@app.get("/api/docker", dependencies=[Depends(auth_dep)])
def docker_list():
    return {"status": docker_mgr.docker_status(), "containers": docker_mgr.list_containers()}


@app.get("/api/docker/{container_id}/logs", dependencies=[Depends(auth_dep)])
def docker_logs(container_id: str, tail: int = 100):
    if ".." in container_id or "/" in container_id or len(container_id) > 128:
        return JSONResponse(status_code=400, content={"error": "Invalid container id"})
    return docker_mgr.container_logs(container_id, tail=tail)


@app.get("/api/ollama", dependencies=[Depends(auth_dep)])
def ollama():
    return ollama_status(settings)


@app.get("/api/projects", dependencies=[Depends(auth_dep)])
def projects():
    return discover_projects(settings)


@app.get("/api/events", dependencies=[Depends(auth_dep)])
def events(limit: int = 50):
    return event_store.recent(limit)


@app.get("/api/actions", dependencies=[Depends(auth_dep)])
def list_actions():
    return actions.list_actions()


@app.post("/api/actions/execute", dependencies=[Depends(auth_dep)])
def execute_action(body: ActionBody):
    params = dict(body.params)
    params["confirmed"] = body.confirmed
    if body.container_id:
        params["container_id"] = body.container_id
    result = actions.execute(body.action_id, params)
    if not result.get("ok"):
        return JSONResponse(status_code=400, content=result)
    return result


@app.get("/api/outputs", dependencies=[Depends(auth_dep)])
def outputs(path: str = ""):
    result = list_outputs(settings, path)
    if not result.get("ok"):
        return JSONResponse(status_code=400, content=result)
    return result


@app.get("/api/logs/app", dependencies=[Depends(auth_dep)])
def app_logs(lines: int = 200):
    log_path = settings.data_dir / "logs" / "backend.log"
    if not log_path.is_file():
        return {"lines": ["(no log file yet)"]}
    text = log_path.read_text(encoding="utf-8", errors="replace").splitlines()
    return {"lines": text[-min(lines, 500):]}


@app.websocket("/ws/telemetry")
async def ws_telemetry(websocket: WebSocket):
    token = websocket.cookies.get(SESSION_COOKIE)
    if sessions.auth_required() and not sessions.read_session(token):
        await websocket.close(code=4401)
        return
    await websocket.accept()
    q = telemetry_hub.subscribe()
    try:
        await websocket.send_json(
            {
                "type": "telemetry",
                "data": telemetry_hub.snapshot(),
            }
        )
        while True:
            msg = await q.get()
            await websocket.send_json(msg)
    except WebSocketDisconnect:
        pass
    finally:
        telemetry_hub.unsubscribe(q)


@app.get("/")
def spa_root():
    index = FRONTEND_DIST / "index.html"
    if index.is_file():
        return FileResponse(index)
    return JSONResponse(
        {
            "message": "LOQ Command Center API",
            "ui": "Build frontend or open http://127.0.0.1:8743 in dev mode",
        }
    )


@app.get("/{full_path:path}")
def spa_fallback(full_path: str):
    if full_path.startswith("api/") or full_path.startswith("ws/"):
        return JSONResponse(status_code=404, content={"error": "not found"})
    file_path = FRONTEND_DIST / full_path
    if file_path.is_file():
        return FileResponse(file_path)
    index = FRONTEND_DIST / "index.html"
    if index.is_file():
        return FileResponse(index)
    return JSONResponse(status_code=404, content={"error": "not found"})
