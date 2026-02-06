import * as TabsPrimitives from '@radix-ui/react-tabs'
import * as React from 'react'

import { cn } from '../../utils'

type TabsProps = React.ComponentPropsWithoutRef<typeof TabsPrimitives.Root>
type TabsListProps = React.ComponentPropsWithoutRef<typeof TabsPrimitives.List>
type TabsTriggerProps = React.ComponentPropsWithoutRef<typeof TabsPrimitives.Trigger>
type TabsContentProps = React.ComponentPropsWithoutRef<typeof TabsPrimitives.Content>
/**
 * Tabs component for organizing content into panels
 *
 * @example
 * ```tsx
 * <Tabs defaultValue="tab1">
 *   <TabsList>
 *     <TabsTrigger value="tab1">Tab 1</TabsTrigger>
 *     <TabsTrigger value="tab2" disabled>Tab 2</TabsTrigger>
 *   </TabsList>
 *   <TabsContent value="tab1">Tab 1 content</TabsContent>
 * </Tabs>
 * ```
 */
const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(({ className, ...props }, ref) => (
  <TabsPrimitives.Root ref={ref} className={cn('mining_sdk_tabs', className)} {...props} />
))

Tabs.displayName = 'Tabs'

const TabsList = React.forwardRef<HTMLDivElement, TabsListProps>(({ className, ...props }, ref) => (
  <TabsPrimitives.List ref={ref} className={cn('mining_sdk_tabs__list', className)} {...props} />
))

TabsList.displayName = 'TabsList'

const TabsTrigger = React.forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ className, ...props }, ref) => (
    <TabsPrimitives.Trigger
      ref={ref}
      className={cn('mining_sdk_tabs__trigger', className)}
      {...props}
    />
  ),
)

TabsTrigger.displayName = 'TabsTrigger'

const TabsContent = React.forwardRef<HTMLDivElement, TabsContentProps>(
  ({ className, ...props }, ref) => (
    <TabsPrimitives.Content
      ref={ref}
      className={cn('mining_sdk_tabs__content', className)}
      {...props}
    />
  ),
)

TabsContent.displayName = 'TabsContent'

export { Tabs, TabsContent, TabsList, TabsTrigger }
