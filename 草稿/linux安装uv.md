安装 UV

# 官方安装方式
curl -LsSf https://astral.sh/uv/install.sh | sh

# 使用国内镜像源安装 UV（推荐）
curl -LsSf https://gitee.com/wangnov/uv-custom/releases/download/0.9.16/uv-installer-custom.sh | sh

验证安装：


uv --version
which uv

(detailbox 默认折叠)
安装完成以后会这样输出：
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

# 看看uv的toml配置文件捏：
root@S43LYjdh3w4zO:/data/maibot# cat /root/.config/uv/uv.toml
python-install-mirror = "https://ghfast.top/https://github.com/astral-sh/python-build-standalone/releases/download"

[[index]]
url = "https://pypi.tuna.tsinghua.edu.cn/simple"
default = true
root@S43LYjdh3w4zO:/data/maibot#
# 666还真自动配了，这个好o(￣▽￣)ｄ

# 确认uv版本和路径：
uv --version
which uv
# 这样就说明成了：
root@S43LYjdh3w4zO:/data/maibot# uv --version
uv 0.9.16
root@S43LYjdh3w4zO:/data/maibot# which uv
/root/.local/bin/uv
root@S43LYjdh3w4zO:/data/maibot#
(detailbox结束)