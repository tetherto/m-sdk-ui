/**
 * @mining-sdk/core - Core UI components, utilities, types, and theme system
 *
 * This package provides the foundation for all other packages in the monorepo.
 */

// Styled components
export * from './components/accordion'

export * from './components/alert-dialog'

export * from './components/avatar'
export * from './components/breadcrumbs'
export * from './components/button'
export * from './components/checkbox'
export * from './components/date-picker'
export * from './components/dialog'
// Re-export Radix primitives with namespaces to avoid conflicts
export * as DropdownMenu from './components/dropdown-menu'
export * from './components/label'
export * from './components/popover'
export * as Progress from './components/progress'
export * from './components/radio'
export * from './components/select'
export * as Separator from './components/separator'
export * as Slider from './components/slider'
export * from './components/switch'
export * from './components/tabs'
export * from './components/toast'
export * from './components/tooltip'
export * from './components/typography'
// Theme system
export * from './theme'
// Core types
export * from './types'
// Core utilities
export * from './utils'

export * from '@radix-ui/react-icons'
