import type { DateRange, SidebarMenuItem, ToastPosition, ToastVariant } from '@mining-sdk/core'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Avatar,
  AvatarFallback,
  AvatarImage,
  BarChartIcon,
  BellIcon,
  Breadcrumbs,
  Button,
  Card,
  ChartContainer,
  ChatBubbleIcon,
  CheckIcon,
  CubeIcon,
  DashboardIcon,
  DatePicker,
  DateRangePicker,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
  DropdownMenu,
  EmptyState,
  ErrorBoundary,
  ErrorCard,
  ExclamationTriangleIcon,
  GaugeChart,
  GearIcon,
  HomeIcon,
  Input,
  InputIcon,
  LayersIcon,
  Loader,
  NotFoundPage,
  PersonIcon,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
  Sidebar,
  SimplePopover,
  SimpleTooltip,
  Spinner,
  Switch,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Tag,
  TagInput,
  Toast,
  TOAST_POSITIONS,
  Toaster,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  Typography,
  withErrorBoundary,
} from '@mining-sdk/core'
import { useRef, useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.scss'
import { ControlledDialog } from './components/controlled-dialog'
import { Icons } from './components/icons'
import { AreaChartExample } from './examples/area-chart-example'
import { BarChartExample } from './examples/bar-chart-example'
import { LineChartExample } from './examples/line-chart-example'
import { AccordionExample } from './examples/accordion-example'
import { CascaderExample } from './examples/cascader-example'
import { CheckboxExample } from './examples/checkbox-example'
import { DemoTable } from './examples/demo-table'
import FormExample from './examples/form-example'
import { IndicatorsExample } from './examples/indicators-example'
import PaginationExample from './examples/pagination-example'
import { RadioExample } from './examples/radio-example'
import TextAreaExample from './examples/textarea-example'
import { TypographyExample } from './examples/typography-example'

type ToastItem = {
  id: string
  variant: ToastVariant
  title: string
  description: string | undefined
}

// Demo component that throws on button click (for ErrorBoundary demo)
const BuggyCounter = (): JSX.Element => {
  const [count, setCount] = useState(0)
  if (count >= 3) {
    throw new Error('Counter exceeded maximum value of 2!')
  }
  return (
    <Button variant="secondary" onClick={() => setCount((c) => c + 1)}>
      Click count: {count} (crashes at 3)
    </Button>
  )
}

const SafeBuggyCounter = withErrorBoundary(BuggyCounter, 'BuggyCounter')

// ─── Layout navigation items (grouped by category) ──────────────────────────
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

// ─── Sidebar demo section items ─────────────────────────────────────────────
const SIDEBAR_EXAMPLE_ITEMS: SidebarMenuItem[] = [
  { id: 'tab-1', label: 'Tab 1', icon: <HomeIcon /> },
  {
    id: 'tab-2',
    label: 'Tab 2',
    icon: <BarChartIcon />,
    items: [
      { id: 'tab-2-detail-1', label: 'Detail 1' },
      { id: 'tab-2-detail-2', label: 'Detail 2' },
    ],
  },
  {
    id: 'tab-3',
    label: 'Tab 3',
    icon: <PersonIcon />,
    items: [
      {
        id: 'tab-3-detail-1',
        label: 'Detail 1',
        items: [
          { id: 'tab-3-d1-sub-1', label: 'Detail of Detail 1' },
          { id: 'tab-3-d1-sub-2', label: 'Detail of Detail 2' },
        ],
      },
      { id: 'tab-3-detail-2', label: 'Detail 2' },
      { id: 'tab-3-detail-3', label: 'Detail 3' },
    ],
  },
  {
    id: 'tab-4',
    label: 'Tab 4',
    icon: <BellIcon />,
    items: [
      {
        id: 'tab-4-detail-1',
        label: 'Detail 1',
        items: [
          { id: 'tab-4-d1-sub-1', label: 'Detail of Detail 1' },
          { id: 'tab-4-d1-sub-2', label: 'Detail of Detail 2' },
          { id: 'tab-4-d1-sub-3', label: 'Detail of Detail 3' },
        ],
      },
      { id: 'tab-4-detail-2', label: 'Detail 2' },
      { id: 'tab-4-detail-3', label: 'Detail 3' },
      { id: 'tab-4-detail-4', label: 'Detail 4' },
    ],
  },
  {
    id: 'tab-5',
    label: 'Tab 5',
    icon: <GearIcon />,
    disabled: true,
    items: [
      {
        id: 'tab-5-detail-1',
        label: 'Detail 1',
        items: [
          { id: 'tab-5-d1-sub-1', label: 'Detail of Detail 1' },
          { id: 'tab-5-d1-sub-2', label: 'Detail of Detail 2' },
        ],
      },
      {
        id: 'tab-5-detail-2',
        label: 'Detail 2',
        items: [
          { id: 'tab-5-d2-sub-1', label: 'Detail of Detail 1' },
          { id: 'tab-5-d2-sub-2', label: 'Detail of Detail 2' },
          { id: 'tab-5-d2-sub-3', label: 'Detail of Detail 3' },
        ],
      },
      { id: 'tab-5-detail-3', label: 'Detail 3' },
      { id: 'tab-5-detail-4', label: 'Detail 4' },
      { id: 'tab-5-detail-5', label: 'Detail 5' },
    ],
  },
]

const TOAST_DURATION = 5000

const TOAST_DEMO_CONFIGS: Array<{
  variant: ToastVariant
  buttonVariant: 'primary' | 'secondary' | 'danger' | 'outline'
  buttonText: string
  title: string
  description?: string
}> = [
  {
    variant: 'success',
    buttonVariant: 'primary',
    buttonText: 'Show Success Toast',
    title: 'Success!',
    description: 'Your action was completed successfully.',
  },
  {
    variant: 'error',
    buttonVariant: 'danger',
    buttonText: 'Show Error Toast',
    title: 'Error!',
    description: 'Something went wrong. Please try again.',
  },
  {
    variant: 'warning',
    buttonVariant: 'secondary',
    buttonText: 'Show Warning Toast',
    title: 'Warning!',
    description: 'Please review before proceeding.',
  },
  {
    variant: 'info',
    buttonVariant: 'outline',
    buttonText: 'Show Info Toast',
    title: 'Info',
    description: 'Here is some helpful information.',
  },
  {
    variant: 'info',
    buttonVariant: 'outline',
    buttonText: 'Show Toast (No Description)',
    title: 'Title Only',
  },
  {
    variant: 'info',
    buttonVariant: 'outline',
    buttonText: 'Long Text and Description',
    title: 'Long title Long title Long title Long title Long title',
    description:
      'Long description Long description Long description Long description Long description',
  },
]

const App = (): JSX.Element => {
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [selectedRange, setSelectedRange] = useState<DateRange>()

  const [activeSection, setActiveSection] = useState('buttons')
  const [sidebarActiveId, setSidebarActiveId] = useState('tab-1')
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
  const [toasts, setToasts] = useState<ToastItem[]>([])
  const [toastPosition, setToastPosition] = useState<ToastPosition>('top-right')
  const [tagInputTags, setTagInputTags] = useState<string[]>([])
  const [tagInputCustomTags, setTagInputCustomTags] = useState<string[]>([])
  const mainRef = useRef<HTMLDivElement>(null)

  const handleNavClick = (item: SidebarMenuItem): void => {
    setActiveSection(item.id)
    mainRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const showToast = (
    variant: ToastVariant,
    title: string,
    description: string | undefined = undefined,
  ): void => {
    const id = `${Date.now()}-${Math.random()}`
    const newToast: ToastItem = { id, variant, title, description }
    setToasts((prevToasts) => [...prevToasts, newToast])
  }

  const removeToast = (id: string): void => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id))
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
      <div className="demo-app__main" ref={mainRef}>
        <div className="demo-app__content">
          {/* Buttons */}
          {activeSection === 'buttons' && (
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
          )}
          {/* Select */}
          {activeSection === 'select' && (
            <section className="demo-section">
              <h2 className="demo-section__title">Select</h2>
              <div className="demo-section__select-grid">
                <section>
                  <h3>Basic</h3>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Actions" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Actions</SelectLabel>
                        <SelectItem value="move-miner">Move Miner</SelectItem>
                        <SelectItem value="repair">Repair</SelectItem>
                        <SelectItem value="inventory-logs">Inventory Logs</SelectItem>
                        <SelectItem value="go-to-explorer">Go To Explorer</SelectItem>
                        <SelectItem value="add-comment">Add Comment</SelectItem>
                        <SelectItem value="delete-miner">Delete Miner</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </section>

                <section>
                  <h3>With placeholder</h3>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a status..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Status</SelectLabel>
                        <SelectItem value="online">Online</SelectItem>
                        <SelectItem value="offline">Offline</SelectItem>
                        <SelectItem value="maintenance">Maintenance</SelectItem>
                        <SelectItem value="error">Error</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </section>

                <section>
                  <h3>With disabled items</h3>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select action" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Actions</SelectLabel>
                        <SelectItem value="move-miner">Move Miner</SelectItem>
                        <SelectItem value="repair" disabled>
                          Repair (unavailable)
                        </SelectItem>
                        <SelectItem value="go-to-explorer" disabled>
                          Go To Explorer (unavailable)
                        </SelectItem>
                        <SelectItem value="add-comment">Add Comment</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </section>

                <section>
                  <h3>Grouped with separator</h3>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose an action" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Primary</SelectLabel>
                        <SelectItem value="move-miner">Move Miner</SelectItem>
                        <SelectItem value="repair">Repair</SelectItem>
                        <SelectItem value="add-comment">Add Comment</SelectItem>
                      </SelectGroup>
                      <SelectSeparator />
                      <SelectGroup>
                        <SelectLabel>Danger Zone</SelectLabel>
                        <SelectItem value="delete-miner">Delete Miner</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </section>

                <section>
                  <h3>With default value</h3>
                  <Select defaultValue="apple">
                    <SelectTrigger>
                      <SelectValue placeholder="Pick a fruit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Fruits</SelectLabel>
                        <SelectItem value="apple">Apple</SelectItem>
                        <SelectItem value="banana">Banana</SelectItem>
                        <SelectItem value="orange">Orange</SelectItem>
                        <SelectItem value="grape">Grape</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </section>
              </div>
            </section>
          )}
          {/* Charts - Line Chart */}
          {activeSection === 'line-chart' && (
            <section className="demo-section">
              <h2 className="demo-section__title">Line Chart</h2>
              <p className="demo-section__description">
                Presentational chart components. Data is passed via props; no fetching.
              </p>
              <LineChartExample />
            </section>
          )}
          {/* Pagination */}
          {activeSection === 'pagination' && (
            <section className="demo-section">
              <h2 className="demo-section__title">Pagination</h2>
              <PaginationExample />
            </section>
          )}
          {/* Dropdown Menu */}
          {activeSection === 'dropdown-menu' && (
            <section className="demo-section">
              <h2 className="demo-section__title">Dropdown Menu</h2>
              <div className="demo-section__select-grid">
                <section>
                  <h3>Basic</h3>
                  <DropdownMenu.Root>
                    <DropdownMenu.Trigger asChild>
                      <Button variant="secondary">Open menu</Button>
                    </DropdownMenu.Trigger>
                    <DropdownMenu.Content>
                      <DropdownMenu.Item onClick={() => {}}>Move Miner</DropdownMenu.Item>
                      <DropdownMenu.Item onClick={() => {}}>Repair</DropdownMenu.Item>
                      <DropdownMenu.Item onClick={() => {}}>Inventory Logs</DropdownMenu.Item>
                      <DropdownMenu.Item onClick={() => {}}>Add Comment</DropdownMenu.Item>
                    </DropdownMenu.Content>
                  </DropdownMenu.Root>
                </section>
                <section>
                  <h3>With shortcuts</h3>
                  <DropdownMenu.Root>
                    <DropdownMenu.Trigger asChild>
                      <Button variant="secondary">Actions</Button>
                    </DropdownMenu.Trigger>
                    <DropdownMenu.Content alignWidth>
                      <DropdownMenu.Item onClick={() => {}}>
                        Copy <DropdownMenu.Shortcut>⌘C</DropdownMenu.Shortcut>
                      </DropdownMenu.Item>
                      <DropdownMenu.Item onClick={() => {}}>
                        Paste <DropdownMenu.Shortcut>⌘V</DropdownMenu.Shortcut>
                      </DropdownMenu.Item>
                      <DropdownMenu.Separator />
                      <DropdownMenu.Item onClick={() => {}}>
                        Delete <DropdownMenu.Shortcut>⌫</DropdownMenu.Shortcut>
                      </DropdownMenu.Item>
                    </DropdownMenu.Content>
                  </DropdownMenu.Root>
                </section>
                <section>
                  <h3>With label and separator</h3>
                  <DropdownMenu.Root>
                    <DropdownMenu.Trigger asChild>
                      <Button variant="secondary">Miner actions</Button>
                    </DropdownMenu.Trigger>
                    <DropdownMenu.Content>
                      <DropdownMenu.Label>Primary</DropdownMenu.Label>
                      <DropdownMenu.Item onClick={() => {}}>Move Miner</DropdownMenu.Item>
                      <DropdownMenu.Item onClick={() => {}}>Repair</DropdownMenu.Item>
                      <DropdownMenu.Item onClick={() => {}}>Add Comment</DropdownMenu.Item>
                      <DropdownMenu.Separator />
                      <DropdownMenu.Label>Danger Zone</DropdownMenu.Label>
                      <DropdownMenu.Item onClick={() => {}}>Delete Miner</DropdownMenu.Item>
                    </DropdownMenu.Content>
                  </DropdownMenu.Root>
                </section>
                <section>
                  <h3>With submenu</h3>
                  <DropdownMenu.Root>
                    <DropdownMenu.Trigger asChild>
                      <Button variant="secondary">Export</Button>
                    </DropdownMenu.Trigger>
                    <DropdownMenu.Content>
                      <DropdownMenu.Item onClick={() => {}}>Export CSV</DropdownMenu.Item>
                      <DropdownMenu.Sub>
                        <DropdownMenu.SubTrigger>Export formats</DropdownMenu.SubTrigger>
                        <DropdownMenu.SubContent>
                          <DropdownMenu.Item onClick={() => {}}>PDF</DropdownMenu.Item>
                          <DropdownMenu.Item onClick={() => {}}>Excel</DropdownMenu.Item>
                          <DropdownMenu.Item onClick={() => {}}>JSON</DropdownMenu.Item>
                        </DropdownMenu.SubContent>
                      </DropdownMenu.Sub>
                    </DropdownMenu.Content>
                  </DropdownMenu.Root>
                </section>
                <section>
                  <h3>Above trigger</h3>
                  <DropdownMenu.Root>
                    <DropdownMenu.Trigger asChild>
                      <Button variant="secondary">Open above</Button>
                    </DropdownMenu.Trigger>
                    <DropdownMenu.Content side="top">
                      <DropdownMenu.Item onClick={() => {}}>Option A</DropdownMenu.Item>
                      <DropdownMenu.Item onClick={() => {}}>Option B</DropdownMenu.Item>
                      <DropdownMenu.Item onClick={() => {}}>Option C</DropdownMenu.Item>
                    </DropdownMenu.Content>
                  </DropdownMenu.Root>
                </section>
                <section>
                  <h3>To the side</h3>
                  <DropdownMenu.Root>
                    <DropdownMenu.Trigger asChild>
                      <Button variant="secondary">Open right</Button>
                    </DropdownMenu.Trigger>
                    <DropdownMenu.Content side="right">
                      <DropdownMenu.Item onClick={() => {}}>Option 1</DropdownMenu.Item>
                      <DropdownMenu.Item onClick={() => {}}>Option 2</DropdownMenu.Item>
                      <DropdownMenu.Item onClick={() => {}}>Option 3</DropdownMenu.Item>
                    </DropdownMenu.Content>
                  </DropdownMenu.Root>
                </section>
              </div>
            </section>
          )}
          {/* Charts - Bar Chart */}
          {activeSection === 'bar-chart' && (
            <section className="demo-section">
              <h2 className="demo-section__title">Bar Chart</h2>
              <BarChartExample />
            </section>
          )}
          {/* Input */}
          {activeSection === 'form-elements' && (
            <section className="demo-section">
              <h2 className="demo-section__title">Form Elements</h2>
              <div className="demo-section__select-grid demo-section__input-grid">
                <section>
                  <h3>Default</h3>
                  <Input label="MAC Address" placeholder="Enter MAC address" id="mac-default" />
                </section>
                <section className="demo-section__input-grid__search">
                  <h3>Search</h3>
                  <Input variant="search" placeholder="Search" id="search-default" />
                </section>
                <section>
                  <h3>With value</h3>
                  <Input
                    label="MAC Address"
                    placeholder="Enter MAC address"
                    defaultValue="00:11:22:33:44:55"
                    id="mac-filled"
                  />
                </section>
                <section>
                  <h3>Disabled</h3>
                  <Input
                    label="MAC Address"
                    placeholder="Enter MAC address"
                    disabled
                    id="mac-disabled"
                  />
                </section>
                <section>
                  <h3>Validation error</h3>
                  <Input
                    label="Email"
                    placeholder="Email"
                    error="Email is required"
                    id="email-error"
                  />
                </section>
                <section>
                  <h3>TagInput</h3>
                  <TagInput
                    label="Search miners"
                    value={tagInputTags}
                    onTagsChange={setTagInputTags}
                    onSubmit={(tags) => {
                      console.warn('TagInput submit:', tags)
                    }}
                    options={[
                      'Bitdeer M30',
                      'Bitdeer A1346',
                      'Bitdeer M56',
                      'Bitdeer S19XP',
                      'Bitmain Hydro',
                      'Bitmain Imm',
                      'MicroBT Wonder',
                      'MicroBT Kehua',
                    ]}
                    placeholder="Search miners..."
                    variant="search"
                  />
                </section>
                <section>
                  <h3>TagInput with custom dropdown</h3>
                  <TagInput
                    label="Search miners"
                    value={tagInputCustomTags}
                    onTagsChange={setTagInputCustomTags}
                    onSubmit={(tags) => {
                      console.warn('TagInput submit:', tags)
                    }}
                    options={[
                      'Bitdeer M30',
                      'Bitdeer A1346',
                      'Bitdeer M56',
                      'Bitdeer S19XP',
                      'Bitmain Hydro',
                      'Bitmain Imm',
                      'MicroBT Wonder',
                      'MicroBT Kehua',
                    ]}
                    placeholder="Search miners..."
                    variant="search"
                    renderDropdown={({
                      filteredOptions,
                      selectedTags,
                      highlightedIndex,
                      setHighlightedIndex,
                      onSelect,
                      listboxId,
                      getOptionId,
                      getOptionValue,
                      getOptionLabel,
                    }) => (
                      <div id={listboxId} role="listbox" className="tag-input-custom-dropdown">
                        {filteredOptions.length === 0 ? (
                          <div className="tag-input-custom-dropdown__empty">No options</div>
                        ) : (
                          filteredOptions.map((opt, i) => {
                            const value = getOptionValue(opt)
                            const isSelected = selectedTags.includes(value)
                            const isHighlighted = i === highlightedIndex
                            return (
                              <div
                                key={value}
                                id={getOptionId(i)}
                                role="option"
                                aria-selected={isHighlighted}
                                className={`tag-input-custom-dropdown__option ${isSelected ? 'tag-input-custom-dropdown__option--selected' : ''} ${isHighlighted ? 'tag-input-custom-dropdown__option--highlighted' : ''}`}
                                onMouseDown={(e) => {
                                  e.preventDefault()
                                  onSelect(opt)
                                }}
                                onMouseEnter={() => setHighlightedIndex(i)}
                              >
                                {getOptionLabel(opt)}
                                {isSelected && (
                                  <CheckIcon className="tag-input-custom-dropdown__check" />
                                )}
                              </div>
                            )
                          })
                        )}
                      </div>
                    )}
                  />
                </section>
              </div>
            </section>
          )}
          {/* Charts - Area Chart */}
          {activeSection === 'area-chart' && (
            <section className="demo-section">
              <h2 className="demo-section__title">Area Chart</h2>
              <AreaChartExample />
            </section>
          )}
          {/* Charts - Gauge Chart */}
          {activeSection === 'gauge-chart' && (
            <section className="demo-section">
              <h2 className="demo-section__title">Gauge Chart</h2>
              <div className="demo-section__charts">
                <section>
                  <h3>System utilization</h3>
                  <ChartContainer title="System utilization">
                    <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                      <GaugeChart percent={0.75} id="gauge-1" />
                      <GaugeChart
                        percent={0.35}
                        id="gauge-2"
                        colors={['#72F59E', '#FFC107', '#EF4444']}
                      />
                      <GaugeChart percent={0.92} id="gauge-3" hideText />
                    </div>
                  </ChartContainer>
                </section>
              </div>
            </section>
          )}
          {/* Charts - ChartContainer */}
          {activeSection === 'chart-container' && (
            <section className="demo-section">
              <h2 className="demo-section__title">ChartContainer</h2>
              <p className="demo-section__description">
                Wrapper for chart content with loading and empty states.
              </p>
              <div className="demo-section__charts">
                <section>
                  <h3>States</h3>
                  <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                    <ChartContainer title="Loading" loading>
                      <div style={{ height: 200 }} />
                    </ChartContainer>
                    <ChartContainer title="Empty" empty emptyMessage="No data for this period">
                      <div style={{ height: 200 }} />
                    </ChartContainer>
                  </div>
                </section>
              </div>
            </section>
          )}
          {/* TextArea */}
          {activeSection === 'textarea' && (
            <section className="demo-section">
              <h2 className="demo-section__title">TextArea</h2>
              <TextAreaExample />
            </section>
          )}
          {/* Form */}
          {activeSection === 'form' && (
            <section className="demo-section">
              <h2 className="demo-section__title">Form</h2>
              <FormExample />
            </section>
          )}
          {/* Dialog */}
          {activeSection === 'dialog' && (
            <section className="demo-section">
              <h2 className="demo-section__title">Dialog</h2>
              <div className="demo-section__dialog-grid">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">Open Dialog</Button>
                  </DialogTrigger>
                  <DialogContent
                    closable
                    title="Welcome to @mining-sdk/core"
                    description="This is a dialog component built with Radix UI primitives."
                  >
                    <div className="demo-section__dialog-content">
                      <p>You can add any content here.</p>
                    </div>
                    <DialogFooter>
                      <Button variant="secondary">Cancel</Button>
                      <Button variant="primary">Save changes</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                <ControlledDialog />
              </div>
            </section>
          )}
          {/* Alert Dialog */}
          {activeSection === 'alert-dialog' && (
            <section className="demo-section">
              <h2 className="demo-section__title">Alert Dialog</h2>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="danger">Delete Account</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete your account and
                      remove your data from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction>Continue</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </section>
          )}
          {/* Checkbox & Switch */}

          {activeSection === 'checkbox-switch' && <CheckboxExample />}
          {/* Table */}
          {activeSection === 'table' && (
            <section className="demo-section">
              <DemoTable />
            </section>
          )}
          {/* Avatar */}
          {activeSection === 'avatar' && (
            <section className="demo-section">
              <h2 className="demo-section__title">Avatar</h2>
              <div className="demo-section__avatars">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
              </div>
            </section>
          )}
          {/* Table */}
          {activeSection === 'table' && (
            <section className="demo-section">
              <h2 className="demo-section__title">Table</h2>
              <DemoTable />
            </section>
          )}
          {/* Accordion */}
          {activeSection === 'accordion' && <AccordionExample />}
          {/* cascader */}
          {activeSection === 'cascader' && <CascaderExample />}
          {/* Card */}
          {activeSection === 'card' && (
            <section className="demo-section">
              <h2 className="demo-section__title">Card</h2>
              <div className="demo-section__card-grid">
                <Card className="demo-section__card-grid__card demo-section__card-grid__card--wide">
                  <Card.Header>Bitdeer 4a A1346</Card.Header>
                  <Card.Body>
                    <div className="demo-section__card-grid__body-text">
                      <div className="demo-section__card-grid__body-text__row">
                        Efficiency 202.57 W/TH/S
                      </div>
                      <div className="demo-section__card-grid__body-text__row">
                        Hash Rate 3.59 PH/s
                      </div>
                      <div className="demo-section__card-grid__body-text__row">Max Temp 36 °C</div>
                    </div>
                  </Card.Body>
                  <Card.Footer>
                    <Button variant="secondary" size="sm">
                      View Details
                    </Button>
                  </Card.Footer>
                </Card>
                <Card className="demo-section__card-grid__card demo-section__card-grid__card--narrow">
                  <Card.Header>Container Status</Card.Header>
                  <p className="demo-section__card-grid__paragraph">
                    Default children go to body when not wrapped in Card.Body.
                  </p>
                </Card>
                <Card className="demo-section__card-grid__card demo-section__card-grid__card--narrow">
                  <Card.Body>
                    <p className="demo-section__card-grid__paragraph">
                      Card with body only – no header or footer.
                    </p>
                  </Card.Body>
                </Card>
              </div>
            </section>
          )}
          {/* Tabs  */}
          {activeSection === 'tabs' && (
            <section className="demo-section">
              <h2 className="demo-section__title">Tabs</h2>
              <div className="demo-section__tabs">
                <Tabs defaultValue="tab1">
                  <TabsList>
                    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
                    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
                    <TabsTrigger value="tab3">Tab 3</TabsTrigger>
                  </TabsList>
                  <TabsContent value="tab1">Tab 1 content</TabsContent>
                  <TabsContent value="tab2">Tab 2 content</TabsContent>
                  <TabsContent value="tab3">Tab 3 content</TabsContent>
                </Tabs>
              </div>
              <div className="demo-section__tabs">
                <Tabs defaultValue="tab1">
                  <TabsList>
                    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
                    <TabsTrigger disabled value="tab2">
                      Tab 2
                    </TabsTrigger>
                    <TabsTrigger disabled value="tab3">
                      Tab 3
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="tab1">Tab 1 content</TabsContent>
                  <TabsContent value="tab2">Tab 2 content</TabsContent>
                  <TabsContent value="tab3">Tab 3 content</TabsContent>
                </Tabs>
              </div>
            </section>
          )}
          {/* Typography */}
          {activeSection === 'typography' && <TypographyExample />}
          {/* Breadcrumbs */}
          {activeSection === 'breadcrumbs' && (
            <section className="demo-section">
              <h2 className="demo-section__title">Breadcrumbs</h2>
              <section className="demo-section__breadcrumbs">
                <h3>
                  Breadcrumbs outside of
                  <code>&lt;RouterProvider&gt;</code>
                  context
                </h3>
                <Breadcrumbs
                  items={[
                    { label: 'Home', href: '/' },
                    { label: 'Products', href: '/products' },
                    { label: 'Details' },
                  ]}
                />
              </section>
              <RouterProvider
                router={createBrowserRouter([
                  {
                    path: '/',
                    element: (
                      <>
                        {/* Basic */}
                        <section className="demo-section__breadcrumbs">
                          <h3>Basic Breadcrumbs</h3>
                          <Breadcrumbs
                            items={[
                              { label: 'Home', href: '/' },
                              { label: 'Products', href: '/products' },
                              { label: 'Details' },
                            ]}
                          />
                        </section>

                        {/* With Back Button */}
                        <section className="demo-section__breadcrumbs">
                          <h3>With Back Button</h3>
                          <Breadcrumbs
                            showBack
                            onBackClick={() => location.reload()}
                            items={[
                              { label: 'Dashboard', href: '/dashboard' },
                              { label: 'Settings' },
                            ]}
                          />
                        </section>

                        {/* Custom Separator */}
                        <section className="demo-section__breadcrumbs">
                          <h3>Custom Separator</h3>
                          <Breadcrumbs
                            separator="›"
                            items={[
                              { label: 'Home', href: '/' },
                              { label: 'Blog', href: '/blog' },
                              { label: 'Article' },
                            ]}
                          />
                        </section>

                        {/* With onClick */}
                        <section className="demo-section__breadcrumbs">
                          <h3>With Click Handlers</h3>
                          <Breadcrumbs
                            items={[
                              // eslint-disable-next-line no-alert
                              { label: 'Home', onClick: () => alert('Home clicked') },
                              // eslint-disable-next-line no-alert
                              { label: 'Products', onClick: () => alert('Products clicked') },
                              { label: 'Current Page' },
                            ]}
                          />
                        </section>
                      </>
                    ),
                  },
                ])}
              />
            </section>
          )}
          {/* Radio */}
          {activeSection === 'radio' && <RadioExample />}
          {/* Tooltip */}
          {activeSection === 'tooltip' && (
            <section className="demo-section">
              <h2 className="demo-section__title">Tooltip</h2>
              <div className="demo-section__tooltip">
                <section>
                  <h3>Simple Tooltip (Convenient Wrapper)</h3>
                  <div
                    style={{ display: 'flex', gap: '2rem', alignItems: 'center', flexWrap: 'wrap' }}
                  >
                    <SimpleTooltip content="This is a helpful tooltip">
                      <Button variant="primary">Hover me (top)</Button>
                    </SimpleTooltip>

                    <SimpleTooltip content="Tooltip on the right side" side="right">
                      <Button variant="secondary">Hover me (right)</Button>
                    </SimpleTooltip>

                    <SimpleTooltip content="Tooltip at the bottom" side="bottom">
                      <Button variant="outline">Hover me (bottom)</Button>
                    </SimpleTooltip>

                    <SimpleTooltip content="Tooltip on the left side" side="left">
                      <Button variant="danger">Hover me (left)</Button>
                    </SimpleTooltip>
                  </div>
                </section>

                <section style={{ marginTop: '2rem' }}>
                  <h3>Compound Components (Full Control)</h3>
                  <div
                    style={{ display: 'flex', gap: '2rem', alignItems: 'center', flexWrap: 'wrap' }}
                  >
                    <TooltipProvider delayDuration={100}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="primary">Fast tooltip (100ms)</Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <div style={{ maxWidth: '200px' }}>
                            This tooltip appears quickly with a 100ms delay
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider delayDuration={500}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="secondary">Slow tooltip (500ms)</Button>
                        </TooltipTrigger>
                        <TooltipContent side="right" showArrow={false}>
                          <div style={{ maxWidth: '250px' }}>
                            <strong>No Arrow</strong>
                            <br />
                            This tooltip has a longer delay and no arrow
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </section>

                <section style={{ marginTop: '2rem' }}>
                  <h3>Rich Content Tooltips</h3>
                  <div
                    style={{ display: 'flex', gap: '2rem', alignItems: 'center', flexWrap: 'wrap' }}
                  >
                    <SimpleTooltip
                      content={
                        <div style={{ maxWidth: '300px' }}>
                          <strong style={{ color: '#f7931a' }}>Mining Status</strong>
                          <div style={{ marginTop: '8px', fontSize: '11px' }}>
                            <div>Hashrate: 100 TH/s</div>
                            <div>Temperature: 65°C</div>
                            <div>Power: 3250W</div>
                          </div>
                        </div>
                      }
                    >
                      <Button variant="primary">Miner Info</Button>
                    </SimpleTooltip>

                    <SimpleTooltip
                      content={
                        <div>
                          <div style={{ fontWeight: 600, marginBottom: '4px' }}>
                            Long Text Example
                          </div>
                          <div style={{ fontSize: '11px' }}>
                            This tooltip demonstrates word wrapping for longer content. The text
                            will automatically wrap within the maximum width constraint.
                          </div>
                        </div>
                      }
                      side="bottom"
                    >
                      <Button variant="outline">Long Content</Button>
                    </SimpleTooltip>
                  </div>
                </section>
              </div>
            </section>
          )}

          {/* Popover */}
          {activeSection === 'popover' && (
            <section className="demo-section">
              <h2 className="demo-section__title">Popover</h2>
              <div className="demo-section__popover">
                <section>
                  <h3>Simple Popover (Convenient Wrapper)</h3>
                  <div
                    style={{ display: 'flex', gap: '2rem', alignItems: 'center', flexWrap: 'wrap' }}
                  >
                    <SimplePopover
                      trigger={<Button variant="primary">Open Popover</Button>}
                      content={
                        <div style={{ padding: '8px' }}>
                          <h4 style={{ margin: '0 0 8px 0' }}>Popover Title</h4>
                          <p style={{ margin: 0, fontSize: '14px', opacity: 0.9 }}>
                            This is a simple popover with basic content.
                          </p>
                        </div>
                      }
                    />

                    <SimplePopover
                      trigger={<Button variant="secondary">With Close Button</Button>}
                      content={
                        <div style={{ padding: '8px' }}>
                          <h4 style={{ margin: '0 0 8px 0' }}>Closeable Popover</h4>
                          <p style={{ margin: 0, fontSize: '14px', opacity: 0.9 }}>
                            Click the X button in the top-right to close.
                          </p>
                        </div>
                      }
                      showClose
                    />

                    <SimplePopover
                      trigger={<Button variant="outline">With Arrow</Button>}
                      content={
                        <div style={{ padding: '8px' }}>
                          <h4 style={{ margin: '0 0 8px 0' }}>Arrow Popover</h4>
                          <p style={{ margin: 0, fontSize: '14px', opacity: 0.9 }}>
                            This popover includes a small arrow pointing to the trigger.
                          </p>
                        </div>
                      }
                      showArrow
                      side="top"
                    />
                  </div>
                </section>

                <section style={{ marginTop: '2rem' }}>
                  <h3>Compound Components (Full Control)</h3>
                  <div
                    style={{ display: 'flex', gap: '2rem', alignItems: 'center', flexWrap: 'wrap' }}
                  >
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="primary">Custom Popover</Button>
                      </PopoverTrigger>
                      <PopoverContent side="bottom" align="start">
                        <div style={{ width: '300px' }}>
                          <h4 style={{ margin: '0 0 12px 0', color: '#f7931a' }}>
                            Mining Controls
                          </h4>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                              <span>Auto-tune</span>
                              <Switch defaultChecked />
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                              <span>Low power mode</span>
                              <Switch />
                            </div>
                            <div style={{ marginTop: '8px' }}>
                              <Button variant="primary" style={{ width: '100%' }}>
                                Apply Settings
                              </Button>
                            </div>
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>

                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="secondary">Position Options</Button>
                      </PopoverTrigger>
                      <PopoverContent side="right" align="center">
                        <div style={{ padding: '8px' }}>
                          <h4 style={{ margin: '0 0 8px 0' }}>Positioned Right</h4>
                          <p style={{ margin: 0, fontSize: '13px', opacity: 0.9 }}>
                            This popover appears on the right side of the trigger.
                          </p>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                </section>

                <section style={{ marginTop: '2rem' }}>
                  <h3>Rich Content Example</h3>
                  <div
                    style={{ display: 'flex', gap: '2rem', alignItems: 'center', flexWrap: 'wrap' }}
                  >
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="primary">Miner Details</Button>
                      </PopoverTrigger>
                      <PopoverContent showClose>
                        <div style={{ width: '350px' }}>
                          <h3 style={{ margin: '0 0 16px 0', color: '#f7931a', fontSize: '16px' }}>
                            Antminer S19 Pro
                          </h3>
                          <div
                            style={{
                              display: 'grid',
                              gridTemplateColumns: '120px 1fr',
                              gap: '8px',
                              fontSize: '13px',
                            }}
                          >
                            <div style={{ opacity: 0.7 }}>Hashrate:</div>
                            <div style={{ fontWeight: 500 }}>110 TH/s</div>
                            <div style={{ opacity: 0.7 }}>Temperature:</div>
                            <div style={{ fontWeight: 500, color: '#72f59e' }}>65°C</div>
                            <div style={{ opacity: 0.7 }}>Power:</div>
                            <div style={{ fontWeight: 500 }}>3250W</div>
                            <div style={{ opacity: 0.7 }}>Efficiency:</div>
                            <div style={{ fontWeight: 500 }}>29.5 W/TH</div>
                            <div style={{ opacity: 0.7 }}>Uptime:</div>
                            <div style={{ fontWeight: 500 }}>45d 12h 30m</div>
                            <div style={{ opacity: 0.7 }}>Status:</div>
                            <div style={{ fontWeight: 500, color: '#72f59e' }}>Online</div>
                          </div>
                          <div style={{ marginTop: '16px', display: 'flex', gap: '8px' }}>
                            <Button variant="primary" style={{ flex: 1 }}>
                              Restart
                            </Button>
                            <Button variant="secondary" style={{ flex: 1 }}>
                              Configure
                            </Button>
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                </section>
              </div>
            </section>
          )}

          {/* Date Pickers */}
          {activeSection === 'date-pickers' && (
            <section className="demo-section">
              <h2 className="demo-section__title">Date Pickers</h2>
              <div className="demo-section__date-pickers">
                <section>
                  <h3>Single Date Picker</h3>
                  <div
                    style={{
                      display: 'flex',
                      gap: '2rem',
                      alignItems: 'flex-start',
                      flexWrap: 'wrap',
                    }}
                  >
                    <div>
                      <p style={{ marginBottom: '12px', fontSize: '13px', opacity: 0.8 }}>
                        Basic date picker
                      </p>
                      <DatePicker
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        placeholder="Pick a date"
                      />
                      {selectedDate && (
                        <p style={{ marginTop: '8px', fontSize: '12px' }}>
                          Selected: {selectedDate.toLocaleDateString()}
                        </p>
                      )}
                    </div>

                    <div>
                      <p style={{ marginBottom: '12px', fontSize: '13px', opacity: 0.8 }}>
                        Disabled picker
                      </p>
                      <DatePicker
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        placeholder="Disabled"
                        disabled
                      />
                    </div>

                    <div>
                      <p style={{ marginBottom: '12px', fontSize: '13px', opacity: 0.8 }}>
                        Custom format (dd MMM yyyy)
                      </p>
                      <DatePicker
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        placeholder="Pick a date"
                        dateFormat="dd MMM yyyy"
                      />
                    </div>
                  </div>
                </section>

                <section style={{ marginTop: '2rem' }}>
                  <h3>Date Range Picker</h3>
                  <div
                    style={{
                      display: 'flex',
                      gap: '2rem',
                      alignItems: 'flex-start',
                      flexWrap: 'wrap',
                    }}
                  >
                    <div>
                      <p style={{ marginBottom: '12px', fontSize: '13px', opacity: 0.8 }}>
                        With presets (Last 7/14/30/90 days)
                      </p>
                      <DateRangePicker
                        selected={selectedRange}
                        onSelect={setSelectedRange}
                        placeholder="Select date range"
                        showPresets
                      />
                      {selectedRange?.from && selectedRange?.to && (
                        <p style={{ marginTop: '8px', fontSize: '12px' }}>
                          Selected: {selectedRange.from.toLocaleDateString()} -{' '}
                          {selectedRange.to.toLocaleDateString()}
                        </p>
                      )}
                    </div>

                    <div>
                      <p style={{ marginBottom: '12px', fontSize: '13px', opacity: 0.8 }}>
                        Without presets
                      </p>
                      <DateRangePicker
                        selected={selectedRange}
                        onSelect={setSelectedRange}
                        placeholder="Select date range"
                        showPresets={false}
                      />
                    </div>

                    <div>
                      <p style={{ marginBottom: '12px', fontSize: '13px', opacity: 0.8 }}>
                        Allow future dates
                      </p>
                      <DateRangePicker
                        selected={selectedRange}
                        onSelect={setSelectedRange}
                        placeholder="Select date range"
                        allowFutureDates
                      />
                    </div>
                  </div>
                </section>

                <section style={{ marginTop: '2rem' }}>
                  <h3>Mining Operations Example</h3>
                  <div
                    style={{
                      padding: '20px',
                      background: '#0f0f0f',
                      border: '1px solid #ffffff1a',
                      borderRadius: '4px',
                    }}
                  >
                    <h4 style={{ margin: '0 0 16px 0', color: '#f7931a' }}>Revenue Report</h4>
                    <div
                      style={{
                        display: 'flex',
                        gap: '16px',
                        flexWrap: 'wrap',
                        marginBottom: '16px',
                      }}
                    >
                      <div style={{ flex: '1', minWidth: '200px' }}>
                        <label
                          style={{
                            display: 'block',
                            fontSize: '12px',
                            marginBottom: '8px',
                            opacity: 0.7,
                          }}
                        >
                          Select Report Period
                        </label>
                        <DateRangePicker
                          selected={selectedRange}
                          onSelect={setSelectedRange}
                          placeholder="Choose date range"
                        />
                      </div>
                    </div>
                    {selectedRange?.from && selectedRange?.to && (
                      <div
                        style={{
                          marginTop: '16px',
                          padding: '12px',
                          background: '#161514',
                          border: '1px solid #ffffff1a',
                        }}
                      >
                        <div style={{ fontSize: '13px', opacity: 0.9 }}>
                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              marginBottom: '8px',
                            }}
                          >
                            <span>Period:</span>
                            <span style={{ color: '#72f59e' }}>
                              {Math.floor(
                                (selectedRange.to.getTime() - selectedRange.from.getTime()) /
                                  (1000 * 60 * 60 * 24),
                              )}{' '}
                              days
                            </span>
                          </div>
                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              marginBottom: '8px',
                            }}
                          >
                            <span>Est. Hashrate:</span>
                            <span style={{ color: '#f7931a' }}>1.2 PH/s</span>
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span>Est. Revenue:</span>
                            <span style={{ color: '#f7931a' }}>0.45 BTC</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </section>
              </div>
            </section>
          )}

          {/* Icons */}
          {activeSection === 'icons' && (
            <section className="demo-section">
              <h2 className="demo-section__title">Icons</h2>
              <Icons />
            </section>
          )}
          {/* Toast */}
          {activeSection === 'toast' && (
            <section className="demo-section">
              <h2 className="demo-section__title">Toast</h2>
              <p className="demo-section__description">
                Toast notifications appear in the corner of the screen. Select a position, then
                click a button to trigger a toast. Toasts auto-dismiss after {TOAST_DURATION / 1000}{' '}
                seconds or can be closed manually.
              </p>

              {/* Position Selector */}
              <div className="demo-section__toast-controls">
                <h3>Step 1: Select Position</h3>
                <p className="demo-section__hint">Choose where toasts will appear on the screen</p>
                <div className="demo-section__toast-positions">
                  {TOAST_POSITIONS.map((pos) => (
                    <Button
                      key={pos}
                      variant={toastPosition === pos ? 'primary' : 'outline'}
                      onClick={() => setToastPosition(pos)}
                    >
                      {pos}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Variant Buttons */}
              <div className="demo-section__toast-controls">
                <h3>Step 2: Trigger a Toast</h3>
                <p className="demo-section__hint">
                  Click any button below to show a toast notification
                </p>
                <div className="demo-section__toast-buttons">
                  {TOAST_DEMO_CONFIGS.map((config) => (
                    <Button
                      key={config.buttonText}
                      variant={config.buttonVariant}
                      onClick={() => showToast(config.variant, config.title, config.description)}
                    >
                      {config.buttonText}
                    </Button>
                  ))}
                </div>
              </div>

              <Toaster duration={TOAST_DURATION} position={toastPosition}>
                {toasts.map((toast) => (
                  <Toast
                    key={toast.id}
                    variant={toast.variant}
                    title={toast.title}
                    {...(toast.description && { description: toast.description })}
                    onOpenChange={(open) => {
                      if (!open) removeToast(toast.id)
                    }}
                  />
                ))}
              </Toaster>
            </section>
          )}
          {/* Tags */}
          {activeSection === 'tags' && (
            <section className="demo-section">
              <h2 className="demo-section__title">Tags</h2>
              <div className="demo-section__tags">
                <Tag color="green">Active</Tag>
                <Tag color="amber">Pending</Tag>
                <Tag color="red">Inactive</Tag>
                <Tag color="blue">Processing</Tag>
                <Tag color="dark">Draft</Tag>
              </div>
            </section>
          )}
          {/* Indicators */}
          {activeSection === 'indicators' && <IndicatorsExample />}
          {/* Empty State */}
          {activeSection === 'empty-state' && (
            <section className="demo-section">
              <h2 className="demo-section__title">Empty State</h2>
              <div
                style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', alignItems: 'flex-start' }}
              >
                <section>
                  <h3>Default (md)</h3>
                  <div style={{ border: '1px solid #ffffff1a', padding: '16px', width: '280px' }}>
                    <EmptyState description="No data available" />
                  </div>
                </section>

                <section>
                  <h3>Simple image</h3>
                  <div style={{ border: '1px solid #ffffff1a', padding: '16px', width: '280px' }}>
                    <EmptyState description="No miners found" image="simple" />
                  </div>
                </section>

                <section>
                  <h3>Small</h3>
                  <div style={{ border: '1px solid #ffffff1a', padding: '16px', width: '200px' }}>
                    <EmptyState description="Empty" size="sm" />
                  </div>
                </section>

                <section>
                  <h3>Large</h3>
                  <div style={{ border: '1px solid #ffffff1a', padding: '16px', width: '320px' }}>
                    <EmptyState description="No results match your search criteria" size="lg" />
                  </div>
                </section>

                <section>
                  <h3>Custom description (ReactNode)</h3>
                  <div style={{ border: '1px solid #ffffff1a', padding: '16px', width: '280px' }}>
                    <EmptyState
                      description={
                        <span>
                          No pools configured.{' '}
                          <strong style={{ color: '#f7931a' }}>Add one now</strong>
                        </span>
                      }
                    />
                  </div>
                </section>

                <section>
                  <h3>Custom image (Radix Icon)</h3>
                  <div style={{ border: '1px solid #ffffff1a', padding: '16px', width: '280px' }}>
                    <EmptyState
                      description="Custom icon example"
                      image={<CubeIcon width="48" height="48" color="#f7931a" />}
                    />
                  </div>
                </section>
              </div>
            </section>
          )}

          {/* Spinner */}
          {activeSection === 'spinner' && (
            <section className="demo-section">
              <h2 className="demo-section__title">Spinner</h2>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '2rem',
                }}
              >
                {/* Basic usage */}
                <div className="demo-item">
                  <p className="demo-label">Basic Spinner (slow)</p>
                  <div style={{ display: 'flex', gap: '2rem', margin: '2rem' }}>
                    <Spinner speed="slow" />
                    <Spinner speed="slow" type="circle" />
                  </div>
                </div>

                {/* With label */}
                <div className="demo-item">
                  <p className="demo-label">With Label</p>
                  <div style={{ display: 'flex', gap: '2rem', margin: '2rem' }}>
                    <Spinner speed="slow" label="Loading data..." />
                    <Spinner speed="slow" color="secondary" type="circle" label="Loading data..." />
                  </div>
                </div>

                {/* Different sizes */}
                <div className="demo-item">
                  <p className="demo-label">Size Variants</p>
                  <div style={{ display: 'flex', gap: '4rem', margin: '2rem' }}>
                    <Spinner size="sm" />
                    <Spinner size="sm" type="circle" />
                    <Spinner size="md" />
                    <Spinner size="md" type="circle" />
                    <Spinner size="lg" />
                    <Spinner size="lg" type="circle" />
                  </div>
                </div>

                {/* Speed variants */}
                <div className="demo-item">
                  <p className="demo-label">Speed Variants</p>
                  <div style={{ display: 'flex', gap: '4rem', margin: '2rem' }}>
                    <div className="text-center">
                      <Spinner speed="slow" />
                      <p className="text-sm text-gray-400 mt-2">Slow</p>
                    </div>
                    <div className="text-center">
                      <Spinner speed="normal" />
                      <p className="text-sm text-gray-400 mt-2">Normal</p>
                    </div>
                    <div className="text-center">
                      <Spinner speed="fast" />
                      <p className="text-sm text-gray-400 mt-2">Fast</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}
          {/* Loader */}
          {activeSection === 'loader' && (
            <section className="demo-section">
              <h2 className="demo-section__title">Loader</h2>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '2rem',
                }}
              >
                {/* Basic usage */}
                <div className="demo-item" style={{ display: 'flex' }}>
                  <p className="demo-label">Default Loader</p>
                  <Loader />
                </div>

                {/* Size variants */}
                <div className="demo-item">
                  <p className="demo-label">Size Variants</p>
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <Loader size={6} />
                    <Loader size={10} />
                    <Loader size={14} />
                    <Loader size={20} />
                  </div>
                </div>

                {/* Count variants */}
                <div className="demo-item">
                  <p className="demo-label">Count Variants</p>
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <Loader count={3} />
                    <Loader count={5} />
                    <Loader count={7} />
                  </div>
                </div>

                {/* Color variants */}
                <div className="demo-item">
                  <Typography className="demo-label">Color Variants</Typography>
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <Loader color="orange" />
                    <Loader color="red" />
                    <Loader color="gray" />
                    <Loader color="blue" />
                  </div>
                </div>
              </div>
            </section>
          )}
          {/* Error Boundary */}
          {activeSection === 'error-boundary' && (
            <section className="demo-section">
              <h2 className="demo-section__title">Error Boundary</h2>
              <div
                style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', alignItems: 'flex-start' }}
              >
                <section>
                  <h3>withErrorBoundary HOC</h3>
                  <p style={{ fontSize: '13px', opacity: 0.7, marginBottom: '12px' }}>
                    Click the button 3 times to trigger the error boundary
                  </p>
                  <SafeBuggyCounter />
                </section>

                <section>
                  <h3>ErrorBoundary wrapper with custom fallback</h3>
                  <ErrorBoundary
                    fallback={
                      <div
                        style={{ color: '#ff3b30', padding: '12px', border: '1px solid #ff3b30' }}
                      >
                        Custom fallback UI - error was caught!
                      </div>
                    }
                  >
                    <div>This content is protected by an ErrorBoundary</div>
                  </ErrorBoundary>
                </section>
              </div>
            </section>
          )}

          {/* Error Card */}
          {activeSection === 'error-card' && (
            <section className="demo-section">
              <h2 className="demo-section__title">Error Card</h2>
              <div
                style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', alignItems: 'flex-start' }}
              >
                <section style={{ width: '320px' }}>
                  <h3>Card variant (default)</h3>
                  <ErrorCard error="Connection to miner timed out after 30 seconds" />
                </section>

                <section style={{ width: '320px' }}>
                  <h3>Card with multi-line error</h3>
                  <ErrorCard
                    error={
                      'Failed to fetch hashrate data\nServer returned status 503\nRetry in 5 seconds'
                    }
                    title="API Error"
                  />
                </section>

                <section style={{ width: '320px' }}>
                  <h3>Inline variant</h3>
                  <ErrorCard
                    error="Invalid MAC address format"
                    title="Validation Error"
                    variant="inline"
                  />
                </section>
              </div>
            </section>
          )}

          {/* Not Found Page */}
          {activeSection === 'not-found-page' && (
            <section className="demo-section">
              <h2 className="demo-section__title">Not Found Page</h2>
              <div style={{ border: '1px solid #ffffff1a', overflow: 'hidden' }}>
                <NotFoundPage
                  // eslint-disable-next-line no-alert
                  onGoHome={() => alert('Navigate home')}
                  className="mining-sdk-not-found-page--demo"
                />
              </div>
            </section>
          )}
          {/* Sidebar */}
          {activeSection === 'sidebar' && (
            <section className="demo-section">
              <h2 className="demo-section__title">Sidebar</h2>
              <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                {/* Inline mode */}
                <section style={{ flex: 1, minWidth: '360px' }}>
                  <h3>Inline (desktop)</h3>
                  <p style={{ fontSize: '13px', opacity: 0.7, marginBottom: '12px' }}>
                    Toggle expand/collapse. Hover collapsed groups for flyout.
                  </p>
                  <div
                    style={{
                      height: '420px',
                      border: '1px solid #ffffff1a',
                      display: 'flex',
                      overflow: 'hidden',
                      borderRadius: '4px',
                    }}
                  >
                    <Sidebar
                      items={SIDEBAR_EXAMPLE_ITEMS}
                      activeId={sidebarActiveId}
                      onItemClick={(item) => setSidebarActiveId(item.id)}
                    />
                    <div
                      style={{
                        flex: 1,
                        padding: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#666',
                      }}
                    >
                      <div style={{ textAlign: 'center' }}>
                        <p style={{ fontSize: '14px', marginBottom: '8px' }}>
                          Active: <strong style={{ color: '#f7931a' }}>{sidebarActiveId}</strong>
                        </p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Overlay mode */}
                <section style={{ flex: 1, minWidth: '260px' }}>
                  <h3>Overlay (mobile)</h3>
                  <p style={{ fontSize: '13px', opacity: 0.7, marginBottom: '12px' }}>
                    Fixed overlay with backdrop. Closes on backdrop click or Escape.
                  </p>
                  <Button variant="secondary" onClick={() => setMobileSidebarOpen(true)}>
                    Open Mobile Sidebar
                  </Button>
                  <Sidebar
                    items={SIDEBAR_EXAMPLE_ITEMS}
                    activeId={sidebarActiveId}
                    onItemClick={(item) => {
                      setSidebarActiveId(item.id)
                      setMobileSidebarOpen(false)
                    }}
                    overlay
                    visible={mobileSidebarOpen}
                    onClose={() => setMobileSidebarOpen(false)}
                  />
                </section>
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
