import type { IChartApi } from '@mining-sdk/core'
import { ChartContainer, LightWeightLineChart } from '@mining-sdk/core'
import { useRef } from 'react'

export const LwLineChartExample = (): JSX.Element => {
  const ref = useRef<IChartApi | null>(null)

  return (
    <div className="demo-section__charts demo-section__charts--1-col">
      <section>
        <h3>Basic</h3>
        <ChartContainer title="Revenue over time">
          <LightWeightLineChart
            customLabel="LABEL"
            timeline="5m"
            chartRef={ref}
            data={{
              datasets: [
                {
                  borderColor: 'red',
                  data: [
                    { x: new Date('2019-04-11').valueOf(), y: 80.01 },
                    { x: new Date('2019-04-12').valueOf(), y: 96.63 },
                    { x: new Date('2019-04-13').valueOf(), y: 76.64 },
                    { x: new Date('2019-04-14').valueOf(), y: 81.89 },
                    { x: new Date('2019-04-15').valueOf(), y: 74.43 },
                    { x: new Date('2019-04-16').valueOf(), y: 80.01 },
                    { x: new Date('2019-04-17').valueOf(), y: 96.63 },
                    { x: new Date('2019-04-18').valueOf(), y: 76.64 },
                    { x: new Date('2019-04-19').valueOf(), y: 81.89 },
                    { x: new Date('2019-04-20').valueOf(), y: 74.43 },
                  ],
                },
              ],
            }}
          />
        </ChartContainer>
      </section>
    </div>
  )
}
