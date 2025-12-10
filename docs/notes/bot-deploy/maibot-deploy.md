# MaiBot 部署指南

::: tip 官方文档
- 文档地址：[MaiBot 官方文档](https://docs.mai-mai.org/manual/deployment/mmc_deploy_linux)
- 仓库地址：[MaiBot GitHub](https://github.com/Mai-with-u/MaiBot)
:::

::: warning 注意事项
本文档撰写于 2025-12-07  

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

### 安装基本工具

```bash
# 安装一些基本的常用软件包
apt install tree htop btop nload neofetch curl wget git proxychains4 proxychains tmux screen net-tools -y
# 在一些更新的发行版里面，neofetch 用不了，可以换成 fastfetch
```

### 安装 UV

```bash
# 官方安装方式
curl -LsSf https://astral.sh/uv/install.sh | sh
```

如果访问不了，可以：
1. 购买境外的 VPS，比如 HK、JP、US、SG 等
2. 配置命令行代理（proxychains 或者环境变量）
3. 使用国内镜像源安装 UV

```bash
# 使用国内镜像源安装 UV（推荐）
curl -LsSf https://gitee.com/wangnov/uv-custom/releases/download/0.9.16/uv-installer-custom.sh | sh
```

::: details 安装完成后的输出示例
```shell
root@S43LYjdh3w4zO:/data/maibot# curl -LsSf https://gitee.com/wangnov/uv-custom/releases/download/0.9.16/uv-installer-custom.sh | sh
downloading uv 0.9.16 x86_64-unknown-linux-gnu
no checksums to verify
installing to /root/.local/bin
  uv
  uvx
正在配置默认的 PyPI 和 Python 下载镜像...
✅ 配置完成。镜像设置如下:
   - Python 下载代理: https://ghfast.top
   - PyPI 镜像源: https://pypi.tuna.tsinghua.edu.cn/simple
   - uv 版本: 0.9.16
   - 配置文件路径: /root/.config/uv/uv.toml
```

查看 UV 配置文件：
```shell
root@S43LYjdh3w4zO:/data/maibot# cat /root/.config/uv/uv.toml
python-install-mirror = "https://ghfast.top/https://github.com/astral-sh/python-build-standalone/releases/download"

[[index]]
url = "https://pypi.tuna.tsinghua.edu.cn/simple"
default = true
```
:::

验证安装：
```bash
uv --version
which uv
```

## 克隆仓库

```bash
# 创建工作目录
mkdir -p /data/maibot
cd /data/maibot
pwd # 确认当前路径

# 克隆仓库
git clone https://github.com/Mai-with-u/MaiBot.git
git clone https://github.com/Mai-with-u/MaiBot-Napcat-Adapter.git
```

如果 clone 失败，可以使用国内镜像：
```bash
git clone https://gitee.com/DrSmooth/MaiBot
git clone https://gitee.com/yhArcadia/MaiBot-Napcat-Adapter
```

::: tip 提示
你也可以直接去 GitHub 仓库下载 ZIP 解压。区别是：
- `git clone` 下来的仓库会在根目录有 `.git` 文件夹，用于版本控制
- 如果你后续不用 `git pull` 更新的话，直接下载 ZIP 也没有区别
:::

::: details 查看目录结构
```shell
root@S43LYjdh3w4zO:/data/maibot# ls
MaiBot  MaiBot-Napcat-Adapter

root@S43LYjdh3w4zO:/data/maibot# tree -L 3
.
├── MaiBot
│   ├── bot.py
│   ├── changelogs
│   ├── CODE_OF_CONDUCT.md
│   ├── depends-data
│   ├── docker-compose.yml
│   ├── Dockerfile
│   ├── docs-src
│   ├── EULA.md
│   ├── LICENSE
│   ├── log_viewer
│   ├── plugins
│   ├── PRIVACY.md
│   ├── pyproject.toml
│   ├── README.md
│   ├── requirements.txt
│   ├── scripts
│   ├── src
│   ├── template
│   ├── test_edge.py
│   └── webui
└── MaiBot-Napcat-Adapter
    ├── command_args.md
    ├── Dockerfile
    ├── LICENSE
    ├── main.py
    ├── notify_args.md
    ├── pyproject.toml
    ├── README.md
    ├── requirements.txt
    ├── src
    └── template

36 directories, 49 files
```
:::

## 配置 MaiBot

### 创建虚拟环境并安装依赖

```bash
cd MaiBot
# 创建虚拟环境
uv venv
# 安装依赖
uv pip install -r requirements.txt -i https://mirrors.aliyun.com/pypi/simple --upgrade
```

### 解决编译错误

如果遇到 `quick-algo` 库编译失败的问题：

```bash
apt update
apt install build-essential -y
# build-essential 会自动安装 gcc、g++、make、dpkg-dev 等软件包，提供完整的 C/C++ 编译环境
apt install python3.11-dev -y 
# 安装 Python 3.11 的开发头文件

# 然后再次执行安装
uv pip install -r requirements.txt -i https://mirrors.aliyun.com/pypi/simple --upgrade
```

::: info 参考文档
更多关于 `quick-algo` 的信息，可以参考：[LPMM 配置文档](https://docs.mai-mai.org/manual/configuration/lpmm)
:::

## 配置 MaiBot-Napcat-Adapter

```bash
cd ../MaiBot-Napcat-Adapter
# 创建虚拟环境
uv venv
# 安装依赖
uv pip install -r requirements.txt -i https://mirrors.aliyun.com/pypi/simple --upgrade

# 复制配置文件
cp template/template_config.toml config.toml
```

### 编辑配置文件

```bash
nano config.toml
```

::: details 默认配置文件内容
```toml
[inner]
version = "0.1.2" # 版本号
# 请勿修改版本号，除非你知道自己在做什么

[nickname] # 现在没用
nickname = ""

[napcat_server] # Napcat 连接的 ws 服务设置
host = "localhost"      # Napcat 设定的主机地址
port = 8095             # Napcat 设定的端口
token = ""              # Napcat 设定的访问令牌，若无则留空
heartbeat_interval = 30 # 与 Napcat 设置的心跳相同（按秒计）

[maibot_server] # 连接麦麦的 ws 服务设置
host = "localhost" # 麦麦在 .env 文件中设置的主机地址，即 HOST 字段
port = 8000        # 麦麦在 .env 文件中设置的端口，即 PORT 字段

[chat] # 黑白名单功能
group_list_type = "whitelist" # 群组名单类型，可选为：whitelist, blacklist
group_list = []               # 群组名单
private_list_type = "whitelist" # 私聊名单类型，可选为：whitelist, blacklist
private_list = []               # 私聊名单
ban_user_id = []   # 全局禁止名单（全局禁止名单中的用户无法进行任何聊天）
ban_qq_bot = false # 是否屏蔽 QQ 官方机器人
enable_poke = true # 是否启用戳一戳功能

[voice] # 发送语音设置
use_tts = false # 是否使用 tts 语音

[debug]
level = "INFO" # 日志等级（DEBUG, INFO, WARNING, ERROR, CRITICAL）
```
:::

**建议修改的配置：**
```toml
[napcat_server]
host = "0.0.0.0"      # 监听所有网卡
port = 58095          # 自定义端口，避免冲突
token = "maimai"      # 设置 token 增加安全性
heartbeat_interval = 30 # 不要修改
```

::: warning 白名单模式
默认是白名单模式，需要在群号列表和 QQ 号列表里面添加内容，才会回复群消息/私聊消息。
:::

## 部署 NapCat

### 安装 Docker

```bash
# 使用 linuxmirrors 脚本一键安装 Docker
bash <(curl -sSL https://linuxmirrors.cn/docker.sh)
```

验证安装：
```bash
docker --version
```

::: tip Docker 官方文档
也可以参考 Docker 官方文档：[Install Docker on Debian](https://docs.docker.com/engine/install/debian/)
:::

### 运行 NapCat 容器

::: tip Docker Daemon 代理配置
如果无法访问 Docker Hub，可以参考 [Docker 配置代理](/notes/shell-proxy/docker-proxy) 文档配置 Docker 代理。
:::

```bash
# 直接从DockerHub拿，可能要配代理
docker run -d \
-e NAPCAT_GID=$(id -g) \
-e NAPCAT_UID=$(id -u) \
-p 3000:3000 \
-p 3001:3001 \
-p 6099:6099 \
--name napcat \
--restart=always \
mlikiowa/napcat-docker:latest
```

::: tip Docker Hub 镜像源
如果 Docker Hub 无法访问，在容器名前面加上 `docker.1ms.run/` 即可使用镜像源。

更多信息：[1ms.run](https://1ms.run/)
:::

```bash
# 使用国内镜像源（特殊网络环境下推荐）
docker run -d \
-e NAPCAT_GID=$(id -g) \
-e NAPCAT_UID=$(id -u) \
-p 3000:3000 \
-p 3001:3001 \
-p 6099:6099 \
--name napcat \
--restart=always \
docker.1ms.run/mlikiowa/napcat-docker:latest
```

验证容器状态：
```bash
docker ps -a
docker images
docker logs napcat | grep token
```

::: details 成功跑起来的话，你会看到这样的输出
```shell
root@S43LYjdh3w4zO:/data# docker ps -a
CONTAINER ID   IMAGE                                          COMMAND                CREATED        STATUS        PORTS                                                      NAMES
6f78ab5197cb   docker.1ms.run/mlikiowa/napcat-docker:latest   "bash entrypoint.sh"   11 hours ago   Up 11 hours   0.0.0.0:3000-3001->3000-3001/tcp, 0.0.0.0:6099->6099/tcp   napcat

root@S43LYjdh3w4zO:/data# docker images
IMAGE                                          ID             DISK USAGE   CONTENT SIZE   EXTRA
docker.1ms.run/mlikiowa/napcat-docker:latest   bb3f4e34f9b0       2.01GB          570MB    U

root@S43LYjdh3w4zO:/data# docker logs napcat | grep token
12-07 12:35:35 [info] [NapCat] [WebUi] WebUi User Panel Url: http://127.0.0.1:6099/webui?token=6e8a6e1fc16d
12-07 12:35:35 [info] [NapCat] [WebUi] WebUi User Panel Url: http://0.0.0.0:6099/webui?token=6e8a6e1fc16d
```

容器状态为 `Up` 表示运行正常，可以看到 token 为 `6e8a6e1fc16d`。
:::

### 获取 NapCat Token

方法一：通过日志筛选
```bash
docker logs napcat | grep token
```

方法二：查看配置文件
```bash
docker exec -it napcat bash
cat /app/napcat/config/webui.json | grep token
exit
```

### 访问 NapCat WebUI

打开浏览器访问：`http://<服务器IP>:6099/webui?token=<你的token>`

或者打开：`http://<服务器IP>:6099/webui`
然后在中间文本框里面输入token

## 启动 MaiBot-Napcat-Adapter

```bash
cd /data/maibot/MaiBot-Napcat-Adapter
# 创建 screen 会话
screen -S MaiBot-Napcat-Adapter
# 使用 uv 启动
uv run python main.py
```

::: tip 保持进程运行
可以使用以下工具保持进程：
- `screen`（推荐新手使用）
- `tmux`
- `nohup`
- `系统服务`（大部分linux发行版使用`systemd`，指令是`systemctl`）
- `MCSM面板`(系统资源较丰富的话 推荐使用)（[点我看文档 https://docs.mcsmanager.com/zh_cn/](https://docs.mcsmanager.com/zh_cn/)）
:::

## 配置 NapCat 连接

### 获取宿主机 IP

从 Docker 容器访问宿主机，需要找到正确的 IP 地址。

```bash
ip a
```

常见的可用 IP：
- `docker0` 网卡的 IP（如 `192.168.0.1`）
- 物理网卡的 IP（如 `172.16.0.34`）
- 某些环境可以使用 `host.docker.internal`

::: details 我的 IP 配置示例
```shell
root@S43LYjdh3w4zO:~# ip a
3: docker0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue state UP group default
    inet 192.168.0.1/20 brd 192.168.15.255 scope global docker0
2: ens17: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc fq_codel state UP group default qlen 1000
    inet 172.16.0.34/12 brd 172.31.255.255 scope global ens17
```

可用 IP：`172.16.0.34` 和 `192.168.0.1`
:::

### 在 NapCat WebUI 中配置 WebSocket 客户端

1. 打开 NapCat WebUI 的网络配置
2. 新建 WebSocket 客户端
3. 配置如下：
   - **启用**：勾选
   - **名称**：`maimai`（随便填，相当于备注，给自己看的）
   - **URL**：`ws://<宿主机IP>:<Adapter端口>`（如 `ws://192.168.0.1:58095`）
   - **Token**：需要与Napcat-Adapter的config.toml中的token一致（如 `maimai`）
   - **心跳间隔**：保持默认 `30000ms`，最好别动
   - **重连间隔**：`1111ms`（可选）

::: details 我的 NapCat 配置示例
![NapCat WebSocket 客户端配置示例](/image/napcat-maibot-config-example.png)

配置说明：
- **名称**：`maimai`(随便填，相当于备注，给自己看的)
- **URL**：`ws://172.16.0.34:58095`（宿主机 IP + Adapter 端口）
- **Token**：`maimai`(需要与Napcat-Adapter的config.toml中的token一致)
- **心跳间隔**：`30000ms`（默认值, 最好别动）
- **重连间隔**：`1111ms` (这个小点没事)
:::

### 检查连接状态

在 NapCat WebUI 的日志页面查看：`http://<服务器IP>:6099/webui/logs`

成功连接的日志示例：
```log
[INFO] [Notice] [OneBot11] 配置变更后:
[network] 配置加载
WebSocket反向服务: ws://192.168.0.1:58095, : 已启动
```

## 启动 MaiBot

### 创建配置文件

```bash
cd /data/maibot/MaiBot

# 创建 config 文件夹
mkdir config

# 复制配置文件
cp template/bot_config_template.toml config/bot_config.toml
cp template/model_config_template.toml config/model_config.toml
cp template/template.env .env
```

### 配置 LLM API

编辑模型配置文件：
```bash
nano config/model_config.toml
```

找到 SiliconFlow 配置部分，修改 API Key：
```toml
[[api_providers]] # SiliconFlow 的 API 服务商配置
name = "SiliconFlow"
base_url = "https://api.siliconflow.cn/v1"
api_key = "your-siliconflow-api-key"  # 修改这里
client_type = "openai"
max_retry = 3
timeout = 120
retry_interval = 5
```

获取 API Key：访问 [SiliconFlow 控制台](https://cloud.siliconflow.cn/me/account/ak)

### 启动 MaiBot

```bash
# 创建 screen 会话
screen -S MaiBot
# 使用 uv 启动
uv run python3 bot.py
```

## Screen 常用命令

```bash
# 创建会话
screen -S <会话名>

# 列出所有会话
screen -ls

# 恢复会话
screen -r <会话名或ID>

# 分离会话（在会话内）
Ctrl+A, 然后按 D

# 关闭会话（在会话内）
exit

# 杀死会话
screen -S <会话名或ID> -X quit
```

## 相关链接

**MaiBot 相关：**
- [MaiBot 官方文档 [https://docs.mai-mai.org/] ](https://docs.mai-mai.org/)
- [MaiBot GitHub Repo [https://github.com/Mai-with-u/MaiBot] ](https://github.com/Mai-with-u/MaiBot)
- [MaiBot-Napcat-Adapter GitHub Repo [https://github.com/Mai-with-u/MaiBot-Napcat-Adapter] ](https://github.com/Mai-with-u/MaiBot-Napcat-Adapter)

**NapCat 相关：**
- [NapCat Github Repo [https://github.com/NapNeko/NapCatQQ] ](https://github.com/NapNeko/NapCatQQ)
- [NapCat Docker [https://github.com/NapNeko/NapCat-Docker] ](https://github.com/NapNeko/NapCat-Docker)
- [NapCat 文档 on Github.IO [https://napneko.github.io/] ](https://napneko.github.io/)
- [NapCat 文档 on Cloudflare.HKServer [https://napcat.napneko.icu/] ](https://napcat.napneko.icu/)
- [NapCat 文档 on Cloudflare.Pages [https://napneko.pages.dev/] ](https://napneko.pages.dev/)
- [NapCat 文档 on NapCat.Wiki [https://www.napcat.wiki/] ](https://www.napcat.wiki/)

**工具和资源：**
- [UV - Python 包管理器 [https://docs.astral.sh/uv/] ](https://docs.astral.sh/uv/)
- [UV - 国内gitee镜像源 [https://gitee.com/wangnov/uv-custom] ](https://gitee.com/wangnov/uv-custom)
- [SiliconFlow - LLM API [https://cloud.siliconflow.cn/] ](https://cloud.siliconflow.cn/)
- [Docker 官方文档 [https://docs.docker.com/] ](https://docs.docker.com/)
- [linuxmirrors - 国内镜像源 [https://linuxmirrors.cn/] ](https://linuxmirrors.cn/)

**运维相关工具：**
- [GNU Screen[https://www.gnu.org/software/screen/]](https://www.gnu.org/software/screen/)
- [RUNOOB tmux命令参考[https://www.runoob.com/linux/linux-comm-tmux.html]](https://www.runoob.com/linux/linux-comm-tmux.html)
- [MCSManager 文档[https://docs.mcsmanager.com/zh_cn/]](https://docs.mcsmanager.com/zh_cn/)