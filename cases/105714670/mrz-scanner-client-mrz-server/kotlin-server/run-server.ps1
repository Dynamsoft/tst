<#
    OPTIONAL — REFERENCE ONLY. You do NOT need this script to run or test the
    sample. To try the demo, just build and run the jar directly:
        java -jar target\mds-mrz-kotlin-server-1.0.0.jar
    This supervisor is included only as an example of how you *could* keep the
    demo alive unattended on a dedicated Windows box. It is not part of the MRZ
    solution and can be ignored (or deleted) for evaluation and testing.

    Supervisor for the MRZ demo server: restarts the jar whenever it exits, for
    any reason — killed, crashed, or OOM.

    Two layers, because a supervisor can be killed too:
      1. This loop restarts the jar.
      2. The "MDS-MRZ-Demo" scheduled task restarts this loop (at boot, and on a
         repeating trigger that is a no-op while it is already running).

    Run directly for an interactive session, or leave it to the scheduled task.
    See install-service.ps1 for registration and removal.
#>
[CmdletBinding()]
param(
    # Hosts the dev certificate must cover, beyond localhost and any detected
    # site-local IPv4. Anything you type in the address bar has to be in here, or
    # mobile browsers reject the certificate outright. Deliberately not defaulted
    # to a specific machine — pass it here or via install-service.ps1 -CertHost.
    [string] $CertHost = $env:APP_CERT_HOST,

    # Path to java.exe. Left empty on purpose so the sample stays machine-
    # independent: when blank it is resolved at startup from JAVA_HOME, then
    # PATH, then the common Windows JDK install roots. Pass a path to override.
    [string] $Java = "",

    [string] $Jar = "target\mds-mrz-kotlin-server-1.0.0.jar",

    # Restarts are delayed a little, and back off if the jar keeps dying fast, so
    # a broken build does not spin the CPU.
    [int] $MinBackoffSeconds = 2,
    [int] $MaxBackoffSeconds = 60
)

$ErrorActionPreference = "Stop"

$root = $PSScriptRoot
$jarPath = Join-Path $root $Jar

# Fall back to cert-hosts.txt. Arguments in a Scheduled Task action have proven
# unreliable to pass through, so the installed host list lives in a file that is
# read the same way however the supervisor was started.
if ([string]::IsNullOrWhiteSpace($CertHost)) {
    $hostsFile = Join-Path $root "cert-hosts.txt"
    if (Test-Path $hostsFile) {
        $CertHost = (Get-Content $hostsFile | Where-Object { $_.Trim() -ne "" } | Select-Object -First 1).Trim()
    }
}
$logDir = Join-Path $root "logs"
$supervisorLog = Join-Path $logDir "supervisor.log"
$serverLog = Join-Path $logDir "server.log"
$serverLogPrev = Join-Path $logDir "server.prev.log"

if (-not (Test-Path $logDir)) { New-Item -ItemType Directory -Path $logDir | Out-Null }

function Write-Log {
    param([string] $Message)
    $line = "{0}  {1}" -f (Get-Date -Format "yyyy-MM-dd HH:mm:ss"), $Message
    Add-Content -Path $supervisorLog -Value $line -Encoding utf8
    Write-Output $line
}

