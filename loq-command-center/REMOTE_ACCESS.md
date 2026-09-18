# Remote access (private network only)

## Principle

The LOQ Command Center must **not** be reachable from the public internet. Use a **mesh VPN** so your phone or work laptop sees the PC as a private node.

Recommended: **[Tailscale](https://tailscale.com/download/windows)**

## What is already done

- API listens on **127.0.0.1:8742** only.
- Application **password** + session cookie (independent of Tailscale).
- Helper script: `scripts/windows/tailscale-serve.ps1` (HTTPS on tailnet → local API/UI).

## Your steps (on the Lenovo LOQ)

### 1. Install Tailscale

1. Download and install Tailscale for Windows.
2. Sign in with your account (MFA as you normally would).
3. Confirm the machine appears in the Tailscale admin console.

### 2. Start LOQ Command Center

```powershell
cd $env:USERPROFILE\loq-command-center
.\scripts\windows\start.ps1
```

Open http://127.0.0.1:8742 locally and complete **password setup** if you have not already.

### 3. Expose via Tailscale Serve (HTTPS on tailnet only)

```powershell
.\scripts\windows\tailscale-serve.ps1 -Port 8742
tailscale serve status
```

Tailscale issues a **tailnet-only** URL (not public). Open it from another device that is on the same tailnet.

### 4. Verify

- From phone/laptop (Tailscale connected): load the serve URL, log in with your LOQ operator password.
- Confirm telemetry matches the machine (GPU name, hostname, uptime).
- Confirm you **cannot** reach the URL with Tailscale disconnected.

## Alternatives

- **Tailscale Funnel**: off / not used — do not enable public funnel for this app.
- **SSH tunnel**: acceptable for ad-hoc use; not documented here.
- **Port forwarding on router**: **do not use** for this application.

## Firewall

Windows Defender Firewall should remain enabled. Tailscale interfaces are separate; do not create broad inbound allow rules for port 8742 on the LAN adapter.

## If Tailscale is not configured overnight

The full local application still runs on the LOQ. Remote access simply waits until you complete sign-in above.
