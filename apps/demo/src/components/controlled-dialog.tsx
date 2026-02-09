import { Button, Dialog, DialogContent, DialogFooter, DialogTrigger } from '@mining-sdk/core'
import { useState } from 'react'

export const ControlledDialog = (): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Open Controlled Dialog</Button>
      </DialogTrigger>
      <DialogContent
        closable
        closeOnClickOutside={false}
        closeOnEscape={false}
        title="This is a controlled dialog"
      >
        <div className="demo-section__dialog-content">
          <p>This dialog doesn't have a close button and a description.</p>
          <p>Clicking outside will not close the dialog nor does the escape key.</p>
          <p>Use the buttons below to close the dialog.</p>
        </div>
        <DialogFooter>
          <Button variant="secondary" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => setIsOpen(false)}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
