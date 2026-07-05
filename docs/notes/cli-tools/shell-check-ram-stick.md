# Shell 查看内存条信息

Windows 下可以用 PowerShell 的 WMI 命令查看物理内存条信息，Linux 下可以用 `dmidecode` 查看物理内存插槽、容量、频率、品牌、型号和序列号，不需要拆机。

## 🔹 Windows PowerShell

### 查看内存条概览

```powershell
Get-CimInstance Win32_PhysicalMemory | Select-Object BankLabel, @{Name="Capacity(GB)";Expression={[math]::round($_.Capacity/1GB,1)}}, Speed, Manufacturer, PartNumber
```

输出示例：

```
BankLabel                    Capacity(GB) Speed Manufacturer PartNumber
---------                    ------------ ----- ------------ ---------
A1_Node0_Channel0_Dimm0               16  2133 Micron       36ASF2G72PZ-2G1A2
A1_Node0_Channel1_Dimm0               16  2133 Micron       36ASF2G72PZ-2G1A2
A1_Node1_Channel0_Dimm0               16  2133 Micron       36ASF2G72PZ-2G1A2
A1_Node1_Channel1_Dimm0               16  2133 Micron       36ASF2G72PZ-2G1A2
```

### 查看详细横向表格形式信息（含中文表头 + 序列号）

```powershell
Get-CimInstance Win32_PhysicalMemory | ForEach-Object {
    [PSCustomObject]@{
        "插槽位置"   = $_.BankLabel
        "容量 (GB)"  = [math]::round($_.Capacity / 1GB, 2)
        "频率 (MHz)" = $_.Speed
        "制造商/品牌" = $_.Manufacturer.Trim()
        "型号/料号"  = $_.PartNumber.Trim()
        "序列号"     = $_.SerialNumber.Trim()
    }
} | Format-Table -AutoSize
```

输出示例：

```
插槽位置                容量 (GB) 频率 (MHz) 制造商/品牌 型号/料号         序列号
--------                --------- ---------- ----------- ---------         ------
A1_Node0_Channel0_Dimm0        16       2133 Micron      36ASF2G72PZ-2G1A2 0FC9EDAE
A1_Node0_Channel1_Dimm0        16       2133 Micron      36ASF2G72PZ-2G1A2 0F8D6EF5
A1_Node1_Channel0_Dimm0        16       2133 Micron      36ASF2G72PZ-2G1A2 0F90A1A6
A1_Node1_Channel1_Dimm0        16       2133 Micron      36ASF2G72PZ-2G1A2 0F8D6D56
```

### PowerShell 字段说明

| 字段 | 说明 |
|------|------|
| `BankLabel` | 插槽位置，可据此判断哪些槽位插了内存 |
| `Capacity` | 容量，单位 Byte，除以 1GB 换算 |
| `Speed` | 频率，单位 MHz |
| `Manufacturer` | 制造商/品牌 |
| `PartNumber` | 型号料号，据此可查具体规格 |
| `SerialNumber` | 序列号，每条内存唯一 |

### 最终效果

执行命令后即可看到每根内存条的详细参数，包括插槽位置、容量、频率、品牌等。

![金士顿内存条信息](/image/powershell-check-2-kingston-ram-stick.png)

![镁光内存条信息](/image/powershell-check-4-mircon-ram-stick.png)

## 🔹 Linux Bash

### 安装工具

`dmidecode` 通常需要 root 权限才能读取 DMI/SMBIOS 信息。

```bash
# Debian / Ubuntu
sudo apt install dmidecode

# Arch Linux
sudo pacman -S dmidecode

# Alpine Linux
sudo apk add dmidecode
```

::: tip 提示
带中文表头的横向表格会用到 `column` 命令。如果系统提示 `column: command not found`，Debian / Ubuntu 可安装 `bsdextrautils`，Arch / Alpine 可安装 `util-linux`。
:::

### 查看内存条原始信息

```bash
sudo dmidecode -t memory
```

### 查看关键字段

```bash
sudo dmidecode -t memory | grep -E "Locator:|Bank Locator:|Size:|Speed:|Manufacturer:|Part Number:|Serial Number:"
```

### 查看横向表格

```bash
sudo dmidecode -t memory | awk '
/Memory Device$/ {slot=""; size=""; speed=""; mfg=""; part=""; serial=""}
/^[[:space:]]*Locator:/ {slot=$2}
/^[[:space:]]*Size:/ {size=$2" "$3}
/^[[:space:]]*Speed:/ {speed=$2" "$3}
/^[[:space:]]*Manufacturer:/ {mfg=$2}
/^[[:space:]]*Part Number:/ {part=$3}
/^[[:space:]]*Serial Number:/ {
  serial=$3
  if (size != "No Module") printf "%-20s %-10s %-10s %-15s %-25s %-20s\n", slot, size, speed, mfg, part, serial
}'
```

### 查看带中文表头的横向表格

```bash
sudo dmidecode -t memory | awk '
BEGIN {
  OFS="\t"
  print "插槽位置", "容量", "频率", "制造商/品牌", "型号/料号", "序列号"
  print "--------", "----", "----", "-----------", "---------", "------"
}
function print_mem() {
  if (size != "" && size !~ /No Module/) {
    print slot, size, speed, mfg, part, serial
  }
}
/Memory Device$/ {
  print_mem()
  slot=""; size=""; speed=""; mfg=""; part=""; serial=""
}
/^[[:space:]]*Locator:/ {
  sub(/^[[:space:]]*Locator:[[:space:]]*/, "")
  slot=$0
}
/^[[:space:]]*Size:/ {
  sub(/^[[:space:]]*Size:[[:space:]]*/, "")
  size=$0
}
/^[[:space:]]*Speed:/ && $0 !~ /Configured/ {
  sub(/^[[:space:]]*Speed:[[:space:]]*/, "")
  speed=$0
}
/^[[:space:]]*Manufacturer:/ {
  sub(/^[[:space:]]*Manufacturer:[[:space:]]*/, "")
  mfg=$0
}
/^[[:space:]]*Part Number:/ {
  sub(/^[[:space:]]*Part Number:[[:space:]]*/, "")
  part=$0
}
/^[[:space:]]*Serial Number:/ {
  sub(/^[[:space:]]*Serial Number:[[:space:]]*/, "")
  serial=$0
}
END {
  print_mem()
}' | column -t -s $'\t'
```

### Linux Bash 最终效果

![Bash 查看 4 根金士顿内存条信息](/image/bash-check-4-kingston-ram-stick.png)

### Linux Bash 字段说明

| 字段 | 说明 |
|------|------|
| `Locator` | 内存插槽位置 |
| `Size` | 内存容量 |
| `Speed` | 内存频率 |
| `Manufacturer` | 制造商/品牌 |
| `Part Number` | 型号料号 |
| `Serial Number` | 序列号 |
