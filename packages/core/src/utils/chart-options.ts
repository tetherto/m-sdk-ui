/**
 * Default chart options using theme colors
 */

import type { Chart } from 'chart.js'
import { defaultChartColors } from '../constants/charts'

export { defaultChartColors }

/** Compute min, max, avg from a flat array of numbers */
export function computeStats(values: number[]): { min: number; max: number; avg: number } {
  if (values.length === 0) return { min: 0, max: 0, avg: 0 }
  const min = Math.min(...values)
  const max = Math.max(...values)
  const avg = values.reduce((a, b) => a + b, 0) / values.length
  return { min, max, avg }
}

/** Get all numeric values from chart datasets */
export function getDatasetValues(datasets: Array<{ data: (number | null)[] }>): number[] {
  return datasets.flatMap((ds) => ds.data.filter((v): v is number => typeof v === 'number'))
}

/** Add opacity to an HSL color string */
function addColorOpacity(color: string, opacity: number): string {
  if (typeof color === 'string' && color.startsWith('hsl')) {
    return color.replace(')', ` / ${opacity})`)
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
function buildLegendLabels(chart: Chart): LegendLabelItem[] {
  const datasets = chart.data.datasets ?? []
  const fontColor = '#4a4a4a'
  return datasets.map((dataset, i) => {
    const meta = chart.getDatasetMeta(i)
    const strokeStyleRaw = dataset.borderColor ?? dataset.backgroundColor ?? '#888'
    const strokeStyle = typeof strokeStyleRaw === 'string' ? strokeStyleRaw : '#888'
    const fillStyle = addColorOpacity(strokeStyle, 0.25)
    const ds = dataset as unknown as Record<string, unknown>
    return {
      text: (dataset.label as string) ?? '',
      fillStyle,
      strokeStyle,
      lineWidth: (dataset.borderWidth as number) ?? 1,
      lineDash: (ds.borderDash as number[] | undefined) ?? [],
      lineDashOffset: (ds.borderDashOffset as number | undefined) ?? 0,
      lineCap: (ds.borderCapStyle as CanvasLineCap | undefined) ?? 'butt',
      lineJoin: (ds.borderJoinStyle as CanvasLineJoin | undefined) ?? 'miter',
      hidden: meta.hidden,
      datasetIndex: i,
      fontColor,
    }
  })
}

export const defaultChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
      position: 'top' as const,
      labels: {
        color: '#4a4a4a',
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
      grid: { display: false, color: '#4a4a4a' },
      ticks: { color: '#4a4a4a', maxRotation: 0 },
    },
    y: {
      display: true,
      grid: { display: true, color: '#4a4a4a' },
      ticks: { color: '#4a4a4a' },
    },
  },
  elements: {
    point: {
      radius: 0,
      hoverRadius: 4,
    },
  },
}
