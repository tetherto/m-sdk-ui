import { ChartContainer, GaugeChart } from '@mining-sdk/core'

export const GaugeChartPage = (): JSX.Element => {
  return (
    <section className="demo-section">
      <h2 className="demo-section__title">Gauge Chart</h2>
      <div className="demo-section__charts">
        <section>
          <h3>System utilization</h3>
          <ChartContainer title="System utilization">
            <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
              <GaugeChart percent={0.75} id="gauge-1" />
              <GaugeChart percent={0.35} id="gauge-2" colors={['#72F59E', '#FFC107', '#EF4444']} />
              <GaugeChart percent={0.92} id="gauge-3" hideText />
            </div>
          </ChartContainer>
        </section>
      </div>
    </section>
  )
}
