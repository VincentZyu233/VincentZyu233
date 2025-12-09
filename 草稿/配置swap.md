部分指令需要root权限，要么用root操作 要么用sudo

```shell
fallocate -l 2G /swapfile
# 如果用不了就用dd
dd if=/dev/zero of=/swapfile bs=1M count=2048

# 为了安全，只有 root 用户应该能够读写这个 swapfile。
chmod 600 /swapfile
mkswap /swapfile
swapon /swapfile
# 验证是否启用
swapon --show
free -m
apt install htop
htop

# 持久化，重启自动挂载
echo '/swapfile none swap sw 0 0' >> /etc/fstab
# 或者使用nano
nano /etc/fstab
# 确保有这一行： /swapfile none swap sw 0 0
# 可以用 PageDown键 和 ↓键翻到最底下，部分终端用右键粘贴，或者ctrl+shift+v
# ctrl+x 保存

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