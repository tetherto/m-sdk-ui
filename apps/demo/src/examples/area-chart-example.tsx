import { AreaChart, ChartContainer } from '@mining-sdk/core'
import React from 'react'
import {
  AREA_CHART_HASHRATE_TREND,
  AREA_CHART_HASHRATE_TREND_BLUE,
} from '../constants/demo-chart-data'

export const AreaChartExample: React.FC = () => {
  return (
    <div className="demo-section__charts demo-section__charts--1-col">
      <section>
        <ChartContainer title="Hashrate trend">
          <AreaChart height={250} data={AREA_CHART_HASHRATE_TREND} />
        </ChartContainer>
      </section>
      <section>
        <ChartContainer title="Hashrate trend – custom color">
          <AreaChart height={250} data={AREA_CHART_HASHRATE_TREND_BLUE} />
        </ChartContainer>
      </section>
    </div>
  )
}
