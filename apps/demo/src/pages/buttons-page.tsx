import { Button } from '@mining-sdk/core'

export const ButtonsPage = (): JSX.Element => {
  return (
    <section className="demo-section">
      <h2 className="demo-section__title">Buttons</h2>
      <div className="demo-section__button-grid">
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="danger">Danger</Button>
        <Button variant="outline">Outline</Button>

        <Button variant="primary" disabled>
          Primary
        </Button>
        <Button variant="secondary" disabled>
          Secondary
        </Button>
        <Button variant="danger" disabled>
          Danger
        </Button>
        <Button variant="outline" disabled>
          Outline
        </Button>

        <Button className="is-demo-hover" variant="primary">
          Primary
        </Button>
        <Button className="is-demo-hover" variant="secondary">
          Secondary
        </Button>
        <Button className="is-demo-hover" variant="danger">
          Danger
        </Button>
        <Button className="is-demo-hover" variant="outline">
          Outline
        </Button>
      </div>
    </section>
  )
}
