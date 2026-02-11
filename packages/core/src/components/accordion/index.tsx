import * as AccordionPrimitive from '@radix-ui/react-accordion'
import * as React from 'react'

import { MinusIcon, PlusIcon } from '@radix-ui/react-icons'
import { cn } from '../../utils'

const AccordionRoot = AccordionPrimitive.Root

type AccordionProps = {
  title: string
  isRow?: boolean
  isOpened?: boolean
  unpadded?: boolean
  noBorder?: boolean
  solidBackground?: boolean
  onValueChange?: (value: string | string[]) => void
} & Omit<
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Root>,
  'collapsible' | 'type' | 'defaultValue' | 'value' | 'onValueChange'
>

/**
 * Accordion Item component
 *
 * @example
 * ```tsx
 * <AccordionItem value="item-1">
 *   <AccordionTrigger>Title</AccordionTrigger>
 *   <AccordionContent>Content</AccordionContent>
 * </AccordionItem>
 * ```
 */
const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn('mining-sdk-accordion__item', className)}
    {...props}
  />
))
AccordionItem.displayName = 'AccordionItem'

/**
 * Accordion Trigger component (header/button)
 *
 * @example
 * ```tsx
 * <AccordionTrigger>Click to expand</AccordionTrigger>
 * ```
 */
const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="mining-sdk-accordion__header">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn('mining-sdk-accordion__trigger', className)}
      {...props}
    >
      {children}
      <div className="mining-sdk-accordion__toggler">
        <MinusIcon className="mining-sdk-accordion__icon--minus" />
        <PlusIcon className="mining-sdk-accordion__icon--plus" />
      </div>
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
))
AccordionTrigger.displayName = 'AccordionTrigger'

/**
 * Accordion Content component (collapsible content area)
 *
 * @example
 * ```tsx
 * <AccordionContent>
 *   <p>Your content here</p>
 * </AccordionContent>
 * ```
 */
const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content ref={ref} className="mining-sdk-accordion__content" {...props}>
    <div className={cn('mining-sdk-accordion__content-inner', className)}>{children}</div>
  </AccordionPrimitive.Content>
))
AccordionContent.displayName = 'AccordionContent'

/**
 * Accordion Root component
 *
 * @example
 * ```tsx
 *
 * <Accordion title="FAQ">
 *   <AccordionItem value="item-1">
 *     <AccordionTrigger>Question 1</AccordionTrigger>
 *     <AccordionContent>Answer 1</AccordionContent>
 *   </AccordionItem>
 *   <AccordionItem value="item-2">
 *     <AccordionTrigger>Question 2</AccordionTrigger>
 *     <AccordionContent>Answer 2</AccordionContent>
 *   </AccordionItem>
 * </Accordion>
 * ```
 */
const Accordion = ({
  title = '',
  children,
  isRow = false,
  isOpened = false,
  unpadded = false,
  noBorder = false,
  solidBackground = false,
  onValueChange,
  className,
  ...props
}: React.PropsWithChildren<AccordionProps>): React.ReactElement => {
  const itemValue = 'accordion-item'

  return (
    <AccordionPrimitive.Root
      type="multiple"
      defaultValue={isOpened ? [itemValue] : []}
      onValueChange={onValueChange}
      className={cn(
        'mining-sdk-accordion',
        solidBackground && 'mining-sdk-accordion--solid-background',
        className,
      )}
      {...props}
    >
      <AccordionItem value={itemValue}>
        <AccordionTrigger className={cn(noBorder && 'mining-sdk-accordion__trigger--no-border')}>
          {title}
        </AccordionTrigger>
        <AccordionContent
          className={cn(
            unpadded && 'mining-sdk-accordion__content-inner--no-padding',
            isRow && 'mining-sdk-accordion__content-inner--row',
          )}
        >
          {children}
        </AccordionContent>
      </AccordionItem>
    </AccordionPrimitive.Root>
  )
}

Accordion.displayName = 'Accordion'

export { Accordion, AccordionContent, AccordionItem, AccordionRoot, AccordionTrigger }
