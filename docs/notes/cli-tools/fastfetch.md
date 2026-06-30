# fastfetch 简单说明

> <https://github.com/fastfetch-cli/fastfetch>

## 安装

- **Windows**：`scoop install fastfetch`
- **Debian/Ubuntu**：`apt install fastfetch`
- **Termux**：`pkg install fastfetch`
- **Arch Linux**：`pacman -Syu fastfetch`
- **GitHub Releases手动**：下载二进制并配置好环境变量并运行即可

## 查看所有信息

```bash
fastfetch -c all
```

## 配置

生成默认配置：

```bash
fastfetch --gen-config
```

默认配置文件位置：`~/.config/fastfetch/config.jsonc`

如果想多显示一行备注，可以在 `modules` 里加一个 `custom` 模块：

```jsonc
{
  "type": "custom",
  "key": "备注",
  "format": "xxx"
}
```

## 相关链接

- [fastfetch GitHub 仓库](https://github.com/fastfetch-cli/fastfetch)
