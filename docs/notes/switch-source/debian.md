# Debian 换源

Debian 系统更换为国内镜像源可以显著提升软件包下载速度。本文提供 Debian 11、12、13 的中科大镜像源配置。

## 快速换源步骤

### 1. 备份原文件

```bash
sudo cp /etc/apt/sources.list /etc/apt/sources.list.bak
```

### 2. 编辑 sources.list 文件

```bash
sudo nano /etc/apt/sources.list
```

### 3. 替换为对应版本的源

根据你的 Debian 版本，选择下面对应的源配置复制到文件中。

### 4. 更新软件源

```bash
sudo apt-get update
sudo apt-get upgrade
```

## DEB822 格式（Debian 12+）

从 Debian 12 (Bookworm) 开始，容器镜像和 Trixie 已使用 DEB822 格式，路径为 `/etc/apt/sources.list.d/debian.sources`。

### 一键替换（USTC）

```bash
sudo sed -i 's/deb.debian.org/mirrors.ustc.edu.cn/g' /etc/apt/sources.list.d/debian.sources
```

### 手动编辑

编辑 `/etc/apt/sources.list.d/debian.sources`：

**Debian 13 (Trixie)**：

```yaml
Types: deb
URIs: http://mirrors.ustc.edu.cn/debian
Suites: trixie trixie-updates trixie-backports
Components: main contrib non-free non-free-firmware
Signed-By: /usr/share/keyrings/debian-archive-keyring.gpg

Types: deb
URIs: http://mirrors.ustc.edu.cn/debian-security
Suites: trixie-security
Components: main contrib non-free non-free-firmware
Signed-By: /usr/share/keyrings/debian-archive-keyring.gpg
```

**Debian 12 (Bookworm)**：

```yaml
Types: deb
URIs: http://mirrors.ustc.edu.cn/debian
Suites: bookworm bookworm-updates bookworm-backports
Components: main contrib non-free non-free-firmware
Signed-By: /usr/share/keyrings/debian-archive-keyring.gpg

Types: deb
URIs: http://mirrors.ustc.edu.cn/debian-security
Suites: bookworm-security
Components: main contrib non-free non-free-firmware
Signed-By: /usr/share/keyrings/debian-archive-keyring.gpg
```

> 如需使用清华源，将 `mirrors.ustc.edu.cn` 替换为 `mirrors.tuna.tsinghua.edu.cn` 即可。

更新软件源：

```bash
sudo apt-get update
```

## 各版本镜像源配置（传统格式）

### Debian 13 (Trixie)

```bash
# 默认注释了源码仓库，如有需要可自行取消注释
deb http://mirrors.ustc.edu.cn/debian trixie main contrib non-free non-free-firmware
# deb-src http://mirrors.ustc.edu.cn/debian trixie main contrib non-free non-free-firmware
deb http://mirrors.ustc.edu.cn/debian trixie-updates main contrib non-free non-free-firmware
# deb-src http://mirrors.ustc.edu.cn/debian trixie-updates main contrib non-free non-free-firmware

# backports 软件源，请按需启用
# deb http://mirrors.ustc.edu.cn/debian trixie-backports main contrib non-free non-free-firmware
# deb-src http://mirrors.ustc.edu.cn/debian trixie-backports main contrib non-free non-free-firmware
```

### Debian 12 (Bookworm)

```bash
# 默认注释了源码仓库，如有需要可自行取消注释
deb http://mirrors.ustc.edu.cn/debian bookworm main contrib non-free non-free-firmware
# deb-src http://mirrors.ustc.edu.cn/debian bookworm main contrib non-free non-free-firmware
deb http://mirrors.ustc.edu.cn/debian bookworm-updates main contrib non-free non-free-firmware
# deb-src http://mirrors.ustc.edu.cn/debian bookworm-updates main contrib non-free non-free-firmware

# backports 软件源，请按需启用
# deb http://mirrors.ustc.edu.cn/debian bookworm-backports main contrib non-free non-free-firmware
# deb-src http://mirrors.ustc.edu.cn/debian bookworm-backports main contrib non-free non-free-firmware
```

### Debian 11 (Bullseye)

```bash
# 默认注释了源码仓库，如有需要可自行取消注释
deb http://mirrors.ustc.edu.cn/debian bullseye main contrib non-free
# deb-src http://mirrors.ustc.edu.cn/debian bullseye main contrib non-free
deb http://mirrors.ustc.edu.cn/debian bullseye-updates main contrib non-free
# deb-src http://mirrors.ustc.edu.cn/debian bullseye-updates main contrib non-free

# backports 软件源，请按需启用
# deb http://mirrors.ustc.edu.cn/debian bullseye-backports main contrib non-free
# deb-src http://mirrors.ustc.edu.cn/debian bullseye-backports main contrib non-free
```

