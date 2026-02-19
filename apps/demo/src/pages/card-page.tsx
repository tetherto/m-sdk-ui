import { Button, Card } from '@mining-sdk/core'

export const CardPage = (): JSX.Element => {
  return (
    <section className="demo-section">
      <h2 className="demo-section__title">Card</h2>
      <div className="demo-section__card-grid">
        <Card className="demo-section__card-grid__card demo-section__card-grid__card--wide">
          <Card.Header>Bitdeer 4a A1346</Card.Header>
          <Card.Body>
            <div className="demo-section__card-grid__body-text">
              <div className="demo-section__card-grid__body-text__row">
                Efficiency 202.57 W/TH/S
              </div>
              <div className="demo-section__card-grid__body-text__row">Hash Rate 3.59 PH/s</div>
              <div className="demo-section__card-grid__body-text__row">Max Temp 36 °C</div>
            </div>
          </Card.Body>
          <Card.Footer>
            <Button variant="secondary" size="sm">
              View Details
            </Button>
          </Card.Footer>
        </Card>
        <Card className="demo-section__card-grid__card demo-section__card-grid__card--narrow">
          <Card.Header>Container Status</Card.Header>
          <p className="demo-section__card-grid__paragraph">
            Default children go to body when not wrapped in Card.Body.
          </p>
        </Card>
        <Card className="demo-section__card-grid__card demo-section__card-grid__card--narrow">
          <Card.Body>
            <p className="demo-section__card-grid__paragraph">
              Card with body only – no header or footer.
            </p>
          </Card.Body>
        </Card>
      </div>
    </section>
  )
}
