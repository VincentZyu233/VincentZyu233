# WSL 安装 Ubuntu 24.04 并导出到 E 盘

Windows 11 自带的 WSL 默认会把发行版装到 C 盘，时间长了 C 盘容易被撑爆。这里记录一下怎么把 Ubuntu 24.04 装到 E 盘去。

## 🔹 安装前准备

如果你有代理，先设置好，避免下载失败：

::: tip 可选步骤
如果你不需要代理，可以跳过这一步。
:::

```powershell
$Env:HTTP_PROXY = "http://127.0.0.1:7890"
$Env:HTTPS_PROXY = "http://127.0.0.1:7890"

# 测试代理是否生效
Invoke-WebRequest -Uri "https://www.google.com" -Method Head -UseBasicParsing
```

## 🔹 安装到 E 盘

```powershell
# 1. 安装 Ubuntu 24.04（只下载安装，不启动）
wsl --install Ubuntu-24.04 --no-launch --web-download

# 2. 导出到 E 盘，然后从 C 盘注销，再从 E 盘导入
wsl --export Ubuntu-24.04 E:\wsl\ubuntu\ubuntu24.tar
wsl --unregister Ubuntu-24.04
wsl --import Ubuntu-24.04 E:\wsl\ubuntu E:\wsl\ubuntu\ubuntu24.tar --version 2
```

::: warning
`--import` 导入后默认登录用户是 **root**。如果不想用 root，记得下一步改一下。
:::

## 🔹 设置默认用户

```powershell
# 将 <你的用户名> 替换成你实际的用户名
ubuntu2404 config --default-user <你的用户名>
```

然后启动并进入：

```powershell
wsl -d Ubuntu-24.04
```

## 🔹 禁用宿主机环境变量

WSL 默认会继承 Windows 的环境变量，有时候会导致 PATH 混乱。建议关掉。

先在 WSL 里面编辑配置文件：

```bash
sudo nano /etc/wsl.conf
```

写入以下内容：

```toml
[interop]
enabled = false
appendWindowsPath = false
```

然后在宿主机（PowerShell）重启 WSL：

```powershell
wsl --shutdown
wsl --list
wsl -d Ubuntu-24.04
```

重启后再 `echo $PATH` 看看，应该就干净了。

## 🔹 换源

Ubuntu 24.04 更换国内镜像源可以显著提升软件包下载速度。

> 👉 [Ubuntu 换源](/notes/switch-source/ubuntu)

## 🔹 安装 fastfetch

```bash
sudo apt install fastfetch -y
fastfetch
```

![WSL Ubuntu 24.04 fastfetch](/image/WSL.Ubuntu.fastfetch.png)
