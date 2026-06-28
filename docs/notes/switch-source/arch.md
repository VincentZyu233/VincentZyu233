# Arch Linux 换源

## 镜像站地址

| 镜像站 | URL |
|--------|-----|
| TUNA（清华） | `https://mirrors.tuna.tsinghua.edu.cn/archlinux/$repo/os/$arch` |
| USTC（中科大） | `https://mirrors.ustc.edu.cn/archlinux/$repo/os/$arch` |

## 换源步骤

### 1. 备份原文件

```bash
sudo cp /etc/pacman.d/mirrorlist /etc/pacman.d/mirrorlist.bak
```

### 2. 编辑 mirrorlist

```bash
sudo nano /etc/pacman.d/mirrorlist
```

### 3. 添加镜像源

在文件最前面添加：

```
Server = https://mirrors.tuna.tsinghua.edu.cn/archlinux/$repo/os/$arch
Server = https://mirrors.ustc.edu.cn/archlinux/$repo/os/$arch
```

### 4. 更新软件源

```bash
sudo pacman -Syyu
```
