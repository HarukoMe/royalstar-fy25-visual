param(
  [string]$InstallRoot = "$env:USERPROFILE\loq-command-center"
)

$venv = "$InstallRoot\backend\.venv\Scripts\python.exe"
if (-not (Test-Path $venv)) {
  Write-Error "Run install.ps1 first"
}

$env:LOQ_DATA_DIR = "$env:LOCALAPPDATA\LOQCommandCenter"
$env:LOQ_REQUIRE_AUTH = "true"

Start-Process -WindowStyle Minimized -FilePath $venv -ArgumentList @("$InstallRoot\backend\run.py") -WorkingDirectory "$InstallRoot\backend"
Write-Host "LOQ API started on http://127.0.0.1:8742"
Write-Host "Open http://127.0.0.1:8742 for UI (production build) or run frontend dev on 8743"
