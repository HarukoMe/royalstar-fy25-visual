# Registers a logon scheduled task (may prompt for elevation depending on policy)
param(
  [string]$InstallRoot = "$env:USERPROFILE\loq-command-center"
)

$action = New-ScheduledTaskAction -Execute "powershell.exe" -Argument "-NoProfile -ExecutionPolicy Bypass -File `"$InstallRoot\scripts\windows\start.ps1`""
$trigger = New-ScheduledTaskTrigger -AtLogOn -User $env:USERNAME
$settings = New-ScheduledTaskSettingsSet -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries
Register-ScheduledTask -TaskName "LOQ Command Center" -Action $action -Trigger $trigger -Settings $settings -Description "Starts LOQ local operations API at logon" -Force
Write-Host "Task registered. Review in Task Scheduler."