## Debian 版本代号

| 版本号 | 代号 (Codename) | 发布时间 |
|--------|----------------|----------|
| Debian 13 | Trixie | 测试版 |
| Debian 12 | Bookworm | 2023 年 6 月 |
| Debian 11 | Bullseye | 2021 年 8 月 |
| Debian 10 | Buster | 2019 年 7 月 |

## 查看当前 Debian 版本

如果不确定当前系统的版本，可以使用以下命令查看：

```bash
cat /etc/debian_version
```

或者查看详细信息：

```bash
lsb_release -a
```

## 软件源组件说明

- **main**：完全自由的软件包
- **contrib**：自由软件，但依赖非自由软件
- **non-free**：非自由软件包
- **non-free-firmware**：非自由固件（Debian 12+ 新增）

## 其他国内镜像源

除了中科大源，还可以使用以下镜像源：

### 清华源

将上述配置中的 `mirrors.ustc.edu.cn` 替换为：

```
mirrors.tuna.tsinghua.edu.cn
```

### 阿里源

将上述配置中的 `mirrors.ustc.edu.cn` 替换为：

```
mirrors.aliyun.com
```

### 网易 163 源

将上述配置中的 `mirrors.ustc.edu.cn` 替换为：

```
mirrors.163.com
```

## 注意事项

::: tip 提示
- Debian 12 及以上版本新增了 `non-free-firmware` 组件，用于非自由固件
- `backports` 仓库包含从新版本移植的软件包，建议按需启用
- 如果不需要源码包，保持 `deb-src` 行注释即可
:::

::: warning 恢复原始配置
如果换源后出现问题，可以使用备份文件恢复：

```bash
sudo cp /etc/apt/sources.list.bak /etc/apt/sources.list
sudo apt-get update
```
:::

## 参考来源

> 链接：[https://mirrors.ustc.edu.cn/help/debian.html](https://mirrors.ustc.edu.cn/help/debian.html)

## 相关链接

- [pip 换源](./pip.md)
- [Ubuntu 换源](./ubuntu)
- [Debian 换源](./debian.md)

---

## 🎬 Debian 版本代号彩蛋：玩具总动员（Toy Story）

Debian 的创始人 Ian Murdock 是一个大影迷。1996 年 Debian 准备发布 1.1 版本时，恰逢皮克斯的第一部《玩具总动员》电影大火。Ian 决定用电影里的角色来命名版本，这个传统就此流传了下来。

| 版本号 | 代号 | 角色原型 |
|--------|------|----------|
| 1.1 | buzz | 巴斯光年（Buzz Lightyear），Debian 第一个有代号的版本 |
| 1.2 | rex | 抱抱龙（Rex），那只看起来威猛实际胆小的绿色恐龙 |
| 1.3 | bo | 牧羊女（Bo Peep），胡迪的女朋友 |
| 2.0 | hamm | 火腿（Hamm），小猪储蓄罐 |
| 2.1 | slink | 弹簧狗（Slinky Dog） |
| 2.2 | potato | 蛋头先生（Mr. Potato Head） |
| 3.0 | woody | 胡迪（Woody），绝对主角，Debian 走向成熟的里程碑 |
| 4.0 | etch | 神奇画板（Etch），红框两个旋钮的画板 |
| 5.0 | lenny | 望远镜（Lenny），双筒望远镜腿的小家伙 |
| 6.0 | squeeze | 三眼仔（Squeeze Toy Aliens），抓娃娃机里的绿色外星人 |
| 7.0 | wheezy | 企鹅（Wheezy），坏了吱吱声芯片的玩具企鹅 |
| 8.0 | jessie | 翠丝（Jessie），第二部登场的女牛仔 |
| 9.0 | stretch | 小玛（Stretch），第三部里紫色的章鱼玩具 |
| 10.0 | buster | 红心 / 巴斯特（Buster），安迪家的宠物狗 |
| 11.0 | bullseye | 红心（Bullseye），胡迪的坐骑马 |
| 12.0 | bookworm | 书虫（Bookworm），第三部戴眼镜的绿条纹书虫 |
| 13.0 | trixie | 三角龙（Trixie），喜欢玩电脑游戏的蓝色三角龙 |
| 14.0 | forky | 叉叉（Forky），第四部用一次性叉勺改造的主角 |
| 15.0 | galloping | 奔驰，来自 Bullseye 的全称 "Galloping Bullseye" |

**永远的测试版 sid**：阿布 / 席德，电影里那个专门摧毁、肢解玩具的邻居坏小孩。Debian 把永远处于非稳定、随时可能滚坏系统的 `unstable` 分支命名为 Sid，简直是神来之笔。
