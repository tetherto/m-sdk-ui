import { Spinner } from '@mining-sdk/core'
import { lazy, Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import App from './App'
import { ListViewFilterExample } from './examples/list-view-filter-example'
import { ChartWrapperPage } from './pages'

// Lazy load ALL pages to eliminate unused JavaScript and CSS
const HomePage = lazy(() => import('./pages/home-page').then((m) => ({ default: m.HomePage })))
const ActionButtonPage = lazy(() =>
  import('./pages/action-button-page').then((m) => ({ default: m.ActionButtonPage })),
)
const AvatarPage = lazy(() =>
  import('./pages/avatar-page').then((m) => ({ default: m.AvatarPage })),
)
const BreadcrumbsPage = lazy(() =>
  import('./pages/breadcrumbs-page').then((m) => ({ default: m.BreadcrumbsPage })),
)
const ButtonsPage = lazy(() =>
  import('./pages/buttons-page').then((m) => ({ default: m.ButtonsPage })),
)
const CardPage = lazy(() => import('./pages/card-page').then((m) => ({ default: m.CardPage })))
const ChartContainerPage = lazy(() =>
  import('./pages/chart-container-page').then((m) => ({ default: m.ChartContainerPage })),
)
const DatePickersPage = lazy(() =>
  import('./pages/date-pickers-page').then((m) => ({ default: m.DatePickersPage })),
)
const DialogPage = lazy(() =>
  import('./pages/dialog-page').then((m) => ({ default: m.DialogPage })),
)
const DropdownMenuPage = lazy(() =>
  import('./pages/dropdown-menu-page').then((m) => ({ default: m.DropdownMenuPage })),
)
const EmptyStatePage = lazy(() =>
  import('./pages/empty-state-page').then((m) => ({ default: m.EmptyStatePage })),
)
const ErrorBoundaryPage = lazy(() =>
  import('./pages/error-boundary-page').then((m) => ({ default: m.ErrorBoundaryPage })),
)
const ErrorCardPage = lazy(() =>
  import('./pages/error-card-page').then((m) => ({ default: m.ErrorCardPage })),
)
const FormElementsPage = lazy(() =>
  import('./pages/form-elements-page').then((m) => ({ default: m.FormElementsPage })),
)
const GaugeChartPage = lazy(() =>
  import('./pages/gauge-chart-page').then((m) => ({ default: m.GaugeChartPage })),
)
const LoaderPage = lazy(() =>
  import('./pages/loader-page').then((m) => ({ default: m.LoaderPage })),
)
const NotFoundPage = lazy(() =>
  import('./pages/not-found-page').then((m) => ({ default: m.NotFoundPage })),
)
const NotFoundPageDemo = lazy(() =>
  import('./pages/not-found-page-demo').then((m) => ({ default: m.NotFoundPageDemo })),
)
const PopoverPage = lazy(() =>
  import('./pages/popover-page').then((m) => ({ default: m.PopoverPage })),
)
const SelectPage = lazy(() =>
  import('./pages/select-page').then((m) => ({ default: m.SelectPage })),
)
const SidebarPage = lazy(() =>
  import('./pages/sidebar-page').then((m) => ({ default: m.SidebarPage })),
)
const SpinnerPage = lazy(() =>
  import('./pages/spinner-page').then((m) => ({ default: m.SpinnerPage })),
)
const TabsPage = lazy(() => import('./pages/tabs-page').then((m) => ({ default: m.TabsPage })))
const TagsPage = lazy(() => import('./pages/tags-page').then((m) => ({ default: m.TagsPage })))
const ToastPage = lazy(() => import('./pages/toast-page').then((m) => ({ default: m.ToastPage })))
const TooltipPage = lazy(() =>
  import('./pages/tooltip-page').then((m) => ({ default: m.TooltipPage })),
)
const ActiveIncidentsCardPage = lazy(() =>
  import('./pages/active-incidents-card-page').then((m) => ({
    default: m.ActiveIncidentsCardPage,
  })),
)
const PoolDetailsCardPage = lazy(() =>
  import('./pages/pool-details-card-page').then((m) => ({ default: m.PoolDetailsCardPage })),
)
const PoolDetailsPopoverPage = lazy(() =>
  import('./pages/pool-details-popover-page').then((m) => ({
    default: m.PoolDetailsPopoverPage,
  })),
)

const LineChartExample = lazy(() =>
  import('./examples/line-chart-example').then((module) => ({
    default: module.LineChartExample,
  })),
)
const BarChartExample = lazy(() =>
  import('./examples/bar-chart-example').then((module) => ({ default: module.BarChartExample })),
)
const AreaChartExample = lazy(() =>
  import('./examples/area-chart-example').then((module) => ({
    default: module.AreaChartExample,
  })),
)
const DoughnutChartPage = lazy(() =>
  import('./pages/doughnut-chart-page').then((module) => ({ default: module.DoughnutChartPage })),
)
const AccordionExample = lazy(() =>
  import('./examples/accordion-example').then((module) => ({ default: module.AccordionExample })),
)
const CascaderExample = lazy(() =>
  import('./examples/cascader-example').then((module) => ({ default: module.CascaderExample })),
)
const CheckboxExample = lazy(() =>
  import('./examples/checkbox-example').then((module) => ({ default: module.CheckboxExample })),
)
const DemoTable = lazy(() =>
  import('./examples/demo-table').then((module) => ({ default: module.DemoTable })),
)
const FormExample = lazy(() => import('./examples/form-example'))
const IndicatorsExample = lazy(() =>
  import('./examples/indicators-example').then((module) => ({
    default: module.IndicatorsExample,
  })),
)
const PaginationExample = lazy(() => import('./examples/pagination-example'))
const RadioExample = lazy(() =>
  import('./examples/radio-example').then((module) => ({ default: module.RadioExample })),
)
const TextAreaExample = lazy(() => import('./examples/textarea-example'))
const TypographyExample = lazy(() =>
  import('./examples/typography-example').then((module) => ({
    default: module.TypographyExample,
  })),
)
const MiningIconsExample = lazy(() =>
  import('./examples/mining-icons-example').then((module) => ({
    default: module.MiningIconsExample,
  })),
)

const SectionLoader = (): JSX.Element => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '200px',
    }}
  >
    <Spinner />
  </div>
)

