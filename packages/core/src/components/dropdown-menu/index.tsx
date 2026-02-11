import * as React from 'react'
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
import { CheckIcon, ChevronRightIcon } from '@radix-ui/react-icons'

import { cn } from '../../utils'

const DropdownMenu = DropdownMenuPrimitive.Root
const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger
const DropdownMenuGroup = DropdownMenuPrimitive.Group
const DropdownMenuPortal = DropdownMenuPrimitive.Portal

type DropdownMenuContentProps = React.ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.Content
> & {
  /**
   * When true, content width matches the trigger width.
   * Uses Radix's --radix-dropdown-menu-trigger-width CSS variable.
   * @default false
   */
  alignWidth?: boolean
}

/**
 * DropdownMenuContent - The dropdown panel
 */
const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  DropdownMenuContentProps
>(({ className, sideOffset = 4, alignWidth = false, align, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      align={align ?? (alignWidth ? 'start' : undefined)}
      className={cn(
        'mining-sdk-dropdown-menu__content',
        alignWidth && 'mining-sdk-dropdown-menu__content--align-width',
        className,
      )}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
))
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName

/**
 * DropdownMenuItem - A single menu item
 */
const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={cn('mining-sdk-dropdown-menu__item', className)}
    {...props}
  />
))
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName

/**
 * DropdownMenuCheckboxItem - A menu item with checkbox state
 */
const DropdownMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <DropdownMenuPrimitive.CheckboxItem
    ref={ref}
    className={cn('mining-sdk-dropdown-menu__checkbox-item', className)}
    checked={checked}
    {...props}
  >
    {children}
    <DropdownMenuPrimitive.ItemIndicator className="mining-sdk-dropdown-menu__item-indicator">
      <CheckIcon />
    </DropdownMenuPrimitive.ItemIndicator>
  </DropdownMenuPrimitive.CheckboxItem>
))
DropdownMenuCheckboxItem.displayName = DropdownMenuPrimitive.CheckboxItem.displayName

/**
 * DropdownMenuRadioGroup - Container for radio items
 */
const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup

/**
 * DropdownMenuRadioItem - A menu item with radio state
 */
const DropdownMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <DropdownMenuPrimitive.RadioItem
    ref={ref}
    className={cn('mining-sdk-dropdown-menu__radio-item', className)}
    {...props}
  >
    {children}
    <DropdownMenuPrimitive.ItemIndicator className="mining-sdk-dropdown-menu__item-indicator">
      <CheckIcon />
    </DropdownMenuPrimitive.ItemIndicator>
  </DropdownMenuPrimitive.RadioItem>
))
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName

/**
 * DropdownMenuLabel - Non-interactive label for a group
 */
const DropdownMenuLabel = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    className={cn('mining-sdk-dropdown-menu__label', className)}
    {...props}
  />
))
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName

/**
 * DropdownMenuSeparator - Visual separator between items
 */
const DropdownMenuSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    className={cn('mining-sdk-dropdown-menu__separator', className)}
    {...props}
  />
))
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName

/**
 * DropdownMenuShortcut - Keyboard shortcut display (e.g. ⌘C)
 */
const DropdownMenuShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>): React.ReactElement => (
  <span className={cn('mining-sdk-dropdown-menu__item-shortcut', className)} {...props} />
)
DropdownMenuShortcut.displayName = 'DropdownMenuShortcut'

/**
 * DropdownMenuSub - Submenu container
 */
const DropdownMenuSub = DropdownMenuPrimitive.Sub

/**
 * DropdownMenuSubTrigger - Opens a submenu
 */
const DropdownMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger>
>(({ className, children, ...props }, ref) => (
  <DropdownMenuPrimitive.SubTrigger
    ref={ref}
    className={cn('mining-sdk-dropdown-menu__sub-trigger', className)}
    {...props}
  >
    {children}
    <ChevronRightIcon className="mining-sdk-dropdown-menu__item-icon" />
  </DropdownMenuPrimitive.SubTrigger>
))
DropdownMenuSubTrigger.displayName = DropdownMenuPrimitive.SubTrigger.displayName

/**
 * DropdownMenuSubContent - Submenu panel
 */
const DropdownMenuSubContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.SubContent
    ref={ref}
    className={cn('mining-sdk-dropdown-menu__sub-content', className)}
    {...props}
  />
))
DropdownMenuSubContent.displayName = DropdownMenuPrimitive.SubContent.displayName

// Aliases for DropdownMenu.Root, DropdownMenu.Trigger, etc. (namespace usage)
const Root = DropdownMenu
const Trigger = DropdownMenuTrigger
const Content = DropdownMenuContent
const Item = DropdownMenuItem
const CheckboxItem = DropdownMenuCheckboxItem
const RadioGroup = DropdownMenuRadioGroup
const RadioItem = DropdownMenuRadioItem
const Label = DropdownMenuLabel
const Separator = DropdownMenuSeparator
const Shortcut = DropdownMenuShortcut
const Group = DropdownMenuGroup
const Portal = DropdownMenuPortal
const Sub = DropdownMenuSub
const SubContent = DropdownMenuSubContent
const SubTrigger = DropdownMenuSubTrigger

export {
  CheckboxItem,
  Content,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
  Group,
  Item,
  Label,
  Portal,
  RadioGroup,
  RadioItem,
  // Namespace aliases
  Root,
  Separator,
  Shortcut,
  Sub,
  SubContent,
  SubTrigger,
  Trigger,
}
