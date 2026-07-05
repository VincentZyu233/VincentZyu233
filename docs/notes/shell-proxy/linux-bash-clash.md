# Linux Bash 使用 Clash 代理

在 Linux Bash 中配置代理环境变量，可以让命令行工具通过 Clash 访问网络。

## 🔹 临时设置代理

在当前终端会话中设置代理：

> 想自动生成不同 Shell 的代理命令，可以使用：[代理配置生成器](./proxy-generator)。

```bash
export HTTP_PROXY="http://127.0.0.1:7890"
export HTTPS_PROXY="http://127.0.0.1:7890"
export ALL_PROXY="socks5://127.0.0.1:7891"
```

::: info 建议
- 默认情况下，我用的 Clash Cli 的 HTTP 代理端口为 `7890`，SOCKS5 代理端口为 `7891`
- 如果你修改了 Clash 的端口设置，请相应调整上述命令中的端口号
- 如果 Clash 运行在其他机器上，将 `127.0.0.1` 替换为该机器的 IP 地址
:::

> 建议优先使用 HTTP 协议。个人经验是命令行工具里 HTTP 代理通常比 SOCKS5 更稳定，兼容性也更好。

> 当然你也可以使用其他 IP 的代理，比如局域网内另一台机器的代理：`http://192.168.31.233:7890`。

```bash
export HTTP_PROXY="http://192.168.31.233:7890"
export HTTPS_PROXY="http://192.168.31.233:7890"
export ALL_PROXY="socks5://192.168.31.233:7891"
```

## 🔹 验证代理是否生效

使用 `curl` 命令测试代理：

```bash
curl -I https://www.google.com
```

如果返回响应头信息，说明代理配置成功。

测试 Git 代理：

```bash
git clone https://github.com/torvalds/linux.git
```

## 🔹 取消代理设置

在当前终端会话中取消代理：

```bash
unset HTTP_PROXY
unset HTTPS_PROXY
unset ALL_PROXY
```


## 🔹 注意事项

- ✅ 环境变量在**当前终端会话**中有效
- ✅ 关闭终端后，临时设置会失效
- ✅ 写入 `~/.bashrc` 可实现持久化
- ⚠️ 确保 Clash 正在运行且代理端口未被占用
- ⚠️ 部分程序可能不支持环境变量代理，需要单独配置
- ⚠️ 如果使用 zsh，需要将配置写入 `~/.zshrc` 而不是 `~/.bashrc`

## 🔹 相关链接

- [CMD 使用代理](./cmd-clash.md)
- [Git Bash 使用 Clash](./gitbash-clash.md)
- [PowerShell 使用 Clash](./powershell-clash.md)
- [proxychains 使用指南](./proxychains.md)
- [Docker 代理配置](./docker-proxy.md)
