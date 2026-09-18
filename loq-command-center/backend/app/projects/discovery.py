from __future__ import annotations

import subprocess
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

from app.config import Settings, load_merged_config

PROJECT_MARKERS = (
    ".git",
    "package.json",
    "pyproject.toml",
    "requirements.txt",
    "Cargo.toml",
    "go.mod",
    "Dockerfile",
    "docker-compose.yml",
    "docker-compose.yaml",
)


def _expand_roots(roots: list[str]) -> list[Path]:
    out = []
    for r in roots:
        p = Path(r).expanduser()
        if p.is_dir():
            out.append(p.resolve())
    return out


def _detect_stack(path: Path) -> list[str]:
    stacks = []
    if (path / "package.json").is_file():
        stacks.append("node")
    if (path / "pyproject.toml").is_file() or (path / "requirements.txt").is_file():
        stacks.append("python")
    if (path / "Dockerfile").is_file():
        stacks.append("docker")
    if (path / "vite.config.ts").is_file() or (path / "vite.config.js").is_file():
        stacks.append("vite")
    return stacks or ["unknown"]


def _git_info(path: Path) -> dict[str, Any]:
    info: dict[str, Any] = {"branch": None, "dirty": None, "remote": None}
    if not (path / ".git").exists():
        return info
    try:
        branch = subprocess.run(
            ["git", "-C", str(path), "rev-parse", "--abbrev-ref", "HEAD"],
            capture_output=True,
            text=True,
            timeout=5,
        )
        if branch.returncode == 0:
            info["branch"] = branch.stdout.strip()
        status = subprocess.run(
            ["git", "-C", str(path), "status", "--porcelain"],
            capture_output=True,
            text=True,
            timeout=5,
        )
        if status.returncode == 0:
            info["dirty"] = bool(status.stdout.strip())
    except Exception:
        pass
    return info


def _readme_excerpt(path: Path, max_len: int = 280) -> str | None:
    for name in ("README.md", "readme.md", "README"):
        rp = path / name
        if rp.is_file():
            try:
                text = rp.read_text(encoding="utf-8", errors="replace")
                lines = [ln.strip() for ln in text.splitlines() if ln.strip() and not ln.strip().startswith("#")]
                excerpt = " ".join(lines[:3])
                return excerpt[:max_len] if excerpt else None
            except Exception:
                return None
    return None


def _infer_dev_command(path: Path, stacks: list[str]) -> str | None:
    if "node" in stacks and (path / "package.json").is_file():
        return "npm run dev (verify package.json scripts before running)"
    if "python" in stacks and (path / "pyproject.toml").is_file():
        return "uvicorn / python -m (configure in projects section)"
    return None


def discover_projects(settings: Settings) -> list[dict[str, Any]]:
    cfg = load_merged_config(settings)
    disc = cfg.get("discovery", {})
    roots = _expand_roots(disc.get("project_roots", []))
    max_depth = int(disc.get("max_depth", 4))
    max_projects = int(disc.get("max_projects", 80))
    ignore = set(disc.get("ignore_dir_names", []))
    configured = {p.get("path"): p for p in cfg.get("projects", []) if p.get("path")}

    found: dict[str, dict[str, Any]] = {}

    def consider(dir_path: Path, depth: int) -> None:
        if len(found) >= max_projects:
            return
        key = str(dir_path)
        if key in found:
            return
        markers = [m for m in PROJECT_MARKERS if (dir_path / m).exists()]
        if not markers:
            return
        stacks = _detect_stack(dir_path)
        mtime = dir_path.stat().st_mtime
        name = configured.get(key, {}).get("name") or dir_path.name
        proj = {
            "name": name,
            "path": key,
            "markers": markers,
            "stacks": stacks,
            "last_modified_iso": datetime.fromtimestamp(mtime, tz=timezone.utc).isoformat(),
            "git": _git_info(dir_path),
            "readme_excerpt": _readme_excerpt(dir_path),
            "dev_command_hint": _infer_dev_command(dir_path, stacks),
            "configured": key in configured,
            "pinned": configured.get(key, {}).get("pinned", False),
            "hidden": configured.get(key, {}).get("hidden", False),
        }
        found[key] = proj

    for root in roots:
        consider(root, 0)
        try:
            for child in root.iterdir():
                if not child.is_dir() or child.name in ignore or child.name.startswith("."):
                    continue
                consider(child, 1)
                if depth_walk(child, 1, max_depth, ignore, consider) >= max_projects:
                    break
        except PermissionError:
            continue

    for path_str, meta in configured.items():
        if path_str not in found and Path(path_str).is_dir():
            p = Path(path_str)
            found[path_str] = {
                "name": meta.get("name", p.name),
                "path": path_str,
                "markers": ["configured"],
                "stacks": _detect_stack(p),
                "last_modified_iso": None,
                "git": _git_info(p),
                "readme_excerpt": _readme_excerpt(p),
                "dev_command_hint": meta.get("dev_command"),
                "configured": True,
                "pinned": meta.get("pinned", True),
                "hidden": meta.get("hidden", False),
            }

    projects = [p for p in found.values() if not p.get("hidden")]
    projects.sort(key=lambda x: (not x.get("pinned"), x.get("name", "").lower()))
    return projects


def depth_walk(path: Path, depth: int, max_depth: int, ignore: set[str], consider) -> int:
    if depth >= max_depth:
        return 0
    count = 0
    try:
        for child in path.iterdir():
            if not child.is_dir() or child.name in ignore:
                continue
            consider(child, depth + 1)
            count += 1
            count += depth_walk(child, depth + 1, max_depth, ignore, consider)
    except PermissionError:
        pass
    return count
