import * as React from 'react'
import { cn } from '../../utils'

export type BreadcrumbItem = {
  label: string
  href?: string
  onClick?: () => void
}

export type BreadcrumbsProps = {
  items: BreadcrumbItem[]
  separator?: React.ReactNode
  showBack?: boolean
  backLabel?: string
  onBackClick?: () => void
  className?: string
  itemClassName?: string
  backClassName?: string
}

const renderBreadcrumbItem = (
  item: BreadcrumbItem,
  isLast: boolean,
  itemClassName?: string,
): React.ReactElement => {
  const ariaCurrent = isLast ? 'page' : undefined

  // Use anchor if `href` is provided
  if (item.href) {
    return (
      <a
        href={item.href}
        className={cn('mining-sdk-breadcrumbs__link', itemClassName)}
        aria-current={ariaCurrent}
      >
        {item.label}
      </a>
    )
  }

  // Button with onClick
  if (item.onClick) {
    return (
      <button
        onClick={item.onClick}
        className={cn(
          'mining-sdk-breadcrumbs__link',
          'mining-sdk-breadcrumbs__link--button',
          itemClassName,
        )}
        type="button"
        aria-current={ariaCurrent}
      >
        {item.label}
      </button>
    )
  }

  // Plain text
  return (
    <span
      className={cn(
        'mining-sdk-breadcrumbs__link',
        'mining-sdk-breadcrumbs__link--current',
        itemClassName,
      )}
      aria-current="page"
    >
      {item.label}
    </span>
  )
}

export const Breadcrumbs = React.forwardRef<HTMLElement, BreadcrumbsProps>(
  (
    {
      items,
      separator = '/',
      showBack = false,
      backLabel = 'Back',
      onBackClick,
      className,
      itemClassName,
      backClassName,
    },
    ref,
  ) => {
    return (
      <nav ref={ref} className={cn('mining-sdk-breadcrumbs', className)} aria-label="Breadcrumb">
        {showBack && (
          <button
            onClick={onBackClick}
            className={cn('mining-sdk-breadcrumbs__back', backClassName)}
            type="button"
          >
            <svg
              className="mining-sdk-breadcrumbs__back-icon"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
            <span>{backLabel}</span>
          </button>
        )}

        <ol className="mining-sdk-breadcrumbs__list">
          {items.map((item, index) => {
            const isLast = index === items.length - 1

            return (
              <li key={index} className="mining-sdk-breadcrumbs__item">
                {renderBreadcrumbItem(item, isLast, itemClassName)}

                {!isLast && (
                  <span className="mining-sdk-breadcrumbs__separator" aria-hidden="true">
                    {separator}
                  </span>
                )}
              </li>
            )
          })}
        </ol>
      </nav>
    )
  },
)
Breadcrumbs.displayName = 'Breadcrumbs'
