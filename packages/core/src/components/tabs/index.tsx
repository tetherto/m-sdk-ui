import * as TabsPrimitives from '@radix-ui/react-tabs'
import * as React from 'react'

import { cn } from '../../utils'

/**
 * Tabs component for organizing content into panels
 *
 * @example
 * ```tsx
 * <Tabs defaultValue="tab1">
 *   <TabsList>
 *     <TabsTrigger value="tab1">Tab 1</TabsTrigger>
 *     <TabsTrigger value="tab2">Tab 2</TabsTrigger>
 *     <TabsTrigger value="tab3">Tab 3</TabsTrigger>
 *   </TabsList>
 *   <TabsContent value="tab1">Tab 1 content</TabsContent>
 *   <TabsContent value="tab2">Tab 2 content</TabsContent>
 *   <TabsContent value="tab3">Tab 3 content</TabsContent>
 * </Tabs>
 * ```
 */

type TabsProps = React.ComponentPropsWithoutRef<typeof TabsPrimitives.Root>
type TabsListProps = React.ComponentPropsWithoutRef<typeof TabsPrimitives.List>
type TabsTriggerProps = React.ComponentPropsWithoutRef<typeof TabsPrimitives.Trigger>
type TabsContentProps = React.ComponentPropsWithoutRef<typeof TabsPrimitives.Content>

const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(({ className, ...props }, ref) => (
  <TabsPrimitives.Root ref={ref} className={cn('mdk-tabs', className)} {...props} />
))
Tabs.displayName = 'Tabs'

const TabsList = React.forwardRef<HTMLDivElement, TabsListProps>(({ className, ...props }, ref) => (
  <TabsPrimitives.List ref={ref} className={cn('mdk-tabs__list', className)} {...props} />
))
TabsList.displayName = 'TabsList'

const TabsTrigger = React.forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ className, ...props }, ref) => (
    <TabsPrimitives.Trigger ref={ref} className={cn('mdk-tabs__trigger', className)} {...props} />
  ),
)
TabsTrigger.displayName = 'TabsTrigger'

const TabsContent = React.forwardRef<HTMLDivElement, TabsContentProps>(
  ({ className, ...props }, ref) => (
    <TabsPrimitives.Content ref={ref} className={cn('mdk-tabs__content', className)} {...props} />
  ),
)
TabsContent.displayName = 'TabsContent'

export { Tabs, TabsContent, TabsList, TabsTrigger }
