/**
 * @mining-sdk/core - Core UI components, utilities, types, and theme system
 *
 * This package provides the foundation for all other packages in the monorepo.
 */

// Styled components
export * from './components/accordion'
export * from './components/alert-dialog'

// Heavy chart components - import directly to enable code splitting:
// import { AreaChart } from '@mining-sdk/core/components/area-chart'
// import { BarChart } from '@mining-sdk/core/components/bar-chart'
// import { LineChart } from '@mining-sdk/core/components/line-chart'
// import { GaugeChart } from '@mining-sdk/core/components/gauge-chart'
// import { DatePicker, DateRangePicker } from '@mining-sdk/core/components/date-picker'

export * from './components/avatar'
// Re-export Radix primitives with namespaces to avoid conflicts
export * from './components/badge'
export * from './components/breadcrumbs'
export * from './components/button'
export * from './components/card'
export * from './components/cascader'
export * from './components/chart-container'
export * from './components/checkbox'
export * from './components/data-table'
export * from './components/dialog'
export * as DropdownMenu from './components/dropdown-menu'
export * from './components/empty-state'
export * from './components/error-boundary'
export * from './components/error-card'
export * from './components/form'
export * from './components/indicator'
export * from './components/input'
export * from './components/label'
export * from './components/list-view-filter'
export * from './components/loader'
export * from './components/not-found-page'
export * from './components/pagination'
export * from './components/popover'
export * as Progress from './components/progress'
export * from './components/radio'
export * from './components/select'
export * as Separator from './components/separator'
export * from './components/sidebar'
export * from './components/skeleton'
export * as Slider from './components/slider'
export * from './components/spinner'
export * from './components/switch'
export * from './components/tabs'
export * from './components/tag'
export * from './components/tag-input'
export * from './components/textarea'
export * from './components/toast'
export * from './components/tooltip'
export * from './components/typography'
// Constants (only UI-related)
export * from './constants'
// Theme system
export * from './theme'
// Core types
export * from './types'
// Core utilities
export * from './utils'

export const version = '0.0.0'
