/**
 * Default chart options using theme colors
 */

import type { Chart, ChartEvent, Plugin } from 'chart.js'
import { defaultChartColors } from '../constants/charts'

export { defaultChartColors }

/** Compute min, max, avg from a flat array of numbers */
// eslint-disable-next-line style/member-delimiter-style
export const computeStats = (values: number[]): { min: number; max: number; avg: number } => {
  if (values.length === 0) return { min: 0, max: 0, avg: 0 }
  const min = Math.min(...values)
  const max = Math.max(...values)
  const avg = values.reduce((a, b) => a + b, 0) / values.length
  return { min, max, avg }
}

/** Get all numeric values from chart datasets */
export const getDatasetValues = (datasets: Array<{ data: (number | null)[] }>): number[] =>
  datasets.flatMap((ds) => ds.data.filter((v): v is number => typeof v === 'number'))

/** Add opacity to a CSS color string (supports hex, hsl, rgb) */
export const colorWithAlpha = (color: string, alpha: number): string => {
  if (typeof color !== 'string') return color
  if (color.startsWith('#')) {
    const hex = Math.round(alpha * 255)
      .toString(16)
      .padStart(2, '0')
    const base = color.length === 9 ? color.slice(0, 7) : color
    return `${base}${hex}`
  }
  if (color.startsWith('hsl') || color.startsWith('rgb')) {
    return color.replace(/\)$/, ` / ${alpha})`)
  }
  return color
}

type LegendLabelItem = {
  text: string
  fillStyle: string
  strokeStyle: string
  lineWidth: number
  lineDash: number[]
  lineDashOffset: number
  lineCap: CanvasLineCap
  lineJoin: CanvasLineJoin
  hidden: boolean
  datasetIndex: number
  fontColor: string
}

/** Build legend items from chart datasets (avoids Chart.defaults which may be uninitialized at module load) */
const buildLegendLabels = (chart: Chart): LegendLabelItem[] => {
  const datasets = chart.data.datasets ?? []
  return datasets.map((dataset, i) => {
    const meta = chart.getDatasetMeta(i)
    const isHidden = meta.hidden === true
    const disabledOpacity = 0.3

    const strokeStyleRaw = dataset.borderColor ?? dataset.backgroundColor ?? '#888'
    const strokeStyle = typeof strokeStyleRaw === 'string' ? strokeStyleRaw : '#888'

    const fillStyle = isHidden
      ? colorWithAlpha(strokeStyle, 0.25 * disabledOpacity)
      : colorWithAlpha(strokeStyle, 0.25)

    const dimmedStrokeStyle = isHidden ? colorWithAlpha(strokeStyle, disabledOpacity) : strokeStyle
    const fontColor = isHidden
      ? `rgba(255, 255, 255, ${0.7 * disabledOpacity})`
      : 'rgba(255, 255, 255, 0.7)'

    const ds = dataset as unknown as Record<string, unknown>
    return {
      text: (dataset.label as string) ?? '',
      fillStyle,
      strokeStyle: dimmedStrokeStyle,
      lineWidth: (dataset.borderWidth as number) ?? 1,
      lineDash: (ds.borderDash as number[] | undefined) ?? [],
      lineDashOffset: (ds.borderDashOffset as number | undefined) ?? 0,
      lineCap: (ds.borderCapStyle as CanvasLineCap | undefined) ?? 'butt',
      lineJoin: (ds.borderJoinStyle as CanvasLineJoin | undefined) ?? 'miter',
      hidden: false,
      datasetIndex: i,
      fontColor,
    }
  })
}

/** Chart.js plugin that adds bottom margin below the legend */
export const legendMarginPlugin: Plugin<any> = {
  id: 'legendMargin',
  beforeInit(chart: Chart) {
    const legend = chart.legend
    if (!legend) return
    const originalFit = legend.fit.bind(legend)
    legend.fit = function () {
      originalFit()
      this.height += 12
    }
  },
}

export const defaultChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  layout: {
    padding: 0,
  },
  plugins: {
    legend: {
      display: true,
      position: 'top' as const,
      align: 'start' as const,
      onHover: (_event: ChartEvent) => {
        const canvas = _event.native?.target as HTMLCanvasElement | null
        if (canvas) canvas.style.cursor = 'pointer'
      },
      onLeave: (_event: ChartEvent) => {
        const canvas = _event.native?.target as HTMLCanvasElement | null
        if (canvas) canvas.style.cursor = 'default'
      },
      labels: {
        color: 'rgba(255, 255, 255, 0.7)',
        font: { size: 12 },
        boxWidth: 10,
        boxHeight: 10,
        generateLabels: buildLegendLabels,
      },
    },
  },
  scales: {
    x: {
      display: true,
      beginAtZero: true,
      border: { display: false },
      grid: { display: false, color: '#4a4a4a' },
      ticks: { color: 'rgba(255, 255, 255, 0.7)', maxRotation: 0 },
    },
    y: {
      display: true,
      beginAtZero: true,
      border: { display: false },
      grid: { display: true, color: '#4a4a4a' },
      ticks: { color: 'rgba(255, 255, 255, 0.7)', padding: 8 },
    },
  },
  elements: {
    point: {
      radius: 0,
      hoverRadius: 4,
    },
  },
}
