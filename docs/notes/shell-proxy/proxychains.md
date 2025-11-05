# proxychains 使用指南
proxychains 是一个在 Linux/Unix 系统中强制应用程序通过代理连接的工具。它可以让任何程序都通过代理访问网络，而无需程序本身支持代理设置。proxychains 是一个在 Linux/Unix 系统中强制应用程序通过代理连接的工具。它可以让任何程序都通过代理访问网络，而无需程序本身支持代理设置。

> 在 Debian系的Linux发行版中，`proxychains` 和 `proxychains4` 是两个不同的软件包：

### proxychains（旧版本）

- 📦 **包名**：`proxychains`
- 🆕 **版本**：3.x（旧版本，已停止维护）
- 📍  **命令**：`proxychains`
- ⚠️ **状态**：不再维护，可能存在兼容性问题

### proxychains-ng / proxychains4（新版本）

- 📦 **包名**：`proxychains4` 或 `proxychains-ng`

- 🆕 **版本**：4.x（新版本，持续维护中）

- 📍 **命令**：`proxychains4`

- ✅ **状态**：活跃维护，功能更强，bug 更少  - 支持更多的代理类型

- 🎯 **优势**：  - 更好的 DNS 解析处理

  - 支持更多的代理类型  

  - 更好的 DNS 解析处理 

  - 修复了许多旧版本的 bug

  - 支持更多现代应用程序
  
::: tip 推荐
**强烈建议使用 `proxychains4`（新版本）**，它更稳定、功能更强大，且持续维护更新。
:::

> 其他的linux发行版应该也是分两个版本的。但是我基本上就只用过debian系的(


## 安装 proxychains## 安装 proxychains
### 安装 proxychains4（推荐）
在 Debian系的Linux发行版中：
```bash
sudo apt install proxychains proxychains4
```

## 配置代理
安装后使用 `proxychains4` 命令。编辑 proxychains 的配置文件：

```bash
sudo nano /etc/proxychains.conf
# 然后按下多次键盘右边的PageDown 翻到最底下
```

在最下方修改配置：
```toml
[ProxyList]
# 添加 socks5 代理
socks5 127.0.0.1 7891
# 或者 http代理
# http 127.0.0.1 7890
```


## 基本使用方法
使用 proxychains4 运行任何命令，让其通过代理访问网络：
```bash
proxychains4 curl -I https://www.google.com
```

## 使用 proxychains 启动 Bash
可以启动一个完全代理化的 Bash 会话，在这个会话中运行的所有命令都会自动通过代理：

```bash
proxychains4 bash
```
进入代理化的 Bash 后，所有命令都会自动使用代理：

```bash
curl -I https://www.google.com
wget https://example.com/file.zip
git clone https://github.com/xxx/xxx.git
```

## 使用 proxychains 启动 Screen 会话

如果需要在后台运行长期任务，可以结合 `screen` 使用：

```bash
# 创建一个名为 foo 的代理化 screen 会话
proxychains screen -S foo
# then do sth in screen session:
curl -I https://www.google.com
```

## 配置选项

### 动态链（推荐）

在配置文件中启用 `dynamic_chain`，可以自动跳过不可用的代理：

```conf
# 注释掉 strict_chain
# strict_chain

# 启用 dynamic_chain
dynamic_chain
```

### 静默模式

如果不想看到 proxychains 的调试信息，可以启用静默模式：

```conf
# 在配置文件中添加
quiet_mode
```

或者在命令行中使用 `-q` 参数：

```bash
proxychains4 -q curl -I https://www.google.com
```

## 常见使用场景

### 1. 通过代理克隆 GitHub 仓库

```bash
proxychains4 git clone https://github.com/xxx/xxx.git
```

### 2. 通过代理下载文件

```bash
proxychains4 wget https://example.com/file.tar.gz
```

### 3. 通过代理运行 Python 脚本

```bash
proxychains4 python3 script.py
```

### 4. 通过代理运行 Docker 命令

```bash
proxychains4 docker pull nginx:latest
```

## 注意事项

- ✅ proxychains 仅适用于 **Linux/Unix 系统**，不支持 Windows
- ✅ 适用于几乎所有命令行程序
- ✅ 可以与 `screen`、`tmux` 等终端复用器结合使用
- ⚠️ 某些使用静态链接的程序可能无法被代理
- ⚠️ UDP 流量可能无法被正确代理（取决于代理类型）
- ⚠️ 确保 Clash 的 SOCKS5 端口已启用（通常为 7891）

## 故障排查

### 代理不生效

检查配置文件中的代理地址和端口是否正确：

```bash
cat /etc/proxychains.conf | grep -A 5 "\[ProxyList\]"
```

### 连接超时

确保 Clash 正在运行：

```bash
curl -I http://127.0.0.1:7890
```

### 查看详细日志

去掉 `quiet_mode`，查看 proxychains 的详细输出：

```bash
proxychains4 curl -I https://www.google.com
```

## 相关链接

- [CMD 使用 Clash](./cmd-clash.md)
- [Git Bash 使用 Clash](./gitbash-clash.md)
- [PowerShell 使用 Clash](./powershell-clash.md)
