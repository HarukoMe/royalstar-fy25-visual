# Install LOQ Command Center on Windows (user scope, no admin required for venv)
param(
  [string]$InstallRoot = "$env:USERPROFILE\loq-command-center"
)

$ErrorActionPreference = "Stop"
$RepoRoot = Split-Path (Split-Path $PSScriptRoot -Parent) -Parent
if (Test-Path "$PSScriptRoot\..\..\backend") {
  $RepoRoot = Resolve-Path "$PSScriptRoot\..\.."
}

Write-Host "Installing from $RepoRoot to $InstallRoot"
New-Item -ItemType Directory -Force -Path $InstallRoot | Out-Null
Copy-Item -Recurse -Force "$RepoRoot\*" $InstallRoot -Exclude @("node_modules", ".venv", ".local-data", "frontend\dist")

# Python venv
$venv = "$InstallRoot\backend\.venv"
if (-not (Test-Path $venv)) {
  python -m venv $venv
}
& "$venv\Scripts\pip.exe" install -r "$InstallRoot\backend\requirements.txt"

# Frontend build
Push-Location "$InstallRoot\frontend"
npm install
npm run build
Pop-Location

$dataDir = "$env:LOCALAPPDATA\LOQCommandCenter"
New-Item -ItemType Directory -Force -Path $dataDir | Out-Null
$configDest = "$dataDir\config.yaml"
if (-not (Test-Path $configDest)) {
  Copy-Item "$InstallRoot\config\default.yaml" $configDest
  Write-Host "Edit $configDest for project roots and actions."
}

Write-Host "Install complete. Run scripts\windows\start.ps1"
