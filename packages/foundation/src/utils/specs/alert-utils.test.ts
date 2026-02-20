import { describe, expect, it } from 'vitest'
import { getAlarms, getAlertsString } from '../alerts-utils'

describe('alert utils', () => {
  const getFormattedDate = (date: Date) => date.toISOString()
  describe('getAlarms', () => {
    it('should get alarms properly', () => {
      // vi.setSystemTime(new Date('2024-01-01'))

      const alerts = [
        {
          name: 'alert-1',
          description: 'alert 1',
          severity: 'high',
          createdAt: new Date('2024-01-01').toISOString(),
          message: 'message 1',
        },
        {
          name: 'alert-2',
          description: 'alert 2',
          severity: 'low',
          createdAt: new Date('2024-01-02').toISOString(),
          message: 'message 2',
        },
      ]
      const result = getAlarms(
        {
          id: 'dev-1',
          type: 'type-1',
          last: {
            alerts,
          },
        },
        false,
        getFormattedDate,
      )

      expect(result).toBe(alerts)
    })

    it('should format alarms properly', () => {
      const alerts = [
        {
          name: 'alert-1',
          description: 'alert 1',
          severity: 'high',
          createdAt: new Date('2024-01-01').toISOString(),
          message: 'message 1',
        },
        {
          name: 'alert-2',
          description: 'alert 2',
          severity: 'low',
          createdAt: new Date('2024-01-02').toISOString(),
          message: 'message 2',
        },
      ]

      const result = getAlarms(
        {
          id: 'dev-1',
          type: 'type-1',
          last: {
            alerts,
          },
        },
        true,
        getFormattedDate,
      )

      expect(typeof result).toBe('string')
      if (typeof result === 'string') {
        expect(result.split(',\n')).toEqual([
          '(high) 2024-01-01T00:00:00.000Z: alert-1 Description: alert 1 message 1',
          '(low) 2024-01-02T00:00:00.000Z: alert-2 Description: alert 2 message 2',
        ])
      }
    })
  })

  describe('getAlertsString', () => {
    it('should format alarms properly', () => {
      const alerts = [
        {
          name: 'alert-1',
          description: 'alert 1',
          severity: 'high',
          createdAt: new Date('2024-01-01').toISOString(),
          message: 'message 1',
        },
        {
          name: 'alert-2',
          description: 'alert 2',
          severity: 'low',
          createdAt: new Date('2024-01-02').toISOString(),
          message: 'message 2',
        },
      ]

      const result = getAlertsString(alerts, getFormattedDate)

      expect(typeof result).toBe('string')
      if (typeof result === 'string') {
        expect(result.split(',\n\n')).toEqual([
          '(high) 2024-01-01T00:00:00.000Z : alert-1 Description: alert 1 message 1',
          '(low) 2024-01-02T00:00:00.000Z : alert-2 Description: alert 2 message 2',
        ])
      }
    })
  })
})
