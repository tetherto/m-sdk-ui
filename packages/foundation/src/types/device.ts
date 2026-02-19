import type { UnknownRecord } from '@mining-sdk/core'

export type DeviceSnap = {
  stats?: UnknownRecord
  config?: UnknownRecord
}

export type DeviceLast = {
  err?: string | null
  snap?: DeviceSnap
  alerts?: unknown[] | null
  [key: string]: unknown
}

export type DeviceInfo = {
  container?: string
  pos?: string
  [key: string]: unknown
}

export type Device = {
  id: string
  type: string
  tags?: string[]
  rack?: string
  last?: DeviceLast
  username?: string
  info?: DeviceInfo
  containerId?: string
  address?: string | null
  [key: string]: unknown
}

export type PowerMeter = {
  last?: {
    snap?: {
      stats?: {
        power_w?: number
      }
    }
  }
}

export type LvCabinetRecord = {
  id: string
  powerMeters?: PowerMeter[]
}

export type ContainerStats = {
  status?: string
  ambient_temp_c?: number
  humidity_percent?: number
  power_w?: number
}

export type ContainerSnap = {
  stats?: ContainerStats
}

export type MinerHashrateMhs = {
  t_5m?: number
}

export type MinerInfo = {
  container?: string
  pos?: string
  macAddress?: string
  serialNum?: string
}

export type MinerStats = {
  status?: string
  uptime_ms?: number
  power_w?: number
  hashrate_mhs?: MinerHashrateMhs
  poolHashrate?: string
  temperature_c?: { max?: number }
}

export type MinerConfig = {
  firmware_ver?: string
  power_mode?: string
  led_status?: boolean
}

export type MinerDeviceSnapshot = {
  last?: { snap?: { config?: MinerConfig } }
}

export type MinerRecord = {
  id?: string
  shortCode?: string
  info?: MinerInfo
  address?: string
  type?: string
  alerts?: unknown[]
  stats?: MinerStats
  config?: MinerConfig
  device?: MinerDeviceSnapshot
  error?: string
  err?: string
  isPoolStatsEnabled?: boolean
}
