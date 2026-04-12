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
