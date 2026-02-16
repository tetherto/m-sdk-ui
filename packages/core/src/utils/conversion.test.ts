import { describe, expect, it } from 'vitest'

import { convertMpaToBar, toMW, toMWh, toPHS, unitToKilo } from './conversion'

describe('toMW', () => {
  it('converts watts to megawatts', () => {
    expect(toMW(1_000_000)).toBe(1)
    expect(toMW(500_000)).toBe(0.5)
  })
})

describe('toMWh', () => {
  it('converts watts to MWh assuming 24h', () => {
    expect(toMWh(1_000_000)).toBe(24)
  })
})

describe('toPHS', () => {
  it('converts raw hashrate to PH/s', () => {
    expect(toPHS(1e9)).toBe(1)
    expect(toPHS(5e9)).toBe(5)
  })
})

describe('unitToKilo', () => {
  it('divides by 1000', () => {
    expect(unitToKilo(5000)).toBe(5)
  })
})

describe('convertMpaToBar', () => {
  it('converts MPa to Bar', () => {
    expect(convertMpaToBar(1)).toBe(10)
    expect(convertMpaToBar(2.5)).toBe(25)
  })

  it('returns 0 for non-number input', () => {
    expect(convertMpaToBar('invalid')).toBe(0)
    expect(convertMpaToBar(null)).toBe(0)
    expect(convertMpaToBar(Infinity)).toBe(0)
  })
})
