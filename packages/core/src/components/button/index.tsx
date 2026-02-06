import * as React from 'react'

import { cn } from '../../utils'

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'outline' | 'ghost' | 'link'
export type ButtonSize = 'sm' | 'md' | 'lg' | 'icon'
export type ButtonIconPosition = 'left' | 'right'
export type ButtonAntdSize = 'small' | 'middle' | 'large'
export type ButtonProps = {
  variant?: ButtonVariant
  size?: ButtonSize | ButtonAntdSize
  loading?: boolean
  icon?: React.ReactNode
  iconPosition?: ButtonIconPosition
  fullWidth?: boolean
  block?: boolean
} & React.ButtonHTMLAttributes<HTMLButtonElement>

const sizeMap: Record<ButtonSize | ButtonAntdSize, ButtonSize> = {
  sm: 'sm',
  small: 'sm',
  md: 'md',
  middle: 'md',
  lg: 'lg',
  large: 'lg',
  icon: 'icon',
}

function sizeToSize(size?: ButtonSize | ButtonAntdSize): ButtonSize {
  return size ? sizeMap[size] : 'md'
}

/**
 * Button component with multiple variants and sizes
 *
 * @example
 * ```tsx
 * <Button variant="primary" size="lg">Click me</Button>
 * <Button variant="outline">Outlined</Button>
 * <Button variant="ghost" size="sm">Small Ghost</Button>
 * ```
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size = 'md',
      loading,
      icon,
      iconPosition = 'left',
      fullWidth,
      block,
      disabled,
      type: nativeType,
      children,
      ...props
    },
    ref,
  ) => {
    const resolvedVariant = variant ?? 'secondary'
    const resolvedSize = sizeToSize(size)
    const resolvedHtmlType = nativeType ?? 'button'
    const isIconOnly = Boolean(icon) && !children

    const classes = cn(
      'mdk-button',
      `mdk-button--variant-${resolvedVariant}`,
      `mdk-button--size-${resolvedSize}`,
      {
        'mdk-button--full-width': fullWidth || block,
        'mdk-button--loading': loading,
        'mdk-button--icon-only': isIconOnly,
      },
      className,
    )

    return (
      <button
        className={classes}
        ref={ref}
        type={resolvedHtmlType}
        aria-busy={loading || undefined}
        disabled={disabled || loading}
        {...props}
      >
        {loading && <span className="mdk-button__spinner" aria-hidden="true" />}
        {icon && iconPosition === 'left' && (
          <span className="mdk-button__icon" aria-hidden="true">
            {icon}
          </span>
        )}
        {children && <span className="mdk-button__label">{children}</span>}
        {icon && iconPosition === 'right' && (
          <span className="mdk-button__icon" aria-hidden="true">
            {icon}
          </span>
        )}
      </button>
    )
  },
)
Button.displayName = 'Button'

export { Button }
