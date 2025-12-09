如果处于国际网络环境，可以直接使用官网里面的安装指令，全部复制进去执行就可以了

https://nodejs.org/zh-cn/download

```shell
# 比如，使用nvm 安装node22：
# 下载并安装 nvm：
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash

# 代替重启 shell
\. "$HOME/.nvm/nvm.sh"

# 下载并安装 Node.js：
nvm install 22

# 验证 Node.js 版本：
node -v # Should print "v22.21.1".

# 下载并安装 Yarn:
corepack enable yarn

# 验证 Yarn 版本：
yarn -v

```

国内网络环境可以需要一些其他的手段
比如：配置代理，使用镜像源。

比如 使用淘宝镜像源 下载安装nodejs：

（detail box，默认折叠）
```shell
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
（detail box结束）

```shell
mkdir -p /data/nodejs
cd /data/nodejs/
curl -LO https://registry.npmmirror.com/-/binary/node/latest-v22.x/node-v22.9.0-linux-x64.tar.xz
ls
tar -xvf node-v22.9.0-linux-x64.tar.xz
```

(detail box 开始)
解压完毕以后的目录结构是这样的
```shell
root@S43LYjdh3w4zO:/data/nodejs# tree -L 3
.
├── node-v22.9.0-linux-x64
│   ├── bin
│   │   ├── corepack -> ../lib/node_modules/corepack/dist/corepack.js
│   │   ├── node
│   │   ├── npm -> ../lib/node_modules/npm/bin/npm-cli.js
│   │   └── npx -> ../lib/node_modules/npm/bin/npx-cli.js
│   ├── CHANGELOG.md
│   ├── include
│   │   └── node
│   ├── lib
│   │   └── node_modules
│   ├── LICENSE
│   ├── README.md
│   └── share
│       ├── doc
│       └── man
└── node-v22.9.0-linux-x64.tar.xz

10 directories, 8 files
root@S43LYjdh3w4zO:/data/nodejs#
```
（detail box 结束）

配置环境变量（可选）

方法一：临时环境变量 
```shell
export NODE_HOME=/data/nodejs/node-v22.0.0-linux-x64
export PATH=$NODE_HOME/bin:$PATH
```

方法二：修改用户的bashrc
```shell
nano ~/.bashrc
# 也可以使用vi vim等
# 在文件末尾添加以下两行：
export NODE_HOME=/data/nodejs/node-v22.0.0-linux-x64
export PATH=$NODE_HOME/bin:$PATH
# 保存并关闭文件后，执行以下命令使配置立即生效：
source ~/.bashrc
```

当然是可选的，不配一样能用，绝对路径就可以了。

比如， 对npm yarn的操作，可以用这样的指令:
`<node绝对路径> <npm绝对路径> [args...]`
`<node绝对路径> <yarn绝对路径> [args...]`

(tip box 开始)
比如在我的测试机器，可以这样:
```shell

root@S43LYjdh3w4zO:/data/nodejs/node-v22.9.0-linux-x64/bin# ls
corepack  node  npm  npx
root@S43LYjdh3w4zO:/data/nodejs/node-v22.9.0-linux-x64/bin# pwd
/data/nodejs/node-v22.9.0-linux-x64/bin
root@S43LYjdh3w4zO:/data/nodejs/node-v22.9.0-linux-x64/bin# /data/nodejs/node-v22.9.0-linux-x64/bin/node -v
v22.9.0
root@S43LYjdh3w4zO:/data/nodejs/node-v22.9.0-linux-x64/bin# /data/nodejs/node-v22.9.0-linux-x64/bin/npm -v
/usr/bin/env: ‘node’: No such file or directory
root@S43LYjdh3w4zO:/data/nodejs/node-v22.9.0-linux-x64/bin# /data/nodejs/node-v22.9.0-linux-x64/bin/node /data/nodejs/node-v22.9.0-linux-x64/bin/npm -v
10.8.3
root@S43LYjdh3w4zO:/data/nodejs/node-v22.9.0-linux-x64/bin# /data/nodejs/node-v22.9.0-linux-x64/bin/node /data/nodejs/node-v22.9.0-linux-x64/bin/npm i -g yarn

added 1 package in 3s
root@S43LYjdh3w4zO:/data/nodejs/node-v22.9.0-linux-x64/bin# /data/nodejs/node-v22.9.0-linux-x64/bin/node /data/nodejs/node-v22.9.0-linux-x64/bin/npm config set registry https://registry.npmmirror.com
root@S43LYjdh3w4zO:/data/nodejs/node-v22.9.0-linux-x64/bin# /data/nodejs/node-v22.9.0-linux-x64/bin/node /data/nodejs/node-v22.9.0-linux-x64/bin/yarn -v
1.22.22

root@S43LYjdh3w4zO:/data/nodejs/node-v22.9.0-linux-x64/bin# /data/nodejs/node-v22.9.0-linux-x64/bin/node /data/nodejs/node-v22.9.0-linux-x64/bin/yarn config set registry https://registry.npmmirror.com
yarn config v1.22.22
success Set "registry" to "https://registry.npmmirror.com".
Done in 0.08s.
root@S43LYjdh3w4zO:/data/nodejs/node-v22.9.0-linux-x64/bin#
```
(tip box 结束)

good！现在已经有了node22，以及配套的 npm yarn 包管理器