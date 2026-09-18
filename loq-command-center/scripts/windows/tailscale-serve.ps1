# Optional: expose UI only on Tailscale mesh (requires Tailscale installed and logged in)
# Do NOT run until Tailscale is authenticated.
param([int]$Port = 8742)

if (-not (Get-Command tailscale -ErrorAction SilentlyContinue)) {
  Write-Error "Tailscale CLI not found. Install from https://tailscale.com/download/windows and sign in first."
}
Write-Host "Serving LOQ Command Center on tailnet only (HTTPS)..."
tailscale serve --bg --https=443 http://127.0.0.1:$Port
Write-Host "Check: tailscale serve status"
