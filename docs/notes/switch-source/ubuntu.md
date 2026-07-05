# Ubuntu 换源

Ubuntu 更换为国内镜像源可以显著提升软件包下载速度。

## 🔹 查看当前版本

```bash
cat /etc/os-release
```

根据 `VERSION_CODENAME` 确认版本代号：

| 版本 | 代号 |
|------|------|
| Ubuntu 26.04 | resolute |
| Ubuntu 24.04 | noble |
| Ubuntu 22.04 | jammy |
| Ubuntu 20.04 | focal |

## 🔹 备份原文件

```bash
sudo cp /etc/apt/sources.list /etc/apt/sources.list.bak
```

从 Ubuntu 24.04 开始，配置文件路径变更为 `/etc/apt/sources.list.d/ubuntu.sources`（DEB822 格式），按需备份：

```bash
sudo cp /etc/apt/sources.list.d/ubuntu.sources /etc/apt/sources.list.d/ubuntu.sources.bak
```

## 🔹 传统格式（/etc/apt/sources.list）

适用于 **Ubuntu 22.04 及更早版本**。

### 清华源

**Ubuntu 22.04 (jammy)**：

```bash
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ jammy main restricted universe multiverse
# deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ jammy main restricted universe multiverse
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ jammy-updates main restricted universe multiverse
# deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ jammy-updates main restricted universe multiverse
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ jammy-backports main restricted universe multiverse
# deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ jammy-backports main restricted universe multiverse
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ jammy-security main restricted universe multiverse
# deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ jammy-security main restricted universe multiverse
```

**Ubuntu 20.04 (focal)**：

```bash
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal main restricted universe multiverse
# deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal main restricted universe multiverse
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal-updates main restricted universe multiverse
# deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal-updates main restricted universe multiverse
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal-backports main restricted universe multiverse
# deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal-backports main restricted universe multiverse
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal-security main restricted universe multiverse
# deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal-security main restricted universe multiverse
```

### 中科大源

将上述配置中的 `mirrors.tuna.tsinghua.edu.cn` 替换为 `mirrors.ustc.edu.cn` 即可。

## 🔹 DEB822 格式（/etc/apt/sources.list.d/ubuntu.sources）

适用于 **Ubuntu 24.04 及更新版本**。

### 一键替换（USTC）

```bash
sudo sed -i 's@//.*archive.ubuntu.com@//mirrors.ustc.edu.cn@g' /etc/apt/sources.list.d/ubuntu.sources
```

### 一键替换（TUNA）

```bash
sudo sed -i 's@//.*archive.ubuntu.com@//mirrors.tuna.tsinghua.edu.cn@g' /etc/apt/sources.list.d/ubuntu.sources
```

### 手动编辑

**Ubuntu 24.04 (noble)**：

```yaml
Types: deb
URIs: https://mirrors.tuna.tsinghua.edu.cn/ubuntu
Suites: noble noble-updates noble-backports
Components: main restricted universe multiverse
Signed-By: /usr/share/keyrings/ubuntu-archive-keyring.gpg

# 默认注释了源码镜像以提高 apt update 速度，如有需要可自行取消注释
# Types: deb-src
# URIs: https://mirrors.tuna.tsinghua.edu.cn/ubuntu
# Suites: noble noble-updates noble-backports
# Components: main restricted universe multiverse
# Signed-By: /usr/share/keyrings/ubuntu-archive-keyring.gpg

# 安全更新（建议保留官方源，镜像站同步有延迟）
Types: deb
URIs: http://security.ubuntu.com/ubuntu/
Suites: noble-security
Components: main restricted universe multiverse
Signed-By: /usr/share/keyrings/ubuntu-archive-keyring.gpg
```

**Ubuntu 26.04**（将 `noble` 替换为对应版本代号即可）。

> 如需使用 USTC 源，将 `mirrors.tuna.tsinghua.edu.cn` 替换为 `mirrors.ustc.edu.cn`。

## 🔹 更新软件源

```bash
sudo apt-get update
sudo apt-get upgrade
```

## 🔹 注意事项

::: warning 安全更新源
因镜像站同步有延迟，可能会导致生产环境系统不能及时检查、安装上最新的安全更新，**不建议替换 security 源**。
:::

::: tip
- 如果不需要源码包，保持 `deb-src` 行注释即可
- 如果遇到 GPG 错误，可能需要导入相应的密钥
- 从 Ubuntu 24.04 开始默认使用 DEB822 格式，传统格式仍兼容但建议使用新格式
:::

---

## 🔹 Ubuntu 版本代号趣闻

Ubuntu 的创始人 Mark Shuttleworth（马克·沙特尔沃思，南非富豪，上过太空）给 Ubuntu 定的规则：

- 必须由一个**形容词**和一个**动物名词**组成
- 两个单词的**首字母必须相同**
- 从 6.06 开始，按 **A-Z 英文字母表轮流往下排**

由于要凑相同首字母，还要找动物，导致后期的 Ubuntu 代号变成了"英语专业八级词汇考试"和"濒危野生动物大百科"。

| 版本号 | 代号 | 趣闻 |
|--------|------|------|
| 4.10 | warty | 有疣的乌猪（Warty Warthog）。处女作，自嘲有很多"不完美和瑕疵" |
| 5.04 | hoary | 灰白的刺猬（Hoary Hedgehog），代表对经典 Linux 的敬意 |
| 5.10 | breezy | 活泼的獾（Breezy Badger），这一代开始变得轻快好用 |
| 6.06 | dapper | 整洁的鸭嘴兽（Dapper Drake），A-Z 规律起点（D），第一个 LTS |
| 8.04 | hardy | 坚强的鹭鹰（Hardy Heron），稳如老狗的经典 LTS |
| 10.04 | lucid | 清晰的猞猁（Lucid Lynx），经典 LTS，UI 大改 |
| 12.04 | precise | 精准的穿山甲（Precise Pangolin），主打安全和稳定 |
| 14.04 | trusty | 可信赖的塔尔羊（Trusty Tahr），暗示高可用性 |
| 16.04 | xenial | 好客的非洲地松鼠（Xenial Xerus），词汇走向抽象的开始 |
| 18.04 | bionic | 仿生的海狸（Bionic Beaver），B 字母轮回，云原生和容器化的基石 |
| 20.04 | focal | 焦点的马岛獴（Focal Fossa），马达加斯加特有的顶级食肉动物 |
| 22.04 | jammy | 幸运的水母（Jammy Jellyfish），Jammy 英国俚语"走狗屎运" |
| 24.04 | noble | 高贵的袋食蚁兽（Noble Numbat），澳洲濒危有袋动物 |
| 26.04 | resolute | 果断的浣熊（Resolute Raccoon） |
