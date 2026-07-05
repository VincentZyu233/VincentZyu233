# cargo 简单说明

> <https://github.com/rust-lang/cargo>

`cargo` 是 Rust 的包管理器，可以用来安装 Rust 编写的命令行工具。以下是在 Debian 12 上安装 Rust/Cargo 并配置镜像源的步骤。

## 🔹 安装 Rust/Cargo

使用国内镜像安装 `rustup`，避免网络问题：

::: tip
字节和清华两个镜像选一个即可，不需要都跑。
:::

```bash
curl -sSf https://sh.rustup.rs -o rustup-init.sh
chmod +x rustup-init.sh

# 字节镜像
export RUSTUP_DIST_SERVER=https://rsproxy.cn
export RUSTUP_UPDATE_ROOT=https://rsproxy.cn/rustup
./rustup-init.sh

# 清华镜像（字节不用的话用这个）
export RUSTUP_DIST_SERVER=https://mirrors.tuna.tsinghua.edu.cn/rustup
export RUSTUP_UPDATE_ROOT=https://mirrors.tuna.tsinghua.edu.cn/rustup
./rustup-init.sh
```

安装完成后加载环境变量：

```bash
. "$HOME/.cargo/env"            # sh/bash/zsh/ash/dash/pdksh
source "$HOME/.cargo/env.fish"  # fish
source "~/.cargo/env.nu"        # nushell
source "$HOME/.cargo/env.tcsh"  # tcsh
. "$HOME/.cargo/env.ps1"        # pwsh
source "$HOME/.cargo/env.xsh"   # xonsh
```

## 🔹 配置镜像源

写入 `~/.cargo/config.toml`，主用阿里云稀疏源，备用中科大和清华：

```bash
mkdir -p $HOME/.cargo && cat << 'EOF' > $HOME/.cargo/config.toml
[source.crates-io]
replace-with = 'aliyun'

[source.aliyun]
registry = "sparse+https://mirrors.aliyun.com/crates.io-index/"

[source.ustc]
registry = "sparse+https://mirrors.ustc.edu.cn/crates.io-index/"

[source.tuna]
registry = "https://mirrors.tuna.tsinghua.edu.cn/git/crates.io-index.git"
EOF
```

## 🔹 安装 CLI 工具

```bash
cargo install eza -j 1        # 现代 ls
cargo install fd-find -j 1    # 现代 find（命令是 fd）
cargo install du-dust -j 1    # 现代 du（命令是 dust）
```

::: tip
加上 `RUSTFLAGS="-C target-cpu=native"` 可针对本机 CPU 优化编译，运行效率更高，但编译时间会稍长。
:::

## 🔹 验证安装

```bash
cargo --version
rustc --version
eza --version
fd --version
dust --version
```

## 🔹 相关链接

- [Cargo GitHub 仓库](https://github.com/rust-lang/cargo)
