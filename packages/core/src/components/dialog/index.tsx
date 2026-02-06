import * as DialogPrimitive from '@radix-ui/react-dialog'
import * as React from 'react'
import { Cross2Icon } from '@radix-ui/react-icons'

import { cn } from '../../utils'
import { Button } from '../button'

const Dialog = DialogPrimitive.Root
const DialogTrigger = DialogPrimitive.Trigger
const DialogPortal = DialogPrimitive.Portal
const DialogClose = DialogPrimitive.Close

export type DialogHeaderProps = {
  closable?: boolean
  onClose?: () => void
}

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay ref={ref} className={cn('mdk-dialog__overlay', className)} {...props} />
))
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName

/**
 * Dialog content component
 */
const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content ref={ref} className={cn('mdk-dialog__content', className)} {...props}>
      {children}
    </DialogPrimitive.Content>
  </DialogPortal>
))
DialogContent.displayName = DialogPrimitive.Content.displayName

/**
 * Dialog header component
 */
function DialogHeader({
  className,
  children,
  closable,
  onClose,
  ...props
}: DialogHeaderProps & React.HTMLAttributes<HTMLDivElement>): React.JSX.Element {
  return (
    <div className={cn('mdk-dialog__header', className)} {...props}>
      <div className={cn('mdk-dialog__header__container')}>{children}</div>
      {closable && (
        <DialogClose asChild>
          <Button
            size="sm"
            className={cn('mdk-dialog__header__close')}
            variant="outline"
            onClick={onClose}
          >
            <Cross2Icon />
          </Button>
        </DialogClose>
      )}
    </div>
  )
}
DialogHeader.displayName = 'DialogHeader'

/**
 * Dialog footer component
 */
function DialogFooter({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>): React.JSX.Element {
  return <div className={cn('mdk-dialog__footer', className)} {...props} />
}
DialogFooter.displayName = 'DialogFooter'

/**
 * Dialog title component
 */
const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title ref={ref} className={cn('mdk-dialog__title', className)} {...props} />
))
DialogTitle.displayName = DialogPrimitive.Title.displayName

/**
 * Dialog description component
 */
const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn('mdk-dialog__description', className)}
    {...props}
  />
))
DialogDescription.displayName = DialogPrimitive.Description.displayName

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
}
