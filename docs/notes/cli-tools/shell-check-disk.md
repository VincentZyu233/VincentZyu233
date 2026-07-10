# Shell 查看物理硬盘信息

Windows 下可以用 PowerShell 查看物理硬盘信息，Linux 下可以用 `lsblk`、`smartctl`、`nvme-cli` 查看物理硬盘的型号、序列号、介质类型、总线类型、容量、健康状态和固件版本，不需要拆机。

## 🔹 Windows PowerShell

### 查看原始字段列表

```powershell
Get-PhysicalDisk |
  Select-Object FriendlyName,
                Model,
                SerialNumber,
                MediaType,
                BusType,
                @{Name="Size(GB)";Expression={[math]::Round($_.Size/1GB,1)}},
                HealthStatus,
                OperationalStatus,
                FirmwareVersion,
                SpindleSpeed
```

### 查看详细横向表格形式信息（含中文表头 + 序列号等等信息）

```powershell
Get-PhysicalDisk | ForEach-Object {
    [PSCustomObject]@{
        "硬盘名称"    = $_.FriendlyName
        "容量 (GB)"   = [math]::Round($_.Size / 1GB, 1)
        "类型"        = $_.MediaType
        "总线"        = $_.BusType
        "健康状态"    = $_.HealthStatus
        "运行状态"    = $_.OperationalStatus
        "型号"        = $_.Model
        "序列号"      = $_.SerialNumber
        "固件版本"    = $_.FirmwareVersion
        "转速"        = $_.SpindleSpeed
    }
} | Format-Table -AutoSize
```

输出示例：

```text
硬盘名称              容量 (GB) 类型 总线 健康状态 运行状态 型号                  序列号                                   固件版本
--------              --------- ---- ---- -------- -------- ----                  ------                                   --------
ATA faspeed H5-60G         55.9 SSD  SAS  Healthy  OK       faspeed H5-60G        SCRW17122102F0166                        1A
ZHITAI TiPlus7100 1TB     953.9 SSD  NVMe Healthy  OK       ZHITAI TiPlus7100 1TB 0000_0000_0000_0000_A428_B70C_708C_0002. ZTA22006
ATA WDC WD5000AAKX-2      465.8 HDD  SAS  Healthy  OK       WDC WD5000AAKX-2      WD-WCC2ED0M2PEX                          1H17
ATA WDC WD5000AAKX-7      465.8 HDD  SAS  Healthy  OK       WDC WD5000AAKX-7      WD-WCC2EYD98608                          1H19
ATA WDC WD5000AAKX-2      465.8 HDD  SAS  Healthy  OK       WDC WD5000AAKX-2      WD-WCC2EPF4H96T                          1H17
```

### 最终效果

![PowerShell 查看 1 块 faspeed SSD、1 块致态 SSD 和 3 块西数 HDD 的物理硬盘信息](/image/powershell-check-1-faspeed-ssd-1-zhitai-ssd-3-westdata-hdd.png)

### PowerShell 字段说明

| 字段 | 说明 |
|------|------|
| `FriendlyName` | Windows 识别到的硬盘友好名称 |
| `Model` | 硬盘型号 |
| `SerialNumber` | 硬盘序列号 |
| `MediaType` | 硬盘类型，例如 SSD / HDD |
| `BusType` | 总线类型，例如 NVMe / SATA / SAS |
| `Size(GB)` | 硬盘容量，单位 GB |
| `HealthStatus` | 健康状态 |
| `OperationalStatus` | 当前运行状态 |
| `FirmwareVersion` | 固件版本 |
| `SpindleSpeed` | 机械硬盘转速，SSD 通常显示为 0 |

`Get-PhysicalDisk` 的 `Manufacturer` 字段在不同硬盘和桥接芯片上不稳定，可能为空、显示为 `ATA`，也可能只返回截断后的词（例如把 `Great Wall` 显示成 `Great`）。因此这里不再单独展示制造商 / 品牌列，优先保留 `FriendlyName` 和 `Model` 作为可核对信息。

## 🔹 Linux Bash

### 安装工具

Debian / Ubuntu：

```bash
sudo apt update
sudo apt install lshw smartmontools nvme-cli bsdextrautils
```

Arch Linux：

```bash
sudo pacman -S lshw smartmontools nvme-cli
```

Alpine Linux：

```bash
sudo apk add lshw smartmontools nvme-cli
```

::: tip 提示
`lsblk` 和 `column` 通常由 `util-linux` 系列工具提供。如果系统提示 `column: command not found`，Debian / Ubuntu 可安装 `bsdextrautils`，Arch / Alpine 可安装 `util-linux`。
:::

::: warning WSL 提示
WSL2 里看到的 `/mnt/c`、`/mnt/d` 等挂载点是 Windows 文件系统透传，不等价于 Linux 直接访问真实物理硬盘。要查看 Windows 主机的真实硬盘型号、序列号、总线和健康状态，优先用上面的 Windows PowerShell 命令。
:::

### 查看物理硬盘概览

```bash
lsblk -d -o NAME,MODEL,SERIAL,SIZE,ROTA,TYPE,TRAN,REV
```

其中 `ROTA` 可以粗略判断硬盘类型：

```text
ROTA=0  通常是 SSD / NVMe
ROTA=1  通常是 HDD
```

### 查看带中文表头的横向表格

