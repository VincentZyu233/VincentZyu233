# CMD 使用 Clash 代理# CMD 使用 代理

## 设置代理

```cmd
set http_proxy=http://127.0.0.1:7890
set https_proxy=http://127.0.0.1:7890
``````

::: info 提示
默认情况下，Clash 的本地代理端口为 `7890`。如果你修改了 Clash 的端口设置，请相应调整上述命令中的端口号。
:::

::: tip 提示
CMD 使用 `set` 命令来设置环境变量，语法为 `set 变量名=值`，这是 Windows 命令提示符的传统语法。
:::

## 验证代理是否生效

```cmd
curl -I https://www.google.com
```
如果返回了 Google 的响应头信息，说明代理配置成功。如果返回了 Google 的响应头信息，说明代理配置成功。

## 注意事项


- ✅ 这些环境变量仅在**当前 CMD 窗口**中有效
- ✅ 关闭窗口后，代理设置会自动失效
- ✅ 如需永久设置，可以在系统环境变量中配置
- ⚠️ 确保 Clash 正在运行且代理端口未被占用


## 取消代理

如需临时取消代理设置，可以执行：如需临时取消代理设置，可以执行：

```cmd
set http_proxy=
set https_proxy=
```

## 效果示例

![/image/cmd-proxy.png](/image/cmd-proxy.png)

## 相关链接

- [CMD 使用 代理](./cmd-clash.md)
- [Git Bash 使用 Clash](./gitbash-clash.md)
- [PowerShell 使用 Clash](./powershell-clash.md)
- [proxychains 使用指南](./proxychains.md)
- [Docker 代理配置](./docker-proxy.md)