import * as React from 'react'

import { cn } from '../../utils'

export type ChartContainerProps = {
  /** Chart title */
  title?: string
  /** Custom header (overrides title if both provided) */
  header?: React.ReactNode
  /** Show loading state */
  loading?: boolean
  /** Show empty state */
  empty?: boolean
  /** Message when empty */
  emptyMessage?: string
  /** Toggle legend visibility */
  showLegend?: boolean
  /** Legend position */
  legendPosition?: 'top' | 'bottom' | 'left' | 'right'
  /** Footer content (e.g. Min/Max/Avg stats) */
  footer?: React.ReactNode
  className?: string
  children: React.ReactNode
}

/**
 * ChartContainer - Common wrapper for charts with title, loading, and empty states
 *
 * @example
 * ```tsx
 * <ChartContainer title="Revenue" loading={isLoading} empty={!data.length}>
 *   <LineChart data={data} options={options} />
 * </ChartContainer>
 * ```
 */
export const ChartContainer = React.forwardRef<HTMLDivElement, ChartContainerProps>(
  (
    {
      title,
      header,
      loading,
      empty,
      emptyMessage = 'No data available',
      footer,
      className,
      children,
    },
    ref,
  ) => {
    return (
      <div ref={ref} className={cn('mining-sdk-chart-container', className)}>
        {(header ?? title) && (
          <div className="mining-sdk-chart-container__header">
            {header ?? (title && <h3 className="mining-sdk-chart-container__title">{title}</h3>)}
          </div>
        )}
        <div className="mining-sdk-chart-container__body">
          {loading && (
            <div className="mining-sdk-chart-container__loading">
              <span className="mining-sdk-chart-container__spinner" aria-hidden="true" />
            </div>
          )}
          {empty && !loading && (
            <div className="mining-sdk-chart-container__empty">{emptyMessage}</div>
          )}
          {!loading && !empty && children}
        </div>
        {footer && !loading && !empty && (
          <div className="mining-sdk-chart-container__footer">{footer}</div>
        )}
      </div>
    )
  },
)
ChartContainer.displayName = 'ChartContainer'
