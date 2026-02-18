import { lazy, Suspense } from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'
import { Spinner } from '@mining-sdk/core'
import App from './App'
import {
  AlertDialogPage,
  AvatarPage,
  BreadcrumbsPage,
  ButtonsPage,
  CardPage,
  ChartContainerPage,
  DatePickersPage,
  DialogPage,
  DropdownMenuPage,
  EmptyStatePage,
  ErrorBoundaryPage,
  ErrorCardPage,
  FormElementsPage,
  GaugeChartPage,
  LoaderPage,
  NotFoundPage,
  NotFoundPageDemo,
  PopoverPage,
  SelectPage,
  SidebarPage,
  SpinnerPage,
  TabsPage,
  TagsPage,
  ToastPage,
  TooltipPage,
} from './pages'

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
const Icons = lazy(() => import('./components/icons').then((module) => ({ default: module.Icons })))

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
      { index: true, element: <Navigate to="/buttons" replace /> },
      { path: 'buttons', element: <ButtonsPage /> },
      { path: 'form-elements', element: <FormElementsPage /> },
      { path: 'select', element: <SelectPage /> },
      { path: 'checkbox-switch', element: withSuspense(CheckboxExample) },
      { path: 'radio', element: withSuspense(RadioExample) },
      { path: 'date-pickers', element: <DatePickersPage /> },
      { path: 'textarea', element: withSuspense(TextAreaExample) },
      { path: 'form', element: withSuspense(FormExample) },
      { path: 'dialog', element: <DialogPage /> },
      { path: 'alert-dialog', element: <AlertDialogPage /> },
      { path: 'dropdown-menu', element: <DropdownMenuPage /> },
      { path: 'cascader', element: withSuspense(CascaderExample) },
      { path: 'tooltip', element: <TooltipPage /> },
      { path: 'popover', element: <PopoverPage /> },
      { path: 'toast', element: <ToastPage /> },
      { path: 'table', element: withSuspense(DemoTable) },
      { path: 'avatar', element: <AvatarPage /> },
      { path: 'accordion', element: withSuspense(AccordionExample) },
      { path: 'card', element: <CardPage /> },
      { path: 'typography', element: withSuspense(TypographyExample) },
      { path: 'tags', element: <TagsPage /> },
      { path: 'indicators', element: withSuspense(IndicatorsExample) },
      { path: 'icons', element: withSuspense(Icons) },
      { path: 'empty-state', element: <EmptyStatePage /> },
      { path: 'line-chart', element: withSuspense(LineChartExample) },
      { path: 'bar-chart', element: withSuspense(BarChartExample) },
      { path: 'area-chart', element: withSuspense(AreaChartExample) },
      { path: 'gauge-chart', element: <GaugeChartPage /> },
      { path: 'chart-container', element: <ChartContainerPage /> },
      { path: 'tabs', element: <TabsPage /> },
      { path: 'breadcrumbs', element: <BreadcrumbsPage /> },
      { path: 'pagination', element: withSuspense(PaginationExample) },
      { path: 'sidebar', element: <SidebarPage /> },
      { path: 'spinner', element: <SpinnerPage /> },
      { path: 'loader', element: <LoaderPage /> },
      { path: 'error-boundary', element: <ErrorBoundaryPage /> },
      { path: 'error-card', element: <ErrorCardPage /> },
      { path: 'not-found-page', element: <NotFoundPageDemo /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])
