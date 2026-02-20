import { StatsExport } from '@mining-sdk/foundation'

export const StateExportsPage = (): JSX.Element => {
  return (
    <section className="demo-section">
      <h2 className="demo-section__title">Stats Export</h2>
      <div>
        <StatsExport
          onJsonExport={async () => {
            // Simulate JSON export logic
            await new Promise((resolve) => setTimeout(resolve, 1000))
            // eslint-disable-next-line no-alert
            alert('Exported as JSON')
          }}
          onCsvExport={async () => {
            // Simulate CSV export logic
            await new Promise((resolve) => setTimeout(resolve, 1000))
            // eslint-disable-next-line no-alert
            alert('Exported as CSV')
          }}
        />
      </div>
    </section>
  )
}
