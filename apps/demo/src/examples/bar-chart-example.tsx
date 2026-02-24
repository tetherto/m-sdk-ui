import { BarChart, ChartContainer } from '@mining-sdk/core'
import type { ChartTooltipConfig } from '@mining-sdk/core'
import React from 'react'
import {
  BAR_CHART_GROUPED_SITES,
  BAR_CHART_HORIZONTAL_MINERS,
  BAR_CHART_MINERS_STATUS,
  BAR_CHART_MINING_OUTPUT,
  BAR_CHART_STACKED_REVENUE,
  BAR_CHART_SUBSIDY_FEES,
} from '../constants/demo-chart-data'

const barTooltip: ChartTooltipConfig = {
  valueFormatter: (v) => v.toLocaleString(),
}

export const BarChartExample: React.FC = () => {
  return (
    <>
      <p className="demo-section__resize-hint">
        ← Resize the window horizontally to see charts adapt →
      </p>
      <div className="demo-section__charts">
        <section>
          <h3>Bar Chart</h3>
          <ChartContainer title="Mining output">
            <BarChart height={250} data={BAR_CHART_MINING_OUTPUT} tooltip={barTooltip} />
          </ChartContainer>
        </section>

        <section>
          <h3>Stacked Bar Chart</h3>
          <ChartContainer title="Revenue by site (stacked)">
            <BarChart
              height={250}
              data={BAR_CHART_STACKED_REVENUE}
              isStacked
              tooltip={barTooltip}
            />
          </ChartContainer>
        </section>

        <section>
          <h3>Grouped Bar Chart</h3>
          <ChartContainer title="Hash rate by site (grouped)">
            <BarChart height={250} data={BAR_CHART_GROUPED_SITES} tooltip={barTooltip} />
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
              tooltip={barTooltip}
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
              tooltip={barTooltip}
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
              tooltip={{ valueFormatter: (v) => v.toFixed(2) }}
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
    </>
  )
}
