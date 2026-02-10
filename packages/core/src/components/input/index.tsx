import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import * as React from 'react'

import { Label } from '../label'
import { cn } from '../../utils'

export type InputProps = Omit<React.ComponentProps<'input'>, 'prefix' | 'suffix'> & {
  /**
   * Optional label displayed above the input
   */
  label?: string
  /**
   * HTML id for the input. Required when using label for accessibility.
   */
  id?: string
  /**
   * Variant of the input
   * - `default`: Standard text input
   * - `search`: Input with magnifying glass icon on the right
   * @default 'default'
   */
  variant?: 'default' | 'search'
  /**
   * Custom className for the root wrapper
   */
  wrapperClassName?: string
}

/**
 * Input component with label support and search variant
 *
 * @example
 * ```tsx
 * <Input label="MAC Address" placeholder="Enter MAC address" id="mac" />
 * <Input variant="search" placeholder="Search" />
 * ```
 */
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, wrapperClassName, label, id, variant = 'default', disabled, ...props }, ref) => {
    const inputId = id ?? React.useId()
    const showSearchIcon = variant === 'search'

    const input = (
      <div
        className={cn(
          'mining-sdk-input__wrapper',
          showSearchIcon && 'mining-sdk-input__wrapper--search',
          disabled && 'mining-sdk-input__wrapper--disabled',
          !label && wrapperClassName,
        )}
      >
        <input
          ref={ref}
          id={inputId}
          disabled={disabled}
          className={cn('mining-sdk-input', className)}
          aria-invalid={props['aria-invalid']}
          aria-describedby={props['aria-describedby']}
          {...props}
        />
        {showSearchIcon && (
          <span className="mining-sdk-input__icon" aria-hidden>
            <MagnifyingGlassIcon />
          </span>
        )}
      </div>
    )

    if (label) {
      return (
        <div className={cn('mining-sdk-input-root', wrapperClassName)}>
          <Label htmlFor={inputId} className="mining-sdk-input__label">
            {label}
          </Label>
          {input}
        </div>
      )
    }

    return input
  },
)

Input.displayName = 'Input'

export { Input }
