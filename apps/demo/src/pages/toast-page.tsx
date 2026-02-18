import { useState } from 'react'
import type { ToastPosition, ToastVariant } from '@mining-sdk/core'
import { Button, Toast, TOAST_POSITIONS, Toaster } from '@mining-sdk/core'

type ToastItem = {
  id: string
  variant: ToastVariant
  title: string
  description: string | undefined
}

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

export const ToastPage = (): JSX.Element => {
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
    <section className="demo-section">
      <h2 className="demo-section__title">Toast</h2>
      <p className="demo-section__description">
        Toast notifications appear in the corner of the screen. Select a position, then click a
        button to trigger a toast. Toasts auto-dismiss after {TOAST_DURATION / 1000} seconds or can
        be closed manually.
      </p>

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

      <div className="demo-section__toast-controls">
        <h3>Step 2: Trigger a Toast</h3>
        <p className="demo-section__hint">Click any button below to show a toast notification</p>
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
  )
}
