import type { Alert } from '../types/alerts'
import _map from 'lodash/map'
import _join from 'lodash/join'

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
