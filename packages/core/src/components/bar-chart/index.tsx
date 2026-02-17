import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js'
import 'chartjs-adapter-date-fns'
import * as React from 'react'
import { Bar } from 'react-chartjs-2'
import { cn } from '../../utils'
import { defaultChartColors, defaultChartOptions } from '../../utils/chart-options'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export type BarChartProps = {
  /** Chart data - required, provided by parent */
  data: ChartJS<'bar'>['data']
  /** Chart.js options - merged with defaults */
  options?: ChartJS<'bar'>['options']
  /** Chart height in pixels */
  height?: number
  className?: string
}

/**
 * BarChart - Presentational Chart.js bar chart wrapper
 * Data must be provided via props; no fetching.
 *
 * @example
 * ```tsx
 * <BarChart data={barData} options={options} height={300} />
 * ```
 */
export const BarChart = React.forwardRef<HTMLDivElement, BarChartProps>(
  ({ data, options, height = 300, className }, ref) => {
    const mergedOptions = React.useMemo(
      () => ({
        ...defaultChartOptions,
        ...options,
      }),
      [options],
    )

    const chartData = React.useMemo(() => {
      const datasets = data.datasets?.map((ds, i) => ({
        ...ds,
        backgroundColor: ds.backgroundColor ?? defaultChartColors[i % defaultChartColors.length],
        borderColor: ds.borderColor ?? defaultChartColors[i % defaultChartColors.length],
      }))
      return { ...data, datasets }
    }, [data])

    return (
      <div ref={ref} className={cn('mining-sdk-bar-chart', className)} style={{ height }}>
        <Bar data={chartData} options={mergedOptions} />
      </div>
    )
  },
)
BarChart.displayName = 'BarChart'
