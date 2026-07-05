# Termux 基础配置

## Termux 是什么

Termux 是一款运行在 Android 上的终端模拟器 + Linux 环境，不需要 root，运行于内部存储。自带了包管理器，可以安装许多现代化的开发和系统维护工具。

## 安装 Termux

> **不要从 Google Play 安装**，Google Play 上的版本已弃用，会产生兼容性问题。

推荐安装方式：

- **GitHub Releases**：<https://github.com/termux/termux-app>
- **F-Droid**：<https://f-droid.org/zh_Hant/packages/com.termux>

## 镜像站地址

| 镜像站 | URL |
|--------|-----|
| USTC（中科大） | `https://mirrors.ustc.edu.cn/termux` |
| TUNA（清华） | `https://mirrors.tuna.tsinghua.edu.cn/termux/apt/termux-main` |

## 换源

### TUI 方式（推荐）

Termux 提供了图形界面来半自动替换镜像：

```bash
termux-change-repo
```

用方向键移动，空格选择需要更换的仓库，然后选择 `mirrors.ustc.edu.cn` 或 `mirrors.tuna.tsinghua.edu.cn` 即可。

### 命令行一键替换

**TUNA（清华）**：

```bash
sed -i 's@^\(deb.*stable main\)$@#\1\ndeb https://mirrors.tuna.tsinghua.edu.cn/termux/apt/termux-main stable main@' $PREFIX/etc/apt/sources.list
```

**USTC（中科大）**：

```bash
sed -i 's@^\(deb.*stable main\)$@#\1\ndeb https://mirrors.ustc.edu.cn/termux/apt/termux-main stable main@' $PREFIX/etc/apt/sources.list
```

### 手动修改

编辑 `$PREFIX/etc/apt/sources.list`：

```python
# The termux repository mirror
deb https://mirrors.tuna.tsinghua.edu.cn/termux/apt/termux-main stable main
```

> 使用 Termux 内置的 `nano`、`vim` 等编辑器修改，不要用 RE 管理器等外部 APP。
> Termux 会自动将 `$PREFIX` 设定为 `/data/data/com.termux/files/usr`。

## 更新软件包

```bash
pkg update && pkg upgrade
```

## 安装 fastfetch

```bash
pkg install fastfetch
```

运行 `fastfetch` 即可查看系统信息。

![Termux fastfetch 效果](/image/termux-android-bash-fastfetch-c-all.png)

## 安装并启动 SSH

安装 openssh：

```bash
pkg install openssh
```

手动启动 sshd：

```bash
sshd
```

sshd 默认监听端口 **8022**，连接时需指定端口：

```bash
ssh -p 8022 <用户名>@<手机IP>
```

查看局域网 IP：

```bash
pkg install iproute2     # 安装 ip 命令
ip a                     # 简写，等同于 ip addr
```

或使用 `ifconfig`（需安装 `net-tools`）：

```bash
pkg install net-tools
ifconfig
```

> 每次重启 Termux 后需重新运行 `sshd` 启动服务。
