import { describe, expect, it } from 'vitest'

import {
  formatCountTo99Plus,
  formatCurrency,
  formatMacAddress,
  formatNumber,
  formatValueUnit,
  showTotalTableCount,
  toTitleCase,
} from './format'

describe('formatNumber', () => {
  it('formats numbers with locale', () => {
    expect(formatNumber(1234.567)).toBe('1,234.57')
    expect(formatNumber(1000)).toBe('1,000')
  })

  it('returns fallback for invalid input', () => {
    expect(formatNumber(null)).toBe('-')
    expect(formatNumber(undefined)).toBe('-')
  })

  it('handles -0', () => {
    expect(formatNumber(-0.001, { maximumFractionDigits: 0 })).toBe('0')
  })
})

describe('formatValueUnit', () => {
  it('places fiat symbols before the number', () => {
    expect(formatValueUnit(1234, '$')).toBe('$1,234')
    expect(formatValueUnit(1234, '€')).toBe('€1,234')
  })

  it('places other units after with a space', () => {
    expect(formatValueUnit(1234, 'BTC')).toBe('1,234 BTC')
  })
})

describe('toTitleCase', () => {
  it('converts various formats to Title Case', () => {
    expect(toTitleCase('hello_world')).toBe('Hello World')
    expect(toTitleCase('helloWorld')).toBe('Hello World')
    expect(toTitleCase('kebab-case')).toBe('Kebab Case')
  })
})

describe('formatCountTo99Plus', () => {
  it('formats counts', () => {
    expect(formatCountTo99Plus(5)).toBe('5')
    expect(formatCountTo99Plus(150)).toBe('99+')
    expect(formatCountTo99Plus(null)).toBe('N/A')
  })
})

describe('showTotalTableCount', () => {
  it('formats pagination string', () => {
    expect(showTotalTableCount(100, [1, 10])).toBe('1-10 of 100')
  })
})

describe('formatCurrency', () => {
  it('formats USD by default', () => {
    expect(formatCurrency(1234.56)).toBe('$1,234.56')
  })

  it('formats other currencies', () => {
    expect(formatCurrency(1234.56, 'EUR')).toBe('€1,234.56')
  })
})

describe('formatMacAddress', () => {
  it('uppercases MAC address', () => {
    expect(formatMacAddress('aa:bb:cc')).toBe('AA:BB:CC')
  })

  it('returns empty string for undefined', () => {
    expect(formatMacAddress(undefined)).toBe('')
  })
})
