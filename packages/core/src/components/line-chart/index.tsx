import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js'
import zoomPlugin from 'chartjs-plugin-zoom'
import 'chartjs-adapter-date-fns'
import * as React from 'react'
import { Line } from 'react-chartjs-2'
import { cn } from '../../utils'
import {
  defaultChartColors,
  defaultChartOptions,
  legendMarginPlugin,
} from '../../utils/chart-options'
import { buildChartTooltip } from '../../utils/chart-tooltip'
import type { ChartTooltipConfig } from '../../utils/chart-tooltip'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  zoomPlugin,
)

export type LineChartProps = {
  /** Chart data - required, provided by parent */
  data: ChartJS<'line'>['data']
  /** Chart.js options - merged with defaults */
  options?: ChartJS<'line'>['options']
  /** Format X-axis labels (value, index) => string */
  formatXLabel?: (value: string | number, index: number) => string
  /** Format Y-axis labels (value) => string */
  formatYLabel?: (value: number) => string
  /** Show data point dots (default: false) */
  showPoints?: boolean
  /** Show built-in legend (default: true). Set false when using ChartContainer legendData */
  showLegend?: boolean
  /** Set of dataset indices to hide (controlled externally, e.g. by ChartContainer custom legend) */
  hiddenDatasets?: Set<number>
  /** Enable zoom (wheel/pinch) and pan (default: true) */
  enableZoom?: boolean
  /** Custom HTML tooltip configuration. When provided, replaces the default Chart.js tooltip. */
  tooltip?: ChartTooltipConfig
  /** Chart height in pixels */
  height?: number
  className?: string
}

/**
 * LineChart - Presentational Chart.js line chart wrapper
 * Data must be provided via props; no fetching.
 *
 * @example
 * ```tsx
 * <LineChart data={lineData} options={options} height={300} />
 * ```
 */
export const LineChart = React.forwardRef<HTMLDivElement, LineChartProps>(
  (
    {
      data,
      options,
      formatXLabel,
      formatYLabel,
      showPoints = false,
      showLegend = true,
      hiddenDatasets,
      enableZoom = true,
      tooltip: tooltipConfig,
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
      if (tooltipConfig) {
        base.plugins = {
          ...base.plugins,
          tooltip: buildChartTooltip(tooltipConfig),
        }
      }
      if (!showLegend) {
        base.plugins = {
          ...base.plugins,
          legend: { ...base.plugins?.legend, display: false },
        }
      }
      if (enableZoom) {
        base.plugins = {
          ...base.plugins,
          zoom: {
            zoom: {
              wheel: { enabled: true },
              pinch: { enabled: true },
              mode: 'x',
            },
            pan: {
              enabled: true,
              mode: 'x',
            },
            limits: {
              x: {
                min: 'original',
                max: 'original',
                minRange: 2,
              },
            },
          },
        }
      }
      const scales = { ...base.scales }
      if (formatXLabel && scales?.x && 'ticks' in scales.x) {
        scales.x = {
          ...scales.x,
          ticks: {
            ...(typeof scales.x.ticks === 'object' ? scales.x.ticks : {}),
            callback: (value: string | number, index: number) => formatXLabel(value, index),
          },
        }
      }
      if (formatYLabel && scales?.y && 'ticks' in scales.y) {
        scales.y = {
          ...scales.y,
          ticks: {
            ...(typeof scales.y.ticks === 'object' ? scales.y.ticks : {}),
            callback: (_value: unknown, index: number, values: { value: number }[]) =>
              formatYLabel(values[index]?.value ?? 0),
          },
        }
      }
      return {
        ...base,
        scales,
        elements: {
          ...base.elements,
          point: {
            ...(typeof base.elements === 'object' && base.elements?.point),
            radius: showPoints ? 3 : 0,
            hoverRadius: showPoints ? 6 : 4,
          },
        },
      }
    }, [options, formatXLabel, formatYLabel, showPoints, showLegend, enableZoom, tooltipConfig])

    const chartData = React.useMemo(() => {
      const datasets = data.datasets?.map((ds, i) => ({
        ...ds,
        hidden: hiddenDatasets?.has(i) ?? false,
        pointRadius: showPoints ? 3 : 0,
        pointHoverRadius: showPoints ? 6 : 4,
        borderColor: ds.borderColor ?? defaultChartColors[i % defaultChartColors.length],
        backgroundColor:
          ds.backgroundColor ?? `${defaultChartColors[i % defaultChartColors.length]}40`,
      }))
      return { ...data, datasets }
    }, [data, showPoints, hiddenDatasets])

    return (
      <div ref={ref} className={cn('mining-sdk-line-chart', className)} style={{ height }}>
        <Line data={chartData} options={mergedOptions} plugins={[legendMarginPlugin]} />
      </div>
    )
  },
)
LineChart.displayName = 'LineChart'
