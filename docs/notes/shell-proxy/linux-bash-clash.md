# Linux Bash 使用 Clash 代理

在 Linux Bash 中配置代理环境变量，可以让命令行工具通过 Clash 访问网络。

## 临时设置代理

在当前终端会话中设置代理：

```bash
export HTTP_PROXY="http://127.0.0.1:7890"
export HTTPS_PROXY="http://127.0.0.1:7890"
export ALL_PROXY="socks5://127.0.0.1:7891"
```

::: info 提示
- 默认情况下，Clash 的 HTTP 代理端口为 `7890`，SOCKS5 代理端口为 `7891`
- 如果你修改了 Clash 的端口设置，请相应调整上述命令中的端口号
- 如果 Clash 运行在其他机器上，将 `127.0.0.1` 替换为该机器的 IP 地址
:::

## 验证代理是否生效

使用 `curl` 命令测试代理：

```bash
curl -I https://www.google.com
```

如果返回响应头信息，说明代理配置成功。

测试 Git 代理：

```bash
git clone https://github.com/torvalds/linux.git
```

## 取消代理设置

在当前终端会话中取消代理：

```bash
unset HTTP_PROXY
unset HTTPS_PROXY
unset ALL_PROXY
```


## 注意事项

- ✅ 环境变量在**当前终端会话**中有效
- ✅ 关闭终端后，临时设置会失效
- ✅ 写入 `~/.bashrc` 可实现持久化
- ⚠️ 确保 Clash 正在运行且代理端口未被占用
- ⚠️ 部分程序可能不支持环境变量代理，需要单独配置
- ⚠️ 如果使用 zsh，需要将配置写入 `~/.zshrc` 而不是 `~/.bashrc`

## 相关链接

- [CMD 使用代理](./cmd-clash.md)
- [Git Bash 使用 Clash](./gitbash-clash.md)
- [PowerShell 使用 Clash](./powershell-clash.md)
- [proxychains 使用指南](./proxychains.md)
- [Docker 代理配置](./docker-proxy.md)
