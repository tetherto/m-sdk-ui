import * as React from 'react'

import { cn } from '../../utils'

export type IndicatorProps = {
  /**
   * Color variant of the indicator
   * @default 'gray'
   */
  color?: 'red' | 'gray' | 'blue' | 'yellow' | 'green' | 'purple' | 'amber' | 'slate'
  /**
   * Size variant of the indicator
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg'
  /**
   * Custom className for the root element
   */
  className?: string
  /**
   * Children content
   */
  children?: React.ReactNode
  /**
   * Click handler
   */
  onClick?: () => void
} & React.ComponentPropsWithoutRef<'span'>

/**
 * Indicator component - display status with colored dot and label
 *
 * @example
 * ```tsx
 * <Indicator color="green" size="lg">Running</Indicator>
 * <Indicator color="red" size="sm">Error</Indicator>
 * ```
 */
const Indicator = React.forwardRef<HTMLDivElement, IndicatorProps>(
  ({ className, color = 'gray', size = 'md', children, onClick, ...props }, ref) => {
    const isLarge = size === 'lg'
    return (
      <div
        ref={ref}
        className={cn(
          'mining-sdk-indicator',
          `mining-sdk-indicator--${color}`,
          `mining-sdk-indicator--${size}`,
          onClick && 'mining-sdk-indicator--clickable',
          className,
        )}
        onClick={onClick}
        {...props}
      >
        {children && (
          <span
            className={cn(
              'mining-sdk-indicator__label',
              isLarge && 'mining-sdk-indicator__label--large',
              className,
            )}
          >
            {children}
          </span>
        )}
      </div>
    )
  },
)

Indicator.displayName = 'Indicator'

export { Indicator }
