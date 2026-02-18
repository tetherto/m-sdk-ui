import { BarChart, ChartContainer } from '@mining-sdk/core'
import React from 'react'
import {
  BAR_CHART_GROUPED_SITES,
  BAR_CHART_HORIZONTAL_MINERS,
  BAR_CHART_MINERS_STATUS,
  BAR_CHART_MINING_OUTPUT,
  BAR_CHART_STACKED_REVENUE,
  BAR_CHART_SUBSIDY_FEES,
} from '../constants/demo-chart-data'

export const BarChartExample: React.FC = () => {
  return (
    <div className="demo-section__charts">
      <section>
        <h3>Bar Chart</h3>
        <ChartContainer title="Mining output">
          <BarChart height={250} data={BAR_CHART_MINING_OUTPUT} />
        </ChartContainer>
      </section>

      <section>
        <h3>Stacked Bar Chart</h3>
        <ChartContainer title="Revenue by site (stacked)">
          <BarChart height={250} data={BAR_CHART_STACKED_REVENUE} isStacked />
        </ChartContainer>
      </section>

      <section>
        <h3>Grouped Bar Chart</h3>
        <ChartContainer title="Hash rate by site (grouped)">
          <BarChart height={250} data={BAR_CHART_GROUPED_SITES} />
        </ChartContainer>
      </section>

      <section>
        <h3>Horizontal Bar Chart</h3>
        <ChartContainer title="Miners by type">
          <BarChart
            height={280}
            data={BAR_CHART_HORIZONTAL_MINERS}
            isHorizontal
            showLegend={false}
          />
        </ChartContainer>
      </section>

      <section>
        <h3>Stacked Bar Chart (legend bottom)</h3>
        <ChartContainer title="Miners Status">
          <BarChart
            height={300}
            data={BAR_CHART_MINERS_STATUS}
            isStacked
            legendPosition="bottom"
            legendAlign="start"
          />
        </ChartContainer>
      </section>

      <section>
        <h3>Bar + Line with Data Labels</h3>
        <ChartContainer title="Subsidy/Fees">
          <BarChart
            height={250}
            data={BAR_CHART_SUBSIDY_FEES}
            isStacked
            showDataLabels
            legendPosition="bottom"
            legendAlign="start"
            formatDataLabel={(v) => v.toFixed(2)}
            options={{
              scales: {
                y1: {
                  position: 'right',
                  beginAtZero: true,
                  grid: { drawOnChartArea: false },
                  ticks: {
                    color: 'rgba(255,255,255,0.6)',
                    callback: (v: string | number) => `${v}%`,
                  },
                },
              },
            }}
          />
        </ChartContainer>
      </section>
    </div>
  )
}
