# NoneBot2 部署指南

::: tip 官方文档
- 文档地址：[NoneBot2 官方文档 [https://nonebot.dev/docs/quick-start] ](https://nonebot.dev/docs/quick-start)
- 仓库地址：[NoneBot2 GitHub [https://github.com/nonebot/nonebot2] ](https://github.com/nonebot/nonebot2)
:::

::: warning 注意事项
本文档撰写于 2025-12-08

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

### 换源

::: tip 参考文档
可以参考 [Debian 换源](/notes/switch-source/debian) 文档进行配置
:::

```bash
# 先换源，修改 /etc/apt/sources.list 文件
# 可以参考：/notes/switch-source/debian

apt update
```

### 安装基本工具（可选）

```bash
# 安装一些基本的常用软件包
apt install tree htop btop nload neofetch curl wget git proxychains4 proxychains tmux screen net-tools -y
# 在一些更新的发行版里面，neofetch 用不了，可以换成 fastfetch
```

## 安装 pipx

pipx 是一个用于安装和运行 Python 应用程序的工具。

### 方法一：从 PyPI 安装

```bash
python -m pip install --user pipx
python -m pipx ensurepath
```

### 方法二：使用系统包管理器安装

```bash
# Debian/Ubuntu
apt install pipx

# RedHat/Fedora
dnf install pipx

# Arch Linux
pacman -S python-pipx

# openSUSE
zypper install python-pipx
```

### 验证安装

```bash
pipx --version
which pipx
```

::: details 成功安装后的输出示例
```shell
root@S43LYjdh3w4zO:/data# pipx
usage: pipx [-h] [--version] {install,inject,upgrade,upgrade-all,uninstall,uninstall-all,reinstall,reinstall-all,list,run,runpip,ensurepath,environment,completions} ...

Install and execute apps from Python packages.

Binaries can either be installed globally into isolated Virtual Environments
or run directly in a temporary Virtual Environment.

Virtual Environment location is /root/.local/pipx/venvs.
Symlinks to apps are placed in /root/.local/bin.

optional environment variables:
  PIPX_HOME             Overrides default pipx location. Virtual Environments will be installed to $PIPX_HOME/venvs.
  PIPX_BIN_DIR          Overrides location of app installations. Apps are symlinked or copied here.
  PIPX_DEFAULT_PYTHON   Overrides default python used for commands.
  USE_EMOJI             Overrides emoji behavior. Default value varies based on platform.

options:
  -h, --help            show this help message and exit
  --version             Print version and exit

subcommands:
  Get help for commands with pipx COMMAND --help

  {install,inject,upgrade,upgrade-all,uninstall,uninstall-all,reinstall,reinstall-all,list,run,runpip,ensurepath,environment,completions}
    install             Install a package
    inject              Install packages into an existing Virtual Environment
    upgrade             Upgrade a package
    upgrade-all         Upgrade all packages. Runs `pip install -U <pkgname>` for each package.
    uninstall           Uninstall a package
    uninstall-all       Uninstall all packages
    reinstall           Reinstall a package
    reinstall-all       Reinstall all packages
    list                List installed packages
    run                 Download the latest version of a package to a temporary virtual environment, then run an app from it. Also compatible with local `__pypackages__` directory
                        (experimental).
    runpip              Run pip in an existing pipx-managed Virtual Environment
    ensurepath          Ensure directories necessary for pipx operation are in your PATH environment variable.
    environment         Print a list of variables used in pipx.constants.
    completions         Print instructions on enabling shell completions for pipx

root@S43LYjdh3w4zO:/data# pipx --version
1.1.0

root@S43LYjdh3w4zO:/data# which pipx
/usr/bin/pipx
```
:::

## 安装 NoneBot CLI

::: tip 换源建议
特殊网络环境下，建议先更换 pip 源：[pip 换源文档](/notes/switch-source/pip)
:::

```bash
pipx install nb-cli
```

::: details 安装完成后的输出示例
```shell
root@S43LYjdh3w4zO:/data# pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple
Writing to /root/.config/pip/pip.conf

root@S43LYjdh3w4zO:/data# pipx install nb-cli
  installed package nb-cli 1.5.0, installed using Python 3.11.2
  These apps are now globally available
    - nb
done! ✨ 🌟 ✨

root@S43LYjdh3w4zO:/data# nb
d8b   db  .d88b.  d8b   db d88888b d8888b.  .d88b.  d888888b
888o  88 .8P  Y8. 888o  88 88'     88  `8D .8P  Y8. `~~88~~'
88V8o 88 88    88 88V8o 88 88ooooo 88oooY' 88    88    88
88 V8o88 88    88 88 V8o88 88~~~~~ 88~~~b. 88    88    88
88  V888 `8b  d8' 88  V888 88.     88   8D `8b  d8'    88
VP   V8P  `Y88P'  VP   V8P Y88888P Y8888P'  `Y88P'     YP


Welcome to NoneBot CLI!
[?] What do you want to do? (Use ↑ and ↓ to choose, Enter to submit)
[?] Are you sure to exit NB CLI? Y

root@S43LYjdh3w4zO:/data# which nb
/root/.local/bin/nb
```
:::

## 创建 NoneBot 项目

```bash
# 创建工作目录
mkdir -p /data/nonebot
cd /data/nonebot

# 使用 nb-cli 创建项目
nb create
```

### 创建项目的交互式选项（参考）

1. **Template（模板）**：选择 `simple`
2. **项目名称**：自定义，例如 `nonebot-test`
3. **Adapters（适配器）**：根据需要选择，例如 `OneBot v11`
4. **Strategy（策略）**：选择 `User global (isolate by project name, ...)`
5. **Plugin storage（插件存储位置）**：选择 `src folder`
6. **Dev tools（开发工具）**：保持默认，直接回车
7. **安装依赖**：选择 `yes`，自动创建虚拟环境并安装依赖

### 启动项目

创建完成后，按照提示启动：

```bash
cd nonebot-test
nb run --reload
```

::: info 目录结构
创建完成后的 NoneBot 项目目录结构：

```shell
root@S43LYjdh3w4zO:/data/nonebot/nonebot-test# tree -L 3 -a
.
├── .env
├── .env.dev
├── .env.prod
├── .gitignore
├── pyproject.toml
├── README.md
├── src
│   └── plugins
├── .venv
│   ├── bin
│   │   ├── activate
│   │   ├── activate.csh
│   │   ├── activate.fish
│   │   ├── activate.nu
│   │   ├── activate.ps1
│   │   ├── activate_this.py
│   │   ├── dotenv
│   │   ├── fastapi
│   │   ├── httpx
│   │   ├── pip
│   │   ├── pip3
│   │   ├── pip-3.11
│   │   ├── pip3.11
│   │   ├── python -> /usr/bin/python3
│   │   ├── python3 -> python
│   │   ├── python3.11 -> python
│   │   ├── uvicorn
│   │   ├── watchfiles
│   │   └── websockets
│   ├── CACHEDIR.TAG
│   ├── .gitignore
│   ├── lib
│   │   └── python3.11
│   └── pyvenv.cfg
└── .vscode
    └── extensions.json

8 directories, 29 files
```
:::

## 配置对接 NapCat

::: tip 参考文档
对接 NapCat 可以参考官方文档：[NapCat Integration of NoneBot](https://napneko.github.io/use/integration#nonebot)

![NapCat 集成 NoneBot 文档](/image/napcat-nonebot-integrate.png)

:::

### 修改配置文件

编辑 `.env` 配置文件，手动添加以下配置：

```bash
nano .env
```

添加配置：

```ini
# 服务器配置
PORT=58888
HOST=0.0.0.0
ONEBOT_ACCESS_TOKEN=test

# 命令配置
COMMAND_START=["/", ""]
COMMAND_SEP=[".", " "]
```

::: warning 端口配置
将默认端口改为自定义端口（如 `58888`），这样配置 NapCat 时更清楚需要填写什么。
:::

### 获取宿主机 IP

从 Docker 容器访问宿主机，需要找到正确的 IP 地址：

```bash
ip a
```

常见的可用 IP：
- 物理网卡的 IP（如 `172.16.0.34`）
- `docker0` 网卡的 IP（如 `192.168.0.1`）

::: details 我的配置示例
```shell
root@S43LYjdh3w4zO:/data/nonebot/nonebot-test# cat .env
ENVIRONMENT=dev
DRIVER=~fastapi+~httpx+~websockets
LOCALSTORE_CACHE_DIR=/root/.cache/nonebot2-nonebot-test
LOCALSTORE_DATA_DIR=/root/.local/share/nonebot2-nonebot-test
LOCALSTORE_CONFIG_DIR=/root/.config/nonebot2-nonebot-test

PORT=58888
HOST=0.0.0.0
ONEBOT_ACCESS_TOKEN=test

COMMAND_START=["/", ""]
COMMAND_SEP=[".", " "]

root@S43LYjdh3w4zO:/data/nonebot/nonebot-test# ip a
2: ens17: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc fq_codel state UP group default qlen 1000
    inet 172.16.0.34/12 brd 172.31.255.255 scope global ens17

3: docker0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue state UP group default
    inet 192.168.0.1/20 brd 192.168.15.255 scope global docker0
```

所以我对接 NapCat 的时候可以这么填写：
- **URL**：`ws://172.16.0.34:58888/onebot/v11/ws`
- **Token**：`test`
- **心跳间隔**：默认的 `30000ms`，不要动
- **重连间隔**：`1111ms`
:::

### 在 NapCat WebUI 中配置 WebSocket 客户端

1. 打开 NapCat WebUI 的网络配置
2. 新建 WebSocket 客户端
3. 配置如下：
   - **启用**：勾选
   - **URL**：`ws://<宿主机IP>:<NoneBot端口>/onebot/v11/ws`
   - **Token**：与 `.env` 中的 `ONEBOT_ACCESS_TOKEN` 一致
   - **心跳间隔**：保持默认 `30000ms`
   - **重连间隔**：`1111ms`（可选）

::: details 我的 NapCat 配置示例
![NapCat WebSocket 客户端配置示例](/image/napcat-nonebot-config-example.png)

配置说明：
- **名称**：`nonebot`（随便填，相当于备注，给自己看的）
- **URL**：`ws://172.16.0.34:58888/onebot/v11/ws`（宿主机 IP + NoneBot 端口 + OneBot 路径）
- **Token**：`test`（需要与 NoneBot 的 `.env` 中的 `ONEBOT_ACCESS_TOKEN` 一致）
- **心跳间隔**：`30000ms`（默认值，最好别动）
- **重连间隔**：`1111ms`（这个小点没事）
:::

## 安装插件

### 浏览插件市场

访问 [NoneBot 插件市场](https://nonebot.dev/store/plugins) 探索插件。

你也可以在 Google 搜索 `nonebot plugin`，或参照官方文档自己编写插件：[创建插件教程](https://nonebot.dev/docs/tutorial/create-plugin)

### 安装插件示例

以 `nonebot-plugin-picstatus` 插件为例：

```bash
# 进入项目根目录
cd /data/nonebot/nonebot-test
pwd  # 确认当前路径
tree -L 1  # 查看目录结构

# 使用 nb-cli 安装插件
nb plugin install nonebot-plugin-picstatus
```

::: details 项目根目录结构
```shell
root@S43LYjdh3w4zO:/data/nonebot/nonebot-test# pwd
/data/nonebot/nonebot-test

root@S43LYjdh3w4zO:/data/nonebot/nonebot-test# tree -L 2
.
├── pyproject.toml
├── README.md
└── src
    └── plugins

3 directories, 2 files
```
:::

## 解决常见问题

### Playwright 环境问题

某些插件（如 `nonebot-plugin-htmlrender`）需要无头浏览器支持。首次启动可能会遇到以下错误：

::: details 错误日志示例
```log
root@S43LYjdh3w4zO:/data/nonebot/nonebot-test# nb run
Using python: /data/nonebot/nonebot-test/.venv/bin/python
12-08 00:39:47 [SUCCESS] nonebot | NoneBot is initializing...
12-08 00:39:47 [INFO] nonebot | Current Env: dev

12-08 00:39:52 [INFO] nonebot_plugin_htmlrender | Checking chromium installation...
12-08 00:39:52 [DEBUG] nonebot_plugin_htmlrender | Starting playwright install process...
12-08 00:39:52 [WARNING] nonebot_plugin_htmlrender | Installation failed, retrying with official mirror...
12-08 00:39:52 [ERROR] nonebot_plugin_htmlrender | Installation failed with: [Errno 2] No such file or directory
12-08 00:39:53 [ERROR] uvicorn | playwright._impl._errors.Error: BrowserType.launch: Executable doesn't exist at /root/.cache/ms-playwright/chromium_headless_shell-1194/chrome-linux/headless_shell
╔════════════════════════════════════════════════════════════╗
║ Looks like Playwright was just installed or updated.       ║
║ Please run the following command to download new browsers: ║
║                                                            ║
║     playwright install                                     ║
║                                                            ║
║ <3 Playwright Team                                         ║
╚════════════════════════════════════════════════════════════╝
```
:::

### 解决方法

使用虚拟环境中的 Python 解释器安装 Playwright：

```bash
# 安装 Playwright 依赖， 
# 比如 你可以使用完整的python解释器路径 确保依赖被安装进虚拟环境
# 当然，你也可以cd到venv所在的目录，使用指令source ./.venv/bin/activate, 
# 这个时候你就会发现，你使用which python打印一下解释器路径，就变成了虚拟环境里面的py解释器
/data/nonebot/nonebot-test/.venv/bin/python -m playwright install-deps

# 安装 Playwright 浏览器
/data/nonebot/nonebot-test/.venv/bin/python -m playwright install
```

## 保持进程运行

::: tip 推荐方案
可以使用以下工具保持进程运行：
- `screen`（推荐新手使用）
- `tmux`
- `nohup`
- `systemd` 系统服务
- `MCSM 面板`（系统资源充足时推荐）：[MCSM 文档](https://docs.mcsmanager.com/zh_cn/)
:::

### 使用 screen 示例

```bash
# 创建 screen 会话
screen -S nonebot

# 进入项目目录并启动
cd /data/nonebot/nonebot-test
nb run

# 分离会话（在会话内）
Ctrl+A, 然后按 D

# 恢复会话
screen -r nonebot

# 列出所有会话
screen -ls

# 杀死会话
screen -S nonebot -X quit
```

## 相关链接

**NoneBot2 相关：**
- [NoneBot2 官方文档 [https://nonebot.dev/] ](https://nonebot.dev/)
- [NoneBot2 GitHub 仓库 [https://github.com/nonebot/nonebot2] ](https://github.com/nonebot/nonebot2)
- [NoneBot2 插件市场 [https://nonebot.dev/store/plugins] ](https://nonebot.dev/store/plugins)
- [NoneBot2 快速开始 [https://nonebot.dev/docs/quick-start] ](https://nonebot.dev/docs/quick-start)
- [NoneBot2 创建插件教程 [https://nonebot.dev/docs/tutorial/create-plugin] ](https://nonebot.dev/docs/tutorial/create-plugin)

**NapCat 相关：**
- [NapCat 对接NoneBot文档 [https://napneko.github.io/use/integration] ](https://napneko.github.io/use/integration)
- [NapCat GitHub 仓库 [https://github.com/NapNeko/NapCatQQ] ](https://github.com/NapNeko/NapCatQQ)

**工具和资源：**
- [pipx GitHub 仓库 [https://github.com/pypa/pipx] ](https://github.com/pypa/pipx)
- [Playwright Python 文档 [https://playwright.dev/python/] ](https://playwright.dev/python/)

**运维相关工具：**
- [GNU Screen[https://www.gnu.org/software/screen/]](https://www.gnu.org/software/screen/)
- [RUNOOB tmux命令参考[https://www.runoob.com/linux/linux-comm-tmux.html]](https://www.runoob.com/linux/linux-comm-tmux.html)
- [MCSManager 文档[https://docs.mcsmanager.com/zh_cn/]](https://docs.mcsmanager.com/zh_cn/)