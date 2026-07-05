# Docker 配置代理（Linux）

在 Linux 系统中为 Docker 配置代理，可以让 Docker 拉取镜像时通过代理服务器访问网络，解决国内访问 Docker Hub 速度慢或无法访问的问题。

## 🔹 `daemon.json` 配置方法

### 1. 创建或编辑 Docker 配置文件

Docker 的代理配置文件位于 `/etc/docker/daemon.json`，如果该文件不存在，需要先创建：

```bash
sudo mkdir -p /etc/docker
sudo nano /etc/docker/daemon.json
```

::: tip 提示
如果文件已存在且包含其他配置，请在现有内容基础上添加 `proxies` 配置项，注意 JSON 格式的正确性。
:::

### 2. 添加代理配置

将以下内容写入配置文件：

```json
{
  "proxies": {
    "http-proxy": "http://127.0.0.1:7890",
    "https-proxy": "http://127.0.0.1:7890",
    "no-proxy": ""
  }
}
```

::: info 配置说明
- `http-proxy`：HTTP 代理地址和端口
- `https-proxy`：HTTPS 代理地址和端口
- `no-proxy`：不使用代理的地址列表，多个地址用逗号分隔
:::

::: tip 完整配置示例
如果 `daemon.json` 中还有其他配置（如镜像加速器），可以在现有内容基础上加入 `proxies` 配置项：

```json
{
  "registry-mirrors": [
    "https://docker.mirrors.ustc.edu.cn",
    "https://hub-mirror.c.163.com"
  ],
  "proxies": {
    "http-proxy": "http://127.0.0.1:7890",
    "https-proxy": "http://127.0.0.1:7890",
    "no-proxy": "localhost,127.0.0.1,*.aliyuncs.com"
  },
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "10m",
    "max-file": "3"
  },
  "runtimes": {
    "nvidia": {
      "args": [],
      "path": "nvidia-container-runtime"
    }
  }
}
```
:::

### 3. 重载配置并重启 Docker

配置完成后，需要重载 systemd 配置并重启 Docker 服务：

```bash
sudo systemctl daemon-reload
sudo systemctl restart docker
```

### 4. 验证配置是否生效

检查 Docker 配置信息，确认代理配置已加载：

```bash
cat /etc/docker/daemon.json
docker info | grep -i proxy
```

或者尝试拉取镜像测试：

```bash
docker pull hello-world
```

## 🔹 取消 `daemon.json` 代理

如需取消 `/etc/docker/daemon.json` 中的代理配置，有两种方法：

### 方法一：删除 proxies 配置项

编辑 `/etc/docker/daemon.json`，删除 `proxies` 配置项，保存后重启 Docker：

```bash
sudo nano /etc/docker/daemon.json
sudo systemctl daemon-reload
sudo systemctl restart docker
```

### 方法二：清空代理地址

将代理地址设置为空字符串：

```json
{
  "proxies": {
    "http-proxy": "",
    "https-proxy": "",
    "no-proxy": ""
  }
}
```

然后重启 Docker 服务。

## 🔹 systemd `.conf` 配置方法

除了直接写 `/etc/docker/daemon.json`，Linux 上也可以通过 systemd 的 drop-in 配置文件给 Docker daemon 设置代理。这种方式会把代理写成 Docker 服务的环境变量，配置文件通常放在 `/etc/systemd/system/docker.service.d/http-proxy.conf`。

::: tip 适用场景
- 适用于使用 systemd 管理 Docker 服务的 Linux 发行版
- 适合不想改动 `/etc/docker/daemon.json`，只想单独管理 Docker 服务代理的情况
- 如果 `daemon.json` 已经配置了 `proxies`，建议二选一，避免排查时混淆
:::

::: warning 注意
如果不需要在 `daemon.json` 中配置代理，可以让它保持为空对象：`echo '{}' | sudo tee /etc/docker/daemon.json`。如果 `daemon.json` 里还有 `registry-mirrors`、日志、运行时等其他 Docker 配置，不要直接清空文件，应该只删除其中的 `proxies` 配置项。
:::

### 1. 创建 systemd drop-in 目录

```bash
sudo mkdir -p /etc/systemd/system/docker.service.d
```

### 2. 写入代理配置文件

创建并编辑 `/etc/systemd/system/docker.service.d/http-proxy.conf`：

```bash
sudo nano /etc/systemd/system/docker.service.d/http-proxy.conf
```

写入以下内容：

```ini
[Service]
Environment="HTTP_PROXY=http://127.0.0.1:7890"
Environment="HTTPS_PROXY=http://127.0.0.1:7890"
Environment="NO_PROXY=localhost,127.0.0.1,172.17.0.0/16"
```

::: tip 提示
也可以不用 `nano`，直接用 `tee` 写入配置。比如代理服务在局域网主机 `192.168.31.233:7890` 上时：

```bash
sudo tee /etc/systemd/system/docker.service.d/http-proxy.conf > /dev/null <<'EOF'
[Service]
Environment="HTTP_PROXY=http://192.168.31.233:7890"
Environment="HTTPS_PROXY=http://192.168.31.233:7890"
Environment="NO_PROXY=localhost,127.0.0.1,192.168.31.0/24,172.17.0.0/16"
EOF
```
:::

