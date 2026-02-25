import { CheckIcon, ChevronDownIcon, MagnifyingGlassIcon } from '@radix-ui/react-icons'
import * as SelectPrimitive from '@radix-ui/react-select'
import * as React from 'react'

import { cn } from '../../utils'

export type SelectSize = 'lg' | 'md' | 'sm'

export type SelectTriggerProps = React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> & {
  size?: SelectSize
  /** CSS color string -- border (50% alpha), background (10% alpha), and text are derived from it */
  color?: string
  /** Render a magnifying glass icon instead of the chevron */
  searchable?: boolean
}

const Select = SelectPrimitive.Root

const SelectGroup = SelectPrimitive.Group

const SelectValue = SelectPrimitive.Value

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  if (!result?.[1] || !result[2] || !result[3]) return null
  return {
    r: Number.parseInt(result[1], 16),
    g: Number.parseInt(result[2], 16),
    b: Number.parseInt(result[3], 16),
  }
}

/**
 * SelectTrigger - The button that toggles the select dropdown
 */
const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  SelectTriggerProps
>(({ className, children, size = 'md', color, searchable, style, ...props }, ref) => {
  const colorStyle = React.useMemo(() => {
    if (!color) return undefined
    const rgb = hexToRgb(color)
    if (!rgb) return undefined
    const { r, g, b } = rgb
    return {
      '--select-color': color,
      '--select-color-border': `rgba(${r}, ${g}, ${b}, 0.5)`,
      '--select-color-bg': `rgba(${r}, ${g}, ${b}, 0.1)`,
    } as React.CSSProperties
  }, [color])

  const Icon = searchable ? MagnifyingGlassIcon : ChevronDownIcon

  return (
    <SelectPrimitive.Trigger
      ref={ref}
      className={cn(
        'mining-sdk-select__trigger',
        `mining-sdk-select__trigger--${size}`,
        searchable && 'mining-sdk-select__trigger--search',
        color && 'mining-sdk-select__trigger--color',
        className,
      )}
      style={{ ...colorStyle, ...style }}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <Icon className="mining-sdk-select__icon" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
})
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName

/**
 * SelectContent - The dropdown content
 */
const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = 'popper', sideOffset = 4, ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn('mining-sdk-select__content', className)}
      position={position}
      sideOffset={sideOffset}
      {...props}
    >
      <SelectPrimitive.Viewport
        className={cn(
          position === 'popper' &&
            'mining-sdk-select__viewport mining-sdk-select__viewport--popper',
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
))
SelectContent.displayName = SelectPrimitive.Content.displayName

/**
 * SelectLabel - Label for a group of items
 */
const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn('mining-sdk-select__label', className)}
    {...props}
  />
))
SelectLabel.displayName = SelectPrimitive.Label.displayName

/**
 * SelectItem - A single selectable option
 */
const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item ref={ref} className={cn('mining-sdk-select__item', className)} {...props}>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    <SelectPrimitive.ItemIndicator className="mining-sdk-select__item-indicator">
      <CheckIcon />
    </SelectPrimitive.ItemIndicator>
  </SelectPrimitive.Item>
))
SelectItem.displayName = SelectPrimitive.Item.displayName

/**
 * SelectSeparator - Visual separator between items
 */
const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn('mining-sdk-select__separator', className)}
    {...props}
  />
))
SelectSeparator.displayName = SelectPrimitive.Separator.displayName

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
}
