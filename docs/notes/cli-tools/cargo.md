# Cargo / Rustup 简单说明

> <https://github.com/rust-lang/cargo>

`cargo` 是 Rust 的包管理器和构建工具，可以管理依赖、编译项目、运行测试，也可以安装 Rust 编写的命令行工具。

本文记录 Rust 工具链、系统开发依赖、Cargo 镜像以及常用 CLI 工具的安装方法。

## 🔹 Rust 工具链的组成

Rust 开发环境主要由三个工具组成：

| 工具 | 作用 |
|---|---|
| `rustup` | 安装、升级和切换 Rust 工具链与编译目标 |
| `rustc` | Rust 编译器 |
| `cargo` | 依赖管理、构建、测试、发布和 CLI 工具安装 |

通常只需要安装 `rustup`，它会自动安装并管理 `rustc`、`cargo`、`rustfmt` 和 `clippy`，不需要分别安装 Cargo 与 Rust。

## 🔹 安装 Rust/Cargo

使用国内镜像安装 `rustup`，可以减少访问官方分发服务器时的网络问题。

::: tip
RsProxy 和清华 TUNA 镜像选择一个即可，不要连续执行两套安装命令。
:::

### 使用 RsProxy

```bash
curl -sSf https://sh.rustup.rs -o rustup-init.sh
chmod +x rustup-init.sh

export RUSTUP_DIST_SERVER=https://rsproxy.cn
export RUSTUP_UPDATE_ROOT=https://rsproxy.cn/rustup
./rustup-init.sh
```

### 使用清华 TUNA

```bash
curl -sSf https://sh.rustup.rs -o rustup-init.sh
chmod +x rustup-init.sh

export RUSTUP_DIST_SERVER=https://mirrors.tuna.tsinghua.edu.cn/rustup
export RUSTUP_UPDATE_ROOT=https://mirrors.tuna.tsinghua.edu.cn/rustup
./rustup-init.sh
```

安装程序出现选项时，普通环境直接选择 `1) Proceed with standard installation` 即可。

如果出现下面的提示，说明用户目录里以前已经存在 Rustup 配置文件，不代表安装失败：

```text
warn: It looks like you have an existing rustup settings file at:
warn: /home/<user>/.rustup/settings.toml
```

Rustup 会继续使用该配置文件中记录的默认工具链和目标平台。

## 🔹 加载环境变量

安装完成后，重新打开 Shell，或者在当前 Shell 中加载 Cargo 环境文件：

```bash
. "$HOME/.cargo/env"            # sh/bash/zsh/ash/dash/pdksh
source "$HOME/.cargo/env.fish"  # fish
source "~/.cargo/env.nu"        # nushell
source "$HOME/.cargo/env.tcsh"  # tcsh
. "$HOME/.cargo/env.ps1"        # PowerShell
source "$HOME/.cargo/env.xsh"   # xonsh
```

Rustup 通常会自动修改 `~/.profile` 和 `~/.bashrc`，因此新开的 Bash 会自动包含 `~/.cargo/bin`。

检查命令路径和版本：

```bash
command -v rustup
command -v rustc
command -v cargo

rustup --version
rustc --version
cargo --version
rustup show
```

如果希望以后执行 `rustup update` 时继续使用 RsProxy，可以在 `~/.bashrc` 中追加：

```bash
export RUSTUP_DIST_SERVER=https://rsproxy.cn
export RUSTUP_UPDATE_ROOT=https://rsproxy.cn/rustup
```

修改后重新加载配置：

```bash
source ~/.bashrc
```

## 🔹 配置 Cargo 镜像源

写入 `~/.cargo/config.toml`，下面示例默认使用阿里云稀疏索引，并预先定义 RsProxy、中科大和清华镜像：

```bash
mkdir -p "$HOME/.cargo"

cat << 'EOF' > "$HOME/.cargo/config.toml"
[source.crates-io]
replace-with = "aliyun"

[source.aliyun]
registry = "sparse+https://mirrors.aliyun.com/crates.io-index/"

[source.rsproxy]
registry = "sparse+https://rsproxy.cn/index/"

[source.ustc]
registry = "sparse+https://mirrors.ustc.edu.cn/crates.io-index/"

[source.tuna]
registry = "https://mirrors.tuna.tsinghua.edu.cn/git/crates.io-index.git"
EOF
```

