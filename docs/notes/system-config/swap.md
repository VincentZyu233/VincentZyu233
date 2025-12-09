# 配置 Swap

部分指令需要root权限，要么用root操作 要么用sudo

## 创建 Swap 文件

```shell
# 比如我需要一个2G的swapfile
fallocate -l 2G /swapfile
# 如果用不了就用dd
dd if=/dev/zero of=/swapfile bs=1M count=2048
```

## 设置权限并启用 Swap

```shell
# 为了安全，只有 root 用户应该能够读写这个 swapfile。
chmod 600 /swapfile
mkswap /swapfile
swapon /swapfile
```

## 验证 Swap 是否启用

```shell
# 验证是否启用
swapon --show
free -m
apt install htop
htop
```

## 持久化配置

### 重启自动挂载

```shell
# 持久化，重启自动挂载
echo '/swapfile none swap sw 0 0' >> /etc/fstab
# 或者使用nano
nano /etc/fstab
# 确保有这一行： /swapfile none swap sw 0 0
# 可以用 PageDown键 和 ↓键翻到最底下，部分终端用右键粘贴，或者ctrl+shift+v
# ctrl+x 保存
```

### 调整 Swappiness

```shell
# 临时调整swapiness
sysctl vm.swappiness=90

# 持久化swapiness
echo 'vm.swappiness=90' >> /etc/sysctl.conf
# 或者使用nano
nano /etc/sysctl.conf
# 确保有这一行： vm.swappiness=90
# 可以用 PageDown键 和 ↓键翻到最底下，部分终端用右键粘贴，或者ctrl+shift+v
# ctrl+x 保存
# 运行以下命令使 /etc/sysctl.conf 的更改立即生效，无需重启。
sysctl -p
# 验证是否生效
cat /proc/sys/vm/swappiness
```

## 适用系统

::: info 适用的 Linux 发行版
以上操作适用于大多数主流 Linux 发行版，包括但不限于：

**完全适用（Debian 体系）：**
- Debian（如 Bookworm、Bullseye 等）
- Ubuntu（及其所有衍生版本，如 Kubuntu、Linux Mint、Pop!_OS 等）
- Kali Linux

**基本适用（Red Hat/Fedora 体系）：**
- CentOS / RHEL（8/9 及以上）
- Fedora
- Rocky Linux / AlmaLinux

**普遍适用（其他主流发行版）：**
- Arch Linux / Manjaro
- openSUSE

**核心命令通用性：**
- `fallocate`、`dd`、`chmod`、`mkswap`、`swapon`、`/etc/fstab`、`sysctl` 是 Linux 内核和文件系统层面的标准工具，几乎所有发行版都支持

我自己已经在多台 Debian 和 Ubuntu 服务器上成功配置过 Swap，都没有遇到问题。其他发行版就不知道了，因为用的不多(
:::

## 配置示例

::: details 在 Debian 12 (bookworm) 上的配置示例
刚刚在一台 Debian 云服务器上测试通过：

```shell
root@S43LYjdh3w4zO:~# neofetch
       _,met$$$$$gg.          root@S43LYjdh3w4zO
    ,g$$$$$$$$$$$$$$$P.       ------------------
  ,g$$P"     """Y$$.".        OS: Debian GNU/Linux 12 (bookworm) x86_64
 ,$$P'              `$$$.     Host: KVM RHEL 7.6.0 PC (i440FX + PIIX, 1996)
',$$P       ,ggs.     `$$b:   Kernel: 6.1.0-10-amd64
`d$$'     ,$P"'   .    $$$    Uptime: 27 mins
 $$P      d$'     ,    $$P    Packages: 501 (dpkg)
 $$:      $$.   -    ,d$$'    Shell: bash 5.2.15
 $$;      Y$b._   _,d$P'      Resolution: 1024x768
 Y$$.    `.`"Y$$$$P"'         Terminal: /dev/pts/0
 `$$b      "-.__              CPU: Intel Xeon E5-2686 v4 (1) @ 2.294GHz
  `Y$$                        GPU: 00:02.0 Cirrus Logic GD 5446
   `Y$$.                      Memory: 104MiB / 1919MiB
     `$$b.
       `Y$$b.
          `"Y$b._
              `"""

root@S43LYjdh3w4zO:~# free -m
               total        used        free      shared  buff/cache   available
Mem:            1919         253        1250           2         566        1665
Swap:           2047           0        2047
root@S43LYjdh3w4zO:~#
```

可以看到，Swap 已经成功配置为 2047 MB (约 2GB)。
:::


