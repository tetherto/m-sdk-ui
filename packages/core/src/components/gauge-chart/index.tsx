/// <reference path="../../types/react-gauge-chart.d.ts" />
import * as React from 'react'
import ReactGaugeChart from 'react-gauge-chart'
import { cn } from '../../utils'

export type GaugeChartProps = {
  /** Value between 0 and 1 (e.g. 0.75 = 75%) */
  percent: number
  /** Arc colors in HEX format */
  colors?: string[]
  /** Arc thickness (0-1) */
  arcWidth?: number
  /** Number of arc segments */
  nrOfLevels?: number
  /** Hide percentage text */
  hideText?: boolean
  /** Unique id for the chart (required by react-gauge-chart) */
  id?: string
  /** Fixed height to prevent resize bug */
  height?: number
  className?: string
}

/**
 * GaugeChart - Presentational gauge/speedometer chart
 * Data (percent) must be provided via props; no fetching.
 *
 * @example
 * ```tsx
 * <GaugeChart percent={0.75} colors={['#00FF00', '#FF0000']} />
 * ```
 */
export const GaugeChart = React.forwardRef<HTMLDivElement, GaugeChartProps>(
  (
    {
      percent,
      colors = ['#72F59E', '#EF4444'],
      arcWidth = 0.2,
      nrOfLevels = 3,
      hideText = false,
      id = 'mining-sdk-gauge-chart',
      height = 200,
      className,
    },
    ref,
  ) => {
    return (
      <div ref={ref} className={cn('mining-sdk-gauge-chart', className)} style={{ height }}>
        <ReactGaugeChart
          id={id}
          percent={Math.max(0, Math.min(1, percent))}
          colors={colors}
          arcWidth={arcWidth}
          nrOfLevels={nrOfLevels}
          hideText={hideText}
          style={{ width: '100%', height: '100%' }}
        />
      </div>
    )
  },
)
GaugeChart.displayName = 'GaugeChart'
