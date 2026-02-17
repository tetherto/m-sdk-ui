import { ChartContainer, computeStats, LineChart, UNITS } from '@mining-sdk/core'
import React, { useCallback, useEffect, useState } from 'react'
import {
  LINE_CHART_DAILY_REVENUE,
  LINE_CHART_HASH_RATE,
  LINE_CHART_REVENUE_BASIC,
  LINE_CHART_TEMPERATURE,
} from '../constants/demo-chart-data'

const RANGE_OPTIONS = [
  { label: '5 Min', value: '5m' },
  { label: '30 Min', value: '30m' },
  { label: '3 H', value: '3h' },
  { label: '1 D', value: '1d' },
] as const

const RANGE_LABELS: Record<string, string[]> = {
  '5m': ['12:55', '12:56', '12:57', '12:58', '12:59', '13:00'],
  '30m': ['12:30', '12:35', '12:40', '12:45', '12:50', '12:55', '13:00'],
  '3h': ['10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00'],
  '1d': ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00', '00:00'],
}

/** Generate slightly different hash-rate data per range for the demo */
const generateHashRateData = (range: string): typeof LINE_CHART_HASH_RATE => {
  const labels = RANGE_LABELS[range] ?? RANGE_LABELS['5m']!
  const count = labels.length
  const seed = range.charCodeAt(0) + range.charCodeAt(range.length - 1)
  const vary = (base: number, i: number): number =>
    +(base + Math.sin(seed + i * 1.7) * base * 0.04).toFixed(2)
  return {
    labels,
    datasets: LINE_CHART_HASH_RATE.datasets.map((ds) => ({
      ...ds,
      data: Array.from({ length: count }, (_, i) => {
        const base = (ds.data as number[])[0] ?? 0
        return base === 0 ? 0 : vary(base, i)
      }),
    })),
  }
}

export const LineChartExample: React.FC = () => {
  const [range, setRange] = useState('5m')
  const [hashRateData, setHashRateData] = useState(() => generateHashRateData('5m'))
  const [hashRateLoading, setHashRateLoading] = useState(false)

  const handleRangeChange = useCallback((value: string) => {
    setRange(value)
    setHashRateLoading(true)
  }, [])

  useEffect(() => {
    if (!hashRateLoading) return
    const timer = setTimeout(() => {
      setHashRateData(generateHashRateData(range))
      setHashRateLoading(false)
    }, 800)
    return () => clearTimeout(timer)
  }, [hashRateLoading, range])

  const hashRatePrimaryData = (hashRateData.datasets[0]?.data ?? []) as number[]
  const hashRateStats = computeStats(hashRatePrimaryData)

  const temperatureData = (LINE_CHART_TEMPERATURE.datasets[0]?.data ?? []) as number[]
  const temperatureStats = computeStats(temperatureData)

  const dailyRevenueData = (LINE_CHART_DAILY_REVENUE.datasets[0]?.data ?? []) as number[]
  const dailyRevenueStats = computeStats(dailyRevenueData)

  return (
    <div className="demo-section__charts demo-section__charts--2-col">
      <section>
        <h3>Basic</h3>
        <ChartContainer title="Revenue over time">
          <LineChart height={250} data={LINE_CHART_REVENUE_BASIC} />
        </ChartContainer>
      </section>
      <section>
        <h3>Hash Rate style</h3>
        <ChartContainer
          title="Hash Rate"
          footer={
            <span>
              Min {hashRateStats.min.toFixed(2)} PH/s · Max {hashRateStats.max.toFixed(2)} PH/s ·
              Avg {hashRateStats.avg.toFixed(2)} PH/s
            </span>
          }
        >
          <LineChart
            height={250}
            formatYLabel={(v) => `${v.toFixed(2)} PH/s`}
            data={LINE_CHART_HASH_RATE}
          />
        </ChartContainer>
      </section>
      <section>
        <h3>With highlighted value and range selector</h3>
        <ChartContainer
          title="Hash Rate"
          loading={hashRateLoading}
          legendData={hashRateData.datasets.map((ds) => ({
            label: ds.label as string,
            color: (ds.borderColor ??
              (ds as { backgroundColor?: string }).backgroundColor) as string,
          }))}
          highlightedValue={{
            value: hashRateStats.max.toFixed(3),
            unit: 'PH/s',
          }}
          rangeSelector={{
            options: RANGE_OPTIONS.map((o) => ({ label: o.label, value: o.value })),
            value: range,
            onChange: handleRangeChange,
          }}
          footer={
            <span>
              Min {hashRateStats.min.toFixed(2)} PH/s · Max {hashRateStats.max.toFixed(2)} PH/s ·
              Avg {hashRateStats.avg.toFixed(2)} PH/s
            </span>
          }
        >
          <LineChart
            height={250}
            showLegend={false}
            formatYLabel={(v) => `${v.toFixed(2)} PH/s`}
            data={hashRateData}
          />
        </ChartContainer>
      </section>
      <section>
        <h3>With points + footer</h3>
        <ChartContainer
          title="Temperature"
          footer={
            <span>
              Min {temperatureStats.min}
              {UNITS.TEMPERATURE_C} · Max {temperatureStats.max}
              {UNITS.TEMPERATURE_C} · Avg {temperatureStats.avg.toFixed(1)}
              {UNITS.TEMPERATURE_C}
            </span>
          }
        >
          <LineChart
            height={250}
            showPoints
            formatYLabel={(v) => `${v}${UNITS.TEMPERATURE_C}`}
            data={LINE_CHART_TEMPERATURE}
          />
        </ChartContainer>
      </section>
      <section>
        <h3>Currency format</h3>
        <ChartContainer
          title="Daily revenue"
          footer={
            <span>
              Min ${dailyRevenueStats.min.toLocaleString()} · Max $
              {dailyRevenueStats.max.toLocaleString()} · Avg ${dailyRevenueStats.avg.toFixed(0)}
            </span>
          }
        >
          <LineChart
            height={250}
            formatYLabel={(v) => `$${(v / 1000).toFixed(1)}k`}
            data={LINE_CHART_DAILY_REVENUE}
          />
        </ChartContainer>
      </section>
    </div>
  )
}
