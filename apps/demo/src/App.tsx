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
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
  Label,
  Radio,
  RadioCard,
  RadioGroup,
  Switch,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Typography,
} from '@mining-sdk/core'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.scss'
import { ControlledDialog } from './components/controlled-dialog'
import { Icons } from './components/icons'

const App = (): JSX.Element => (
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
                  <Switch id="switch-radius-small" radius="small" color="success" defaultChecked />
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
                  <Switch id="switch-radius-large" radius="large" color="success" defaultChecked />
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
        <Accordion type="single" collapsible className="demo-section__accordion">
          <AccordionItem value="item-1">
            <AccordionTrigger>Is it accessible?</AccordionTrigger>
            <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Is it styled?</AccordionTrigger>
            <AccordionContent>
              Yes. It comes with default styles that can be customized with CSS variables.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Can I use it in my project?</AccordionTrigger>
            <AccordionContent>
              Absolutely! It's part of the @mining-sdk/core package in this monorepo.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
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
                This is a very long text that will be truncated with an ellipsis when it exceeds the
                container width
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
      {/* Icons */}
      <section className="demo-section">
        <h2 className="demo-section__title">Icons</h2>
        <Icons />
      </section>
    </div>
  </div>
)

export default App
