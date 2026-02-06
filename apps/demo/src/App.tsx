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
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Label,
  Switch,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Typography,
} from '@mining-sdk/core'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.scss'

function App(): JSX.Element {
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
        {/* Dialog */}
        <section className="demo-section">
          <h2 className="demo-section__title">Dialog</h2>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Open Dialog</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Welcome to @mining-sdk/core</DialogTitle>
                <DialogDescription>
                  This is a dialog component built with Radix UI primitives.
                </DialogDescription>
              </DialogHeader>
              <div className="demo-section__dialog-content">
                <p>You can add any content here.</p>
              </div>
              <DialogFooter>
                <Button variant="outline">Cancel</Button>
                <Button variant="primary">Save changes</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
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
                    <Checkbox id="default" color="default" defaultChecked />
                    <Label htmlFor="default">Default (Surface #0E0E0E)</Label>
                  </div>

                  <div className="demo-section__checkboxes__item">
                    <Checkbox id="primary" color="primary" defaultChecked />
                    <Label htmlFor="primary">Primary (Orange #F7931A)</Label>
                  </div>

                  <div className="demo-section__checkboxes__item">
                    <Checkbox id="success" color="success" defaultChecked />
                    <Label htmlFor="success">Success (Green #72F59E)</Label>
                  </div>

                  <div className="demo-section__checkboxes__item">
                    <Checkbox id="warning" color="warning" defaultChecked />
                    <Label htmlFor="warning">Warning (Yellow #FFC107)</Label>
                  </div>

                  <div className="demo-section__checkboxes__item">
                    <Checkbox id="error" color="error" defaultChecked />
                    <Label htmlFor="error">Error (Red #EF4444)</Label>
                  </div>
                </div>
              </section>

              {/* Size Variants */}
              <section>
                <h3>Size Variants</h3>
                <div className="demo-section__checkboxes">
                  <div className="demo-section__checkboxes__item">
                    <Checkbox id="small" size="sm" color="primary" defaultChecked />
                    <Label htmlFor="small">Small (16×16px)</Label>
                  </div>

                  <div className="demo-section__checkboxes__item">
                    <Checkbox id="medium" size="md" color="primary" defaultChecked />
                    <Label htmlFor="medium">Medium (20×20px) - Default</Label>
                  </div>

                  <div className="demo-section__checkboxes__item">
                    <Checkbox id="large" size="lg" color="primary" defaultChecked />
                    <Label htmlFor="large">Large (24×24px)</Label>
                  </div>
                </div>
              </section>

              {/* Radius Variants */}
              <section>
                <h3>Radius Variants</h3>
                <div className="demo-section__checkboxes">
                  <div className="demo-section__checkboxes__item">
                    <Checkbox id="radius-none" radius="none" color="success" defaultChecked />
                    <Label htmlFor="radius-none">None (Square corners)</Label>
                  </div>

                  <div className="demo-section__checkboxes__item">
                    <Checkbox id="radius-small" radius="small" color="success" defaultChecked />
                    <Label htmlFor="radius-small">Small (4px) - Default</Label>
                  </div>

                  <div className="demo-section__checkboxes__item">
                    <Checkbox id="radius-medium" radius="medium" color="success" defaultChecked />
                    <Label htmlFor="radius-medium">Medium (6px)</Label>
                  </div>

                  <div className="demo-section__checkboxes__item">
                    <Checkbox id="radius-large" radius="large" color="success" defaultChecked />
                    <Label htmlFor="radius-large">Large (8px)</Label>
                  </div>

                  <div className="demo-section__checkboxes__item">
                    <Checkbox id="radius-full" radius="full" color="success" defaultChecked />
                    <Label htmlFor="radius-full">Full (Circular)</Label>
                  </div>
                </div>
              </section>

              {/* States */}
              <section>
                <h3>States</h3>
                <div className="demo-section__checkboxes">
                  <div className="demo-section__checkboxes__item">
                    <Checkbox id="unchecked" color="primary" />
                    <Label htmlFor="unchecked">Unchecked</Label>
                  </div>

                  <div className="demo-section__checkboxes__item">
                    <Checkbox id="checked" color="primary" defaultChecked />
                    <Label htmlFor="checked">Checked</Label>
                  </div>

                  <div className="demo-section__checkboxes__item">
                    <Checkbox id="indeterminate" color="primary" checked="indeterminate" />
                    <Label htmlFor="indeterminate">Indeterminate</Label>
                  </div>

                  <div className="demo-section__checkboxes__item">
                    <Checkbox id="disabled-unchecked" color="primary" disabled />
                    <Label htmlFor="disabled-unchecked">Disabled (Unchecked)</Label>
                  </div>

                  <div className="demo-section__checkboxes__item">
                    <Checkbox id="disabled-checked" color="primary" disabled defaultChecked />
                    <Label htmlFor="disabled-checked">Disabled (Checked)</Label>
                  </div>
                </div>
              </section>

              {/* Combinations */}
              <section>
                <h3>Combination Examples</h3>
                <div className="demo-section__checkboxes">
                  <div className="demo-section__checkboxes__item">
                    <Checkbox id="combo-1" size="sm" color="primary" radius="none" defaultChecked />
                    <Label htmlFor="combo-1">Small + Primary + No Radius</Label>
                  </div>

                  <div className="demo-section__checkboxes__item">
                    <Checkbox
                      id="combo-2"
                      size="md"
                      color="success"
                      radius="medium"
                      defaultChecked
                    />
                    <Label htmlFor="combo-2">Medium + Success + Medium Radius</Label>
                  </div>

                  <div className="demo-section__checkboxes__item">
                    <Checkbox id="combo-3" size="lg" color="error" radius="full" defaultChecked />
                    <Label htmlFor="combo-3">Large + Error + Full Radius (Circle)</Label>
                  </div>

                  <div className="demo-section__checkboxes__item">
                    <Checkbox
                      id="combo-4"
                      size="lg"
                      color="warning"
                      radius="large"
                      defaultChecked
                    />
                    <Label htmlFor="combo-4">Large + Warning + Large Radius</Label>
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
                    <Switch id="default" color="default" defaultChecked />
                    <Label htmlFor="default">Default (Surface #0E0E0E)</Label>
                  </div>

                  <div className="demo-section__switches__item">
                    <Switch id="primary" color="primary" defaultChecked />
                    <Label htmlFor="primary">Primary (Orange #F7931A)</Label>
                  </div>

                  <div className="demo-section__switches__item">
                    <Switch id="success" color="success" defaultChecked />
                    <Label htmlFor="success">Success (Green #72F59E)</Label>
                  </div>

                  <div className="demo-section__switches__item">
                    <Switch id="warning" color="warning" defaultChecked />
                    <Label htmlFor="warning">Warning (Yellow #FFC107)</Label>
                  </div>

                  <div className="demo-section__switches__item">
                    <Switch id="error" color="error" defaultChecked />
                    <Label htmlFor="error">Error (Red #EF4444)</Label>
                  </div>
                </div>
              </section>

              {/* Size Variants */}
              <section>
                <h3>Size Variants</h3>
                <div className="demo-section__switches">
                  <div className="demo-section__switches__item">
                    <Switch id="small" size="sm" color="primary" defaultChecked />
                    <Label htmlFor="small">Small (32×18px)</Label>
                  </div>

                  <div className="demo-section__switches__item">
                    <Switch id="medium" size="md" color="primary" defaultChecked />
                    <Label htmlFor="medium">Medium (42×24px) - Default</Label>
                  </div>

                  <div className="demo-section__switches__item">
                    <Switch id="large" size="lg" color="primary" defaultChecked />
                    <Label htmlFor="large">Large (52×30px)</Label>
                  </div>
                </div>
              </section>

              {/* Radius Variants */}
              <section>
                <h3>Radius Variants</h3>
                <div className="demo-section__switches">
                  <div className="demo-section__switches__item">
                    <Switch id="radius-none" radius="none" color="success" defaultChecked />
                    <Label htmlFor="radius-none">None (Square corners) - Default</Label>
                  </div>

                  <div className="demo-section__switches__item">
                    <Switch id="radius-small" radius="small" color="success" defaultChecked />
                    <Label htmlFor="radius-small">Small (4px border-radius)</Label>
                  </div>

                  <div className="demo-section__switches__item">
                    <Switch id="radius-medium" radius="medium" color="success" defaultChecked />
                    <Label htmlFor="radius-medium">Medium (8px border-radius)</Label>
                  </div>

                  <div className="demo-section__switches__item">
                    <Switch id="radius-large" radius="large" color="success" defaultChecked />
                    <Label htmlFor="radius-large">Large (12px border-radius)</Label>
                  </div>

                  <div className="demo-section__switches__item">
                    <Switch id="radius-full" radius="full" color="success" defaultChecked />
                    <Label htmlFor="radius-full">Full (Pill-shaped)</Label>
                  </div>
                </div>
              </section>

              {/* States */}
              <section>
                <h3>States</h3>
                <div className="demo-section__switches">
                  <div className="demo-section__switches__item">
                    <Switch id="unchecked" color="primary" />
                    <Label htmlFor="unchecked">Unchecked</Label>
                  </div>

                  <div className="demo-section__switches__item">
                    <Switch id="checked" color="primary" defaultChecked />
                    <Label htmlFor="checked">Checked</Label>
                  </div>

                  <div className="demo-section__switches__item">
                    <Switch id="disabled-unchecked" color="primary" disabled />
                    <Label htmlFor="disabled-unchecked">Disabled (Unchecked)</Label>
                  </div>

                  <div className="demo-section__switches__item">
                    <Switch id="disabled-checked" color="primary" disabled defaultChecked />
                    <Label htmlFor="disabled-checked">Disabled (Checked)</Label>
                  </div>
                </div>
              </section>

              {/* Combinations */}
              <section>
                <h3>Combination Examples</h3>
                <div className="demo-section__switches">
                  <div className="demo-section__switches__item">
                    <Switch id="combo-1" size="sm" color="primary" radius="small" defaultChecked />
                    <Label htmlFor="combo-1">Small + Primary + Small Radius</Label>
                  </div>

                  <div className="demo-section__switches__item">
                    <Switch id="combo-2" size="md" color="success" radius="medium" defaultChecked />
                    <Label htmlFor="combo-2">Medium + Success + Medium Radius</Label>
                  </div>

                  <div className="demo-section__switches__item">
                    <Switch id="combo-3" size="lg" color="error" radius="none" defaultChecked />
                    <Label htmlFor="combo-3">Large + Error + No Radius</Label>
                  </div>

                  <div className="demo-section__switches__item">
                    <Switch id="combo-4" size="lg" color="warning" radius="full" defaultChecked />
                    <Label htmlFor="combo-4">Large + Warning + Full Radius</Label>
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
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
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
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
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
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
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
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
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
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
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
                { label: 'Home', to: '/' },
                { label: 'Products', to: '/products' },
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
                          { label: 'Home', to: '/' },
                          { label: 'Products', to: '/products' },
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
                        items={[{ label: 'Dashboard', to: '/dashboard' }, { label: 'Settings' }]}
                      />
                    </section>

                    {/* Custom Separator */}
                    <section className="demo-section__breadcrumbs">
                      <h3>Custom Separator</h3>
                      <Breadcrumbs
                        separator="›"
                        items={[
                          { label: 'Home', to: '/' },
                          { label: 'Blog', to: '/blog' },
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
      </div>
    </div>
  )
}

export default App
