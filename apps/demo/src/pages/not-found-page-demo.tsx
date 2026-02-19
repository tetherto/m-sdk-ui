import { NotFoundPage } from '@mining-sdk/core'

export const NotFoundPageDemo = (): JSX.Element => {
  return (
    <section className="demo-section">
      <h2 className="demo-section__title">Not Found Page</h2>
      <div style={{ border: '1px solid #ffffff1a', overflow: 'hidden' }}>
        <NotFoundPage onGoHome={() => {}} className="mining-sdk-not-found-page--demo" />
      </div>
    </section>
  )
}
