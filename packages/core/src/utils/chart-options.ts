/**
 * Default chart options using theme colors
 */

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

export const defaultChartColors = [
  'hsl(25 95% 53%)', // primary orange
  'hsl(142 76% 64%)', // success green
  'hsl(217 91% 60%)', // blue
  'hsl(45 93% 47%)', // warning yellow
  'hsl(0 84% 60%)', // error red
]

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
