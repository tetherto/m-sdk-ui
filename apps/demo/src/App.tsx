import type { DateRange, ToastPosition, ToastVariant } from '@mining-sdk/core'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
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
  Breadcrumbs,
  Button,
  Checkbox,
  CubeIcon,
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
  Indicator,
  Input,
  Label,
  NotFoundPage,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Radio,
  RadioCard,
  RadioGroup,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
  SimplePopover,
  SimpleTooltip,
  Switch,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Tag,
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
import { useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.scss'
import { ControlledDialog } from './components/controlled-dialog'
import { Icons } from './components/icons'
import PaginationExample from './examples/pagination-example'

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

  const [toasts, setToasts] = useState<ToastItem[]>([])
  const [toastPosition, setToastPosition] = useState<ToastPosition>('top-right')

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
      <h1 className="demo-app__title">@mining-sdk/core Component Demo</h1>

      <div className="demo-app__content">
        {/* Buttons */}
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
        {/* Select */}
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
        {/* Pagination */}
        <section className="demo-section">
          <h2 className="demo-section__title">Pagination</h2>
          <PaginationExample />
        </section>
        {/* Dropdown Menu */}
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
        {/* Input */}
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
              <Input label="Email" placeholder="Email" error="Email is required" id="email-error" />
            </section>
          </div>
        </section>
        {/* Dialog */}
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
        {/* Alert Dialog */}
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
                  This action cannot be undone. This will permanently delete your account and remove
                  your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </section>
        {/* Checkbox & Switch */}
        <section className="demo-section">
          <h2 className="demo-section__title">Checkbox & Switch</h2>
          <div className="demo-section__form-controls">
            <h2>Checkbox</h2>
            <div className="demo-section__form-item demo-section__form-item--baseline">
              {/* Color Variants */}
              <section>
                <h3>Color Variants</h3>
                <div className="demo-section__checkboxes">
                  <div className="demo-section__checkboxes__item">
                    <Checkbox id="checkbox-default" color="default" defaultChecked />
                    <Label htmlFor="default">Default (Surface #0E0E0E)</Label>
                  </div>

                  <div className="demo-section__checkboxes__item">
                    <Checkbox id="checkbox-primary" color="primary" defaultChecked />
                    <Label htmlFor="checkbox-primary">Primary (Orange #F7931A)</Label>
                  </div>

                  <div className="demo-section__checkboxes__item">
                    <Checkbox id="checkbox-success" color="success" defaultChecked />
                    <Label htmlFor="checkbox-success">Success (Green #72F59E)</Label>
                  </div>

                  <div className="demo-section__checkboxes__item">
                    <Checkbox id="checkbox-warning" color="warning" defaultChecked />
                    <Label htmlFor="checkbox-warning">Warning (Yellow #FFC107)</Label>
                  </div>

                  <div className="demo-section__checkboxes__item">
                    <Checkbox id="checkbox-error" color="error" defaultChecked />
                    <Label htmlFor="checkbox-error">Error (Red #EF4444)</Label>
                  </div>
                </div>
              </section>

              {/* Size Variants */}
              <section>
                <h3>Size Variants</h3>
                <div className="demo-section__checkboxes">
                  <div className="demo-section__checkboxes__item">
                    <Checkbox id="checkbox-small" size="sm" color="primary" defaultChecked />
                    <Label htmlFor="checkbox-small">Small (16×16px)</Label>
                  </div>

                  <div className="demo-section__checkboxes__item">
                    <Checkbox id="checkbox-medium" size="md" color="primary" defaultChecked />
                    <Label htmlFor="checkbox-medium">Medium (20×20px) - Default</Label>
                  </div>

                  <div className="demo-section__checkboxes__item">
                    <Checkbox id="checkbox-large" size="lg" color="primary" defaultChecked />
                    <Label htmlFor="checkbox-large">Large (24×24px)</Label>
                  </div>
                </div>
              </section>

              {/* Radius Variants */}
              <section>
                <h3>Radius Variants</h3>
                <div className="demo-section__checkboxes">
                  <div className="demo-section__checkboxes__item">
                    <Checkbox
                      id="checkbox-radius-none"
                      radius="none"
                      color="success"
                      defaultChecked
                    />
                    <Label htmlFor="checkbox-radius-none">None (Square corners)</Label>
                  </div>

                  <div className="demo-section__checkboxes__item">
                    <Checkbox
                      id="checkbox-radius-small"
                      radius="small"
                      color="success"
                      defaultChecked
                    />
                    <Label htmlFor="checkbox-radius-small">Small (4px) - Default</Label>
                  </div>

                  <div className="demo-section__checkboxes__item">
                    <Checkbox
                      id="checkbox-radius-medium"
                      radius="medium"
                      color="success"
                      defaultChecked
                    />
                    <Label htmlFor="checkbox-radius-medium">Medium (6px)</Label>
                  </div>

                  <div className="demo-section__checkboxes__item">
                    <Checkbox
                      id="checkbox-radius-large"
                      radius="large"
                      color="success"
                      defaultChecked
                    />
                    <Label htmlFor="checkbox-radius-large">Large (8px)</Label>
                  </div>

                  <div className="demo-section__checkboxes__item">
                    <Checkbox
                      id="checkbox-radius-full"
                      radius="full"
                      color="success"
                      defaultChecked
                    />
                    <Label htmlFor="checkbox-radius-full">Full (Circular)</Label>
                  </div>
                </div>
              </section>

              {/* States */}
              <section>
                <h3>States</h3>
                <div className="demo-section__checkboxes">
                  <div className="demo-section__checkboxes__item">
                    <Checkbox id="checkbox-unchecked" color="primary" />
                    <Label htmlFor="checkbox-unchecked">Unchecked</Label>
                  </div>

                  <div className="demo-section__checkboxes__item">
                    <Checkbox id="checkbox-checked" color="primary" defaultChecked />
                    <Label htmlFor="checkbox-checked">Checked</Label>
                  </div>

                  <div className="demo-section__checkboxes__item">
                    <Checkbox id="checkbox-indeterminate" color="primary" checked="indeterminate" />
                    <Label htmlFor="checkbox-indeterminate">Indeterminate</Label>
                  </div>

                  <div className="demo-section__checkboxes__item">
                    <Checkbox id="checkbox-disabled-unchecked" color="primary" disabled />
                    <Label htmlFor="checkbox-disabled-unchecked">Disabled (Unchecked)</Label>
                  </div>

                  <div className="demo-section__checkboxes__item">
                    <Checkbox
                      id="checkbox-disabled-checked"
                      color="primary"
                      disabled
                      defaultChecked
                    />
                    <Label htmlFor="checkbox-disabled-checked">Disabled (Checked)</Label>
                  </div>
                </div>
              </section>

              {/* Combinations */}
              <section>
                <h3>Combination Examples</h3>
                <div className="demo-section__checkboxes">
                  <div className="demo-section__checkboxes__item">
                    <Checkbox
                      id="checkbox-combo-1"
                      size="sm"
                      color="primary"
                      radius="none"
                      defaultChecked
                    />
                    <Label htmlFor="checkbox-combo-1">Small + Primary + No Radius</Label>
                  </div>

                  <div className="demo-section__checkboxes__item">
                    <Checkbox
                      id="checkbox-combo-2"
                      size="md"
                      color="success"
                      radius="medium"
                      defaultChecked
                    />
                    <Label htmlFor="checkbox-combo-2">Medium + Success + Medium Radius</Label>
                  </div>

                  <div className="demo-section__checkboxes__item">
                    <Checkbox
                      id="checkbox-combo-3"
                      size="lg"
                      color="error"
                      radius="full"
                      defaultChecked
                    />
                    <Label htmlFor="checkbox-combo-3">Large + Error + Full Radius (Circle)</Label>
                  </div>

                  <div className="demo-section__checkboxes__item">
                    <Checkbox
                      id="checkbox-combo-4"
                      size="lg"
                      color="warning"
                      radius="large"
                      defaultChecked
                    />
                    <Label htmlFor="checkbox-combo-4">Large + Warning + Large Radius</Label>
                  </div>
                </div>
              </section>
            </div>
          </div>
          <div className="demo-section__form-controls">
            <h2>Switch</h2>
            <div className="demo-section__form-item demo-section__form-item--baseline">
              <section>
                <h3>Color Variants</h3>
                <div className="demo-section__switches">
                  <div className="demo-section__switches__item">
                    <Switch id="switch-default" color="default" defaultChecked />
                    <Label htmlFor="switch-default">Default (Surface #0E0E0E)</Label>
                  </div>

                  <div className="demo-section__switches__item">
                    <Switch id="switch-primary" color="primary" defaultChecked />
                    <Label htmlFor="switch-primary">Primary (Orange #F7931A)</Label>
                  </div>

                  <div className="demo-section__switches__item">
                    <Switch id="switch-success" color="success" defaultChecked />
                    <Label htmlFor="switch-success">Success (Green #72F59E)</Label>
                  </div>

                  <div className="demo-section__switches__item">
                    <Switch id="switch-warning" color="warning" defaultChecked />
                    <Label htmlFor="switch-warning">Warning (Yellow #FFC107)</Label>
                  </div>

                  <div className="demo-section__switches__item">
                    <Switch id="switch-error" color="error" defaultChecked />
                    <Label htmlFor="switch-error">Error (Red #EF4444)</Label>
                  </div>
                </div>
              </section>

              {/* Size Variants */}
              <section>
                <h3>Size Variants</h3>
                <div className="demo-section__switches">
                  <div className="demo-section__switches__item">
                    <Switch id="switch-small" size="sm" color="primary" defaultChecked />
                    <Label htmlFor="switch-small">Small (32×18px)</Label>
                  </div>

                  <div className="demo-section__switches__item">
                    <Switch id="switch-medium" size="md" color="primary" defaultChecked />
                    <Label htmlFor="switch-medium">Medium (42×24px) - Default</Label>
                  </div>

                  <div className="demo-section__switches__item">
                    <Switch id="switch-large" size="lg" color="primary" defaultChecked />
                    <Label htmlFor="switch-large">Large (52×30px)</Label>
                  </div>
                </div>
              </section>

              {/* Radius Variants */}
              <section>
                <h3>Radius Variants</h3>
                <div className="demo-section__switches">
                  <div className="demo-section__switches__item">
                    <Switch id="switch-radius-none" radius="none" color="success" defaultChecked />
                    <Label htmlFor="switch-radius-none">None (Square corners) - Default</Label>
                  </div>

                  <div className="demo-section__switches__item">
                    <Switch
                      id="switch-radius-small"
                      radius="small"
                      color="success"
                      defaultChecked
                    />
                    <Label htmlFor="switch-radius-small">Small (4px border-radius)</Label>
                  </div>

                  <div className="demo-section__switches__item">
                    <Switch
                      id="switch-radius-medium"
                      radius="medium"
                      color="success"
                      defaultChecked
                    />
                    <Label htmlFor="switch-radius-medium">Medium (8px border-radius)</Label>
                  </div>

                  <div className="demo-section__switches__item">
                    <Switch
                      id="switch-radius-large"
                      radius="large"
                      color="success"
                      defaultChecked
                    />
                    <Label htmlFor="switch-radius-large">Large (12px border-radius)</Label>
                  </div>

                  <div className="demo-section__switches__item">
                    <Switch id="switch-radius-full" radius="full" color="success" defaultChecked />
                    <Label htmlFor="switch-radius-full">Full (Pill-shaped)</Label>
                  </div>
                </div>
              </section>

              {/* States */}
              <section>
                <h3>States</h3>
                <div className="demo-section__switches">
                  <div className="demo-section__switches__item">
                    <Switch id="switch-unchecked" color="primary" />
                    <Label htmlFor="switch-unchecked">Unchecked</Label>
                  </div>

                  <div className="demo-section__switches__item">
                    <Switch id="switch-checked" color="primary" defaultChecked />
                    <Label htmlFor="switch-checked">Checked</Label>
                  </div>

                  <div className="demo-section__switches__item">
                    <Switch id="switch-disabled-unchecked" color="primary" disabled />
                    <Label htmlFor="switch-disabled-unchecked">Disabled (Unchecked)</Label>
                  </div>

                  <div className="demo-section__switches__item">
                    <Switch id="switch-disabled-checked" color="primary" disabled defaultChecked />
                    <Label htmlFor="switch-disabled-checked">Disabled (Checked)</Label>
                  </div>
                </div>
              </section>

              {/* Combinations */}
              <section>
                <h3>Combination Examples</h3>
                <div className="demo-section__switches">
                  <div className="demo-section__switches__item">
                    <Switch
                      id="switch-combo-1"
                      size="sm"
                      color="primary"
                      radius="small"
                      defaultChecked
                    />
                    <Label htmlFor="switch-combo-1">Small + Primary + Small Radius</Label>
                  </div>

                  <div className="demo-section__switches__item">
                    <Switch
                      id="switch-combo-2"
                      size="md"
                      color="success"
                      radius="medium"
                      defaultChecked
                    />
                    <Label htmlFor="switch-combo-2">Medium + Success + Medium Radius</Label>
                  </div>

                  <div className="demo-section__switches__item">
                    <Switch
                      id="switch-combo-3"
                      size="lg"
                      color="error"
                      radius="none"
                      defaultChecked
                    />
                    <Label htmlFor="switch-combo-3">Large + Error + No Radius</Label>
                  </div>

                  <div className="demo-section__switches__item">
                    <Switch
                      id="switch-combo-4"
                      size="lg"
                      color="warning"
                      radius="full"
                      defaultChecked
                    />
                    <Label htmlFor="switch-combo-4">Large + Warning + Full Radius</Label>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </section>
        {/* Avatar */}
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
        {/* Accordion */}
        <section className="demo-section">
          <h2 className="demo-section__title">Accordion</h2>
          {/* Basic Opened Accordion */}
          <section>
            <Accordion isOpened title="Basic Opened Accordion">
              This is a basic opened accordion. You can put any content here, such as text, lists,
              or even other components.
            </Accordion>
          </section>

          {/* Multiple Accordion */}
          <section style={{ marginTop: '2rem' }}>
            <Accordion title="Multiple Accordion">
              <AccordionItem value="faq-1">
                <AccordionTrigger>What is Bitcoin mining?</AccordionTrigger>
                <AccordionContent>
                  Bitcoin mining is the process of creating new bitcoins by solving complex
                  mathematical problems that verify transactions in the currency. When a bitcoin is
                  successfully mined, the miner receives a predetermined amount of bitcoin.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-2">
                <AccordionTrigger>What equipment do I need?</AccordionTrigger>
                <AccordionContent>
                  You'll need specialized hardware called ASIC miners (Application-Specific
                  Integrated Circuits), a reliable power supply, adequate cooling systems, and a
                  stable internet connection.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-3">
                <AccordionTrigger>How much does it cost to start mining?</AccordionTrigger>
                <AccordionContent>
                  Initial costs vary widely depending on the scale of your operation. A single ASIC
                  miner can cost between $2,000 to $10,000+, plus ongoing electricity costs which
                  can be substantial.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>
        </section>
        {/* Tabs  */}
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
        {/* Typography */}
        <section className="demo-section">
          <h2 className="demo-section__title">Typography</h2>
          <div className="demo-section__typography">
            {/* Variants */}
            <section>
              <h3 className="demo-section__typography--title">Variants</h3>
              <div className="demo-section__typography--item">
                <Typography variant="heading1">Heading 1</Typography>
                <Typography variant="heading2">Heading 2</Typography>
                <Typography variant="heading3">Heading 3</Typography>
                <Typography variant="body">Body Text</Typography>
                <Typography variant="secondary">Secondary Text</Typography>
                <Typography variant="caption">Caption Text</Typography>
              </div>
            </section>

            {/* Sizes */}
            <section>
              <h3 className="demo-section__typography--title">Sizes</h3>
              <div className="demo-section__typography--item">
                <Typography size="xs">Extra Small (12px)</Typography>
                <Typography size="sm">Small (14px)</Typography>
                <Typography size="md">Medium (16px)</Typography>
                <Typography size="lg">Large (18px)</Typography>
                <Typography size="xl">Extra Large (20px)</Typography>
                <Typography size="2xl">2X Large (24px)</Typography>
                <Typography size="3xl">3X Large (32px)</Typography>
                <Typography size="4xl">4X Large (40px)</Typography>
              </div>
            </section>

            {/* Weights */}
            <section>
              <h3 className="demo-section__typography--title">Font Weights</h3>
              <div className="demo-section__typography--item">
                <Typography weight="light">Light (300)</Typography>
                <Typography weight="normal">Normal (400)</Typography>
                <Typography weight="medium">Medium (500)</Typography>
                <Typography weight="semibold">Semibold (600)</Typography>
                <Typography weight="bold">Bold (700)</Typography>
              </div>
            </section>

            {/* Colors */}
            <section>
              <h3 className="demo-section__typography--title">Colors</h3>
              <div className="demo-section__typography--item">
                <Typography color="default">Default Color</Typography>
                <Typography color="primary">Primary Color (#F7931A)</Typography>
                <Typography color="success">Success Color (#72F59E)</Typography>
                <Typography color="warning">Warning Color (#FFC107)</Typography>
                <Typography color="error">Error Color (#EF4444)</Typography>
                <Typography color="muted">Muted Color</Typography>
              </div>
            </section>

            {/* Alignment */}
            <section>
              <h3 className="demo-section__typography--title">Alignment</h3>
              <div className="demo-section__typography--item">
                <Typography align="left">Left aligned text</Typography>
                <Typography align="center">Center aligned text</Typography>
                <Typography align="right">Right aligned text</Typography>
                <Typography align="justify">
                  Justified text. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                  eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </Typography>
              </div>
            </section>

            {/* Truncate */}
            <section>
              <h3 className="demo-section__typography--title">Truncate</h3>
              <div
                style={{
                  width: '300px',
                }}
              >
                <Typography truncate>
                  This is a very long text that will be truncated with an ellipsis when it exceeds
                  the container width
                </Typography>
              </div>
            </section>
          </div>
        </section>
        {/* Breadcrumbs */}
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
                        items={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Settings' }]}
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
        {/* Radio */}
        <section className="demo-section">
          <h2 className="demo-section__title">Radio</h2>

          {/* RadioCard - Time Selector */}
          <h3>RadioCard - Time Selector</h3>
          <section className="demo-section__radio-card">
            <RadioGroup defaultValue="5min" orientation="horizontal" noGap>
              <RadioCard value="5min" label="5 Min" />
              <RadioCard value="30min" label="30 Min" />
              <RadioCard value="3h" label="3 H" />
              <RadioCard value="1d" label="1 D" />
            </RadioGroup>
          </section>

          {/* RadioCard Sizes */}
          <h3>RadioCard Sizes</h3>
          <section className="demo-section__radio-card">
            <div className="demo-section__radio-card--column">
              <RadioGroup defaultValue="sm" orientation="horizontal">
                <RadioCard value="sm" label="Small" size="sm" />
                <RadioCard value="sm2" label="Small" size="sm" />
              </RadioGroup>
              <RadioGroup defaultValue="md" orientation="horizontal">
                <RadioCard value="md" label="Medium" size="md" />
                <RadioCard value="md2" label="Medium" size="md" />
              </RadioGroup>
              <RadioGroup defaultValue="lg" orientation="horizontal">
                <RadioCard value="lg" label="Large" size="lg" />
                <RadioCard value="lg2" label="Large" size="lg" />
              </RadioGroup>
            </div>
          </section>

          {/* RadioCard Colors */}
          <h3>RadioCard Colors</h3>
          <section className="demo-section__radio-card">
            <RadioGroup defaultValue="primary" orientation="horizontal">
              <RadioCard value="primary" label="Primary" color="primary" />
              <RadioCard value="success" label="Success" color="success" />
              <RadioCard value="warning" label="Warning" color="warning" />
              <RadioCard value="error" label="Error" color="error" />
            </RadioGroup>
          </section>

          {/* RadioCard Radius */}
          <h3>RadioCard Radius</h3>
          <section className="demo-section__radio-card">
            <RadioGroup defaultValue="small" orientation="horizontal">
              <RadioCard value="none" label="None" radius="none" />
              <RadioCard value="small" label="Small" radius="small" />
              <RadioCard value="medium" label="Medium" radius="medium" />
              <RadioCard value="full" label="Full" radius="full" />
            </RadioGroup>
          </section>

          <section className="demo-section__radio">
            {/* Color Variants */}
            <section>
              <h3>Color Variants</h3>
              <RadioGroup defaultValue="primary">
                <div className="demo-section__radio--item">
                  <Radio value="default" color="default" id="radio-default" />
                  <Label htmlFor="radio-default">Default</Label>
                </div>
                <div className="demo-section__radio--item">
                  <Radio value="primary" color="primary" id="radio-primary" />
                  <Label htmlFor="radio-primary">Primary</Label>
                </div>
                <div className="demo-section__radio--item">
                  <Radio value="success" color="success" id="radio-success" />
                  <Label htmlFor="radio-success">Success</Label>
                </div>
                <div className="demo-section__radio--item">
                  <Radio value="warning" color="warning" id="radio-warning" />
                  <Label htmlFor="radio-warning">Warning</Label>
                </div>
                <div className="demo-section__radio--item">
                  <Radio value="error" color="error" id="radio-error" />
                  <Label htmlFor="radio-error">Error</Label>
                </div>
              </RadioGroup>
            </section>

            {/* Sizes */}
            <section>
              <h3>Sizes</h3>
              <RadioGroup defaultValue="md" orientation="horizontal">
                <Radio value="sm" size="sm" />
                <Radio value="md" size="md" />
                <Radio value="lg" size="lg" />
              </RadioGroup>
            </section>

            {/* Radius */}
            <section>
              <h3>Radius Variants</h3>
              <RadioGroup defaultValue="full" orientation="horizontal">
                <Radio value="none" radius="none" />
                <Radio value="small" radius="small" />
                <Radio value="medium" radius="medium" />
                <Radio value="large" radius="large" />
                <Radio value="full" radius="full" />
              </RadioGroup>
            </section>
            {/*  States */}
            <section>
              <h3>States</h3>
              <RadioGroup defaultValue="checked">
                <div className="demo-section__radio--item">
                  <Radio value="unchecked" id="radio-state-unchecked" />
                  <Label htmlFor="radio-state-unchecked">Unchecked</Label>
                </div>
                <div className="demo-section__radio--item">
                  <Radio value="checked" id="radio-state-checked" />
                  <Label htmlFor="radio-state-checked">Checked</Label>
                </div>
                <div className="demo-section__radio--item">
                  <Radio value="disabled-unchecked" disabled id="radio-state-disabled-unchecked" />
                  <Label htmlFor="radio-state-disabled-unchecked">Disabled (Unchecked)</Label>
                </div>
                <div className="demo-section__radio--item">
                  <Radio value="checked" disabled id="radio-state-disabled-checked" />
                  <Label htmlFor="radio-state-disabled-checked">Disabled (Checked)</Label>
                </div>
              </RadioGroup>
            </section>
          </section>
        </section>
        {/* Tooltip */}
        <section className="demo-section">
          <h2 className="demo-section__title">Tooltip</h2>
          <div className="demo-section__tooltip">
            <section>
              <h3>Simple Tooltip (Convenient Wrapper)</h3>
              <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', flexWrap: 'wrap' }}>
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
              <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', flexWrap: 'wrap' }}>
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
              <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', flexWrap: 'wrap' }}>
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
                      <div style={{ fontWeight: 600, marginBottom: '4px' }}>Long Text Example</div>
                      <div style={{ fontSize: '11px' }}>
                        This tooltip demonstrates word wrapping for longer content. The text will
                        automatically wrap within the maximum width constraint.
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

        {/* Popover */}
        <section className="demo-section">
          <h2 className="demo-section__title">Popover</h2>
          <div className="demo-section__popover">
            <section>
              <h3>Simple Popover (Convenient Wrapper)</h3>
              <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', flexWrap: 'wrap' }}>
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
              <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', flexWrap: 'wrap' }}>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="primary">Custom Popover</Button>
                  </PopoverTrigger>
                  <PopoverContent side="bottom" align="start">
                    <div style={{ width: '300px' }}>
                      <h4 style={{ margin: '0 0 12px 0', color: '#f7931a' }}>Mining Controls</h4>
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
              <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', flexWrap: 'wrap' }}>
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

        {/* Date Pickers */}
        <section className="demo-section">
          <h2 className="demo-section__title">Date Pickers</h2>
          <div className="demo-section__date-pickers">
            <section>
              <h3>Single Date Picker</h3>
              <div
                style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start', flexWrap: 'wrap' }}
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
                style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start', flexWrap: 'wrap' }}
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
                  style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '16px' }}
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

        {/* Icons */}
        <section className="demo-section">
          <h2 className="demo-section__title">Icons</h2>
          <Icons />
        </section>
        {/* Toast */}
        <section className="demo-section">
          <h2 className="demo-section__title">Toast</h2>
          <p className="demo-section__description">
            Toast notifications appear in the corner of the screen. Select a position, then click a
            button to trigger a toast. Toasts auto-dismiss after {TOAST_DURATION / 1000} seconds or
            can be closed manually.
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
        {/* Tags */}
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
        {/* Indicators */}
        <section className="demo-section">
          <h2 className="demo-section__title">Indicators</h2>
          <section className="demo-section__indicators">
            {/* Size Variants */}
            <section>
              <h3>Size Variants</h3>
              <div className="demo-section__indicators--content">
                <Indicator color="green" size="sm">
                  Small
                </Indicator>
                <Indicator color="green" size="md">
                  Medium
                </Indicator>
                <Indicator color="green" size="lg">
                  Large
                </Indicator>
              </div>
            </section>

            {/* All Colors  */}
            <section>
              <h3>All Colors</h3>
              <div className="demo-section__indicators--content">
                <Indicator color="red" size="lg">
                  Red
                </Indicator>
                <Indicator color="gray" size="lg">
                  Gray
                </Indicator>
                <Indicator color="blue" size="lg">
                  Blue
                </Indicator>
                <Indicator color="yellow" size="lg">
                  Yellow
                </Indicator>
                <Indicator color="green" size="lg">
                  Green
                </Indicator>
                <Indicator color="purple" size="lg">
                  Purple
                </Indicator>
                <Indicator color="amber" size="lg">
                  Amber
                </Indicator>
                <Indicator color="slate" size="lg">
                  Slate
                </Indicator>
              </div>
            </section>

            {/* Status Indicators */}
            <section>
              <h3>Status Indicators</h3>
              <div className="demo-section__indicators--content">
                <Indicator color="red">Offline</Indicator>
                <Indicator color="red">Error</Indicator>
                <Indicator color="gray">Sleep</Indicator>
                <Indicator color="amber">Low</Indicator>
                <Indicator color="green">Normal</Indicator>
                <Indicator color="purple">High</Indicator>
                <Indicator color="slate">Empty</Indicator>
              </div>
            </section>

            {/* System Status */}
            <section>
              <h3>System Status (Large)</h3>
              <div className="demo-section__indicators--content">
                <Indicator color="green" size="lg">
                  <span>Running</span>
                  <span>10</span>
                </Indicator>
                <Indicator color="blue" size="lg">
                  <span>Sleep</span>
                  <span>0</span>
                </Indicator>
                <Indicator color="amber" size="lg">
                  <span>Empty</span>
                  <span>4</span>
                </Indicator>
                <Indicator color="red" size="lg">
                  <span>Error</span>
                  <span>2</span>
                </Indicator>
                <Indicator color="gray" size="lg">
                  <span>Offline</span>
                  <span>1</span>
                </Indicator>
              </div>
            </section>

            {/* Status Dashboard Example */}
            <section>
              <h3>Status Dashboard</h3>
              <div className="demo-section__indicators--content">
                <div>
                  <code>Offline</code>
                  <Indicator color="gray">0</Indicator>
                </div>
                <div>
                  <code>Error</code>
                  <Indicator color="red">0</Indicator>
                </div>
                <div>
                  <code>Sleep</code>
                  <Indicator color="blue">0</Indicator>
                </div>
                <div>
                  <code>Low</code>
                  <Indicator color="yellow">0</Indicator>
                </div>
                <div>
                  <code>Normal</code>
                  <Indicator color="green">39</Indicator>
                </div>
                <div>
                  <code>High</code>
                  <Indicator color="purple">0</Indicator>
                </div>
                <div>
                  <code>Empty</code>
                  <Indicator color="slate">69</Indicator>
                </div>
              </div>
            </section>
          </section>
        </section>
        {/* Empty State */}
        <section className="demo-section">
          <h2 className="demo-section__title">Empty State</h2>
          <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', alignItems: 'flex-start' }}>
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
                      No pools configured. <strong style={{ color: '#f7931a' }}>Add one now</strong>
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

        {/* Error Boundary */}
        <section className="demo-section">
          <h2 className="demo-section__title">Error Boundary</h2>
          <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', alignItems: 'flex-start' }}>
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
                  <div style={{ color: '#ff3b30', padding: '12px', border: '1px solid #ff3b30' }}>
                    Custom fallback UI - error was caught!
                  </div>
                }
              >
                <div>This content is protected by an ErrorBoundary</div>
              </ErrorBoundary>
            </section>
          </div>
        </section>

        {/* Error Card */}
        <section className="demo-section">
          <h2 className="demo-section__title">Error Card</h2>
          <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', alignItems: 'flex-start' }}>
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

        {/* Not Found Page */}
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
      </div>
    </div>
  )
}

export default App
