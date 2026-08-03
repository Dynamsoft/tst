<#
    Registers (or removes) the "MDS-MRZ-Demo" scheduled task that keeps
    run-server.ps1 alive.

    Why a scheduled task rather than a Windows service: a plain java process does
    not speak the service-control protocol, so sc.exe would need a wrapper such
    as NSSM or WinSW. A task needs nothing extra and still runs as SYSTEM at boot.

    Requires an elevated shell.

        .\install-service.ps1              # install and start
        .\install-service.ps1 -Uninstall   # stop and remove
#>
[CmdletBinding()]
param(
    [switch] $Uninstall,
    [string] $TaskName = "MDS-MRZ-Demo",
    # Hostnames/IPs this machine is reached at, for the dev certificate. Stored in
    # the task definition rather than in run-server.ps1, so the scripts stay
    # machine-independent. e.g. -CertHost "demo.example.com,203.0.113.10"
    [string] $CertHost = "",
    # How often to check that the supervisor is still alive. While it is running
    # the trigger does nothing, because MultipleInstances is IgnoreNew.
    [int] $WatchdogMinutes = 2
)

$ErrorActionPreference = "Stop"

if (-not ([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)) {
    throw "This script needs an elevated PowerShell session."
}

if ($Uninstall) {
    $existing = Get-ScheduledTask -TaskName $TaskName -ErrorAction SilentlyContinue
    if ($null -eq $existing) {
        "Task '$TaskName' is not registered."
    } else {
        Stop-ScheduledTask -TaskName $TaskName -ErrorAction SilentlyContinue
        Unregister-ScheduledTask -TaskName $TaskName -Confirm:$false
        "Removed task '$TaskName'."
    }
    # The supervisor is stopped with the task, but the jar it launched is a
    # separate process and has to be stopped on its own.
    Get-CimInstance Win32_Process -Filter "Name = 'java.exe'" |
        Where-Object { $_.CommandLine -like "*mds-mrz-kotlin-server*" } |
        ForEach-Object {
            "Stopping server pid $($_.ProcessId)."
            Stop-Process -Id $_.ProcessId -Force -ErrorAction SilentlyContinue
        }
    return
}

$script = Join-Path $PSScriptRoot "run-server.ps1"
if (-not (Test-Path $script)) { throw "run-server.ps1 not found next to this script." }

$scriptArgs = "-NoProfile -NonInteractive -ExecutionPolicy Bypass -File `"$script`""

# Record the host list in a file rather than relying on the task action's
# arguments, which do not survive reliably. run-server.ps1 reads this on startup.
$hostsFile = Join-Path $PSScriptRoot "cert-hosts.txt"
if (-not [string]::IsNullOrWhiteSpace($CertHost)) {
    Set-Content -Path $hostsFile -Value $CertHost -Encoding utf8
    "Certificate hosts recorded in $hostsFile"
}

$action = New-ScheduledTaskAction -Execute "powershell.exe" `
    -Argument $scriptArgs `
    -WorkingDirectory $PSScriptRoot

# At boot, plus a repeating watchdog that resurrects a killed supervisor.
$atStartup = New-ScheduledTaskTrigger -AtStartup
$watchdog = New-ScheduledTaskTrigger -Once -At (Get-Date).AddMinutes(1) `
    -RepetitionInterval (New-TimeSpan -Minutes $WatchdogMinutes) `
    -RepetitionDuration (New-TimeSpan -Days 3650)

$settings = New-ScheduledTaskSettingsSet `
    -MultipleInstances IgnoreNew `
    -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries `
    -StartWhenAvailable `
    -RestartCount 999 -RestartInterval (New-TimeSpan -Minutes 1) `
    -ExecutionTimeLimit ([TimeSpan]::Zero)

$principal = New-ScheduledTaskPrincipal -UserId "NT AUTHORITY\SYSTEM" `
    -LogonType ServiceAccount -RunLevel Highest

Register-ScheduledTask -TaskName $TaskName `
    -Action $action -Trigger @($atStartup, $watchdog) `
    -Settings $settings -Principal $principal `
    -Description "Keeps the Document Scanner + server-side MRZ demo running on port 8080." `
    -Force | Out-Null

Start-ScheduledTask -TaskName $TaskName
"Registered and started '$TaskName'. Logs: $(Join-Path $PSScriptRoot 'logs')"
