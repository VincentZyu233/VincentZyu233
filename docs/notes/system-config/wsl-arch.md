# WSL 安装 Arch Linux 并导出到 E 盘

Arch Linux 不在 WSL 官方应用商店里，需要用第三方打包的 [ArchWSL](https://github.com/yuk7/ArchWSL)。这里记录一下安装、换源、装工具的完整流程。

## 安装

用 PowerShell 操作：

```powershell
# 设置代理（可选）
$Env:HTTP_PROXY = "http://127.0.0.1:7890"
$Env:HTTPS_PROXY = "http://127.0.0.1:7890"

# 下载 ArchWSL
wget -O Arch.zip https://github.com/yuk7/ArchWSL/releases/download/26.4.2.0/Arch.zip

# 解压并运行 exe（会自动注册到 WSL）
7z x Arch.zip
./Arch.exe
```

装好后启动：

```powershell
wsl -d Arch
```

## 换源

国内直接 `pacman` 会很慢，建议先换源。

> 👉 [Arch Linux 换源](/notes/switch-source/arch)

换源后执行：

```bash
pacman -Syyu
```

## 初始化 pacman 并更新

新装的 Arch 需要先初始化 keyring：

```bash
pacman-key --init
pacman-key --populate archlinux
pacman -Syyu --noconfirm
```

## 安装常用工具

```bash
pacman -Syu fish curl git proxychains-ng fastfetch
```

### 设置 fish 为默认 shell

```bash
# 确认 fish 的路径
whereis fish

# 切换默认 shell
chsh -s /usr/bin/fish
```

## 配置 proxychains

```bash
sudo nano /etc/proxychains.conf
```

在末尾加上（宿主机 IP 和端口根据实际情况改）：

```
http 172.19.176.1 7890
```

## 安装 Paru（AUR 助手）

先创建一个普通用户（不建议用 root 编译 AUR 包）：

```bash
# 创建用户并加入 wheel 组
useradd -m -G wheel -s /usr/bin/fish vincentzyu

# 设置密码
passwd vincentzyu

# 允许 wheel 组使用 sudo
EDITOR=nano visudo
```

在 `visudo` 里找到这一行，去掉前面的 `#`：

```
%wheel ALL=(ALL:ALL) ALL
```

然后切换到新用户编译 Paru：

```bash
su - vincentzyu
mkdir SSoftwareFiles && cd SSoftwareFiles

# 克隆 Paru（用 proxychains 走代理）
proxychains4 git clone https://aur.archlinux.org/paru.git
cd paru

# 安装 rust 编译环境
sudo pacman -Syu rustup
proxychains4 rustup default stable

# 编译安装
makepkg -si
```

验证安装：

```bash
which paru
paru --version

# 测试一下能不能装 AUR 包
paru -S winload-rust-bin
```

## 禁用宿主机环境变量

和 Ubuntu 一样，建议关掉 Windows 的环境变量继承。

在 WSL Arch 里编辑：

```bash
sudo nano /etc/wsl.conf
```

写入：

```toml
[interop]
enabled = false
appendWindowsPath = false
```

然后在宿主机（PowerShell）重启 WSL：

```powershell
wsl --shutdown
wsl --list
wsl -d Arch
```

## 可选：安装 Fisher 和 Tide 主题

Fish 开箱即用体验已经很好，但如果你想要更强大的插件管理和漂亮的提示符，可以装个插件管理器。

### Fisher

Fisher 是一个极其轻量的 fish 插件管理器，装完几乎零开销。

```bash
# 前面已经配好了 proxychains，用代理来安装
proxychains4 curl -sL https://raw.githubusercontent.com/jorgebucaran/fisher/main/functions/fisher.fish | source && fisher install jorgebucaran/fisher
```

### Tide

Tide 是一个基于 Fisher 的提示符配置工具，提供大量预设主题，交互式配置非常方便。

```bash
fisher install IlanCosman/tide@v6
```

装完后终端会自动进入 Tide 的交互配置向导，选你喜欢的样式一路确认就行。以后想改可以随时运行 `tide configure` 重新配置。

![WSL Arch Linux fastfetch](/image/WSL.Arch.fastfetch.png)
