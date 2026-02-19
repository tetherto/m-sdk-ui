import { DoughnutChart } from '@mining-sdk/core'
import React from 'react'
import {
  DOUGHNUT_CHART_MINER_STATUS,
  DOUGHNUT_CHART_MINER_TYPES,
  DOUGHNUT_CHART_SITE_DISTRIBUTION,
} from '../constants/demo-chart-data'

export const DoughnutChartExample: React.FC = () => {
  return (
    <div className="demo-section__charts demo-section__charts--2-col">
      <section>
        <h3>Miner Types</h3>
        <DoughnutChart data={DOUGHNUT_CHART_MINER_TYPES} />
      </section>

      <section>
        <h3>Miner Status</h3>
        <DoughnutChart data={DOUGHNUT_CHART_MINER_STATUS} />
      </section>

      <section>
        <h3>Site Distribution (auto colors)</h3>
        <DoughnutChart data={DOUGHNUT_CHART_SITE_DISTRIBUTION} />
      </section>

      <section>
        <h3>Legend Right</h3>
        <DoughnutChart data={DOUGHNUT_CHART_MINER_STATUS} legendPosition="right" />
      </section>

      <section>
        <h3>Legend Left</h3>
        <DoughnutChart data={DOUGHNUT_CHART_MINER_TYPES} legendPosition="left" />
      </section>

      <section>
        <h3>Legend Bottom</h3>
        <DoughnutChart
          data={DOUGHNUT_CHART_SITE_DISTRIBUTION}
          legendPosition="bottom"
          height={180}
        />
      </section>
    </div>
  )
}
