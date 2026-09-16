# Morning report — LOQ Command Center

**Date:** 2026-09-16  
**Built by:** Cursor Cloud Agent (overnight)  
**For:** Haruko

## Important context

This overnight run executed on a **Linux cloud development VM** (`cursor`, Ubuntu 24.04, 4 vCPU Xeon, ~16 GB RAM, **no NVIDIA GPU**, no Docker, no Ollama). Your **Lenovo LOQ (Windows 11, i7-13650HX, RTX 5060)** is the **target deployment host** — not this VM.

The application is **real software** reading **real host metrics** wherever it runs. On the cloud VM it correctly reports Linux, no NVML, and discovers projects under `/workspace`. On your LOQ it should report Windows, GPU telemetry, and your local tools once installed.

## What was built

| Component | Location |
|-----------|----------|
| FastAPI backend | `loq-command-center/backend/` |
| React + TypeScript UI | `loq-command-center/frontend/` |
| Default config | `loq-command-center/config/default.yaml` |
| Windows install/start/Tailscale scripts | `loq-command-center/scripts/windows/` |
| Docs | `README.md`, `ARCHITECTURE.md`, `SECURITY.md`, `REMOTE_ACCESS.md` |

### Features implemented

- **Live telemetry** — CPU, RAM, disk, network rates, uptime (psutil); WebSocket + REST history ring buffer
- **GPU** — NVML via `nvidia-ml-py`; processes on GPU; history sparklines; explicit error when unavailable
- **Service discovery** — listening ports with heuristics + health probes for known services
- **Docker** — list/start/stop/restart + logs (degrades when Docker absent)
- **Ollama** — models + running ps endpoint (degrades when absent)
- **Project discovery** — bounded scan of configured roots; git branch/dirty; README excerpt
- **Activity timeline** — SQLite events + threshold alerts (GPU/RAM/temp, debounced)
- **Safe actions** — registry from YAML; Docker actions with confirmation; no arbitrary shell API
- **Auth** — bcrypt password, HttpOnly session cookie, optional `LOQ_REQUIRE_AUTH=false` for dev
- **Output browser API** — path-restricted (config `outputs.safe_directories`)
- **UI** — command strip, GPU-forward home, tabs, responsive mobile CSS

## Hardware / software discovered (this VM)

| Item | Value |
|------|--------|
| OS | Ubuntu 24.04.4 LTS (Linux 6.12.94+) |
| Hostname | `cursor` |
| CPU | Intel Xeon (4 logical), ~2400 MHz reported |
| RAM | 15.64 GB total |
| GPU | None / NVML unavailable |
| Docker | Not installed |
| Ollama | Not installed |
| Python | 3.12.3 |
| Node | v22.14.0 |
| Git | 2.43.0 |

### Projects discovered (sample)

Monorepo under `/workspace`: `apps/if2`, `apps/soundings`, `apps/plate-room` (from `.local-data/config.yaml` roots).

## What was tested

| Test | Result |
|------|--------|
| `pytest` security tests (5) | Pass |
| `npm run build` | Pass |
| API `/api/health`, `/api/overview` | Pass — real Linux metrics |
| Backend on `127.0.0.1:8742` with built UI | Running in tmux session `loq-backend` |
| GPU integration | Correctly reports unavailable (no driver here) |
| Docker / Ollama | Correctly report offline |

**Not tested on real LOQ hardware** (requires your PC): NVML RTX 5060, Windows battery, Docker Desktop, Ollama, Tailscale Serve, Scheduled Task logon.

## What failed or is unavailable here

- NVIDIA telemetry — expected on cloud VM
- Docker / Ollama — not installed on VM
- Tailscale — requires your Windows account login
- Windows autostart task — script provided, not executed here

## Your steps on the Lenovo LOQ

### 1. Get the code

Pull this branch or copy `loq-command-center/` to e.g. `%USERPROFILE%\loq-command-center`.

### 2. Inspect (optional)

```powershell
.\scripts\windows\inspect-machine.ps1
```

### 3. Install and run

```powershell
.\scripts\windows\install.ps1
.\scripts\windows\start.ps1
```

Open **http://127.0.0.1:8742** — set operator password on first launch.

### 4. Configure

Edit `%LOCALAPPDATA%\LOQCommandCenter\config.yaml`:

- Add your real `discovery.project_roots` (e.g. `C:\Users\Haruko\projects`)
- Pin/hide services under `services.pinned` / `services.hidden`
- Define `projects[]` with explicit `actions` for dev servers (see `config/default.yaml` comments pattern in README)
- Add `outputs.safe_directories` for artifact folders

### 5. Remote access (private)

1. Install and sign in to **Tailscale** on the LOQ.
2. Run `.\scripts\windows\tailscale-serve.ps1`
3. Open the tailnet HTTPS URL from phone/laptop (Tailscale on).

See [REMOTE_ACCESS.md](./REMOTE_ACCESS.md).

### 6. Autostart (optional)

```powershell
.\scripts\windows\register-logon-task.ps1
```

Review in Task Scheduler before enabling.

## Access URLs

| Mode | URL |
|------|-----|
| Production (Windows, after build) | http://127.0.0.1:8742 |
| Dev UI (Vite proxy) | http://127.0.0.1:8743 |
| API only | http://127.0.0.1:8742/api/health |

## Security decisions (summary)

- Bind **loopback only** by default
- **No** public port exposure; Tailscale Serve for tailnet HTTPS
- App-layer **password** even on tailnet
- Control plane limited to **configured** action IDs + Docker lifecycle (no delete v1)
- No generic terminal or shell endpoint

Full detail: [SECURITY.md](./SECURITY.md).

## Ideas for v2

- UI for pin/hide services and projects (writes config.yaml)
- Tailscale status card in overview (when CLI present)
- Windows-specific battery / power profile widget
- Container log viewer in UI (API exists)
- Ollama safe model unload action
- Structured log file handler + rotation for backend
- API token for automation (in addition to cookie sessions)
- Disk space alerts per volume on LOQ

---

**Bottom line:** The command center is built, tested against this Linux host with honest telemetry, and packaged for your LOQ with Windows scripts and Tailscale-oriented remote access. After `install.ps1` on the Lenovo, you should see **your** GPU, **your** Docker/Ollama state, and **your** project folders — not cloud placeholders.
