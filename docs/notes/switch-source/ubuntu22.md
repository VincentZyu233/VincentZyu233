# Ubuntu 22.04 (Jammy) 换源

Ubuntu 22.04 LTS（代号 Jammy Jellyfish）更换为国内镜像源可以显著提升软件包下载速度。

## 快速换源步骤

### 1. 备份原文件

在修改前，先备份原始的 sources.list 文件：

```bash
cp /etc/apt/sources.list /etc/apt/sources.list.bak
```

### 2. 编辑 sources.list 文件

清空 `sources.list` 文件中的内容，然后将以下任何一个源复制到文件中：

```bash
vim /etc/apt/sources.list
```

或使用 nano 编辑器：

```bash
sudo nano /etc/apt/sources.list
```

### 3. 更新软件源

保存文件后，执行以下命令更新软件源：

```bash
sudo apt-get update
sudo apt-get upgrade
```

## 国内镜像源列表

### 阿里源（推荐）

```bash
deb http://mirrors.aliyun.com/ubuntu/ jammy main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ jammy main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ jammy-security main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ jammy-security main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ jammy-updates main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ jammy-updates main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ jammy-proposed main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ jammy-proposed main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ jammy-backports main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ jammy-backports main restricted universe multiverse
```

### 清华源

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

### 中科大源

```bash
deb https://mirrors.ustc.edu.cn/ubuntu/ jammy main restricted universe multiverse
deb-src https://mirrors.ustc.edu.cn/ubuntu/ jammy main restricted universe multiverse
deb https://mirrors.ustc.edu.cn/ubuntu/ jammy-updates main restricted universe multiverse
deb-src https://mirrors.ustc.edu.cn/ubuntu/ jammy-updates main restricted universe multiverse
deb https://mirrors.ustc.edu.cn/ubuntu/ jammy-backports main restricted universe multiverse
deb-src https://mirrors.ustc.edu.cn/ubuntu/ jammy-backports main restricted universe multiverse
deb https://mirrors.ustc.edu.cn/ubuntu/ jammy-security main restricted universe multiverse
deb-src https://mirrors.ustc.edu.cn/ubuntu/ jammy-security main restricted universe multiverse
deb https://mirrors.ustc.edu.cn/ubuntu/ jammy-proposed main restricted universe multiverse
deb-src https://mirrors.ustc.edu.cn/ubuntu/ jammy-proposed main restricted universe multiverse
```

### 网易 163 源

```bash
deb http://mirrors.163.com/ubuntu/ jammy main restricted universe multiverse
deb http://mirrors.163.com/ubuntu/ jammy-security main restricted universe multiverse
deb http://mirrors.163.com/ubuntu/ jammy-updates main restricted universe multiverse
deb http://mirrors.163.com/ubuntu/ jammy-proposed main restricted universe multiverse
deb http://mirrors.163.com/ubuntu/ jammy-backports main restricted universe multiverse
deb-src http://mirrors.163.com/ubuntu/ jammy main restricted universe multiverse
deb-src http://mirrors.163.com/ubuntu/ jammy-security main restricted universe multiverse
deb-src http://mirrors.163.com/ubuntu/ jammy-updates main restricted universe multiverse
deb-src http://mirrors.163.com/ubuntu/ jammy-proposed main restricted universe multiverse
deb-src http://mirrors.163.com/ubuntu/ jammy-backports main restricted universe multiverse
```

## 注意事项

::: tip 提示
- 如果不需要源码包，可以删除或注释掉 `deb-src` 开头的行
- `jammy-proposed` 仓库包含测试中的软件包，建议按需启用
- 如果遇到 GPG 错误，可能需要导入相应的密钥
:::

::: warning 恢复原始配置
如果换源后出现问题，可以使用以下命令恢复原始配置：

```bash
sudo cp /etc/apt/sources.list.bak /etc/apt/sources.list
sudo apt-get update
```
:::

## 参考来源

> 链接：[https://www.cnblogs.com/hunttown/p/17352465.html](https://www.cnblogs.com/hunttown/p/17352465.html)

## 相关链接

- [pip 换源](./pip.md)
- [Ubuntu 22 换源](./ubuntu22.md)
- [Debian 换源](./debian.md)
