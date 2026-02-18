import { BarChart, ChartContainer } from '@mining-sdk/core'
import React from 'react'
import {
  BAR_CHART_GROUPED_SITES,
  BAR_CHART_MINERS_STATUS,
  BAR_CHART_MINING_OUTPUT,
  BAR_CHART_STACKED_REVENUE,
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
    </div>
  )
}
