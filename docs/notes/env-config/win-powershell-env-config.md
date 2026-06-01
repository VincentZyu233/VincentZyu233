# Windows PowerShell 环境变量配置

## 查看环境变量
```bash
gci env:
```

## 查看特定环境变量（如 PATH）
```
$env:PATH
```

## 查看配置文件 (如~/.bashrc)
```bash
cat $PROFILE
```

## 相关配置文件

- 用户环境变量：通过系统属性 -> 高级 -> 环境变量 设置
- PowerShell 配置：`$PROFILE` 路径下的配置文件

## cat替代品工具推荐

[`bat`](https://github.com/sharkdp/bat) 是 Rust 写的 `cat` 增强版，支持语法高亮等特性。

- 安装：`scoop install bat`
- 使用：`bat 文件名`

## grep替代品工具推荐

[`ripgrep`](https://github.com/BurntSushi/ripgrep) 提供 `rg` 命令，适合快速全文搜索。

- 安装：`scoop install ripgrep`
- 使用：`rg 关键词`

::: tip VS Code Terminal 小技巧
在 VS Code 的 Terminal 里使用 `rg` 搜索字符串时，输出里的蓝色文件名可以用 `Ctrl + 左键` 点击，直接跳转到 VS Code 里的对应文件。

![VS Code Terminal 中使用 rg 搜索并点击跳转](/image/ripgrep-vscode-usage.png)
:::
