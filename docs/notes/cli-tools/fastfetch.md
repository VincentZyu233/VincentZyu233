# fastfetch 简单说明

> <https://github.com/fastfetch-cli/fastfetch>

## 🔹 安装

- **Windows**：`scoop install fastfetch`
- **Debian/Ubuntu**：`apt install fastfetch`
- **Termux**：`pkg install fastfetch`
- **Arch Linux**：`pacman -Syu fastfetch`
- **GitHub Releases手动**：下载二进制并配置好环境变量并运行即可

## 🔹 查看所有信息

```bash
fastfetch -c all
```

## 🔹 配置

生成默认配置：

```bash
fastfetch --gen-config
```

默认配置文件位置：`~/.config/fastfetch/config.jsonc`

这里的 `~` 会展开为当前用户的家目录。

> **💡 提示**：如果你连接 GitHub 有网络困难（智能提示不生效），可将配置文件中的 `$schema` 的值替换为 `https://gitee.com/carterl/fastfetch/raw/dev/doc/json_schema.json`

如果想多显示一行备注，可以在根对象的 `modules` 数组里加一个 `custom` 模块：

```jsonc
{
  "type": "custom",
  "key": "Qwq",
  "format": "Awa"
}
```

这段配置放在 `modules` 数组内、想让它出现的位置即可。比如插在分隔线和 OS 行之间，完整的 `config.jsonc` 就是这样（已转为纯 JSON 便于阅读）：

```json
{
  "$schema": "https://github.com/fastfetch-cli/fastfetch/raw/master/doc/json_schema.json",
  "modules": [
    "title",
    "separator",
    {
      "type": "custom",
      "key": "Qwq",
      "format": "Awa"
    },
    "os",
    "host",
    "kernel",
    "uptime",
    "packages",
    "shell",
    "display",
    "de",
    "wm",
    "wmtheme",
    "theme",
    "icons",
    "font",
    "cursor",
    "terminal",
    "terminalfont",
    "cpu",
    "gpu",
    "memory",
    "swap",
    "disk",
    "localip",
    "battery",
    "poweradapter",
    "locale",
    "break",
    "colors"
  ]
}
```

最终 `fastfetch` 输出效果中，分隔线下面会多一行：

```
Qwq: Awa
```

## 🔹 相关链接

- [fastfetch GitHub 仓库 [https://github.com/fastfetch-cli/fastfetch] ](https://github.com/fastfetch-cli/fastfetch)
