# nano 简单说明

`nano` 是一个轻量级终端文本编辑器，适合快速改配置文件、写小段文本。

## 安装

- Debian/Ubuntu：`apt install nano`
- Windows（Scoop）：`scoop install nano`

## 常用操作

- 保存：`Ctrl + O`
- 退出：`Ctrl + X`
- 搜索：`Ctrl + W`

## 永久显示行号

编辑配置文件 `~/.nanorc`，加入：

```conf
set linenumbers
```

如果文件不存在，直接新建即可。

配置完成后重新打开 `nano` 就会默认显示行号。

## 最终效果

开启后，`nano` 左侧会显示行号，方便定位和编辑配置文件。

![nano 显示行号后的效果](/image/nano-linenumbers-set-on-windows11-terminal-final-effect.png)
