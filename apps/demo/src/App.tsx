import { useRef } from 'react'
import type { SidebarMenuItem } from '@mining-sdk/core'
import {
  BarChartIcon,
  ChatBubbleIcon,
  CubeIcon,
  DashboardIcon,
  ExclamationTriangleIcon,
  InputIcon,
  LayersIcon,
  Sidebar,
} from '@mining-sdk/core'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import './App.scss'

const COMPONENT_NAV: SidebarMenuItem[] = [
  {
    id: 'forms',
    label: 'Forms',
    icon: <InputIcon />,
    items: [
      { id: 'buttons', label: 'Buttons' },
      { id: 'form-elements', label: 'Form Elements' },
      { id: 'select', label: 'Select' },
      { id: 'checkbox-switch', label: 'Checkbox & Switch' },
      { id: 'radio', label: 'Radio' },
      { id: 'date-pickers', label: 'Date Pickers' },
      { id: 'textarea', label: 'TextArea' },
      { id: 'form', label: 'Form' },
    ],
  },
  {
    id: 'overlays',
    label: 'Overlays',
    icon: <ChatBubbleIcon />,
    items: [
      { id: 'dialog', label: 'Dialog' },
      { id: 'alert-dialog', label: 'Alert Dialog' },
      { id: 'dropdown-menu', label: 'Dropdown Menu' },
      { id: 'cascader', label: 'Cascader' },
      { id: 'tooltip', label: 'Tooltip' },
      { id: 'popover', label: 'Popover' },
      { id: 'toast', label: 'Toast' },
    ],
  },
  {
    id: 'data-display',
    label: 'Data Display',
    icon: <LayersIcon />,
    items: [
      { id: 'table', label: 'Table' },
      { id: 'avatar', label: 'Avatar' },
      { id: 'accordion', label: 'Accordion' },
      { id: 'card', label: 'Card' },
      { id: 'typography', label: 'Typography' },
      { id: 'tags', label: 'Tags' },
      { id: 'indicators', label: 'Indicators' },
      { id: 'icons', label: 'Icons' },
      { id: 'empty-state', label: 'Empty State' },
    ],
  },
  {
    id: 'charts',
    label: 'Charts',
    icon: <BarChartIcon />,
    items: [
      { id: 'line-chart', label: 'Line Chart' },
      { id: 'bar-chart', label: 'Bar Chart' },
      { id: 'area-chart', label: 'Area Chart' },
      { id: 'gauge-chart', label: 'Gauge Chart' },
      { id: 'chart-container', label: 'ChartContainer' },
    ],
  },
  {
    id: 'navigation',
    label: 'Navigation',
    icon: <DashboardIcon />,
    items: [
      { id: 'tabs', label: 'Tabs' },
      { id: 'breadcrumbs', label: 'Breadcrumbs' },
      { id: 'pagination', label: 'Pagination' },
      { id: 'sidebar', label: 'Sidebar' },
    ],
  },
  {
    id: 'loading',
    label: 'Loading',
    icon: <CubeIcon />,
    items: [
      { id: 'spinner', label: 'Spinner' },
      { id: 'loader', label: 'Loader' },
    ],
  },
  {
    id: 'feedback',
    label: 'Feedback',
    icon: <ExclamationTriangleIcon />,
    items: [
      { id: 'error-boundary', label: 'Error Boundary' },
      { id: 'error-card', label: 'Error Card' },
      { id: 'not-found-page', label: 'Not Found Page' },
    ],
  },
]

const App = (): JSX.Element => {
  const navigate = useNavigate()
  const location = useLocation()
  const mainRef = useRef<HTMLDivElement>(null)

  const activeSection = location.pathname === '/' ? '' : location.pathname.slice(1)

  const handleNavClick = (item: SidebarMenuItem): void => {
    navigate(`/${item.id}`)
    mainRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="demo-app">
      <Sidebar
        items={COMPONENT_NAV}
        activeId={activeSection}
        onItemClick={handleNavClick}
        defaultExpanded
        className="demo-app__nav"
      />
      <main className="demo-app__main" ref={mainRef}>
        <div className="demo-app__content">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default App
