# LOQ Command Center

Personal operations console for a **Lenovo LOQ** home workstation: live telemetry, GPU state, local services, Docker, Ollama, project discovery, activity timeline, and **explicitly configured** safe actions.

Built for **Windows 11** on your machine. Developed and smoke-tested in this repository's Linux cloud environment against real host metrics (not mock data).

## Quick start (development)

```bash
cd loq-command-center
chmod +x scripts/run-dev.sh
LOQ_DATA_DIR="$(pwd)/.local-data" LOQ_REQUIRE_AUTH=false ./scripts/run-dev.sh
```

- API: http://127.0.0.1:8742  
- UI (dev): http://127.0.0.1:8743  

Production UI is served from the API after `npm run build` in `frontend/` (static files in `frontend/dist`).

## Windows install (your LOQ)

1. Clone or copy this folder to the PC (e.g. `%USERPROFILE%\loq-command-center`).
2. Run `scripts\windows\inspect-machine.ps1` for a read-only inventory.
3. Run `scripts\windows\install.ps1` (Python 3.11+ and Node 20+ required).
4. Run `scripts\windows\start.ps1` and open http://127.0.0.1:8742
5. First visit: create the operator password (`/api/auth/setup` via UI login screen).
6. Edit `%LOCALAPPDATA%\LOQCommandCenter\config.yaml` — project roots, pinned services, approved actions.

Optional logon autostart: `scripts\windows\register-logon-task.ps1` (review Task Scheduler).

## Remote access (private only)

See [REMOTE_ACCESS.md](./REMOTE_ACCESS.md). **Do not** expose ports on your router. Use Tailscale (or similar) and `scripts\windows\tailscale-serve.ps1` after you sign in to Tailscale.

## Documentation

| File | Purpose |
|------|---------|
| [ARCHITECTURE.md](./ARCHITECTURE.md) | System design |
| [SECURITY.md](./SECURITY.md) | Threat model and controls |
| [REMOTE_ACCESS.md](./REMOTE_ACCESS.md) | Tailscale setup |
| [MORNING_REPORT.md](./MORNING_REPORT.md) | Build report for Haruko |

## Configuration

- Defaults: `config/default.yaml`
- User overrides: `%LOCALAPPDATA%\LOQCommandCenter\config.yaml` (Windows) or `~/.loq-command-center/config.yaml` (Linux)

Data directory (events DB, auth, logs): `%LOCALAPPDATA%\LOQCommandCenter` on Windows.
