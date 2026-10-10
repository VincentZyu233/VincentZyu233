# Linux Bash 快速打开文件管理器

在 Linux 终端或 WSL（Windows Subsystem for Linux）环境下，经常需要从命令行快速唤起图形界面的文件管理器查看目录。

通过在全局或用户 Bash 配置中添加快捷指令 `ee`，可实现输入 `ee` 或 `ee .` 快速打开目标文件夹。

---

## 🔹 环境差异与原生命令

不同运行环境下的图形化文件管理器启动机制不同：

1. **Linux 原生桌面环境（GNOME / KDE / XFCE 等）**：
   * 原生标准工具为 `xdg-open`（例如 `xdg-open .`），会自动调用系统默认的文件管理器（如 Nautilus、Dolphin、Thunar 等）。
2. **WSL（Windows Subsystem for Linux）**：
   * 在 WSL 终端中，通常需要调用 Windows 宿主机的 `explorer.exe`，并配合 `wslpath -w` 将 Linux 虚拟路径转为 Windows 格式路径。

---

## 🔹 快捷指令 `ee` 实现

该函数做了自动环境识别与容错处理：
- **不传参** 或 **传 `.`**：默认打开当前所在目录。
- **自动识别环境**：优先检测 Linux 桌面 `xdg-open`；若处于 WSL 环境则转调 `explorer.exe`。
- **后台异步启动**：加入 `&` 放入后台运行，避免图形程序挂起占用终端控制权。

```bash
ee() {
    local target="${1:-.}"

    if command -v xdg-open >/dev/null 2>&1; then
        xdg-open "$target" >/dev/null 2>&1 &
    elif command -v explorer.exe >/dev/null 2>&1; then
        # 兼容 WSL 环境：转换路径后唤起 Windows 资源管理器
        explorer.exe "$(wslpath -w "$target" 2>/dev/null || echo "$target")"
    else
        echo "未检测到支持的图形化文件管理器 (xdg-open / explorer.exe)" >&2
    fi
}
```

---

## 🔹 全局配置方式

为了让系统内所有用户和终端会话都能直接使用 `ee` 指令，建议将其写入**全局 Bash 设置**。

### 方式 1：推荐通过 `/etc/profile.d/` 独立脚本生效

这是 Linux 标准推荐的全局扩展方式，模块化且系统升级不会被覆盖：

```bash
# 创建全局脚本
sudo tee /etc/profile.d/ee.sh > /dev/null << 'EOF'
ee() {
    local target="${1:-.}"
    if command -v xdg-open >/dev/null 2>&1; then
        xdg-open "$target" >/dev/null 2>&1 &
    elif command -v explorer.exe >/dev/null 2>&1; then
        explorer.exe "$(wslpath -w "$target" 2>/dev/null || echo "$target")"
    else
        echo "未检测到支持的图形化文件管理器 (xdg-open / explorer.exe)" >&2
    fi
}
EOF

# 赋予可读可执行权限
sudo chmod +x /etc/profile.d/ee.sh

# 重新加载生效
source /etc/profile.d/ee.sh
```

### 方式 2：追加至全局 `/etc/bash.bashrc`

也可以直接将上述函数追加到全局 bash 配置文件末尾：

```bash
sudo nano /etc/bash.bashrc
# 或追加到当前用户专用配置文件：nano ~/.bashrc
```

---

## 🔹 使用示例

```bash
# 打开当前所在目录
ee

# 打开当前所在目录（显式传参）
ee .

# 打开上一级目录
ee ..

# 打开指定目录
ee /var/log
```

---

## 🔹 效果示例

![Debian 13 KDE 环境下配置全局 ee 脚本并运行效果](/image/explorer.shell.ee.config.debian13.kde.png)

---

## 🔹 相关链接

- [PowerShell 快速打开文件资源管理器](./powershell-explorer.md)
- [Linux Bash 环境变量与配置文件](../env-config/linux-bash-env-config.md)
