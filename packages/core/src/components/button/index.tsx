import * as React from 'react'

import { cn } from '../../utils'

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'outline' | 'ghost' | 'link'
export type ButtonSize = 'sm' | 'md' | 'lg' | 'icon'
export type ButtonType = 'primary' | 'default' | 'dashed' | 'text' | 'link'
export type ButtonIconPosition = 'left' | 'right'
export type ButtonAntdSize = 'small' | 'middle' | 'large'
export type ButtonColor = 'primary' | 'secondary' | 'danger' | 'ghost' | 'link' | 'outline'

export type ButtonProps = {
  variant?: ButtonVariant
  size?: ButtonSize | ButtonAntdSize
  type?: ButtonType
  htmlType?: React.ButtonHTMLAttributes<HTMLButtonElement>['type']
  danger?: boolean
  loading?: boolean
  icon?: React.ReactNode
  iconPosition?: ButtonIconPosition
  fullWidth?: boolean
  block?: boolean
  color?: ButtonColor
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'>

function typeToVariant(type?: ButtonType): ButtonVariant | undefined {
  switch (type) {
    case 'primary':
      return 'primary'
    case 'link':
      return 'link'
    case 'text':
      return 'ghost'
    case 'dashed':
      return 'outline'
    case 'default':
    default:
      return 'secondary'
  }
}

function sizeToSize(size?: string): ButtonSize {
  switch (size) {
    case 'sm':
    case 'small':
      return 'sm'
    case 'lg':
    case 'large':
      return 'lg'
    case 'icon':
      return 'icon'
    case 'md':
    case 'middle':
    default:
      return 'md'
  }
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
      type,
      htmlType,
      danger,
      loading,
      icon,
      iconPosition = 'left',
      fullWidth,
      block,
      color,
      disabled,
      children,
      ...props
    },
    ref,
  ) => {
    const resolvedVariant =
      variant ?? (danger ? 'danger' : (color ?? typeToVariant(type) ?? 'secondary'))
    const resolvedSize = sizeToSize(size)
    const resolvedHtmlType = htmlType ?? 'button'
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
