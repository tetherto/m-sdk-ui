import type { SidebarMenuItem } from '@mining-sdk/core'
import { Sidebar } from '@mining-sdk/core'
import {
  BarChartIcon,
  ChatBubbleIcon,
  CubeIcon,
  DashboardIcon,
  ExclamationTriangleIcon,
  HomeIcon,
  InputIcon,
  LayersIcon,
  MagnifyingGlassIcon,
} from '@radix-ui/react-icons'
import { useMemo, useRef } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import './App.scss'

const COMPONENT_NAV: SidebarMenuItem[] = [
  {
    id: '',
    label: 'Home',
    icon: <HomeIcon />,
  },
  {
    id: 'forms',
    label: 'Forms',
    icon: <InputIcon />,
    items: [
      { id: 'action-button', label: 'Action Button' },
      { id: 'buttons', label: 'Buttons' },
      { id: 'checkbox-switch', label: 'Checkbox & Switch' },
      { id: 'date-pickers', label: 'Date Pickers' },
      { id: 'form-advanced', label: 'Form (Advanced)' },
      { id: 'form', label: 'Form (Basic)' },
      { id: 'form-enhanced', label: 'Form (Enhanced)' },
      { id: 'form-elements', label: 'Form Elements' },
      { id: 'form-performance', label: 'Form Performance' },
      { id: 'radio', label: 'Radio' },
      { id: 'select', label: 'Select' },
      { id: 'textarea', label: 'TextArea' },
    ],
  },
  {
    id: 'overlays',
    label: 'Overlays',
    icon: <ChatBubbleIcon />,
    items: [
      { id: 'cascader', label: 'Cascader' },
      { id: 'dialog', label: 'Dialog' },
      { id: 'dropdown-menu', label: 'Dropdown Menu' },
      { id: 'popover', label: 'Popover' },
      { id: 'toast', label: 'Toast' },
      { id: 'tooltip', label: 'Tooltip' },
    ],
  },
  {
    id: 'data-display',
    label: 'Data Display',
    icon: <LayersIcon />,
    items: [
      { id: 'accordion', label: 'Accordion' },
      { id: 'avatar', label: 'Avatar' },
      { id: 'card', label: 'Card' },
      { id: 'currency-toggler', label: 'Currency Toggler' },
      { id: 'empty-state', label: 'Empty State' },
      { id: 'indicators', label: 'Indicators' },
      { id: 'list-view-filter', label: 'List view filter' },
      { id: 'mining-icons', label: 'Mining Icons' },
      { id: 'mosaic', label: 'Mosaic' },
      { id: 'table', label: 'Table' },
      { id: 'tags', label: 'Tags' },
      { id: 'typography', label: 'Typography' },
    ],
  },
  {
    id: 'charts',
    label: 'Charts',
    icon: <BarChartIcon />,
    items: [
      { id: 'area-chart', label: 'Area Chart' },
      { id: 'bar-chart', label: 'Bar Chart' },
      { id: 'chart-container', label: 'ChartContainer' },
      { id: 'chart-wrapper', label: 'Chart wrapper' },
      { id: 'doughnut-chart', label: 'Doughnut Chart' },
      { id: 'gauge-chart', label: 'Gauge Chart' },
      { id: 'line-chart', label: 'Line Chart' },
    ],
  },
  {
    id: 'navigation',
    label: 'Navigation',
    icon: <DashboardIcon />,
    items: [
      { id: 'breadcrumbs', label: 'Breadcrumbs' },
      { id: 'pagination', label: 'Pagination' },
      { id: 'sidebar', label: 'Sidebar' },
      { id: 'tabs', label: 'Tabs' },
    ],
  },
  {
    id: 'loading',
    label: 'Loading',
    icon: <CubeIcon />,
    items: [
      { id: 'loader', label: 'Loader' },
      { id: 'spinner', label: 'Spinner' },
    ],
  },
  {
    id: 'feedback',
    label: 'Feedback',
    icon: <ExclamationTriangleIcon />,
    items: [
      { id: 'error-boundary', label: 'Error Boundary' },
      { id: 'error-card', label: 'Error Card' },
    ],
  },
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: <DashboardIcon />,
    items: [
      { id: 'active-incidents-card', label: 'Active Incidents Card' },
      { id: 'pool-details-card', label: 'Pool Details Card' },
      { id: 'pool-details-popover', label: 'Pool Details Popover' },
      { id: 'stats-export', label: 'Stats Export Dropdown' },
    ],
  },
  {
    id: 'explorer',
    label: 'Explorer',
    icon: <MagnifyingGlassIcon />,
    items: [{ id: 'device-explorer', label: 'Device Explorer' }],
  },
]

const App = (): JSX.Element => {
  const navigate = useNavigate()
  const location = useLocation()
  const mainRef = useRef<HTMLDivElement>(null)

  const activeSection = location.pathname === '/' ? '' : location.pathname.slice(1)

  const sortedNav = useMemo(() => {
    return COMPONENT_NAV.map((section) => ({
      ...section,
      items: section.items
        ? [...section.items].sort((a, b) => a.label.localeCompare(b.label))
        : undefined,
    }))
  }, [])

  const handleNavClick = (item: SidebarMenuItem): void => {
    navigate(`/${item.id}`)
    mainRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="demo-app">
      <Sidebar
        items={sortedNav}
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
