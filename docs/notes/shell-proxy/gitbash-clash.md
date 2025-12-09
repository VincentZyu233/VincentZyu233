# Git Bash 使用 Clash 代理

## 设置代理
```bash
export HTTP_PROXY="http://127.0.0.1:7890"
export HTTPS_PROXY="http://127.0.0.1:7890"
```

::: info 提示
默认情况下，Clash 的本地代理端口为 `7890`。如果你修改了 Clash 的端口设置，请相应调整上述命令中的端口号。
:::

::: tip 提示
Git Bash 使用的是 Linux/Unix 风格的环境变量设置方式，与 Windows CMD 不同。Git Bash 使用的是 Linux/Unix 风格的环境变量设置方式，与 Windows CMD 不同。
:::

## 验证代理是否生效
```bash
curl -I https://www.google.com
```

```bash
git clone https://github.com/VincentZyu233/VincentZyu233
```


## 配置 Git 全局代理

```bash
# HTTP 代理
git config --global http.proxy http://127.0.0.1:7890
git config --global https.proxy http://127.0.0.1:7890

# SOCKS5 代理（推荐）# SOCKS5 代理（推荐）
git config --global http.proxy socks5://127.0.0.1:7891
git config --global https.proxy socks5://127.0.0.1:7891

## 取消 Git 代理## 取消 Git 代理
git config --global --unset http.proxygit config --global --unset http.proxy
git config --global --unset https.proxygit config --global --unset https.proxy
```

## 针对特定域名配置代理

如果只想为 GitHub 配置代理：

```bash
# 只为 GitHub 配置代理
git config --global http.https://github.com.proxy socks5://127.0.0.1:7891
```

取消特定域名代理：

```bash
git config --global --unset http.https://github.com.proxy
```


## 持久化配置

如果希望每次打开 Git Bash 都自动设置代理，可以将代理命令添加到 `~/.bashrc` 文件中：

```bash
echo 'export HTTP_PROXY="http://127.0.0.1:7890"' >> ~/.bashrc
echo 'export HTTPS_PROXY="http://127.0.0.1:7890"' >> ~/.bashrc
source ~/.bashrc
```
## 注意事项

- ✅ 环境变量在**当前终端会话**中有效- ✅ 环境变量在**当前终端会话**中有效
- ✅ 关闭终端后，临时设置会失效- ✅ 关闭终端后，临时设置会失效
- ✅ Git 全局配置会持久保存- ✅ Git 全局配置会持久保存
- ⚠️ 确保 Clash 正在运行且代理端口正确- ⚠️ 确保 Clash 正在运行且代理端口正确

## 相关链接

- [CMD 使用 代理](./cmd-clash.md)
- [Git Bash 使用 Clash](./gitbash-clash.md)
- [PowerShell 使用 Clash](./powershell-clash.md)
- [proxychains 使用指南](./proxychains.md)
- [Docker 代理配置](./docker-proxy.md)