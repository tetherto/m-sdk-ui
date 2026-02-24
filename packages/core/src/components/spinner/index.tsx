import * as React from 'react'

import type { ComponentSize } from '../../types'
import { cn } from '../../utils'

export type SpinnerProps = {
  /**
   * Size variant of the spinner
   * @default 'md'
   */
  size?: ComponentSize
  /**
   * Color variant of the spinner
   * @default 'primary'
   */
  color?: 'primary' | 'secondary'
  /**
   * Whether to display in fullscreen mode
   * @default false
   */
  fullScreen?: boolean
  /**
   * Custom className for the root element
   */
  className?: string
  /**
   * Optional label text to display below the spinner
   */
  label?: string
  /**
   * Speed of the animation
   * @default 'normal'
   */
  speed?: 'slow' | 'normal' | 'fast'
  /**
   * Type of spinner animation
   * @default 'dot'
   * @remarks
   * - 'circle': Rotating circle animation
   * - 'square': Rotating squares animation
   */
  type?: 'circle' | 'square'
} & React.ComponentPropsWithoutRef<'div'>

const SpinnerCircle = React.forwardRef<HTMLDivElement, SpinnerProps>(
  (
    {
      className,
      size = 'md',
      color = 'orange',
      fullScreen = false,
      label,
      speed = 'normal',
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          'mining-sdk-spinner',
          fullScreen && 'mining-sdk-spinner--fullscreen',
          className,
        )}
        {...props}
      >
        <div className="mining-sdk-spinner__content">
          <div
            className={cn(
              'mining-sdk-spinner__circle',
              `mining-sdk-spinner__circle--${size}`,
              `mining-sdk-spinner__circle--${color}`,
              `mining-sdk-spinner__circle--${speed}`,
            )}
            role="status"
            aria-live="polite"
            aria-label={label || 'Loading'}
          />
          {label && (
            <span className={cn('mining-sdk-spinner__label', `mining-sdk-spinner__label--${size}`)}>
              {label}
            </span>
          )}
        </div>
      </div>
    )
  },
)

const SpinnerSquare = React.forwardRef<HTMLDivElement, SpinnerProps>(
  (
    {
      className,
      size = 'md',
      color = 'amber',
      speed = 'normal',
      fullScreen = false,
      label,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          'mining-sdk-spinner',
          fullScreen && 'mining-sdk-spinner--fullscreen',
          className,
        )}
        {...props}
      >
        <div className="mining-sdk-spinner__content">
          <div
            className={cn(
              'mining-sdk-spinner__dot',
              `mining-sdk-spinner__dot--${size}`,
              `mining-sdk-spinner__dot--${speed}`,
            )}
            role="status"
            aria-live="polite"
            aria-label={label || 'Loading'}
          >
            <span
              className={cn(
                'mining-sdk-spinner__dot-item',
                `mining-sdk-spinner__dot-item--${color}`,
              )}
            />
            <span
              className={cn(
                'mining-sdk-spinner__dot-item',
                `mining-sdk-spinner__dot-item--${color}`,
              )}
            />
            <span
              className={cn(
                'mining-sdk-spinner__dot-item',
                `mining-sdk-spinner__dot-item--${color}`,
              )}
            />
            <span
              className={cn(
                'mining-sdk-spinner__dot-item',
                `mining-sdk-spinner__dot-item--${color}`,
              )}
            />
          </div>
          {label && (
            <span
              className={cn(
                'mining-sdk-spinner__label',
                `mining-sdk-spinner__label--${size}`,
                `mining-sdk-spinner__label--${color}`,
              )}
            >
              {label}
            </span>
          )}
        </div>
      </div>
    )
  },
)
/**
 * Spinner component - display loading state with rotating squares
 *
 * @example
 * ```tsx
 * <Spinner />
 * <Spinner size="lg" color="primary" />
 * <Spinner fullScreen />
 * ```
 */
const Spinner = React.forwardRef<HTMLDivElement, SpinnerProps>(
  (
    {
      className,
      size = 'md',
      color = 'primary',
      fullScreen = false,
      type = 'square',
      speed = 'normal',
      label,
      ...props
    },
    ref,
  ) => {
    const isCircle = type === 'circle'

    if (isCircle) {
      return (
        <SpinnerCircle
          ref={ref}
          className={className}
          size={size}
          color={color}
          fullScreen={fullScreen}
          label={label}
          type="circle"
          {...props}
        />
      )
    }

    return (
      <SpinnerSquare
        ref={ref}
        className={className}
        size={size}
        color={color}
        fullScreen={fullScreen}
        label={label}
        speed={speed}
        type="square"
        {...props}
      />
    )
  },
)

Spinner.displayName = 'Spinner'

export { Spinner }
