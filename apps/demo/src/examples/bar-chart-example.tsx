import { BarChart, ChartContainer } from '@mining-sdk/core'
import React from 'react'
import { BAR_CHART_MINING_OUTPUT } from '../constants/demo-chart-data'

export const BarChartExample: React.FC = () => {
  return (
    <div className="demo-section__charts">
      <section>
        <h3>Mining output</h3>
        <ChartContainer title="Mining output">
          <BarChart height={250} data={BAR_CHART_MINING_OUTPUT} />
        </ChartContainer>
      </section>
    </div>
  )
}