# Locate a JDK without hard-coding a machine-specific path. Order: an explicit
# -Java argument, then JAVA_HOME, then java on PATH, then the newest java.exe
# under the usual Windows JDK install roots.
function Resolve-Java {
    param([string] $Explicit)

    if (-not [string]::IsNullOrWhiteSpace($Explicit)) { return $Explicit }

    if (-not [string]::IsNullOrWhiteSpace($env:JAVA_HOME)) {
        $fromHome = Join-Path $env:JAVA_HOME "bin\java.exe"
        if (Test-Path $fromHome) { return $fromHome }
    }

    $onPath = Get-Command java.exe -ErrorAction SilentlyContinue
    if ($onPath) { return $onPath.Source }

    $roots = @(
        "$env:ProgramFiles\Eclipse Adoptium",
        "$env:ProgramFiles\Java",
        "$env:ProgramFiles\Microsoft\jdk",
        "$env:ProgramFiles\Zulu",
        "$env:ProgramFiles\Amazon Corretto",
        "${env:ProgramFiles(x86)}\Eclipse Adoptium",
        "${env:ProgramFiles(x86)}\Java"
    ) | Where-Object { $_ -and (Test-Path $_) }

    $candidates = foreach ($r in $roots) {
        Get-ChildItem -Path $r -Recurse -Filter java.exe -ErrorAction SilentlyContinue |
            Where-Object { $_.FullName -like "*\bin\java.exe" }
    }
    if ($candidates) {
        $newest = $candidates | Sort-Object {
            try { [version](($_.VersionInfo.ProductVersion -replace '[^0-9.].*$', '').TrimEnd('.')) }
            catch { [version]'0.0' }
        } -Descending | Select-Object -First 1
        return $newest.FullName
    }

    return $null
}

$Java = Resolve-Java $Java
if ([string]::IsNullOrWhiteSpace($Java) -or -not (Test-Path $Java)) {
    Write-Log "FATAL no Java runtime found. Install a JDK 21+ and set JAVA_HOME or add java to PATH, or pass -Java 'C:\path\to\bin\java.exe'."
    exit 1
}
Write-Log "using java at $Java"
if (-not (Test-Path $jarPath)) {
    Write-Log "FATAL jar not found at $jarPath - run 'mvn package' first"
    exit 1
}

# Exactly one supervisor. The scheduled task's IgnoreNew policy covers the
# scheduled path; this also covers someone running the script by hand.
$mutex = New-Object System.Threading.Mutex($false, "Global\MDS-MRZ-Demo-Supervisor")
if (-not $mutex.WaitOne(0)) {
    Write-Log "another supervisor is already running - exiting"
    exit 0
}

$env:APP_CERT_HOST = $CertHost
Write-Log "supervisor starting (cert hosts: $CertHost)"

# If this supervisor was killed and restarted, the jar it launched outlives it and
# still holds port 8080 — a fresh jar would fail to bind and we would spin. Adopt
# by replacement: the supervisor owns the only instance.
Get-CimInstance Win32_Process -Filter "Name = 'java.exe'" |
    Where-Object { $_.CommandLine -like "*mds-mrz-kotlin-server*" } |
    ForEach-Object {
        Write-Log "stopping orphaned server pid $($_.ProcessId) from a previous supervisor"
        Stop-Process -Id $_.ProcessId -Force -ErrorAction SilentlyContinue
    }

$backoff = $MinBackoffSeconds
while ($true) {
    # Keep one previous run's output; the current run overwrites server.log
    # because Start-Process cannot append.
    if (Test-Path $serverLog) { Move-Item -Path $serverLog -Destination $serverLogPrev -Force }

    $startedAt = Get-Date
    Write-Log "starting server"
    $proc = Start-Process -FilePath $Java `
        -ArgumentList @("-jar", $jarPath) `
        -WorkingDirectory $root `
        -NoNewWindow -PassThru `
        -RedirectStandardOutput $serverLog `
        -RedirectStandardError (Join-Path $logDir "server.err.log")
    Write-Log "server pid $($proc.Id)"

    $proc.WaitForExit()
    $ranFor = [int]((Get-Date) - $startedAt).TotalSeconds
    Write-Log "server pid $($proc.Id) exited code=$($proc.ExitCode) after ${ranFor}s"

    # A run that stayed up is a healthy run: reset the backoff. A run that died
    # immediately probably will again, so wait longer each time.
    if ($ranFor -ge 60) {
        $backoff = $MinBackoffSeconds
    } else {
        $backoff = [Math]::Min($backoff * 2, $MaxBackoffSeconds)
    }

    Write-Log "restarting in ${backoff}s"
    Start-Sleep -Seconds $backoff
}
