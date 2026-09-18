# Security

## Goals

- Monitor broadly on the **private LAN / tailnet**.
- Control narrowly via **named, configured** actions only.
- Never expose an open admin interface to the public internet.
- Never provide arbitrary shell, PowerShell, or path execution APIs.

## Authentication

- On first run, operator sets a password (min 8 chars) stored as **bcrypt hash** in `auth.json`.
- Sessions use **HttpOnly** signed cookies (`itsdangerous`), 7-day max age.
- When `LOQ_REQUIRE_AUTH=true` (default on Windows start script), all `/api/*` except `/api/health` and auth routes require a valid session.
- WebSocket telemetry rejects unauthenticated connections when auth is enabled.

**Your step:** choose a strong password tomorrow; do not reuse browser passwords.

## Network exposure

- Backend binds **`127.0.0.1:8742`** by default — not reachable from other machines until you add **Tailscale Serve** or similar private overlay.
- **Do not** add router port forwarding for this app.
- **Do not** set `host: 0.0.0.0` unless you understand tailnet/firewall implications.

## Control plane

- `POST /api/actions/execute` requires `confirmed: true`.
- Action IDs must exist in configuration or the fixed Docker allowlist.
- Project commands run only from `projects[].actions[].command` arrays defined in YAML.
- Global maintenance scripts require `cwd` under `data_dir` or `scripts/` unless `cwd_approved` is set intentionally in config.

## Data exposure

- Output browser (`/api/outputs`) only lists directories declared in `outputs.safe_directories` plus the data directory.
- Path traversal (`..`, absolute paths) is rejected.
- Docker logs and app logs are truncated; env files are not exposed.
- Service discovery does not dump full command lines with secrets (process name only).

## Application hardening

- CORS limited to local dev origins by default.
- JSON body validation via Pydantic (length limits on action IDs, container IDs).
- Container IDs validated (no `/` or `..`).
- Sensitive Docker/env content may still appear in container logs — treat log viewer as operator-only.

## Tests

`backend/tests/test_security.py` covers:

- Protected routes without session
- Login flow
- Confirmation gate on actions
- Output path traversal rejection
- Invalid Docker log IDs

Run: `cd backend && .venv/bin/pytest`

## Remote access trust model

Tailscale (or equivalent) provides **network** authentication. This app still requires **application** password. Treat tailnet membership as necessary but not sufficient for machine control.
