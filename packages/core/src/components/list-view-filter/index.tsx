import * as React from 'react'

import { cn } from '../../utils'
import { Badge } from '../badge'
import { Button } from '../button'
import { Popover, PopoverContent, PopoverTrigger } from '../popover'

import type { CascaderOption, CascaderValue } from '../cascader'
import { Cascader } from '../cascader'
import { Typography } from '../typography'

export type LocalFilters = Record<string, string | number | boolean | (string | number | boolean)[]>

type ListViewFilterProps = {
  /**
   * Cascader options for filtering
   */
  options: CascaderOption[]

  /**
   * Optional key to force re-mounting the Cascader when filters change
   * Useful if you want to reset the internal state of the Cascader when filters change
   */
  filterKey?: string
  /**
   * Current filter values as key-value pairs
   * Example: { type: 'Antminer S19XP H', status: ['active', 'pending'] }
   */
  localFilters?: LocalFilters

  /**
   * Callback when filters change
   * @param selections - Array of selected filter paths
   */
  onChange: (selections: CascaderValue[]) => void

  /**
   * Custom className for the filter button
   */
  className?: string
}

/**
 * ListViewFilter - Filter button with cascader dropdown
 *
 * Features:
 * - Filter icon button with count badge
 * - Cascader dropdown for hierarchical filtering
 * - Multiple selection support
 * - Tag display for selected filters
 * - Auto-sync with URL params
 *
 * @example
 * ```tsx
 * const filterOptions = [
 *   {
 *     value: 'type',
 *     label: 'Type',
 *     children: [
 *       { value: 'Antminer S19XP', label: 'Antminer S19XP' },
 *       { value: 'Avalon A1346', label: 'Avalon A1346' }
 *     ]
 *   }
 * ]
 *
 * <ListViewFilter
 *   options={filterOptions}
 *   localFilters={filters}
 *   onChange={handleFilterChange}
 * />
 * ```
 */
const ListViewFilter = React.forwardRef<HTMLDivElement, ListViewFilterProps>(
  ({ options, onChange, localFilters, className, filterKey = 'default' }, ref) => {
    const [open, setOpen] = React.useState(false)
    /**
     * Convert localFilters object to Cascader value format
     * Transforms: { type: 'value', status: ['val1', 'val2'] }
     * To: [['type', 'value'], ['status', 'val1'], ['status', 'val2']]
     */
    const cascaderValues = React.useMemo(() => {
      if (!localFilters || typeof localFilters !== 'object') return []

      const values: CascaderValue[] = []

      Object.entries(localFilters).forEach(([key, vals]) => {
        const optionGroup = options.find((opt) => opt.value === key)
        if (!optionGroup) return

        // Handle array of values
        if (Array.isArray(vals)) {
          vals.forEach((val) => {
            const value = typeof val === 'boolean' ? val : String(val)
            // Find the child option to get the correct path
            const childOption = optionGroup.children?.find((child) => child.value === value)
            if (childOption) {
              values.push([key, childOption.value])
            }
          })
        } else {
          // Handle single value
          const value = typeof vals === 'boolean' ? vals : String(vals)
          const childOption = optionGroup.children?.find((child) => child.value === value)
          if (childOption) {
            values.push([key, childOption.value])
          }
        }
      })

      return values
    }, [localFilters, options])

    /**
     * Handle filter changes from Cascader
     * Converts Cascader format back to onChange format
     */
    const handleFiltersChange = React.useCallback(
      (selections: CascaderValue[] | CascaderValue | null) => {
        if (!selections) {
          onChange([])
          return
        }

        const selectionArray = Array.isArray(selections[0])
          ? (selections as CascaderValue[])
          : [selections as CascaderValue]

        onChange(selectionArray as CascaderValue[])
      },
      [onChange],
    )

    /**
     * Handle popover open/close
     */
    const handleOpenChange = React.useCallback((newOpen: boolean) => {
      setOpen(newOpen)
    }, [])

    // Count of active filters
    const filtersCount = cascaderValues.length

    return (
      <div ref={ref} className={cn('mining-sdk-list-view-filter', className)}>
        <Popover open={open} onOpenChange={handleOpenChange}>
          <PopoverTrigger asChild>
            <div className="mining-sdk-list-view-filter__trigger">
              <Badge color="primary" count={filtersCount}>
                <Button variant="secondary" size="sm">
                  <svg
                    className="mining-sdk-list-view-filter__icon"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
                  </svg>
                  Filter
                </Button>
              </Badge>
            </div>
          </PopoverTrigger>

          <PopoverContent
            align="start"
            side="bottom"
            className="mining-sdk-list-view-filter__dropdown"
            sideOffset={8}
          >
            <div className="mining-sdk-list-view-filter__header">
              <Typography size="sm" variant="caption">
                Filters
              </Typography>
              <div className="mining-sdk-list-view-filter__content">
                <Cascader
                  key={filterKey}
                  options={options}
                  value={cascaderValues}
                  onChange={handleFiltersChange}
                  multiple
                  placeholder=""
                />
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    )
  },
)

ListViewFilter.displayName = 'ListViewFilter'

export { ListViewFilter }