```bash
lsblk -d -P -o NAME,MODEL,SERIAL,SIZE,ROTA,TYPE,TRAN,REV | awk '
BEGIN {
  OFS="\t"
  print "设备", "型号", "序列号", "容量", "类型", "总线", "固件"
  print "----", "----", "------", "----", "----", "----", "----"
}
function value(key,    re) {
  re = key "=\"[^\"]*\""
  if (match($0, re)) {
    return substr($0, RSTART + length(key) + 2, RLENGTH - length(key) - 3)
  }
  return ""
}
{
  rota = value("ROTA")
  media = (rota == "0" ? "SSD/NVMe" : (rota == "1" ? "HDD" : "Unknown"))
  print value("NAME"), value("MODEL"), value("SERIAL"), value("SIZE"), media, value("TRAN"), value("REV")
}' | column -t -s $'\t'
```

### 查看带品牌的横向表格

这个版本会优先用 `smartctl -i` 读取 `Model Family`，对西数、希捷等已在 smartmontools 数据库里的硬盘，品牌识别会比 `lsblk` 的 `VENDOR` 字段更可靠。如果硬盘不在 smartmontools 数据库里、没有 `Model Family`，会退回到 `Device Model`、NVMe 的 `Model Number` 或 `lsblk` 的 `MODEL` 做启发式识别。脚本只保留 `TYPE=disk` 且容量不是 `0B` 的设备，避免把 loop 镜像和空读卡器当成硬盘。

```bash
lsblk -d -P -o NAME,MODEL,SERIAL,SIZE,ROTA,TYPE,TRAN,REV | awk '
BEGIN {
  OFS="\t"
  print "设备", "品牌", "型号", "序列号", "容量", "类型", "总线", "固件"
  print "----", "----", "----", "------", "----", "----", "----", "----"
}
function value(key,    re) {
  re = key "=\"[^\"]*\""
  if (match($0, re)) {
    return substr($0, RSTART + length(key) + 2, RLENGTH - length(key) - 3)
  }
  return ""
}
function trim(s) {
  sub(/^[[:space:]]+/, "", s)
  sub(/[[:space:]]+$/, "", s)
  return s
}
function brand_from_text(text,    brand) {
  text = trim(text)
  if (text == "") return ""

  if (text ~ /^Western Digital/ || text ~ /^WDC([[:space:]]|$)/) return "Western Digital"
  if (text ~ /^Seagate/ || text ~ /^ST[0-9A-Z]/) return "Seagate"
  if (text ~ /^Samsung/) return "Samsung"
  if (text ~ /(^|[[:space:]])(TOSHIBA|Toshiba)([[:space:]]|$)/) return "Toshiba"
  if (text ~ /(^|[[:space:]])(KIOXIA|Kioxia)([[:space:]]|$)/) return "Kioxia"
  if (text ~ /^HGST/) return "HGST"
  if (text ~ /^Hitachi/) return "Hitachi"

  split(text, brand, " ")
  return brand[1]
}
function detect_brand(name, fallback_model,    cmd, line, family, device_model, brand) {
  cmd = "sudo smartctl -i /dev/" name " 2>/dev/null"
  while ((cmd | getline line) > 0) {
    if (line ~ /^Model Family:/) {
      sub(/^Model Family:[[:space:]]*/, "", line)
      family = trim(line)
    } else if (line ~ /^Device Model:/) {
      sub(/^Device Model:[[:space:]]*/, "", line)
      device_model = trim(line)
    } else if (line ~ /^Model Number:/) {
      sub(/^Model Number:[[:space:]]*/, "", line)
      device_model = trim(line)
    }
  }
  close(cmd)

  brand = brand_from_text(family)
  if (brand != "") return brand
  brand = brand_from_text(device_model)
  if (brand != "") return brand
  brand = brand_from_text(fallback_model)
  if (brand != "") return brand

  return "Unknown"
}
{
  if (value("TYPE") != "disk") next
  if (value("SIZE") == "0B") next

  name = value("NAME")
  model = value("MODEL")
  rota = value("ROTA")
  media = (rota == "0" ? "SSD/NVMe" : (rota == "1" ? "HDD" : "Unknown"))
  print name, detect_brand(name, model), model, value("SERIAL"), value("SIZE"), media, value("TRAN"), value("REV")
}' | column -t -s $'\t'
```

### Linux Bash 最终效果

![Bash 查看 1 块 Anuce SSD、1 块西数 HDD 和 1 块希捷 HDD 的物理硬盘信息](/image/bash-check-1-anuce-ssd-1-westdata-hdd-1-seagate-hdd.png)

### 查看更详细硬件识别信息

```bash
sudo lshw -class disk
```

### 查看硬盘健康信息

先扫描系统中的硬盘设备：

```bash
sudo smartctl --scan
```

再查看指定硬盘的 SMART 信息：

```bash
sudo smartctl -a /dev/sda
```

如果是 NVMe 硬盘，可以使用 `nvme-cli`：

```bash
sudo nvme list
sudo nvme smart-log /dev/nvme0
```

### Linux Bash 字段说明

| 字段 / 命令 | 说明 |
|-------------|------|
| `lsblk -d` | 只显示物理块设备，不展开分区 |
| `MODEL` | 硬盘型号 |
| `SERIAL` | 硬盘序列号 |
| `SIZE` | 硬盘容量 |
| `ROTA` | 是否为旋转设备，`0` 通常表示 SSD，`1` 通常表示 HDD |
| `TRAN` | 传输类型，例如 sata、nvme、usb |
| `REV` | 固件版本 |
| `smartctl -i` | 查看硬盘型号族、设备型号、序列号、固件等基础识别信息 |
| `lshw -class disk` | 查看更详细的硬盘硬件识别信息 |
| `smartctl -a` | 查看 SATA / SAS 硬盘 SMART 详细健康信息 |
| `nvme smart-log` | 查看 NVMe 硬盘健康日志 |
