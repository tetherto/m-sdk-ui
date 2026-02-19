import { formatErrors, SimpleTooltip } from '@mining-sdk/core'
import { getAlertsString } from '../../../../../utils/alerts-utils'
import { MinerStatuses } from '../../../../../utils/device-utils'
import type { Alert, UnknownRecord } from '../../types'
import _isObject from 'lodash/isObject'
import { StatusLabel } from '../status-label/status-label'
import { MiningIcon } from '../icons/mining-icon'
import OfflineIcon from '../icons/offline-icon'
import { SleepIcon } from '../icons/sleep-icon'
import { ErrorIcon } from '../icons/error-icon'
import { AlertTriangle } from '../icons/alert-triangle'

const MinerStatusIcon = ({ status = '' }): JSX.Element => {
  switch (status) {
    case MinerStatuses.ALERT:
      return (
        <div className="mining-sdk-mining-status-indicator">
          <AlertTriangle />
        </div>
      )
    case MinerStatuses.MINING:
      return (
        <StatusLabel>
          <MiningIcon width={14} height={14} />
        </StatusLabel>
      )
    case MinerStatuses.SLEEPING:
      return (
        <StatusLabel status="sleep">
          <SleepIcon width={14} height={14} />
        </StatusLabel>
      )
    case MinerStatuses.OFFLINE:
      return (
        <StatusLabel status="offline">
          <OfflineIcon width={14} height={14} />
        </StatusLabel>
      )
    case MinerStatuses.ERROR:
      return (
        <StatusLabel status="offline">
          <ErrorIcon width={14} height={14} />
        </StatusLabel>
      )
    default:
      return <></>
  }
}

export type MinerStats = {
  status?: string
  [key: string]: unknown
}

export type MinerStatusIndicatorProps = {
  stats?: MinerStats | UnknownRecord
  alerts?: Alert[]
  hideTooltip?: boolean
  getFormattedDate: (date: Date) => string
}

export const MinerStatusIndicator = ({
  stats,
  alerts = [],
  hideTooltip = false,
  getFormattedDate,
}: MinerStatusIndicatorProps): JSX.Element => {
  // Convert unknown[] to Alert[] if needed
  const alertsTyped: Alert[] = Array.isArray(alerts)
    ? alerts.filter(
        (alert): alert is Alert =>
          _isObject(alert) &&
          alert !== null &&
          'severity' in alert &&
          'createdAt' in alert &&
          'name' in alert &&
          'description' in alert,
      )
    : []
  const errors = getAlertsString(alertsTyped, getFormattedDate)
  const status = alertsTyped?.length ? MinerStatuses.ALERT : String(stats?.status || '')

  const iconContent = (
    <div className="mining-sdk-mining-status-indicator">
      <MinerStatusIcon status={status} />
    </div>
  )

  return !hideTooltip ? (
    <SimpleTooltip
      content={
        errors !== null
          ? `Miner Status : ${stats?.status}\n${formatErrors(errors, getFormattedDate)}`
          : `Miner Status : ${stats?.status}`
      }
    >
      {iconContent}
    </SimpleTooltip>
  ) : (
    iconContent
  )
}
