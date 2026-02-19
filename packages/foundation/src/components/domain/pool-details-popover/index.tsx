import * as React from 'react'

import { Button, cn, Dialog, DialogContent, DialogTrigger } from '@mining-sdk/core'
import { PoolDetailsCard } from '../pool-details-card'
import type { PoolDetailItem } from '../pool-details-card'

type PoolDetailsPopoverPartialProps = Partial<{
  title: string
  description: string
  disabled: boolean
  className: string
  triggerLabel: string
}>

type PoolDetailsPopoverProps = PoolDetailsPopoverPartialProps & {
  details: PoolDetailItem[]
}

const PoolDetailsPopover = React.forwardRef<HTMLDivElement, PoolDetailsPopoverProps>(
  ({ details, title, description, triggerLabel, disabled = false, className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn('mining-sdk-pool-details-popover', className)} {...props}>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="secondary" disabled={disabled}>
              {triggerLabel}
            </Button>
          </DialogTrigger>
          <DialogContent title={title} description={description} closable bare>
            <div className="mining-sdk-pool-details-popover__body">
              <PoolDetailsCard details={details} />
            </div>
          </DialogContent>
        </Dialog>
      </div>
    )
  },
)

PoolDetailsPopover.displayName = 'PoolDetailsPopover'

export { PoolDetailsPopover }
