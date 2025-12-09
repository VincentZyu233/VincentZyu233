# Linux 安装 Node.js

本文档介绍在 Linux 系统上安装 Node.js 的多种方法。

::: details 我自己的测试环境参考
在这个机器上面，已经实践验证过 本文的全部操作是可行的
```shell{2-20}
root@S43LYjdh3w4zO:/data/nodejs# neofetch
       _,met$$$$$gg.          root@S43LYjdh3w4zO
    ,g$$$$$$$$$$$$$$$P.       ------------------
  ,g$$P"     """Y$$.".        OS: Debian GNU/Linux 12 (bookworm) x86_64
 ,$$P'              `$$$.     Host: KVM RHEL 7.6.0 PC (i440FX + PIIX, 1996)
',$$P       ,ggs.     `$$b:   Kernel: 6.1.0-10-amd64
`d$$'     ,$P"'   .    $$$    Uptime: 16 hours, 12 mins
 $$P      d$'     ,    $$P    Packages: 904 (dpkg)
 $$:      $$.   -    ,d$$'    Shell: bash 5.2.15
 $$;      Y$b._   _,d$P'      Resolution: 1024x768
 Y$$.    `.`"Y$$$$P"'         Terminal: /dev/pts/6
 `$$b      "-.__              CPU: Intel Xeon E5-2686 v4 (1) @ 2.294GHz
  `Y$$                        GPU: 00:02.0 Cirrus Logic GD 5446
   `Y$$.                      Memory: 919MiB / 1919MiB
     `$$b.
       `Y$$b.
          `"Y$b._
              `"""
```
:::

## 官方安装方法（国际网络环境）

如果处于国际网络环境，可以直接使用 [Node.js 官网](https://nodejs.org/zh-cn/download) 的安装指令。

### 使用 nvm 安装 Node.js 22

```bash
# 下载并安装 nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash

# 代替重启 shell
\. "$HOME/.nvm/nvm.sh"

# 下载并安装 Node.js
nvm install 22

# 验证 Node.js 版本
node -v # Should print "v22.21.1"

# 下载并安装 Yarn
corepack enable yarn

# 验证 Yarn 版本
yarn -v
```

::: tip 安装失败的解决方案
如果遇到连接超时/连接重置等问题，可以尝试以下方法：
- 先配置命令行代理环境变量：[Linux Bash 使用代理](/notes/shell-proxy/linux-bash-clash)
- 或者先配置 proxychains4 bash 环境：[proxychains 使用指南](/notes/shell-proxy/proxychains)

这两种方法都可以帮助你在网络受限的环境下成功下载和安装 Node.js。
:::

## 国内镜像源安装（推荐）

国内网络环境可能需要使用镜像源或配置代理。以下是使用淘宝镜像源安装 Node.js 的方法。

### 下载并解压

```bash
# 创建工作目录
mkdir -p /data/nodejs
cd /data/nodejs/

# 从淘宝镜像下载 Node.js
curl -LO https://registry.npmmirror.com/-/binary/node/latest-v22.x/node-v22.9.0-linux-x64.tar.xz

# 解压
tar -xvf node-v22.9.0-linux-x64.tar.xz
```

::: details 解压后的目录结构
```shell{2-23}
root@S43LYjdh3w4zO:/data/nodejs# tree -L 3
.
├── node-v22.9.0-linux-x64
│   ├── bin
│   │   ├── corepack -> ../lib/node_modules/corepack/dist/corepack.js
│   │   ├── node
│   │   ├── npm -> ../lib/node_modules/npm/bin/npm-cli.js
│   │   └── npx -> ../lib/node_modules/npm/bin/npx-cli.js
│   ├── CHANGELOG.md
│   ├── include
│   │   └── node
│   ├── lib
│   │   └── node_modules
│   ├── LICENSE
│   ├── README.md
│   └── share
│       ├── doc
│       └── man
└── node-v22.9.0-linux-x64.tar.xz

10 directories, 8 files
```
:::

## 配置环境变量（可选）

配置环境变量可以让你在任何目录直接使用 `node`、`npm`、`yarn` 命令。

### 方法一：临时环境变量

```bash
export NODE_HOME=/data/nodejs/node-v22.9.0-linux-x64
export PATH=$NODE_HOME/bin:$PATH
```

::: warning 注意
临时环境变量仅在当前 Shell 会话有效，关闭终端后失效。
:::

### 方法二：永久配置（修改 .bashrc）

```bash
# 编辑 .bashrc 文件
nano ~/.bashrc

# 在文件末尾添加以下两行：
export NODE_HOME=/data/nodejs/node-v22.9.0-linux-x64
export PATH=$NODE_HOME/bin:$PATH

# 保存并关闭文件后，执行以下命令使配置立即生效
source ~/.bashrc
```

## 不配置环境变量的使用方法

如果不配置环境变量，可以使用绝对路径来运行 Node.js 和 npm/yarn。

对于 npm 和 yarn 的操作，需要使用以下格式：
- `<node绝对路径> <npm绝对路径> [args...]`
- `<node绝对路径> <yarn绝对路径> [args...]`

::: tip 使用示例
```shell{3,10,15,22,26,27,28}
# 查看 Node.js 版本
root@S43LYjdh3w4zO:/data/nodejs/node-v22.9.0-linux-x64/bin# /data/nodejs/node-v22.9.0-linux-x64/bin/node -v
v22.9.0

# 查看 npm 版本（需要通过 node 调用）
root@S43LYjdh3w4zO:/data/nodejs/node-v22.9.0-linux-x64/bin# /data/nodejs/node-v22.9.0-linux-x64/bin/npm -v
/usr/bin/env: 'node': No such file or directory

root@S43LYjdh3w4zO:/data/nodejs/node-v22.9.0-linux-x64/bin# /data/nodejs/node-v22.9.0-linux-x64/bin/node /data/nodejs/node-v22.9.0-linux-x64/bin/npm -v
10.8.3

# 全局安装 yarn
root@S43LYjdh3w4zO:/data/nodejs/node-v22.9.0-linux-x64/bin# /data/nodejs/node-v22.9.0-linux-x64/bin/node /data/nodejs/node-v22.9.0-linux-x64/bin/npm i -g yarn

added 1 package in 3s

# 配置 npm 镜像源
root@S43LYjdh3w4zO:/data/nodejs/node-v22.9.0-linux-x64/bin# /data/nodejs/node-v22.9.0-linux-x64/bin/node /data/nodejs/node-v22.9.0-linux-x64/bin/npm config set registry https://registry.npmmirror.com

# 查看 yarn 版本
root@S43LYjdh3w4zO:/data/nodejs/node-v22.9.0-linux-x64/bin# /data/nodejs/node-v22.9.0-linux-x64/bin/node /data/nodejs/node-v22.9.0-linux-x64/bin/yarn -v
1.22.22

# 配置 yarn 镜像源
root@S43LYjdh3w4zO:/data/nodejs/node-v22.9.0-linux-x64/bin# /data/nodejs/node-v22.9.0-linux-x64/bin/node /data/nodejs/node-v22.9.0-linux-x64/bin/yarn config set registry https://registry.npmmirror.com
yarn config v1.22.22
success Set "registry" to "https://registry.npmmirror.com".
Done in 0.08s.
```
:::

## 验证安装

安装完成后，验证 Node.js 和包管理器是否正常工作：

```bash
# 如果配置了环境变量
node -v
npm -v
yarn -v

# 如果没有配置环境变量，使用绝对路径, 
/data/nodejs/node-v22.9.0-linux-x64/bin/node -v
/data/nodejs/node-v22.9.0-linux-x64/bin/node /data/nodejs/node-v22.9.0-linux-x64/bin/npm -v
/data/nodejs/node-v22.9.0-linux-x64/bin/node /data/nodejs/node-v22.9.0-linux-x64/bin/yarn -v
```

## 相关链接

- [Node.js 官方网站 [https://nodejs.org/] ](https://nodejs.org/zh-cn/)
- [nvm GitHub 仓库 [https://github.com/nvm-sh/nvm] ](https://github.com/nvm-sh/nvm)
- [淘宝 npm 镜像 [https://npmmirror.com/] ](https://npmmirror.com/)
