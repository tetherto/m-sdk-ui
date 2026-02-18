import { useNavigate } from 'react-router-dom'
import {
  BarChartIcon,
  ChatBubbleIcon,
  CubeIcon,
  DashboardIcon,
  ExclamationTriangleIcon,
  InputIcon,
  LayersIcon,
} from '@mining-sdk/core'
import './home-page.scss'

type CategoryCardProps = {
  icon: React.ReactNode
  title: string
  description: string
  componentCount: number
  path: string
  onClick: () => void
}

const CategoryCard = ({
  icon,
  title,
  description,
  componentCount,
  onClick,
}: CategoryCardProps): JSX.Element => {
  return (
    <button className="category-card" onClick={onClick} type="button">
      <div className="category-card__icon">{icon}</div>
      <h3 className="category-card__title">{title}</h3>
      <p className="category-card__description">{description}</p>
      <span className="category-card__count">{componentCount} components</span>
    </button>
  )
}

const CATEGORIES = [
  {
    icon: <InputIcon />,
    title: 'Forms',
    description: 'Input controls and form elements for user interaction',
    componentCount: 8,
    path: '/buttons',
  },
  {
    icon: <ChatBubbleIcon />,
    title: 'Overlays',
    description: 'Dialogs, modals, and floating UI components',
    componentCount: 7,
    path: '/dialog',
  },
  {
    icon: <LayersIcon />,
    title: 'Data Display',
    description: 'Components for presenting information and data',
    componentCount: 9,
    path: '/table',
  },
  {
    icon: <BarChartIcon />,
    title: 'Charts',
    description: 'Data visualization and charting components',
    componentCount: 5,
    path: '/line-chart',
  },
  {
    icon: <DashboardIcon />,
    title: 'Navigation',
    description: 'Navigation and routing components',
    componentCount: 4,
    path: '/tabs',
  },
  {
    icon: <CubeIcon />,
    title: 'Loading',
    description: 'Loading states and progress indicators',
    componentCount: 2,
    path: '/spinner',
  },
  {
    icon: <ExclamationTriangleIcon />,
    title: 'Feedback',
    description: 'Error handling and user feedback components',
    componentCount: 3,
    path: '/error-boundary',
  },
]

export const HomePage = (): JSX.Element => {
  const navigate = useNavigate()

  const handleCategoryClick = (path: string): void => {
    navigate(path)
  }

  return (
    <div className="home-page">
      <div className="home-page__hero">
        <h1 className="home-page__title">Mining SDK UI Dev Kit</h1>
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
          <span className="stat-item__value">38+</span>
          <span className="stat-item__label">Components</span>
        </div>
        <div className="stat-item">
          <span className="stat-item__value">7</span>
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
