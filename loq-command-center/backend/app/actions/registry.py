from __future__ import annotations

import subprocess
import time
from pathlib import Path
from typing import Any

from app.config import Settings, load_merged_config
from app.events.store import EventStore
from app.integrations import docker_mgr


class ActionRegistry:
    def __init__(self, settings: Settings, events: EventStore):
        self.settings = settings
        self.events = events
        self._running: dict[str, subprocess.Popen] = {}

    def list_actions(self) -> list[dict[str, Any]]:
        cfg = load_merged_config(self.settings)
        actions = []
        for a in cfg.get("actions", []):
            actions.append(
                {
                    "id": a["id"],
                    "name": a.get("name", a["id"]),
                    "description": a.get("description", ""),
                    "kind": a.get("kind", "script"),
                    "requires_confirmation": a.get("requires_confirmation", True),
                }
            )
        for p in cfg.get("projects", []):
            if p.get("actions"):
                for act in p["actions"]:
                    aid = f"project:{p.get('id', p['path'])}:{act['id']}"
                    actions.append(
                        {
                            "id": aid,
                            "name": act.get("name", act["id"]),
                            "description": f"Project {p.get('name', p['path'])} — {act.get('description', '')}",
                            "kind": "project",
                            "requires_confirmation": act.get("requires_confirmation", True),
                        }
                    )
        actions.extend(
            [
                {
                    "id": "docker:container:start",
                    "name": "Docker: start container",
                    "description": "Requires container_id in body",
                    "kind": "docker",
                    "requires_confirmation": True,
                },
                {
                    "id": "docker:container:stop",
                    "name": "Docker: stop container",
                    "description": "Requires container_id in body",
                    "kind": "docker",
                    "requires_confirmation": True,
                },
                {
                    "id": "docker:container:restart",
                    "name": "Docker: restart container",
                    "description": "Requires container_id in body",
                    "kind": "docker",
                    "requires_confirmation": True,
                },
            ]
        )
        return actions

    def execute(self, action_id: str, params: dict[str, Any]) -> dict[str, Any]:
        if not params.get("confirmed"):
            return {"ok": False, "error": "Explicit confirmation required (confirmed: true)"}

        if action_id.startswith("docker:container:"):
            part = action_id.split(":")[-1]
            cid = params.get("container_id")
            if not cid or not isinstance(cid, str) or "/" in cid or ".." in cid:
                return {"ok": False, "error": "Invalid container_id"}
            result = docker_mgr.container_action(cid, part)
            if result.get("ok"):
                self.events.append(
                    "info",
                    "docker",
                    f"container_{part}",
                    f"Container {result.get('container')} {part}",
                    {"container_id": cid},
                )
            return result

        if action_id.startswith("project:"):
            return self._run_project_action(action_id, params)

        cfg = load_merged_config(self.settings)
        for a in cfg.get("actions", []):
            if a["id"] == action_id:
                return self._run_script_action(a)

        return {"ok": False, "error": "Unknown or unconfigured action"}

    def _run_script_action(self, action: dict[str, Any]) -> dict[str, Any]:
        cmd = action.get("command")
        if not cmd or not isinstance(cmd, list):
            return {"ok": False, "error": "Action missing command list"}
        cwd = action.get("cwd")
        work = Path(cwd).expanduser().resolve() if cwd else self.settings.data_dir
        allowed_root = self.settings.data_dir.resolve()
        if not str(work).startswith(str(allowed_root)) and not action.get("cwd_approved"):
            scripts_dir = (Path(__file__).resolve().parent.parent.parent.parent / "scripts").resolve()
            if not str(work).startswith(str(scripts_dir)):
                return {"ok": False, "error": "Working directory not in approved paths"}
        try:
            proc = subprocess.run(
                cmd,
                cwd=str(work),
                capture_output=True,
                text=True,
                timeout=int(action.get("timeout_sec", 120)),
            )
            self.events.append(
                "info" if proc.returncode == 0 else "error",
                "action",
                action["id"],
                f"Action {action['id']} completed (code {proc.returncode})",
                {},
            )
            return {
                "ok": proc.returncode == 0,
                "returncode": proc.returncode,
                "stdout_tail": proc.stdout[-2000:] if proc.stdout else "",
                "stderr_tail": proc.stderr[-2000:] if proc.stderr else "",
            }
        except subprocess.TimeoutExpired:
            return {"ok": False, "error": "Action timed out"}

    def _run_project_action(self, action_id: str, params: dict[str, Any]) -> dict[str, Any]:
        # project:<project_id>:<action_subid>
        parts = action_id.split(":")
        if len(parts) < 3:
            return {"ok": False, "error": "Malformed project action id"}
        sub = parts[-1]
        proj_key = ":".join(parts[1:-1])
        cfg = load_merged_config(self.settings)
        project = None
        for p in cfg.get("projects", []):
            pid = p.get("id") or p["path"]
            if pid == proj_key or p["path"] == proj_key:
                project = p
                break
        if not project:
            return {"ok": False, "error": "Project not configured"}
        actions = {a["id"]: a for a in project.get("actions", [])}
        act = actions.get(sub)
        if not act:
            return {"ok": False, "error": "Project action not defined"}
        if sub == "stop":
            key = project["path"]
            proc = self._running.pop(key, None)
            if proc and proc.poll() is None:
                proc.terminate()
                self.events.append("info", "project", "stop", f"Stopped dev server for {project.get('name')}", {})
                return {"ok": True}
            return {"ok": False, "error": "No managed process running"}
        if sub in ("start", "restart"):
            if sub == "restart":
                self._run_project_action(f"project:{proj_key}:stop", {"confirmed": True})
            cmd = act.get("command")
            if not cmd:
                return {"ok": False, "error": "No command configured"}
            work = Path(project["path"]).expanduser().resolve()
            if not work.is_dir():
                return {"ok": False, "error": "Project path missing"}
            proc = subprocess.Popen(
                cmd,
                cwd=str(work),
                stdout=subprocess.PIPE,
                stderr=subprocess.STDOUT,
                text=True,
            )
            self._running[project["path"]] = proc
            self.events.append("info", "project", "start", f"Started {project.get('name')}", {"pid": proc.pid})
            time.sleep(0.5)
            return {"ok": True, "pid": proc.pid}
        return {"ok": False, "error": "Unsupported project action"}
