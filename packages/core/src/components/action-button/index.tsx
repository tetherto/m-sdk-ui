import * as React from 'react'
import { QuestionMarkCircledIcon } from '@radix-ui/react-icons'

import { cn } from '../../utils'
import { Button } from '../button'
import { Popover, PopoverContent, PopoverTrigger } from '../popover'

type ActionButtonConfirmation = {
  title: string
  cancelLabel?: string
  confirmLabel?: string
  icon?: React.ReactNode
  onCancel?: VoidFunction
  onConfirm?: VoidFunction
  description?: React.ReactNode
}

type ActionButtonProps = {
  label?: string
  loading?: boolean
  disabled?: boolean
  className?: string
  confirmation: ActionButtonConfirmation
  variant?: 'primary' | 'danger' | 'secondary'
}

/**
 * ActionButton component with confirmation popover
 *
 * @example
 * ```tsx
 * <ActionButton
 *   label="Reboot MiningOS"
 *   variant="secondary"
 *   confirmation={{
 *     title: "Reboot MiningOS",
 *     description: "The Reboot feature restarts all the device communication workers.",
 *     onConfirm: () => console.log('Confirmed'),
 *     onCancel: () => console.log('Cancelled'),
 *   }}
 * />
 * ```
 */
const ActionButton = React.forwardRef<HTMLButtonElement, ActionButtonProps>(
  ({ label, loading, disabled, className, confirmation, variant = 'secondary' }, ref) => {
    const [open, setOpen] = React.useState(false)

    const handleConfirm = (): void => {
      confirmation.onConfirm?.()
      setOpen(false)
    }

    const handleCancel = (): void => {
      confirmation.onCancel?.()
      setOpen(false)
    }

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild disabled={disabled}>
          <Button
            size="sm"
            ref={ref}
            loading={loading}
            variant={variant}
            disabled={disabled}
            className={cn('mining_sdk_action_button__trigger', className)}
          >
            {label}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="mining_sdk_action_button__popover" align="start">
          <div className="mining_sdk_action_button__header">
            <span
              className={cn(
                'mining_sdk_action_button__icon',
                `mining_sdk_action_button__icon--${variant}`,
              )}
            >
              {confirmation.icon ?? <QuestionMarkCircledIcon />}
            </span>
            {confirmation.title && (
              <span className="mining_sdk_action_button__title">{confirmation.title}</span>
            )}
          </div>
          {confirmation.description && (
            <div className="mining_sdk_action_button__description">{confirmation.description}</div>
          )}
          <div className="mining_sdk_action_button__actions">
            <Button variant="secondary" size="sm" onClick={handleCancel}>
              {confirmation.cancelLabel ?? 'Cancel'}
            </Button>
            <Button variant="primary" size="sm" onClick={handleConfirm}>
              {confirmation.confirmLabel ?? 'OK'}
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    )
  },
)

ActionButton.displayName = 'ActionButton'

export { ActionButton }
export type { ActionButtonConfirmation, ActionButtonProps }
