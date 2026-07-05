# Shell 查看物理硬盘信息

Windows 下可以用 PowerShell 查看物理硬盘信息，Linux 下可以用 `lsblk`、`smartctl`、`nvme-cli` 查看物理硬盘的型号、序列号、介质类型、总线类型、容量、健康状态和固件版本，不需要拆机。

## 🔹 Windows PowerShell

### 查看原始字段列表

```powershell
Get-PhysicalDisk |
  Select-Object FriendlyName,
                Manufacturer,
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
        "制造商/品牌" = if ([string]::IsNullOrWhiteSpace($_.Manufacturer) -or $_.Manufacturer -eq "ATA") {
            ($_.Model -split " ")[0]
        } else {
            $_.Manufacturer
        }
        "型号"        = $_.Model
        "序列号"      = $_.SerialNumber
        "固件版本"    = $_.FirmwareVersion
        "转速"        = $_.SpindleSpeed
    }
} | Format-Table -AutoSize
```

输出示例：

```text
硬盘名称              容量 (GB) 类型 总线 健康状态 运行状态 制造商/品牌 型号                  序列号                                   固件版本
--------              --------- ---- ---- -------- -------- ----------- ----                  ------                                   --------
ATA faspeed H5-60G         55.9 SSD  SAS  Healthy  OK       faspeed     faspeed H5-60G        SCRW17122102F0166                        1A
ZHITAI TiPlus7100 1TB     953.9 SSD  NVMe Healthy  OK       ZHITAI      ZHITAI TiPlus7100 1TB 0000_0000_0000_0000_A428_B70C_708C_0002. ZTA22006
ATA WDC WD5000AAKX-2      465.8 HDD  SAS  Healthy  OK       WDC         WDC WD5000AAKX-2      WD-WCC2ED0M2PEX                          1H17
ATA WDC WD5000AAKX-7      465.8 HDD  SAS  Healthy  OK       WDC         WDC WD5000AAKX-7      WD-WCC2EYD98608                          1H19
ATA WDC WD5000AAKX-2      465.8 HDD  SAS  Healthy  OK       WDC         WDC WD5000AAKX-2      WD-WCC2EPF4H96T                          1H17
```

### 最终效果

![PowerShell 查看 1 块 faspeed SSD、1 块致态 SSD 和 3 块西数 HDD 的物理硬盘信息](/image/powershell-check-1-faspeed-ssd-1-zhitai-ssd-3-westdata-hdd.png)

### PowerShell 字段说明

| 字段 | 说明 |
|------|------|
| `FriendlyName` | Windows 识别到的硬盘友好名称 |
| `Manufacturer` | 制造商信息，有些硬盘可能为空或显示为接口类型 |
| `Model` | 硬盘型号 |
| `SerialNumber` | 硬盘序列号 |
| `MediaType` | 硬盘类型，例如 SSD / HDD |
| `BusType` | 总线类型，例如 NVMe / SATA / SAS |
| `Size(GB)` | 硬盘容量，单位 GB |
| `HealthStatus` | 健康状态 |
| `OperationalStatus` | 当前运行状态 |
| `FirmwareVersion` | 固件版本 |
| `SpindleSpeed` | 机械硬盘转速，SSD 通常显示为 0 |

## 🔹 Linux Bash

### 安装工具

```bash
# Debian / Ubuntu
sudo apt install lshw smartmontools nvme-cli
# Arch Linux
sudo pacman -S lshw smartmontools nvme-cli
# Alpine Linux
sudo apk add lshw smartmontools nvme-cli
```

::: tip 提示
`lsblk` 和 `column` 通常由 `util-linux` 系列工具提供。如果系统提示 `column: command not found`，Debian / Ubuntu 可安装 `bsdextrautils`，Arch / Alpine 可安装 `util-linux`。
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

这个版本会用 `smartctl -i` 读取 `Model Family`，对西数、希捷等已在 smartmontools 数据库里的硬盘，品牌识别会比 `lsblk` 的 `VENDOR` 字段更可靠。

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
function detect_brand(name,    cmd, line, family, brand) {
  cmd = "sudo smartctl -i /dev/" name " 2>/dev/null"
  while ((cmd | getline line) > 0) {
    if (line ~ /^Model Family:/) {
      sub(/^Model Family:[[:space:]]*/, "", line)
      family = trim(line)
      break
    }
  }
  close(cmd)

  if (family ~ /^Western Digital/) return "Western Digital"
  if (family ~ /^Seagate/) return "Seagate"
  if (family ~ /^Samsung/) return "Samsung"
  if (family ~ /^TOSHIBA|^Toshiba/) return "Toshiba"
  if (family ~ /^HGST/) return "HGST"
  if (family ~ /^Hitachi/) return "Hitachi"
  if (family != "") {
    split(family, brand, " ")
    return brand[1]
  }

  return "Unknown"
}
{
  name = value("NAME")
  model = value("MODEL")
  rota = value("ROTA")
  media = (rota == "0" ? "SSD/NVMe" : (rota == "1" ? "HDD" : "Unknown"))
  print name, detect_brand(name), model, value("SERIAL"), value("SIZE"), media, value("TRAN"), value("REV")
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
