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

## 各版本镜像源配置

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
- [Ubuntu 22 换源](./ubuntu22.md)
- [Debian 换源](./debian.md)
