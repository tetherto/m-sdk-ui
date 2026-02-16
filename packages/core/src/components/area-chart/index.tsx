import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js'
import 'chartjs-adapter-date-fns'
import * as React from 'react'
import { Line } from 'react-chartjs-2'
import { cn } from '../../utils'
import {
  addColorOpacityForFill,
  defaultChartColors,
  defaultChartOptions,
} from '../../utils/chart-options'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Title,
  Tooltip,
  Legend,
)

export type AreaChartProps = {
  /** Chart data - required, provided by parent */
  data: ChartJS<'line'>['data']
  /** Chart.js options - merged with defaults */
  options?: ChartJS<'line'>['options']
  /** Legend position (default: top) */
  legendPosition?: 'top' | 'bottom' | 'left' | 'right'
  /** Chart height in pixels */
  height?: number
  className?: string
}

/**
 * AreaChart - Presentational Chart.js area chart (Line with fill)
 * Data must be provided via props; no fetching.
 *
 * @example
 * ```tsx
 * <AreaChart data={areaData} options={options} height={300} />
 * ```
 */
export const AreaChart = React.forwardRef<HTMLDivElement, AreaChartProps>(
  ({ data, options, legendPosition = 'top', height = 300, className }, ref) => {
    const mergedOptions = React.useMemo(() => {
      const base = { ...defaultChartOptions, ...options }
      base.plugins = {
        ...base.plugins,
        legend: {
          ...base.plugins?.legend,
          position: legendPosition,
          align: legendPosition === 'bottom' || legendPosition === 'top' ? 'start' : 'center',
        },
      }
      return base
    }, [options, legendPosition])

    const chartData = React.useMemo(() => {
      const datasets = data.datasets?.map((ds, i) => {
        const lineColor =
          (typeof ds.borderColor === 'string' ? ds.borderColor : undefined) ??
          (defaultChartColors[i % defaultChartColors.length] as string)
        return {
          ...ds,
          fill: true,
          tension: 0.3,
          borderColor: ds.borderColor ?? lineColor,
          backgroundColor: ds.backgroundColor ?? addColorOpacityForFill(lineColor),
        }
      })
      return { ...data, datasets }
    }, [data])

    return (
      <div ref={ref} className={cn('mining-sdk-area-chart', className)} style={{ height }}>
        <Line data={chartData} options={mergedOptions} />
      </div>
    )
  },
)
AreaChart.displayName = 'AreaChart'