其中：

- `HTTP_PROXY`：HTTP 代理地址
- `HTTPS_PROXY`：HTTPS 代理地址
- `NO_PROXY`：不走代理的地址，建议包含本机地址、局域网网段和 Docker 默认网段

::: tip 示例说明
上面的代理地址 `127.0.0.1:7890` 表示代理服务运行在 Docker 所在机器本机。如果代理服务在局域网其他机器上，请改成对应的局域网 IP 和端口。
:::

### 3. 重载 systemd 并重启 Docker

```bash
sudo systemctl daemon-reload
sudo systemctl restart docker
```

### 4. 验证配置是否生效

```bash
docker info | grep -i proxy
```

正常情况下会看到类似输出：

```text
HTTP Proxy: http://127.0.0.1:7890
HTTPS Proxy: http://127.0.0.1:7890
No Proxy: localhost,127.0.0.1,172.17.0.0/16
```

也可以查看当前 drop-in 配置：

```bash
systemctl cat docker
```

## 🔹 取消 systemd `.conf` 代理

如果使用的是 `/etc/systemd/system/docker.service.d/http-proxy.conf` 这种方式，删除该文件后重载并重启 Docker 即可：

```bash
sudo rm /etc/systemd/system/docker.service.d/http-proxy.conf
sudo systemctl daemon-reload
sudo systemctl restart docker
```

再执行下面命令确认代理已经移除：

```bash
docker info | grep -i proxy
```

## 🔹 Docker Compose 代理配置

如果使用 Docker Compose 构建镜像时需要代理，可以在 `docker-compose.yml` 中配置：

```yaml
version: '3'
services:
  app:
    build:
      context: .
      args:
        HTTP_PROXY: http://127.0.0.1:7890
        HTTPS_PROXY: http://127.0.0.1:7890
        NO_PROXY: localhost,127.0.0.1
```

## 🔹 常见问题

### 配置后无法拉取镜像

1. 检查代理服务器是否正常运行
2. 检查 JSON 格式是否正确（可使用 `jq` 工具验证）
3. 查看 Docker 日志：`sudo journalctl -u docker -n 50`

### 配置文件格式错误

使用 `jq` 工具验证 JSON 格式：

```bash
cat /etc/docker/daemon.json | jq .
```

如果有错误，会提示具体位置。

### Docker 无法启动

如果修改配置后 Docker 无法启动，可以查看详细错误信息：

```bash
sudo systemctl status docker
sudo journalctl -xeu docker
```

恢复备份配置：

```bash
sudo cp /etc/docker/daemon.json.bak /etc/docker/daemon.json
sudo systemctl restart docker
```

## 🔹 注意事项

::: tip 建议
- 修改配置文件前建议先备份：`sudo cp /etc/docker/daemon.json /etc/docker/daemon.json.bak`
- 确保 JSON 格式正确，否则 Docker 服务可能无法启动
- `no-proxy` 建议添加内网地址段，避免内网访问也走代理
- 代理配置对 Docker 守护进程生效，重启后持久保存
:::

::: warning 重要
- 配置代理后，所有 `docker pull`、`docker build` 等操作都会通过代理
- 如果代理服务器不稳定，可能影响 Docker 的正常使用
- 企业内网环境请遵守公司网络安全策略
:::

<br/>
<br/>
<br/>


> -----

# Docker Desktop GUI 界面配置代理

## 🔹 Docker Desktop GUI on Windows 配置步骤

### 1. 点击右上角的 **⚙️ 设置图标**，进入设置页面。

![/image/docker-desktop-proxy.png](/image/docker-desktop-proxy.png)

### 2. 左侧列表选中 Resources

### 3. 右边选中 Proxies

### 4. 找到 **Manual proxy configuration** 开关，将其打开。

### 5. 填写代理地址

在配置界面中填写代理服务器地址：
> 比如：
- **Web Server (HTTP)**：`http://192.168.31.84:7890`
- **Secure Web Server (HTTPS)**：`http://192.168.31.84:7890`
- **Bypass proxy settings for these hosts & domains**：`localhost,127.0.0.1,*.local`（可选）

::: tip 提示
- 根据你的实际情况修改代理服务器的 IP 地址和端口
- 如果是本地代理，使用 `127.0.0.1` 或 `localhost`
- 如果是局域网代理，使用局域网 IP 地址（如图中的 `192.168.31.84`）
:::

### 5. 应用配置

填写完成后，点击右下角的 **Apply & Restart** 或 **Close** 按钮，Docker 会自动应用配置并重启。


## 🔹 验证配置

配置完成后，可以在终端中测试拉取镜像：

```bash
docker pull hello-world
```
如果能够成功拉取，说明代理配置生效。

## 🔹 相关链接

- [CMD 使用 代理](./cmd-clash.md)
- [Git Bash 使用 Clash](./gitbash-clash.md)
- [PowerShell 使用 Clash](./powershell-clash.md)
- [proxychains 使用指南](./proxychains.md)
- [Docker 代理配置](./docker-proxy.md)
