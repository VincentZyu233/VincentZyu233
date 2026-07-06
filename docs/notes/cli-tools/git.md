# Git 跨平台通用指令与安装

> <https://git-scm.com/>

Git 自带一套完全跨平台的内建指令，在 Windows（CMD / PowerShell）和 Linux 下语法 100% 一致，无需依赖任何系统专有命令。

## 🔹 安装

- **官网下载**：<https://git-scm.com/downloads>（Windows / macOS / Linux 二进制安装包）
- **Windows**：`scoop install git`
- **Debian / Ubuntu**：`sudo apt install git`
- **Arch Linux**：`sudo pacman -Syu git`
- **AUR**：`paru -S git`
- **Alpine**：`apk add git`
- **Termux**：`pkg install git`

## 🔹 设置代理

Git 原生支持代理设置，在任何操作系统的任何终端里指令完全一致：

```bash
# 设置代理（请将端口替换为你自己的，支持 http 或 socks5）
git config --global http.proxy http://127.0.0.1:7890
git config --global https.proxy http://127.0.0.1:7890

# 查看是否设置成功
git config --global --get http.proxy

# 取消代理
git config --global --unset http.proxy
git config --global --unset https.proxy
```

## 🔹 查看仓库大小

在已克隆的本地仓库根目录下执行：

```bash
git count-objects -vH
```

| 参数 | 说明 |
|------|------|
| `-v` | 详细输出（Verbose） |
| `-H` | 人类可读格式（Human-readable），如 KiB、MiB |

::: tip
输出中 `size-pack` 那一行就是整个 Git 仓库（含所有历史记录、分支、提交）在磁盘上的实际大小。
:::

## 🔹 排查仓库大文件

通常大家会用 `du` 或 `find` 配合 `sort` 来排查大文件，但那些语法在 Windows 和 Linux 下是割裂的。Git 内建的 `git rev-list` + `git cat-file` 可以完全跨平台地分析仓库对象，包括历史记录中已删除但仍占空间的大文件。

### 列出所有对象及大小

```bash
git rev-list --objects --all | git cat-file --batch-check="%(objectsize:disk) %(objectname) %(rest)"
```

输出格式为 `[占用磁盘字节数] [文件Hash] [文件路径]`，覆盖仓库有史以来存在过的所有文件（含历史提交）。

### 排序查看 Top 10 大文件

::: tip Bash（Linux / macOS / Windows Git Bash）
```bash
git rev-list --objects --all \
  | git cat-file --batch-check="%(objectsize:disk) %(objectname) %(rest)" \
  | sort -rn \
  | head -n 10
```
:::

::: tip PowerShell
```powershell
git rev-list --objects --all \
  | git cat-file --batch-check="%(objectsize:disk) %(objectname) %(rest)" \
  | Sort-Object { [long]($_ -split ' ')[0] } -Descending \
  | Select-Object -First 10
```
:::

## 🔹 git-sizer 跨平台分析工具

> <https://github.com/github/git-sizer>

Git 官方推荐的跨平台单文件工具，Go 语言编写，无任何依赖。下载对应平台的二进制文件放入环境变量即可使用。

### 安装

- **官网下载**：<https://github.com/github/git-sizer/releases>
- **Windows**：`scoop install git-sizer`
- **Arch Linux (AUR)**：`paru -S git-sizer`
- **macOS**：`brew install git-sizer`

### 使用

```bash
git-sizer --verbose
```

会以纯文本表格形式展示全仓库最大的文件、最大的目录、最大的历史提交等信息，Windows / Linux 下体验完全一致。

::: details 📋 输出示例与字段解读

```bash{10,22,30,39,41,46,56}
$ git-sizer --verbose
Processing blobs: 2553
Processing trees: 4888
Processing commits: 2409
Matching commits to trees: 2409
Processing annotated tags: 0
Processing references: 3
| Name                         | Value     | Level of concern               |
| ---------------------------- | --------- | ------------------------------ |
# ↓ ① 仓库整体大小（所有历史累加）
| Overall repository size      |           |                                |
| * Commits                    |           |                                |
|   * Count                    |  2.41 k   |                                |
|   * Total size               |   761 KiB |                                |
| * Trees                      |           |                                |
|   * Count                    |  4.89 k   |                                |
|   * Total size               |  1.28 MiB |                                |
|   * Total tree entries       |  35.6 k   |                                |
| * Blobs                      |           |                                |
|   * Count                    |  2.55 k   |                                |
|   * Total size               |   487 MiB |                                |
# ↑ 重点：Blobs Total size = 所有历史版本的文件累加总量
| * Annotated tags             |           |                                |
|   * Count                    |     0     |                                |
| * References                 |           |                                |
|   * Count                    |     3     |                                |
|     * Branches               |     1     |                                |
|     * Remote-tracking refs   |     2     |                                |
|                              |           |                                |
# ↓ ② 最大的单个对象
| Biggest objects              |           |                                |
| * Commits                    |           |                                |
|   * Maximum size         [1] |   931 B   |                                |
|   * Maximum parents      [2] |     2     |                                |
| * Trees                      |           |                                |
|   * Maximum entries      [3] |    11     |                                |
| * Blobs                      |           |                                |
|   * Maximum size         [4] |  26.1 MiB | **                             |
# ↑ ** = Level of concern 两颗星，提醒注意这个大文件
|                              |           |                                |
# ↓ ③ 历史结构
| History structure            |           |                                |
| * Maximum history depth      |  2.41 k   |                                |
| * Maximum tag depth          |     0     |                                |
|                              |           |                                |
# ↓ ④ 工作目录大小（checkout 后实际看到的文件）
| Biggest checkouts            |           |                                |
| * Number of directories  [5] |    12     |                                |
| * Maximum path depth     [5] |     3     |                                |
| * Maximum path length    [3] |    51 B   |                                |
| * Number of files        [5] |    38     |                                |
| * Total size of files    [6] |  74.1 MiB |                                |
| * Number of symlinks         |     0     |                                |
| * Number of submodules       |     0     |                                |

# ↓ ⑤ 底部注释：对应表格中 [n] 标记的具体对象
[1]  8201581bf19baec1498f09cbe1caab4c7516e35c (refs/heads/main)
[2]  2e741450d74ed2dac2cf4acbede88725b56c86e4
[3]  af9f07671a0321e6bcf3830054bb3006bddc7aee (358ec17f780f9ab4dbe36c7debaef1d071a6b946^{tree})
[4]  cd3b851928ea964ef306dc715cb0ae2213702133 (refs/heads/main:assets/LXGWWenKaiMono-Light.ttf)
[5]  b059cc22c93d450182ecab0b73c3bde06b1c864c (refs/heads/main^{tree})
[6]  5211b58ae086e5a6601611879eb680439113d3a7 (e2f78585542fcd825b5b9959f8c3031a9ddd2941^{tree})
```

**快速读懂要点：**

- **Overall > Blobs > Total size**：所有历史版本文件的累加大小，比当前工作目录大很多是正常的
- **Biggest objects > Blobs > Maximum size**：单个最大文件，星号 `**` 越多越需要关注
- **Level of concern**：git-sizer 给出的关注等级，星号越多说明该指标越异常，需要考虑清理
- **底部 `[n]` 注释**：对应表格中标记的数字，告诉你具体是哪个 commit / 文件 / 树
- 上例中 `# ↓` / `# ↑` 为解读注释，非 git-sizer 真实输出

:::

## 🔹 相关链接

- [Git 官网](https://git-scm.com/)
- [Git 官方文档](https://git-scm.com/doc)
- [git-sizer GitHub 仓库](https://github.com/github/git-sizer)