const withSuspense = (Component: React.ComponentType): JSX.Element => (
  <Suspense fallback={<SectionLoader />}>
    <Component />
  </Suspense>
)

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: withSuspense(HomePage) },
      { path: 'action-button', element: withSuspense(ActionButtonPage) },
      { path: 'buttons', element: withSuspense(ButtonsPage) },
      { path: 'form-elements', element: withSuspense(FormElementsPage) },
      { path: 'select', element: withSuspense(SelectPage) },
      { path: 'checkbox-switch', element: withSuspense(CheckboxExample) },
      { path: 'radio', element: withSuspense(RadioExample) },
      { path: 'date-pickers', element: withSuspense(DatePickersPage) },
      { path: 'textarea', element: withSuspense(TextAreaExample) },
      { path: 'form', element: withSuspense(FormExample) },
      { path: 'dialog', element: withSuspense(DialogPage) },
      { path: 'dropdown-menu', element: withSuspense(DropdownMenuPage) },
      { path: 'cascader', element: withSuspense(CascaderExample) },
      { path: 'tooltip', element: withSuspense(TooltipPage) },
      { path: 'popover', element: withSuspense(PopoverPage) },
      { path: 'toast', element: withSuspense(ToastPage) },
      { path: 'table', element: withSuspense(DemoTable) },
      { path: 'avatar', element: withSuspense(AvatarPage) },
      { path: 'accordion', element: withSuspense(AccordionExample) },
      { path: 'card', element: withSuspense(CardPage) },
      { path: 'typography', element: withSuspense(TypographyExample) },
      { path: 'tags', element: withSuspense(TagsPage) },
      { path: 'indicators', element: withSuspense(IndicatorsExample) },
      { path: 'list-view-filter', element: withSuspense(ListViewFilterExample) },
      { path: 'mining-icons', element: withSuspense(MiningIconsExample) },
      { path: 'empty-state', element: withSuspense(EmptyStatePage) },
      { path: 'line-chart', element: withSuspense(LineChartExample) },
      { path: 'bar-chart', element: withSuspense(BarChartExample) },
      { path: 'area-chart', element: withSuspense(AreaChartExample) },
      { path: 'doughnut-chart', element: withSuspense(DoughnutChartPage) },
      { path: 'gauge-chart', element: withSuspense(GaugeChartPage) },
      { path: 'chart-container', element: withSuspense(ChartContainerPage) },
      { path: 'chart-wrapper', element: withSuspense(ChartWrapperPage) },
      { path: 'tabs', element: withSuspense(TabsPage) },
      { path: 'breadcrumbs', element: withSuspense(BreadcrumbsPage) },
      { path: 'pagination', element: withSuspense(PaginationExample) },
      { path: 'sidebar', element: withSuspense(SidebarPage) },
      { path: 'spinner', element: withSuspense(SpinnerPage) },
      { path: 'loader', element: withSuspense(LoaderPage) },
      { path: 'error-boundary', element: withSuspense(ErrorBoundaryPage) },
      { path: 'error-card', element: withSuspense(ErrorCardPage) },
      { path: 'not-found-page', element: withSuspense(NotFoundPageDemo) },
      { path: 'active-incidents-card', element: withSuspense(ActiveIncidentsCardPage) },
      { path: 'pool-details-card', element: withSuspense(PoolDetailsCardPage) },
      { path: 'pool-details-popover', element: withSuspense(PoolDetailsPopoverPage) },
      { path: '*', element: withSuspense(NotFoundPage) },
    ],
  },
])
