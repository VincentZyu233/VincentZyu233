# PowerShell 快速打开文件资源管理器

在日常终端开发和文件整理中，经常需要从当前的控制台跳转到图形化的 Windows 文件资源管理器（File Explorer）。

通过配置轻量别名函数 `ee`，即可实现输入 `ee` 或 `ee .` 一秒直达。

---

## 🔹 原生命令与局限

在 PowerShell 中，原生打开文件资源管理器的方式主要有两种：

```powershell
# 方式 1：调用系统程序
explorer .

# 方式 2：使用 PowerShell 内置 cmdlet 别名（Invoke-Item）
ii .
```

::: tip 局限与痛点
- 字符输入相对繁琐，频繁使用不够顺手。
- `explorer.exe` 在接收某些特殊相对路径（例如 `explorer ..` 或多层相对路径）时，有时无法准确识别目标路径，容易退回并定位到“此电脑”或“文档”目录。
:::

---

## 🔹 快捷指令 `ee` 实现

我们通过封装一个名为 `ee` 的 PowerShell 函数：
- **不传参** 或 **传 `.`**：默认打开当前工作目录。
- **传相对路径/绝对路径**：使用 `Resolve-Path` 规整为绝对物理路径，确保 100% 准确唤起目标文件夹。

```powershell
function ee {
    param(
        [Parameter(Mandatory=$false, Position=0)]
        [string]$Path = "."
    )

    $target = if ([string]::IsNullOrWhiteSpace($Path)) { "." } else { $Path }
    $resolved = (Resolve-Path -Path $target -ErrorAction SilentlyContinue).Path

    if (-not $resolved) {
        $resolved = $target
    }

    explorer.exe $resolved
}
```

---

## 🔹 持久化配置

为了在每次打开 PowerShell 时都能直接使用该快捷指令，建议将其添加到 `$PROFILE` 配置文件中。

### 1. 编辑配置文件

在终端中打开你的 `$PROFILE`：

```powershell
notepad $PROFILE
```

将上述 `function ee` 代码粘贴至文件末尾并保存。

### 2. 重新加载生效

在当前会话中运行以下命令重新加载配置文件（或新开一个 PowerShell 终端窗口）：

```powershell
. $PROFILE
```

---

## 🔹 使用示例

```powershell
# 打开当前所在目录
ee

# 打开当前所在目录（显式传参）
ee .

# 打开上一级目录
ee ..

# 打开相对子目录
ee ./src

# 打开绝对路径
ee D:\Projects
```

---

## 🔹 效果示例

![Windows 11 PowerShell 配置 ee 指令并运行效果](/image/explorer.shell.ee.config.windows11.png)

---

## 🔹 相关链接

- [Linux Bash 快速打开文件管理器](./linux-bash-explorer.md)
- [Windows PowerShell 环境变量与配置文件](../env-config/win-powershell-env-config.md)
