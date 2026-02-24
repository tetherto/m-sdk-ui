import type { SidebarMenuItem } from '@mining-sdk/core'
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

export const COMPONENT_NAV: SidebarMenuItem[] = [
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
      { id: 'form-elements', label: 'Form Elements' },
      { id: 'select', label: 'Select' },
      { id: 'checkbox-switch', label: 'Checkbox & Switch' },
      { id: 'radio', label: 'Radio' },
      { id: 'date-pickers', label: 'Date Pickers' },
      { id: 'textarea', label: 'TextArea' },
      { id: 'form', label: 'Form (Basic)' },
      { id: 'form-enhanced', label: 'Form (Enhanced)' },
      { id: 'form-advanced', label: 'Form (Advanced)' },
      { id: 'form-performance', label: 'Form Performance' },
    ],
  },
  {
    id: 'overlays',
    label: 'Overlays',
    icon: <ChatBubbleIcon />,
    items: [
      { id: 'dialog', label: 'Dialog' },
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
      { id: 'list-view-filter', label: 'List view filter' },
      { id: 'mosaic', label: 'Mosaic' },
      { id: 'avatar', label: 'Avatar' },
      { id: 'accordion', label: 'Accordion' },
      { id: 'card', label: 'Card' },
      { id: 'currency-toggler', label: 'Currency Toggler' },
      { id: 'typography', label: 'Typography' },
      { id: 'tags', label: 'Tags' },
      { id: 'indicators', label: 'Indicators' },
      { id: 'mining-icons', label: 'Mining Icons' },
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
      { id: 'doughnut-chart', label: 'Doughnut Chart' },
      { id: 'gauge-chart', label: 'Gauge Chart' },
      { id: 'chart-container', label: 'Chart Container' },
      { id: 'chart-wrapper', label: 'Chart wrapper' },
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

export const getCategoryStats = (): { totalComponents: number; totalCategories: number } => {
  const categories = COMPONENT_NAV.filter((item) => item.id !== '')
  const totalComponents = categories.reduce(
    (sum, category) => sum + (category.items?.length || 0),
    0,
  )

  return {
    totalComponents,
    totalCategories: categories.length,
  }
}

export const getCategoryByLabel = (label: string): SidebarMenuItem | undefined => {
  return COMPONENT_NAV.find((item) => item.label === label)
}
