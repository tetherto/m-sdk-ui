import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js'
import 'chartjs-adapter-date-fns'
import * as React from 'react'
import { Bar } from 'react-chartjs-2'
import { cn } from '../../utils'
import {
  defaultChartColors,
  defaultChartOptions,
  legendMarginPlugin,
  makeBarGradient,
} from '../../utils/chart-options'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
)

export type BarChartProps = {
  /** Chart data - required, provided by parent */
  data: ChartJS<'bar'>['data']
  /** Chart.js options - merged with defaults */
  options?: ChartJS<'bar'>['options']
  /** Stack bars on top of each other */
  isStacked?: boolean
  /** Render bars horizontally (indexAxis: 'y') */
  isHorizontal?: boolean
  /** Format Y-axis tick labels */
  formatYLabel?: (value: number) => string
  /** Show built-in Chart.js legend (default: true) */
  showLegend?: boolean
  /** Position of the legend (default: 'top') */
  legendPosition?: 'top' | 'bottom' | 'left' | 'right'
  /** Alignment of the legend labels within their position (default: 'start') */
  legendAlign?: 'start' | 'center' | 'end'
  /** Chart height in pixels */
  height?: number
  className?: string
}

export const BarChart = React.forwardRef<HTMLDivElement, BarChartProps>(
  (
    {
      data,
      options,
      isStacked = false,
      isHorizontal = false,
      formatYLabel,
      showLegend = true,
      legendPosition = 'top',
      legendAlign = 'start',
      height = 300,
      className,
    },
    ref,
  ) => {
    const mergedOptions = React.useMemo(() => {
      const base = {
        ...defaultChartOptions,
        ...options,
      }

      if (isHorizontal) {
        ;(base as Record<string, unknown>).indexAxis = 'y'
      }

      base.plugins = {
        ...base.plugins,
        legend: {
          ...base.plugins?.legend,
          display: showLegend,
          position: legendPosition,
          align: legendAlign,
        },
      }

      const scales = { ...base.scales } as Record<string, Record<string, unknown>>

      if (isStacked) {
        scales.x = { ...scales.x, stacked: true }
        scales.y = { ...scales.y, stacked: true }
      }

      if (formatYLabel) {
        const valueAxis = isHorizontal ? 'x' : 'y'
        const existing = scales[valueAxis] ?? {}
        const existingTicks =
          typeof existing === 'object' && 'ticks' in existing ? existing.ticks : {}
        scales[valueAxis] = {
          ...(existing as Record<string, unknown>),
          ticks: {
            ...(typeof existingTicks === 'object' ? existingTicks : {}),
            callback: (_value: unknown, index: number, values: { value: number }[]) =>
              formatYLabel(values[index]?.value ?? 0),
          },
        }
      }

      return { ...base, scales }
    }, [options, isStacked, isHorizontal, formatYLabel, showLegend, legendPosition, legendAlign])

    const chartData = React.useMemo(() => {
      const datasets = data.datasets?.map((ds, i) => {
        const solidColor = String(
          ds.borderColor ?? ds.backgroundColor ?? defaultChartColors[i % defaultChartColors.length],
        )

        const hasCustomBg = ds.backgroundColor != null && typeof ds.backgroundColor === 'function'

        return {
          ...ds,
          backgroundColor: hasCustomBg
            ? ds.backgroundColor
            : (((ctx: { chart: ChartJS }) =>
                makeBarGradient(ctx, solidColor)) as unknown as string),
          borderColor: ds.borderColor ?? solidColor,
          borderWidth: ds.borderWidth ?? ({ top: 1.5, right: 0, bottom: 0, left: 0 } as const),
          borderSkipped: ds.borderSkipped ?? (false as const),
          borderRadius: ds.borderRadius ?? 0,
        }
      })
      return { ...data, datasets }
    }, [data])

    return (
      <div ref={ref} className={cn('mining-sdk-bar-chart', className)} style={{ height }}>
        <Bar data={chartData} options={mergedOptions} plugins={[legendMarginPlugin]} />
      </div>
    )
  },
)
BarChart.displayName = 'BarChart'
