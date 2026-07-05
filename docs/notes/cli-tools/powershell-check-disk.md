# PowerShell 查看物理硬盘信息

Windows 下可以用 PowerShell 查看所有物理硬盘的型号、序列号、介质类型、总线类型、容量、健康状态和固件版本，不需要拆机。

## 查看物理硬盘概览（推荐）

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

## 查看原始字段列表

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

## 字段说明

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
