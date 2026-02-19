import { useNavigate } from 'react-router-dom'
import './home-page.scss'

type CategoryCardProps = {
  title: string
  description: string
  componentCount: number
  path: string
  onClick: () => void
}

const CategoryCard = ({
  title,
  description,
  componentCount,
  onClick,
}: CategoryCardProps): JSX.Element => {
  return (
    <button className="category-card" onClick={onClick} type="button">
      <h2 className="category-card__title">{title}</h2>
      <p className="category-card__description">{description}</p>
      <span className="category-card__count">{componentCount} components</span>
    </button>
  )
}

const CATEGORIES = [
  {
    title: 'Forms',
    description: 'Input controls and form elements for user interaction',
    componentCount: 8,
    path: '/buttons',
  },
  {
    title: 'Overlays',
    description: 'Dialogs, modals, and floating UI components',
    componentCount: 6,
    path: '/dialog',
  },
  {
    title: 'Data Display',
    description: 'Components for presenting information and data',
    componentCount: 10,
    path: '/table',
  },
  {
    title: 'Charts',
    description: 'Data visualization and charting components',
    componentCount: 5,
    path: '/line-chart',
  },
  {
    title: 'Navigation',
    description: 'Navigation and routing components',
    componentCount: 4,
    path: '/tabs',
  },
  {
    title: 'Loading',
    description: 'Loading states and progress indicators',
    componentCount: 2,
    path: '/spinner',
  },
  {
    title: 'Feedback',
    description: 'Error handling and user feedback components',
    componentCount: 3,
    path: '/error-boundary',
  },
  {
    title: 'Dashboard',
    description: 'Domain-specific dashboard components for mining operations',
    componentCount: 3,
    path: '/active-incidents-card',
  },
]

export const HomePage = (): JSX.Element => {
  const navigate = useNavigate()

  const handleCategoryClick = (path: string): void => {
    navigate(path)
  }

  return (
    <div className="home-page">
      <header className="home-page__header">
        <div className="home-page__header-content">
          <div className="home-page__branding">
            <div className="home-page__logo">⛏️</div>
            <div className="home-page__brand-text">
              <h1 className="home-page__brand-name">Mining SDK</h1>
              <span className="home-page__brand-tagline">UI Development Kit</span>
            </div>
          </div>
          <div className="home-page__header-meta">
            <span className="home-page__version">v1.0.0</span>
            <a
              href="https://github.com/tetherto/m-sdk-ui"
              target="_blank"
              rel="noopener noreferrer"
              className="home-page__github-link"
            >
              GitHub
            </a>
          </div>
        </div>
      </header>

      <div className="home-page__hero">
        <h2 className="home-page__title">Component Library</h2>
        <p className="home-page__subtitle">
          A comprehensive collection of production-ready UI components for building modern mining
          applications
        </p>
      </div>

      <div className="home-page__categories">
        {CATEGORIES.map((category) => (
          <CategoryCard
            key={category.title}
            {...category}
            onClick={() => handleCategoryClick(category.path)}
          />
        ))}
      </div>

      <div className="home-page__stats">
        <div className="stat-item">
          <span className="stat-item__value">44+</span>
          <span className="stat-item__label">Components</span>
        </div>
        <div className="stat-item">
          <span className="stat-item__value">8</span>
          <span className="stat-item__label">Categories</span>
        </div>
        <div className="stat-item">
          <span className="stat-item__value">100%</span>
          <span className="stat-item__label">TypeScript</span>
        </div>
      </div>
    </div>
  )
}
