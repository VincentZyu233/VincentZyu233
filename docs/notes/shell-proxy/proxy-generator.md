# 代理配置生成器

输入协议、IP 和端口，自动生成 CMD、PowerShell、Git Bash、Linux Bash 的代理环境变量和持久化指令。

> 如果 Clash 不在本机运行，可以把 IP 改成局域网内运行代理的机器地址，例如 `192.168.31.233`。

<GenerateProxyConfig />

## 验证代理是否生效

```bash
curl -I https://www.google.com
```

## 相关链接

- [CMD 使用代理](./cmd-clash.md)
- [Git Bash 使用 Clash](./gitbash-clash.md)
- [PowerShell 使用 Clash](./powershell-clash.md)
- [Linux Bash 使用 Clash](./linux-bash-clash.md)
