from __future__ import annotations

from pathlib import Path
from typing import Any

from app.config import Settings, load_merged_config


def _approved_roots(settings: Settings) -> list[Path]:
    cfg = load_merged_config(settings)
    roots = []
    for r in cfg.get("outputs", {}).get("safe_directories", []):
        p = Path(r).expanduser().resolve()
        if p.is_dir():
            roots.append(p)
    roots.append(settings.data_dir.resolve())
    return roots


def _is_safe_path(path: Path, roots: list[Path]) -> bool:
    try:
        resolved = path.resolve()
    except OSError:
        return False
    for root in roots:
        try:
            resolved.relative_to(root)
            return True
        except ValueError:
            continue
    return False


def list_outputs(settings: Settings, subpath: str = "") -> dict[str, Any]:
    roots = _approved_roots(settings)
    if not roots:
        return {"ok": True, "entries": [], "roots": []}
    base = roots[0]
    target = (base / subpath).resolve() if subpath else base
    if ".." in subpath or subpath.startswith("/") or subpath.startswith("\\"):
        return {"ok": False, "error": "Invalid path"}
    if not _is_safe_path(target, roots):
        return {"ok": False, "error": "Path not allowed"}
    if not target.is_dir():
        return {"ok": False, "error": "Not a directory"}
    entries = []
    try:
        for child in sorted(target.iterdir(), key=lambda p: p.name.lower())[:200]:
            try:
                st = child.stat()
                entries.append(
                    {
                        "name": child.name,
                        "path": str(child.relative_to(base)),
                        "is_dir": child.is_dir(),
                        "size": st.st_size if child.is_file() else None,
                        "modified": st.st_mtime,
                    }
                )
            except OSError:
                continue
    except PermissionError:
        return {"ok": False, "error": "Permission denied"}
    return {"ok": True, "root": str(base), "cwd": str(target.relative_to(base)) if target != base else "", "entries": entries}
