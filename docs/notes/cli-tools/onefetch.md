# onefetch 简单说明

> <https://github.com/o2sh/onefetch>

## 🔹 安装

- **Windows**：`scoop install onefetch`
- **Arch Linux**：`pacman -S onefetch`
- **macOS**：`brew install onefetch`
- **GitHub Releases**：下载二进制放到 PATH 即可

## 🔹 用法

在 Git 仓库目录里直接运行：

```bash
onefetch
```

显示更多语言：

```bash
onefetch --number-of-languages 999
```

默认最多显示 6 种语言，把 `--number-of-languages` 设大一些可以尽量显示全部语言。

::: tip 统计隐藏目录里的代码
如果项目代码在隐藏目录里，比如 VitePress 的 `docs/.vitepress`，可以加上 `--include-hidden`：

```bash
onefetch --include-hidden --number-of-languages 999
```

这样可以把 `.vitepress` 里的 Vue、TypeScript、CSS 等代码也统计进去。

![onefetch 统计 VitePress 隐藏目录代码的效果](/image/onefetch.example.VincentZyu233.GitHub.VitePress.Blog.Profile.png)
:::

## 🔹 持久化语言数量

onefetch 目前主要通过命令行参数配置，没有类似 `config.toml` 的配置文件。想固定显示更多语言和隐藏目录，可以给命令加 shell alias 或函数。

PowerShell：

```powershell
'function oal { onefetch --include-hidden --number-of-languages 999 @args }' >> $PROFILE
```

Bash/Zsh：

```bash
echo "alias oal='onefetch --include-hidden --number-of-languages 999'" >> ~/.bashrc
```

之后在仓库目录里运行：

```bash
oal
```

> `oal` 是 `onefetch-all-lang` 的缩写，表示尽量显示全部语言。你也可以改成自己喜欢的别名。

## 🔹 最终效果

![onefetch展示本地Git仓库信息的效果](/image/onefetch.example.winload.png)

## 🔹 相关链接

- [onefetch GitHub 仓库](https://github.com/o2sh/onefetch)
