# tmux 简单说明

`tmux` 是终端复用工具，可以把一个终端拆成多个 session、window、pane，适合长期挂任务和多窗口并行操作。

## 安装

- Debian/Ubuntu：`apt install tmux`

## 给每个 pane 显示小标题

编辑 `~/.tmux.conf`，加入：

```conf
# 开启 Pane 顶部标题栏
set -g pane-border-status top

# 显示 Pane 编号和自定义标题
set -g pane-border-format " ─ #P: #{pane_title} ─ "

# Prefix + T 后输入标题，回车生效
bind T command-prompt -p "请输入当前 Pane 的新标题:" "select-pane -T '%%'"
```

## 配置说明

- `pane-border-status top`：让每个 pane 的边框顶部显示一条小标题栏
- `pane-border-format`：定义标题栏显示内容
- `#P`：当前 pane 编号
- `#{pane_title}`：当前 pane 的自定义标题
- `bind T ...`：绑定快捷键，用来给当前 pane 改标题

## 刷新配置

修改完配置后执行：

```bash
tmux source-file ~/.tmux.conf
```

## 修改小标题快捷键

默认前缀键是 `Ctrl + B`，所以操作是：

1. 切换到目标 pane
2. 按 `Ctrl + B`
3. 按大写 `T`
4. 输入新标题并回车

例如可以把标题改成 `server`、`logs`、`editor`。

::: tip 快捷键操作示意
下面这张图演示了 `Ctrl + B` 之后再按大写 `T`，然后输入标题的效果。

![tmux 修改 pane 小标题的操作示意](/image/tmux-border-status-set-step-ctrl+b-then-T-then-boo.png)
:::

## 最终效果

配置完成后，每个 pane 顶部都会显示一个小标题栏，可以看到 pane 编号和你设置的标题。

![tmux pane 小标题最终效果](/image/tmux-border-status-set-done-final-effect-on-ubuntu24-lxqt-x11-desktop.png)
