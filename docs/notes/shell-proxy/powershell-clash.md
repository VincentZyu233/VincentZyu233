# PowerShell 使用 Clash 代理

在 PowerShell 中配置代理，可以让命令行工具和脚本通过 Clash 访问网络。在 PowerShell 中配置代理，可以让命令行工具和脚本通过 Clash 访问网络。

## 设置本地代理
```powershell
$Env:HTTP_PROXY = "http://127.0.0.1:7890"
$Env:HTTPS_PROXY = "http://127.0.0.1:7890"
```

::: info 提示
默认情况下，Clash 的本地代理端口为 `7890`。如果你修改了 Clash 的端口设置，请相应调整上述命令中的端口号。
:::

::: tip 提示
PowerShell 使用 `$Env:` 前缀来设置环境变量，这是 PowerShell 特有的语法。PowerShell 使用 `$Env:` 前缀来设置环境变量，这是 PowerShell 特有的语法。
:::

## 验证代理是否生效

如果需要通过局域网内的其他设备（如路由器或服务器）上的 Clash 代理：使用 PowerShell 的 `Invoke-WebRequest` 命令测试代理：

```powershell
Invoke-WebRequest -Uri "https://www.google.com" -Method Head -UseBasicParsing
```
如果返回响应头信息，说明代理配置成功。


## 取消代理设置
如需取消代理设置：
```powershell
$Env:HTTP_PROXY = $null
$Env:HTTPS_PROXY = $null
```
## 注意事项

- ✅ 环境变量在**当前 PowerShell 会话**中有效
- ✅ 关闭终端后，临时设置会失效
- ✅ 通过 `$PROFILE` 配置可实现持久化
- ⚠️ 确保 Clash 正在运行且代理端口未被占用
- ⚠️ 部分程序可能不支持环境变量代理，需要单独配置

## 相关链接

- [CMD 使用 代理](./cmd-clash.md)
- [Git Bash 使用 Clash](./gitbash-clash.md)
- [PowerShell 使用 Clash](./powershell-clash.md)
- [proxychains 使用指南](./proxychains.md)