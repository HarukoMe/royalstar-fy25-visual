# Safe read-only inventory for Lenovo LOQ — run locally in PowerShell
Write-Host "=== LOQ Machine Inspection ===" -ForegroundColor Cyan

Write-Host "`n-- OS --"
Get-CimInstance Win32_OperatingSystem | Select-Object Caption, Version, BuildNumber, LastBootUpTime

Write-Host "`n-- Computer --"
Get-CimInstance Win32_ComputerSystem | Select-Object Manufacturer, Model, TotalPhysicalMemory

Write-Host "`n-- CPU --"
Get-CimInstance Win32_Processor | Select-Object Name, NumberOfCores, NumberOfLogicalProcessors, MaxClockSpeed

Write-Host "`n-- GPU --"
Get-CimInstance Win32_VideoController | Select-Object Name, DriverVersion, AdapterRAM

Write-Host "`n-- NVIDIA SMI --"
if (Get-Command nvidia-smi -ErrorAction SilentlyContinue) {
  nvidia-smi
} else {
  Write-Host "nvidia-smi not in PATH"
}

Write-Host "`n-- Disks --"
Get-CimInstance Win32_LogicalDisk -Filter "DriveType=3" | Select-Object DeviceID, Size, FreeSpace, FileSystem

Write-Host "`n-- Battery --"
Get-CimInstance Win32_Battery -ErrorAction SilentlyContinue | Select-Object EstimatedChargeRemaining, BatteryStatus

Write-Host "`n-- Network adapters --"
Get-NetAdapter | Where-Object Status -eq 'Up' | Select-Object Name, InterfaceDescription, LinkSpeed

Write-Host "`n-- Tooling --"
@("python", "node", "git", "docker", "ollama") | ForEach-Object {
  $cmd = $_
  $found = Get-Command $cmd -ErrorAction SilentlyContinue
  if ($found) { Write-Host "$cmd : $($found.Source)" } else { Write-Host "$cmd : not found" }
}

Write-Host "`n-- Listening ports (user range) --"
Get-NetTCPConnection -State Listen -ErrorAction SilentlyContinue |
  Where-Object { $_.LocalPort -ge 1024 } |
  Group-Object LocalPort |
  Sort-Object Name |
  Select-Object -First 40 Name, Count

Write-Host "`nDone."
