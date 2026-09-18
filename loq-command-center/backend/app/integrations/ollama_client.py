from __future__ import annotations

from typing import Any

import httpx

from app.config import Settings, load_merged_config


def ollama_status(settings: Settings) -> dict[str, Any]:
    cfg = load_merged_config(settings)
    base = cfg.get("ollama", {}).get("base_url", "http://127.0.0.1:11434")
    try:
        with httpx.Client(timeout=3.0) as client:
            r = client.get(f"{base}/api/tags")
            if r.status_code != 200:
                return {"available": False, "base_url": base, "error": f"HTTP {r.status_code}"}
            data = r.json()
            models = []
            for m in data.get("models", []):
                models.append(
                    {
                        "name": m.get("name"),
                        "size_bytes": m.get("size"),
                        "modified_at": m.get("modified_at"),
                        "digest": (m.get("digest") or "")[:12],
                    }
                )
            running = []
            try:
                ps = client.get(f"{base}/api/ps")
                if ps.status_code == 200:
                    for item in ps.json().get("models", []):
                        running.append(
                            {
                                "name": item.get("name"),
                                "size_vram": item.get("size_vram"),
                                "expires_at": item.get("expires_at"),
                            }
                        )
            except Exception:
                pass
            return {
                "available": True,
                "base_url": base,
                "models": models,
                "running_models": running,
            }
    except httpx.ConnectError:
        return {"available": False, "base_url": base, "error": "Ollama not reachable"}
    except Exception as e:
        return {"available": False, "base_url": base, "error": str(e)}
