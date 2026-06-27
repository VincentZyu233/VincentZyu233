# dust - du 的 Rust 替代品

> <https://github.com/bootandy/dust>

## 安装

- **Debian/Ubuntu**：`apt install du-dust`
- **Windows**：`scoop install dust`
- **Arch Linux**：`pacman -Syu dust`
- **GitHub Releases**：下载二进制放到 PATH 即可

## 用法

| 命令 | 说明 |
|------|------|
| `dust` | 直接跑，显示当前目录最大文件/目录 |
| `dust /path/to/somewhere` | 分析指定路径 |
| `dust -x` | 不跨文件系统，跳过 `/proc` `/sys` 等挂载点 |
| `dust -I "\.mp4$"` | 排除匹配正则的文件，这里排除所有 `.mp4` |

## 最终效果

dust 会智能排序并显示最大的目录和文件，彩色条直观展示各目录的磁盘占用占比。

![dust 扫描 C 盘示例](/image/du-dust-scanning-C-drive-in-windows11-terminal.png)
