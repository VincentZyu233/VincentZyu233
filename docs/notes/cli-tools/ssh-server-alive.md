# SSH Server Alive 保持连接

## 🔹 Windows PowerShell

编辑 `$PROFILE`：

```powershell
nano $PROFILE
```

加入以下函数：

```powershell
function sshsa {
    param(
        [Parameter(Mandatory=$false, Position=0)]
        [string]$Target,

        [Parameter(Mandatory=$false, Position=1)]
        [int]$Port = 22
    )

    if ($Target -eq "-h" -or $Target -eq "--help" -or [string]::IsNullOrEmpty($Target)) {
        Write-Host "`nUsage: sshsa <user@host> [port]" -ForegroundColor Yellow
        Write-Host "Example: sshsa root@1.1.1.1 2222"
        Write-Host "Options: Defaults to port 22 if not specified. Includes 60s keep-alive.`n"
        return
    }

    ssh -p $Port -o ServerAliveInterval=60 -o ServerAliveCountMax=3 $Target
}
```

生效并测试：

```powershell
. $PROFILE
sshsa --help
```

## 🔹 Linux Bash

编辑 `~/.bashrc`：

```bash
nano ~/.bashrc
```

加入以下函数：

```bash
sshsa() {
    if [[ "$1" == "-h" ]] || [[ "$1" == "--help" ]] || [[ -z "$1" ]]; then
        echo -e "\nUsage:  sshsa <user@host> [port]"
        echo -e "Example: sshsa root@1.1.1.1 2222"
        echo -e "Note:    Defaults to port 22. Sends heartbeats every 60s.\n"
        return 0
    fi

    local TARGET=$1
    local PORT=${2:-22}

    echo "Connecting to $TARGET on port $PORT with keep-alive..."
    ssh -p "$PORT" -o ServerAliveInterval=60 -o ServerAliveCountMax=3 "$TARGET"
}
```

生效并测试：

```bash
. ~/.bashrc
sshsa --help
```
