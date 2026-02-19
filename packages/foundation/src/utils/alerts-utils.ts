import type { Alert } from '../types/alerts'
import _map from 'lodash/map'
import _join from 'lodash/join'
import type { Device } from '../types/device'

export const getAlertsString = (
  alerts: Alert[],
  getFormattedDate?: (date: Date) => string,
): string => {
  const formattedMessages = _map(
    alerts,
    (alert: Alert) =>
      `(${alert.severity}) ${
        getFormattedDate
          ? getFormattedDate(new Date(alert.createdAt))
          : new Date(alert.createdAt).toLocaleString()
      } : ${alert.name} Description: ${alert.description} ${alert.message ? alert.message : ''}`,
  )
  return _join(formattedMessages, ',\n\n')
}

export const getSingleAlarmMessage = (
  alarm: Alert,
  getFormattedDate?: (date: Date) => string,
): string =>
  `(${alarm.severity}) ${getFormattedDate?.(new Date(alarm.createdAt)) ?? ''}: ${alarm.name} Description: ${
    alarm.description
  } ${alarm.message || ''}`

export const getAlarms = (
  data: Device = {} as Device,
  getString?: boolean,
  getFormattedDate?: (date: Date) => string,
): string | Alert[] => {
  const alarms = data?.last?.alerts as Alert[]

  if (!getString || !alarms) {
    return alarms
  }
  return _join(
    _map(alarms, (alarm) => getSingleAlarmMessage(alarm, getFormattedDate)),
    ',\n',
  )
}
