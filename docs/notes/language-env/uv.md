# 安装 UV

⚡️UV 是一个极快的 Python 包管理器和项目管理工具，由 Astral 团队开发，**旨在取代 pip + pip-tools + pipx + poetry + pyenv + virtualenv**。

## 🔹 UV 的优势

| 特性 | uv | pip |
|------|----|-----|
| ⚡ 安装速度 | **快 10-100 倍**（Rust 编写） | 慢 |
| 📦 虚拟环境 | 内置 `uv venv`，一条命令创建 | 需额外安装 `virtualenv` |
| 🔄 依赖解析 | 全局锁文件 `uv.lock`，依赖解析极快 | `pip freeze` 不可靠 |
| 🐍 Python 版本管理 | 内置 `uv python install`，自动下载 Python | 需额外安装 `pyenv` |
| 🌍 项目级管理 | `uv init` / `uv add` / `uv sync` 一站式 | 仅包安装，不管理项目 |
| 🔗 pip 兼容 | 完全兼容 `uv pip install` 语法 | — |
| 🌐 国内镜像 | 一键安装脚本自动配置清华源 | 需手动 `pip config set` |

## 🔹 官方安装方式（国际网络环境）

如果处于国际网络环境，可以直接使用官方安装脚本：

Linux/macOS：

```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
```

Windows PowerShell：

```powershell
powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"
```

## 🔹 国内镜像源安装（推荐）

在特殊网络环境下，推荐使用国内镜像源安装：

### Gitee 固定版本示例

> 下面以 `0.10.10` 为例，方便理解下载地址里的版本号位置。

Linux/macOS：

```bash
curl -LsSf https://gitee.com/wangnov/uv-custom/releases/download/0.10.10/uv-installer-custom.sh | sh
```

Windows PowerShell：

```powershell
powershell -ExecutionPolicy Bypass -c "irm https://gitee.com/wangnov/uv-custom/releases/download/0.10.10/uv-installer-custom.ps1 | iex"
```

### Gitee 自动获取最新版

> 日常使用更推荐自动获取最新版，避免文档里的版本号过时。

Linux/macOS：

```bash
UV_CUSTOM_VERSION="$(curl -fsSL https://gitee.com/api/v5/repos/wangnov/uv-custom/releases/latest | sed -n 's/.*"tag_name"[[:space:]]*:[[:space:]]*"\([^"]*\)".*/\1/p')"
curl -LsSf "https://gitee.com/wangnov/uv-custom/releases/download/${UV_CUSTOM_VERSION}/uv-installer-custom.sh" | sh
```

Windows PowerShell：

```powershell
$version = (irm https://gitee.com/api/v5/repos/wangnov/uv-custom/releases/latest).tag_name
powershell -ExecutionPolicy Bypass -c "irm https://gitee.com/wangnov/uv-custom/releases/download/$version/uv-installer-custom.ps1 | iex"
```

::: tip 安装失败的解决方案
如果安装失败，可以尝试以下方法：
- 先配置命令行代理环境变量：[Linux Bash 使用代理](/notes/shell-proxy/linux-bash-clash)
- 或者先配置 proxychains4 bash 环境：[proxychains 使用指南](/notes/shell-proxy/proxychains)

这两种方法都可以帮助你在网络受限的环境下成功下载和安装 UV。
:::

## 🔹 验证安装

```bash
# 打印版本号和绝对路径
uv --version
which uv
# 查看当前用户的uv配置文件
cat ~/.config/uv/uv.toml
```

::: details 安装完成后的输出示例
```shell{2-12}
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
```shell{2-6}
root@S43LYjdh3w4zO:/data/maibot# cat /root/.config/uv/uv.toml
python-install-mirror = "https://ghfast.top/https://github.com/astral-sh/python-build-standalone/releases/download"

[[index]]
url = "https://pypi.tuna.tsinghua.edu.cn/simple"
default = true
root@S43LYjdh3w4zO:/data/maibot#
```

确认 UV 版本和路径：
```shell{2,4}
root@S43LYjdh3w4zO:/data/maibot# uv --version
uv 0.9.16
root@S43LYjdh3w4zO:/data/maibot# which uv
/root/.local/bin/uv
root@S43LYjdh3w4zO:/data/maibot#
```
:::

## 🔹 UV 配置文件

上面的 Gitee 安装脚本可以一键安装 UV，并自动配置 Python 下载代理和 PyPI 镜像源。

配置文件位于 `/root/.config/uv/uv.toml`（或 `~/.config/uv/uv.toml`）。当然，也可以自己手动给 UV 换源，比如参考中科大 PyPI 镜像说明：<https://mirrors.ustc.edu.cn/help/pypi.html>。

### 手动换源到 USTC

如果想手动改成中科大 PyPI 镜像，可以编辑全局配置：

```bash
mkdir -p ~/.config/uv
nano ~/.config/uv/uv.toml
```

写入：

```toml
[[index]]
url = "https://mirrors.ustc.edu.cn/pypi/simple"
default = true
```

也可以只给当前项目配置，在项目根目录的 `uv.toml` 或 `pyproject.toml` 中写入同样内容。

::: warning
设置 `index` 可能会改变 `uv.lock` 内容。如果需要提交 `uv.lock`，可以在提交前临时执行：

```bash
UV_INDEX=https://pypi.org/simple uv lock --refresh
```
:::

## 🔹 基本使用

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

## 🔹 相关链接

- [UV 官方文档 [https://docs.astral.sh/uv/] ](https://docs.astral.sh/uv/)
- [UV GitHub 仓库 [https://github.com/astral-sh/uv] ](https://github.com/astral-sh/uv)
- [UV 国内镜像源 [https://gitee.com/wangnov/uv-custom] ](https://gitee.com/wangnov/uv-custom)
- [Astral 官网 [https://astral.sh/] ](https://astral.sh/)
