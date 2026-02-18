import { cn } from '@mining-sdk/core'
import type { TIncidentSeverity } from './types'

type TIncidentSeverityProps = {
  severity: TIncidentSeverity
}

const IncidentSeverity = ({ severity }: TIncidentSeverityProps): JSX.Element => (
  <div
    className={cn(
      'mining-sdk-active-incidents-card__dot',
      `mining-sdk-active-incidents-card__dot--${severity}`,
    )}
  />
)

IncidentSeverity.displayName = 'IncidentSeverity'

export { IncidentSeverity }
