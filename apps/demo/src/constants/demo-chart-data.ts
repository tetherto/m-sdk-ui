/**
 * Demo chart data for the component showcase.
 * Used by LineChart, BarChart, and AreaChart demos in App.tsx.
 */

export const LINE_CHART_REVENUE_BASIC = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Revenue',
      data: [12, 19, 8, 15, 22, 18],
    },
  ],
}

export const LINE_CHART_HASH_RATE = {
  labels: ['12:45', '12:50', '12:55', '13:00', '13:05', '13:10'],
  datasets: [
    {
      label: 'Mining OS Hash Rate',
      data: [75.46, 75.46, 75.48, 75.45, 75.47, 75.46],
      borderColor: 'hsl(180 70% 50%)',
    },
    {
      label: 'Aggr Pool Hash Rate',
      data: [58, 59, 60, 58, 59, 60],
      borderColor: 'hsl(220 70% 45%)',
    },
    {
      label: 'F2pool Hash Rate',
      data: [0, 0, 0, 0, 0, 0],
      borderColor: 'hsl(270 60% 60%)',
    },
    {
      label: 'Ocean Hash Rate',
      data: [58, 59, 60, 58, 59, 60],
      borderColor: 'hsl(0 70% 55%)',
    },
  ],
}

export const LINE_CHART_TEMPERATURE = {
  labels: ['06:00', '09:00', '12:00', '15:00', '18:00', '21:00'],
  datasets: [
    {
      label: 'Temperature',
      data: [22, 24, 23, 25, 26, 24],
    },
  ],
}

export const LINE_CHART_DAILY_REVENUE = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  datasets: [
    {
      label: 'Revenue',
      data: [1200, 1350, 1100, 1420, 1380, 1500],
    },
  ],
}

export const BAR_CHART_MINING_OUTPUT = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
      label: 'TH/s',
      data: [65, 72, 68, 75, 70, 80, 78],
    },
  ],
}

export const AREA_CHART_HASHRATE_TREND = {
  labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
  datasets: [
    {
      label: 'Hashrate',
      data: [100, 95, 110, 105, 120, 115],
    },
  ],
}
