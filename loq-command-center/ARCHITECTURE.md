# Architecture

## Overview

LOQ Command Center is a **local-first** control plane:

```
┌─────────────────────────────────────────────────────────┐
│  Browser (desktop / phone)                               │
│  React + TypeScript (Vite) — port 8743 dev, static prod  │
└───────────────────────────┬─────────────────────────────┘
                            │ HTTP + WebSocket (/ws/telemetry)
                            ▼
┌─────────────────────────────────────────────────────────┐
│  FastAPI backend — 127.0.0.1:8742                        │
│  • Session auth (bcrypt + signed cookie)                 │
│  • TelemetryHub (psutil + NVML)                          │
│  • Service discovery (listening ports + health probes)   │
│  • Docker / Ollama integrations                          │
│  • Project scanner (bounded roots)                       │
│  • Action registry (YAML-only commands)                  │
│  • SQLite event store                                    │
└───────────────────────────┬─────────────────────────────┘
                            │
        ┌───────────────────┼───────────────────┐
        ▼                   ▼                   ▼
   psutil / NVML      docker SDK          Ollama HTTP
   subprocess/git     localhost API       localhost API
```

## Telemetry

- **CPU / RAM / disk / network**: `psutil`, sampled every ~1.5s.
- **GPU**: `nvidia-ml-py` (NVML). If unavailable, UI shows explicit error — no synthetic values.
- **History**: in-memory ring buffer (120 samples) exposed via REST and WebSocket push.

## Service discovery

- Enumerates `LISTEN` sockets via `psutil.net_connections`.
- Ignores privileged ports (<1024) unless pinned in config.
- Matches known port metadata from `config/default.yaml`.
- Optional HTTP health checks for known services (Ollama `/api/tags`, etc.).

## Projects

- Scans only configured `discovery.project_roots` with depth and count limits.
- Detects markers: `.git`, `package.json`, `pyproject.toml`, etc.
- Git branch/dirty via read-only `git` subprocess calls.
- **No** automatic execution of `package.json` scripts.

## Actions

Two classes:

1. **Read-only** — all GET endpoints and WebSocket telemetry.
2. **Control** — `POST /api/actions/execute` with `confirmed: true` and IDs from config:
   - Maintenance scripts listed under `actions:` in YAML.
   - Per-project actions under `projects[].actions`.
   - Docker start/stop/restart (container ID validated, no delete in v1).

## Persistence

| Path | Content |
|------|---------|
| `data_dir/events.db` | Activity timeline |
| `data_dir/auth.json` | bcrypt password hash |
| `data_dir/.session_secret` | Cookie signing secret |
| `data_dir/config.yaml` | User overrides |
| `data_dir/logs/` | Application logs |

## Frontend

Single-page layout with a **command strip** (online, GPU state, CPU, RAM, uptime) and tabbed detail (GPU, services, Docker, projects, activity, logs). WebSocket keeps meters live; REST refreshes every 15s for slower-changing data.

Mobile layout collapses grids and prioritizes status chips (see `styles.css` `@media`).

## Windows deployment

- `scripts/windows/install.ps1` — venv, pip, `npm run build`.
- `scripts/windows/start.ps1` — launches API (serves built UI).
- Optional Scheduled Task at logon.
- Remote: Tailscale Serve to loopback only (see REMOTE_ACCESS.md).
