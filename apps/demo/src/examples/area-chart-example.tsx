import { AreaChart, ChartContainer } from '@mining-sdk/core'
import React from 'react'
import { AREA_CHART_HASHRATE_TREND } from '../constants/demo-chart-data'

export const AreaChartExample: React.FC = () => {
  return (
    <div className="demo-section__charts">
      <section>
        <h3>Hashrate trend</h3>
        <ChartContainer title="Hashrate trend">
          <AreaChart height={250} data={AREA_CHART_HASHRATE_TREND} />
        </ChartContainer>
      </section>
    </div>
  )
}
