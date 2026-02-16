import { ChartContainer, computeStats, LineChart, UNITS } from '@mining-sdk/core'
import React, { useState } from 'react'
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

export const LineChartExample: React.FC = () => {
  const [range, setRange] = useState('5m')
  const hashRatePrimaryData = (LINE_CHART_HASH_RATE.datasets[0]?.data ?? []) as number[]
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
          legendData={LINE_CHART_HASH_RATE.datasets.map((ds) => ({
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
            onChange: setRange,
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
            data={LINE_CHART_HASH_RATE}
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
