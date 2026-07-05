# CMD 强制重命名和删除（文件 & 文件夹）

Windows 下 PowerShell 的 `Move-Item` / `Remove-Item -Recurse` 遇到带 `.git` 的目录或某些顽固文件时，有时会因为隐藏、只读属性或进程占用报错：

```powershell
Access to the path '.git' is denied.
DirectoryNotEmpty
PermissionDenied
```

这种情况下可以改用 Windows 原生 CMD 命令处理。

`ren` 命令对文件和文件夹都有效，语法完全一致。

## 🔹 重命名（文件 & 文件夹）

在 PowerShell 里直接调用 CMD：

```powershell
cmd /c ren koishi-plugin-onebot-info-image onebot-info-image
```

如果当前目录是：

```powershell
G:\GGames\Minecraft\shuyeyun\qq-bot\koishi-dev\koishi-dev-8\external
```

那么上面的命令会把：

```text
koishi-plugin-onebot-info-image
```

重命名为：

```text
onebot-info-image
```

## 🔹 删除文件夹

在 PowerShell 里直接调用 CMD 的 `rmdir`：

```powershell
cmd /c rmdir /s /q .\koishi-plugin-onebot-info-image\
```

参数说明：

| 参数 | 说明 |
|------|------|
| `/s` | 删除指定目录以及里面的所有文件和子目录 |
| `/q` | 安静模式，不再询问确认 |

## 🔹 删除文件

删除文件用 CMD 的 `del`：

```powershell
cmd /c del /f /q .\stubborn-file.txt
```

参数说明：

| 参数 | 说明 |
|------|------|
| `/f` | 强制删除只读文件 |
| `/q` | 安静模式，不再询问确认 |

支持通配符批量删除：

```powershell
cmd /c del /f /q .\*.log
```

## 🔹 需要管理员权限吗

先用普通 PowerShell 或 CMD 运行即可。大多数同目录重命名、删除项目目录的场景不需要管理员权限。

如果仍然提示权限不足，再尝试：

1. 关闭正在使用该目录的编辑器、终端、Git GUI、Node.js、Koishi、VS Code 等进程。
2. 重新打开一个管理员 PowerShell 或管理员 CMD。
3. 再执行同样的 `cmd /c ren ...`、`cmd /c rmdir /s /q ...` 或 `cmd /c del /f /q ...` 命令。

## 🔹 仍然删不掉时

可以先去掉只读属性（`attrib` 对文件和目录同样适用）：

```powershell
cmd /c attrib -r -s -h .\koishi-plugin-onebot-info-image\* /s /d
cmd /c rmdir /s /q .\koishi-plugin-onebot-info-image\
```

如果是文件：

```powershell
cmd /c attrib -r -s -h .\stubborn-file.txt
cmd /c del /f /q .\stubborn-file.txt
```

如果还是失败，通常就是文件被进程占用了。重启电脑后，在打开编辑器或服务之前立刻执行删除命令，成功率最高。

## 🔹 注意

`rmdir /s /q` 和 `del /f /q` 都是强删除命令，不会进入回收站。执行前务必确认路径正确，尤其不要在不确定当前位置时删除相对路径。
