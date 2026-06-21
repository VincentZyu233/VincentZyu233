# PowerShell 查看内存条信息

Windows 下可以用 PowerShell 的 WMI 命令直接查看物理内存条的插槽、容量、频率、品牌等信息，不需要拆机。

## 查看内存条概览

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

## 查看详细信息（含中文表头 + 序列号）

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

## 字段说明

| 字段 | 说明 |
|------|------|
| `BankLabel` | 插槽位置，可据此判断哪些槽位插了内存 |
| `Capacity` | 容量，单位 Byte，除以 1GB 换算 |
| `Speed` | 频率，单位 MHz |
| `Manufacturer` | 制造商/品牌 |
| `PartNumber` | 型号料号，据此可查具体规格 |
| `SerialNumber` | 序列号，每条内存唯一 |

## 最终效果

执行命令后即可看到每根内存条的详细参数，包括插槽位置、容量、频率、品牌等。

![金士顿内存条信息](/image/powershell-check-2-kingston-ram-stick.png)

![镁光内存条信息](/image/powershell-check-4-mircon-ram-stick.png)
