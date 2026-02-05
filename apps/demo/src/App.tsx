import type { CheckedState } from '@mining-sdk/core'

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
} from '@mining-sdk/core'
import { useState } from 'react'

import './App.scss'

function App(): JSX.Element {
  const [checked, setChecked] = useState<CheckedState>(false)
  const [switchEnabled, setSwitchEnabled] = useState(false)

  return (
    <div className="demo-app">
      <h1 className="demo-app__title">@mining-sdk/core Component Demo</h1>

      <div className="demo-app__content">
        {/* Buttons */}
        <section className="demo-section">
          <h2 className="demo-section__title">Buttons</h2>
          <div className="demo-section__buttons">
            <Button variant="default">Default</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
          </div>
          <div className="demo-section__button-sizes">
            <Button size="sm">Small</Button>
            <Button size="default">Default</Button>
            <Button size="lg">Large</Button>
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
                <Button>Save changes</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </section>

        {/* Alert Dialog */}
        <section className="demo-section">
          <h2 className="demo-section__title">Alert Dialog</h2>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">Delete Account</Button>
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
            <div className="demo-section__form-item">
              <Checkbox id="terms" checked={checked} onCheckedChange={setChecked} />
              <Label htmlFor="terms">Accept terms and conditions</Label>
            </div>
            <div className="demo-section__form-item">
              <Switch id="airplane" checked={switchEnabled} onCheckedChange={setSwitchEnabled} />
              <Label htmlFor="airplane">Airplane Mode</Label>
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
          <Tabs defaultValue="controller">
            <TabsList>
              <TabsTrigger value="tab1">Tab 1</TabsTrigger>
              <TabsTrigger value="tab2">Tab 2</TabsTrigger>
              <TabsTrigger disabled value="tab3">
                Tab 3
              </TabsTrigger>
            </TabsList>
            <TabsContent value="tab1">Tab 1 content</TabsContent>
            <TabsContent value="tab2">Tab 2 content</TabsContent>
            <TabsContent value="tab3">Tab 3 content</TabsContent>
          </Tabs>
        </section>
      </div>
    </div>
  )
}

export default App
