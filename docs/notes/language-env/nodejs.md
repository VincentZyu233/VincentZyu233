# 安装 Node.js

Linux 推荐使用 `nvm` 安装和管理 Node.js 版本。Windows 可以直接下载 MSI 安装程序，或者手动下载 ZIP 解压后配置环境变量。

## 🔹 Linux 安装 Node.js 24

```bash
# 下载并安装 nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash

# 代替重启 shell
\. "$HOME/.nvm/nvm.sh"

# 下载并安装 Node.js
nvm install 24

# 验证 Node.js 版本
node -v # Should print "v24.18.0".

# 下载并安装 Yarn
corepack enable yarn

# 验证 Yarn 版本
yarn -v
```

## 🔹 Windows 安装 Node.js 24

打开 Node.js 下载页，选择 Windows：

> <https://nodejs.org/zh-cn/download>

推荐直接下载 `.msi` 安装程序，双击安装即可，安装程序通常会自动配置环境变量。

如果想手动安装，也可以下载 `.zip` 压缩包，解压到固定目录后，把其中的目录加入 `PATH` 环境变量即可。

::: tip 安装失败的解决方案
如果遇到连接超时/连接重置等问题，可以尝试以下方法：

- 先配置命令行代理环境变量：[Linux Bash 使用代理](/notes/shell-proxy/linux-bash-clash)
- 或者先配置 proxychains4 bash 环境：[proxychains 使用指南](/notes/shell-proxy/proxychains)

这两种方法都可以帮助你在网络受限的环境下成功下载和安装 Node.js。
:::

## 🔹 相关链接

- [Node.js 官方网站](https://nodejs.org/zh-cn/)
- [nvm GitHub 仓库](https://github.com/nvm-sh/nvm)
