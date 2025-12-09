# pip 换源

pip 是 Python 的包管理工具，更换为国内镜像源可以显著提升下载速度。

::: tip 安装 pip
部分 Linux 发行版（比如 Debian）会自带 Python 解释器，但可能不会自带 `venv` 和 `pip`，需要手动安装：

```bash
apt install python3-pip
```
:::

## 常用国内镜像源

### 清华源

```bash
pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple
```

### 阿里源

```bash
pip config set global.index-url https://mirrors.aliyun.com/pypi/simple/
```

### 腾讯源

```bash
pip config set global.index-url http://mirrors.cloud.tencent.com/pypi/simple
```

### 豆瓣源

```bash
pip config set global.index-url http://pypi.douban.com/simple/
```

## 换回默认源

如需恢复使用 pip 官方源：

```bash
pip config unset global.index-url
```

## 临时使用镜像源

如果只想临时使用某个镜像源安装包，而不修改全局配置：

```bash
# 比如 临时使用清华源
pip install numpy -i https://pypi.tuna.tsinghua.edu.cn/simple
```

## 查看当前配置

查看 pip 的当前配置：

```bash
pip config list
```

## 配置文件位置

pip 的配置文件位置：

- **Linux/macOS**：`~/.pip/pip.conf` 或 `~/.config/pip/pip.conf`
- **Windows**：`%APPDATA%\pip\pip.ini` 或 `C:\Users\<用户名>\pip\pip.ini`

## 注意事项

::: warning 注意
- 某些镜像源可能不支持 HTTPS，如果遇到 SSL 错误，可以尝试使用 HTTP 协议
- 镜像源的同步可能存在延迟，如果找不到最新版本的包，可以临时切换回官方源
:::

## 参考来源

> 作者：waws520  
> 链接：[https://juejin.cn/post/7141566114412101662](https://juejin.cn/post/7141566114412101662)

## 相关链接
- [pip 换源](./pip.md)
- [Ubuntu 22 换源](./ubuntu22.md)
- [Debian 换源](./debian.md)