::: warning
Cargo 不会在这些源之间自动故障转移。真正使用哪个镜像由 `[source.crates-io]` 下的 `replace-with` 决定，上面的配置当前只会使用 `aliyun`。
:::

需要切换到 RsProxy 时，将配置改为：

```toml
[source.crates-io]
replace-with = "rsproxy"
```

稀疏索引通常比传统 Git 索引下载更快，也不会克隆完整的 crates.io 索引仓库。

## 🔹 安装 CLI 工具

::: info 系统开发工具链依赖
记得补全当前系统的开发工具链依赖，否则可能遇到 `linker cc not found` 或缺少 OpenSSL、Git2、CMake 等错误。

Debian、Ubuntu 及其衍生发行版可以执行：

```bash
sudo apt update
sudo apt install -y build-essential pkg-config
sudo apt install -y cmake libssl-dev libgit2-dev git
```

```bash
cc --version    # 检查默认 C 编译器
gcc --version   # 检查 GCC 编译器
make --version  # 检查 Make 构建工具
```
:::

推荐使用 `--locked`，优先采用发布包携带的 `Cargo.lock`，提高安装结果的可复现性：

```bash
cargo install --locked eza       # 现代 ls，命令是 eza
cargo install --locked fd-find   # 现代 find，命令是 fd
cargo install --locked du-dust   # 现代 du，命令是 dust
```

::: warning warn:
Cargo 默认会根据机器资源并行编译，不需要主动添加 `-j 1`。如果机器的内存或 CPU 资源有限，或者并行编译不稳定，可以使用 `-j` 参数限制并行任务数量，例如限制为单任务编译：

```bash
cargo install --locked eza -j 1
cargo install --locked fd-find -j 1
cargo install --locked du-dust -j 1
```
:::

::: tip
加上 `RUSTFLAGS="-C target-cpu=native"` 可以针对当前 CPU 优化本地安装的程序，但生成的二进制不适合复制到其他 CPU 型号的机器上运行。
:::

示例：

```bash
RUSTFLAGS="-C target-cpu=native" cargo install --locked eza
```

## 🔹 Cargo.lock 的使用原则

`Cargo.lock` 记录项目实际解析到的依赖版本和校验信息。

- 可执行程序和应用项目通常应该提交 `Cargo.lock`，保证本地、CI 和不同时间的重建使用一致的依赖版本。
- 单纯提供给其他项目引用的库可以根据项目策略决定是否提交锁文件。
- 不建议让 Release CI 自动修改并提交 `Cargo.lock`，否则容易产生额外 commit、递归触发和构建来源不清晰等问题。
- 不要为了消除版本差异直接删除应用项目的 `Cargo.lock`。

修改 `Cargo.toml` 中的项目版本或依赖后，可以让 Cargo 正常同步锁文件：

```bash
cargo metadata --format-version 1 > /dev/null
git diff -- Cargo.lock
```

确认差异符合预期后，再验证锁文件无需继续更新：

```bash
cargo metadata --locked --format-version 1 > /dev/null
cargo check --locked
```

::: warning
只想同步当前项目版本时，不要随手执行 `cargo update`。该命令可能同时升级多个兼容范围内的依赖版本。
:::

CI 和正式构建建议使用：

```bash
cargo build --release --locked
```

如果 `Cargo.toml` 与 `Cargo.lock` 不一致，`--locked` 会直接让构建失败，提醒开发者先更新并提交锁文件。

## 🔹 验证安装

```bash
cargo --version
rustc --version
rustup show

eza --version
fd --version
dust --version
```

## 🔹 卸载

卸载通过 Cargo 安装的工具：

```bash
cargo uninstall eza
cargo uninstall fd-find
cargo uninstall du-dust
```

卸载当前用户下由 Rustup 管理的 Rust 工具链：

```bash
rustup self uninstall
```

系统级安装的 `build-essential`、`pkg-config` 等 Debian 软件包不会由 Rustup 删除，需要继续用于其他编译任务时可以保留。

## 🔹 相关链接

- [Cargo GitHub 仓库](https://github.com/rust-lang/cargo)
- [Cargo Book](https://doc.rust-lang.org/cargo/)
- [Rustup](https://rustup.rs/)
- [RsProxy](https://rsproxy.cn/)
- [eza](https://github.com/eza-community/eza)
- [fd](https://github.com/sharkdp/fd)
- [dust](https://github.com/bootandy/dust)
