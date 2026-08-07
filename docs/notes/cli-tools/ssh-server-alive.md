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

## 🔹 远端 Linux 终端中文显示问题修复

::: tip 终端中的中文显示异常

以下操作在 SSH 登录后的 Linux 服务器上执行。

如果 `ls` 显示中文文件名时出现 `\345...` 一类的转义字节，或 `cat`、`nano` 等命令输出中文内容时显示异常，通常是远端登录环境使用了 `C/POSIX` locale。

编辑当前用户的 `~/.profile`：

```bash
nano ~/.profile
```

加入以下配置：

```bash
export LANG=C.UTF-8
```

当前会话立即生效并确认 locale：

```bash
source ~/.profile
locale
```

重新 SSH 登录后会自动生效。

该配置只影响当前用户的登录环境，不会修改 systemd 服务或系统级 locale。

:::
