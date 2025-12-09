# Linux 安装 UV

⚡️UV 是一个极快的 Python 包管理器和项目管理工具，由 Astral 团队开发。

## 官方安装方式（国际网络环境）

如果处于国际网络环境，可以直接使用官方安装脚本：

```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
```

## 国内镜像源安装（推荐）

在特殊网络环境下，推荐使用国内镜像源安装：

```bash
curl -LsSf https://gitee.com/wangnov/uv-custom/releases/download/0.9.16/uv-installer-custom.sh | sh
```

::: tip 安装失败的解决方案
如果安装失败，可以尝试以下方法：
- 先配置命令行代理环境变量：[Linux Bash 使用代理](/notes/shell-proxy/linux-bash-clash)
- 或者先配置 proxychains4 bash 环境：[proxychains 使用指南](/notes/shell-proxy/proxychains)

这两种方法都可以帮助你在网络受限的环境下成功下载和安装 UV。
:::

## 验证安装

```bash
# 打印版本号和绝对路径
uv --version
which uv
# 查看当前用户的uv配置文件
cat ~/.config/uv/uv.toml
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
root@S43LYjdh3w4zO:/data/maibot#
```

查看 UV 配置文件：
```shell
root@S43LYjdh3w4zO:/data/maibot# cat /root/.config/uv/uv.toml
python-install-mirror = "https://ghfast.top/https://github.com/astral-sh/python-build-standalone/releases/download"

[[index]]
url = "https://pypi.tuna.tsinghua.edu.cn/simple"
default = true
root@S43LYjdh3w4zO:/data/maibot#
```

确认 UV 版本和路径：
```shell
root@S43LYjdh3w4zO:/data/maibot# uv --version
uv 0.9.16
root@S43LYjdh3w4zO:/data/maibot# which uv
/root/.local/bin/uv
root@S43LYjdh3w4zO:/data/maibot#
```
:::

## UV 配置文件

国内镜像源安装脚本会自动配置 UV，配置文件位于 `/root/.config/uv/uv.toml`（或 `~/.config/uv/uv.toml`）。

配置内容包括：
- **Python 下载代理**：加速 Python 解释器下载
- **PyPI 镜像源**：使用清华源加速包下载

## 基本使用

### 创建虚拟环境

```bash
# 创建虚拟环境
uv venv

# 创建指定 Python 版本的虚拟环境
uv venv --python 3.11
```

### 安装包

```bash
# 安装单个包
uv pip install package-name

# 从 requirements.txt 安装
uv pip install -r requirements.txt

# 指定镜像源安装
uv pip install package-name -i https://mirrors.aliyun.com/pypi/simple
```

## 相关链接

- [UV 官方文档 [https://docs.astral.sh/uv/] ](https://docs.astral.sh/uv/)
- [UV GitHub 仓库 [https://github.com/astral-sh/uv] ](https://github.com/astral-sh/uv)
- [UV 国内镜像源 [https://gitee.com/wangnov/uv-custom] ](https://gitee.com/wangnov/uv-custom)
- [Astral 官网 [https://astral.sh/] ](https://astral.sh/)
