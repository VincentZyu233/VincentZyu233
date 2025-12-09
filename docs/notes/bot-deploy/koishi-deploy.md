# Koishi 部署指南

::: tip 官方文档
**建议先阅读 Koishi 官方文档，官方文档已经足够友好详细。** 

如果遇到其他问题或想了解经过验证的最佳实践，可以参考本文档。

- 文档地址：[Koishi 官方文档 [https://koishi.chat/zh-CN/manual/starter/boilerplate.html] ](https://koishi.chat/zh-CN/manual/starter/boilerplate.html)
- 仓库地址：[Koishi GitHub [https://github.com/koishijs] ](https://github.com/koishijs)
:::

::: warning 注意事项
本文档撰写于 2025-12-09

请注意：文档可能会过时，本文档仅供参考，请记得随时查看最新仓库和最新文档。

## **请牢记：**
### **善用搜索引擎，善用大模型：**
- 用 Google，不要百度
- 用 Stack Overflow，不要 CSDN
- 用 Wikipedia，不要百度百科
- ChatGPT、Gemini 网页版都是免费使用的，这两个都是非常优秀的大模型
:::

::: details 我写本文档做测试时，使用的系统参数参考
```shell
root@S43LYjdh3w4zO:~# neofetch
       _,met$$$$$gg.          root@S43LYjdh3w4zO
    ,g$$$$$$$$$$$$$$$P.       ------------------
  ,g$$P"     """Y$$.".        OS: Debian GNU/Linux 12 (bookworm) x86_64
 ,$$P'              `$$$.     Host: KVM RHEL 7.6.0 PC (i440FX + PIIX, 1996)
',$$P       ,ggs.     `$$b:   Kernel: 6.1.0-10-amd64
`d$$'     ,$P"'   .    $$$    Uptime: 4 mins
 $$P      d$'     ,    $$P    Packages: 501 (dpkg)
 $$:      $$.   -    ,d$$'    Shell: bash 5.2.15
 $$;      Y$b._   _,d$P'      Resolution: 1024x768
 Y$$.    `.`"Y$$$$P"'         Terminal: /dev/pts/0
 `$$b      "-.__              CPU: Intel Xeon E5-2686 v4 (1) @ 2.294GHz
  `Y$$                        GPU: 00:02.0 Cirrus Logic GD 5446
   `Y$$.                      Memory: 103MiB / 1919MiB
     `$$b.
       `Y$$b.
          `"Y$b._
              `"""
```
:::

## 前置准备

部分指令需要 sudo 权限，如果有提示 `permission denied` 等信息，可以切换 root 或者使用 sudo。

## 安装 Node.js

Koishi 基于 Node.js 构建，因此首先需要安装 Node.js。Koishi 官方文档提供的安装脚本在某些特殊网络环境下可能无法"一键执行安装"。

### 快速安装

如果网络环境良好，可以直接按照 [Node.js 官方网站](https://nodejs.org/zh-cn/) 的安装脚本操作。

### 国内网络环境

在特殊网络环境下，建议：
1. 配置命令行代理
2. 使用国内镜像源

*具体可以参考这里 [Linux 安装 Node.js](/notes/language-env/linux-nodejs) 的文档*
::: tip 
### 推荐阅读
详细的 Node.js 安装方法和在特殊网络环境下的解决方案，可以参考：[Linux 安装 Node.js](/notes/language-env/linux-nodejs)

该文档包括：
- 官方安装方法（国际网络环境）
- 国内镜像源安装（推荐）
- 环境变量配置
- 不配置环境变量，直接用node,npm,yarn的绝对路径(兜底)
:::

### 安装包管理器

安装完成后，建议安装 Yarn 包管理器：

```bash
# 如果已配置环境变量
npm i -g yarn

# 如果未配置环境变量，使用绝对路径
/path/to/node /path/to/npm i -g yarn
```

验证安装：

```bash
# 如果配置了环境变量
node -v
npm -v
yarn -v

# 同样的，可以使用绝对路径作为兜底
/path/to/node -v
/path/to/node /path/to/npm -v
/path/to/node /path/to/yarn -v
```

::: details 环境变量说明
- 部分一键安装脚本/一键安装程序会自动配置环境变量，安装后可直接使用 `node`、`npm` 等命令
    - 比如在 `https://nodejs.org/zh-cn/download` 中，选择*获得适用于 Linux 且使用 nvm 和 yarn 的 Node.js 22*，展示出的这几行安装脚本，在国际网络环境下的 bash 执行，可以做到一键安装好 node、npm、yarn 并配好环境变量。
    
    ![Node.js 官网下载页面示例](/image/linux-nvm-yarn-win-msi-zip-nodejs.org.png)
    
    - 比如 Windows 上的 .msi 安装程序 `https://nodejs.org/dist/v22.21.1/node-v22.21.1-x64.msi`，双击运行，可以自动配置好环境变量
    - 当然我个人更倾向于下载预编译的压缩包二进制，比如 Windows 的 zip、Linux 的 xz，然后自己配环境变量
- 有关手动配置环境变量可参考 [Linux 安装 Node.js](/notes/language-env/linux-nodejs) 中的环境变量配置部分
:::

### 使用项目模板部署koishi并启动
> 虽然说koishi提供了不少发行版，比如linux的AppImage，win的msi，docker容器发行版，但是我个人而言最推荐使用项目模板，这是最灵活，最通用的方式。

参考 [Koishi官方文档 创建模板项目](https://koishi.chat/zh-CN/manual/starter/boilerplate.htm#配置镜像源)操作 即可
```shell
# 给包管理器设置淘宝源
npm config set registry https://registry.npmmirror.com
yarn config set registry https://registry.npmmirror.com

# 设置cache路径
npm config set cache "E:\cache\npm" --global
npm config get cache
yarn config set cache-folder "E:\cache\yarn"
yarn config get cache-folder

# 在当前目录下使用项目模板创建koishi实例
yarn create koishi
# npm init koishi@latest

# 启动
yarn start
# npm start
```

::: tip 
如果环境变量失效，或者不想配环境变量， 

你可以把上面的*`npm`*替换成`<node绝对路径> <npm绝对路径>`，*`yarn`*替换成`<node绝对路径> <yarn绝对路径>`作为兜底。
:::

## 从开发、测试 到 生产、运维的一些实践指令

### 查看git大文件
```shell
git rev-list --objects --all | git cat-file --batch-check='%(objecttype) %(objectname) %(objectsize) %(rest)' | Where-Object { $_ -match '^blob' } | ForEach-Object { $parts = $_ -split ' ', 4; [PSCustomObject]@{ Size = [int]$parts[2]; Name = $parts[3] } } | Sort-Object Size -Descending | Select-Object -First 20 

git rev-list --objects --all | git cat-file --batch-check='%(objecttype) %(objectname) %(objectsize) %(rest)' | Where-Object { $_ -match '^blob' } | ForEach-Object { $parts = $_ -split ' ', 4; [PSCustomObject]@{ Size = [int]$parts[2]; File = $parts[3] } } | Sort-Object Size -Descending | Select-Object -First 20 | ForEach-Object { "{0,10} KB  {1}" -f ([math]::Round($_.Size/1KB, 2)), $_.File }
```

### 发布到git workflow
#### 开发环境：
```shell
cd G:\GGames\Minecraft\shuyeyun\qq-bot\koishi-dev\koishi-dev-3\external\onebot-info-image
git add .
git commit -m "message"
git push origin main
```
#### 生产环境:
```shell
cd /home/bawuyinguo/SSoftwareFiles/koishi/awa-bot-3/external
git clone https://gitee.com/vincent-zyu/koishi-plugin-onebot-image
cd /home/bawuyinguo/SSoftwareFiles/koishi/awa-bot-3/external/koishi-plugin-onebot-image
git pull
cd /home/bawuyinguo/SSoftwareFiles/koishi/awa-bot-3
yarn && yarn build
yarn
```

### 发布到npm workflow
```shell
# 确保插件文件夹的名称是*onebot-info-image*, 没有koishi-plugin 前缀，然后:
cd G:\GGames\Minecraft\shuyeyun\qq-bot\koishi-dev\koishi-dev-3
yarn
yarn dev
yarn build onebot-info-image

$Env:HTTP_PROXY = "http://127.0.0.1:7890"
$Env:HTTPS_PROXY = "http://127.0.0.1:7890"
Invoke-WebRequest -Uri "https://www.google.com" -Method Head -UseBasicParsing
npm login --registry https://registry.npmjs.org
# 在浏览器里面登录npm，去邮件里面收验证码
npm run pub onebot-info-image -- --registry https://registry.npmjs.org
npm dist-tag add koishi-plugin-onebot-info-image@0.2.0-alpha.11+20251013 latest --registry https://registry.npmjs.org

npm view koishi-plugin-onebot-info-image
npm-stat.com
```

## 保持进程运行

::: tip 推荐方案
可以使用以下工具保持进程运行：
- `screen`（推荐新手使用）
- `tmux`
- `nohup`
- `systemd` 系统服务
- `PM2`（Node.js 进程管理器）
- `mcsmanager` 面板（系统资源充足时推荐）：[MCSM 文档](https://docs.mcsmanager.com/zh_cn/)
:::

### 使用 screen 示例

```bash
# 创建 screen 会话
screen -S koishi

# 进入项目目录并启动
cd your-koishi-project
npm start

# 分离会话（在会话内）
Ctrl+A, 然后按 D

# 恢复会话
screen -r koishi

# 列出所有会话
screen -ls
```

### 使用mcsmanager的实践示例
部分linux发行版可以直接用这个指令 安装
```shell
sudo su -c "wget -qO- https://script.mcsmanager.com/setup_cn.sh | bash"
```
> 比如在我用的Debian/Ubuntu机器上，这个安装脚本执行完以后，他会帮你把mcsm程序下载到/opt下，然后注册成systemd系统服务，使用systemctl cli工具等，就可以进行管理

详细参考[MCSM文档 https://docs.mcsmanager.com/zh_cn/](https://docs.mcsmanager.com/zh_cn/)

然后创建一个实例，类型选择 `通用控制台程序`

mcsm中，koishi实例的启动命令填写： `yarn start`
![mcsm中koishi实例的启动命令](/image/mcsm-koishi-start-command-yarn-start.png)

(可选)如果系统有bash环境，那么koishi实例的更新命令可以填写`bash -c "yarn && yarn build"`
![mcsm中koishi实例的更新命令](/image/mcsm-koishi-update-command-yarn-build.png)
这个更新指令适用于这样的场景：  
external文件夹里面的代码进行了更新，比如从远程仓库`git pull`获取了更新的代码，然后点击mcsm的更新按钮，就可以把最新的`src文件夹中的ts文件`编译成`lib文件夹中的js文件`

![mcsm的 开启 重启 按钮](/image/mcsm-start-update.png)

## 相关链接

**Koishi 相关：**
- [Koishi 官方文档 [https://koishi.chat/zh-CN/] ](https://koishi.chat/zh-CN/)
- [Koishi GitHub 组织 [https://github.com/koishijs] ](https://github.com/koishijs)
- [Koishi Core [https://github.com/koishijs/koishi] ](https://github.com/koishijs/koishi)
- [Koishi Docs [https://github.com/koishijs/docs] ](https://github.com/koishijs/docs)

**运维相关工具：**
- [Node.js [https://nodejs.org/zh-cn] ](https://nodejs.org/zh-cn/)
- [PM2 [https://pm2.keymetrics.io/] ](https://pm2.keymetrics.io/)
- [GNU Screen[https://www.gnu.org/software/screen/]](https://www.gnu.org/software/screen/)
- [RUNOOB tmux命令参考[https://www.runoob.com/linux/linux-comm-tmux.html]](https://www.runoob.com/linux/linux-comm-tmux.html)
- [MCSManager 文档[https://docs.mcsmanager.com/zh_cn/]](https://docs.mcsmanager.com/zh_cn/)