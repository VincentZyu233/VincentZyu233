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

## SSH 免密登录配置（可选，推荐）

配置后 `scp` / `ssh` 不再需要输入密码，部署脚本可全自动运行。

### Windows PowerShell

> ⚠️ PowerShell 管道会将公钥内容和 SSH 密码提示混淆，**不要使用 `type \| ssh` 管道**。下面是最稳的方式：

```powershell
# 1. 生成密钥（已有可跳过）
ssh-keygen -t ed25519 -C "YourName-Win"

# 2. 先读公钥到变量，再通过 echo 上传到服务器（需输入一次密码）
$key = Get-Content "$env:USERPROFILE\.ssh\id_ed25519.pub"
ssh -p <PORT> <USER>@<IP> "mkdir -p ~/.ssh && echo '$key' >> ~/.ssh/authorized_keys && chmod 600 ~/.ssh/authorized_keys"

# 3. 验证免密登录（不会再要密码即成功）
ssh -p <PORT> <USER>@<IP> "echo '✅ SSH 免密登录配置成功！'"
```

### Windows CMD

```cmd
REM 1. 生成密钥（已有可跳过）
ssh-keygen -t ed25519 -C "YourName-Win"

REM 2. 上传公钥到服务器（需输入一次密码）
type "%USERPROFILE%\.ssh\id_ed25519.pub" | ssh -p <PORT> <USER>@<IP> "mkdir -p ~/.ssh && cat >> ~/.ssh/authorized_keys && chmod 600 ~/.ssh/authorized_keys"

REM 3. 验证免密登录
ssh -p <PORT> <USER>@<IP> "echo '✅ SSH 免密登录配置成功！'"
```

### Linux / WSL

```bash
# 1. 生成密钥（已有可跳过）
ssh-keygen -t ed25519 -C "YourName-Linux"

# 2. 一键上传公钥（需输入一次密码）
ssh-copy-id -p <PORT> <USER>@<IP>

# 3. 验证免密登录
ssh -p <PORT> <USER>@<IP> "echo '✅ SSH 免密登录配置成功！'"
```

> 🔐 建议使用 `ed25519` 算法（比 RSA 更安全且密钥更短）。私钥文件权限应为 `600`。

---
