import { cn } from '@mining-sdk/core'

export type StatusLabelProps = {
  status?: 'error' | 'sleep' | 'offline'
  children: React.ReactNode
}

export const StatusLabel = ({ status, children }: StatusLabelProps): JSX.Element => {
  return (
    <div
      className={cn('mining-sdk-device-explorer__status-label', {
        'mining-sdk-device-explorer__status-label--error': status === 'error',
        'mining-sdk-device-explorer__status-label--offline': status === 'offline',
        'mining-sdk-device-explorer__status-label--sleep': status === 'sleep',
      })}
    >
      {children}
    </div>
  )
}
