import * as React from 'react'
import { cn } from '../../utils'

// Import with safe fallback
type LinkProps = {
  to: string
  className?: string
  children: React.ReactNode
  'aria-current'?: 'page' | undefined
}

type LinkComponent = React.ComponentType<LinkProps>
type NavigateFunction = () => (delta: number) => void
type RouterContextCheck = () => boolean

// Router state
let routerModule: {
  Link: LinkComponent
  useNavigate: NavigateFunction
  useInRouterContext: RouterContextCheck
} | null = null

// Load router module
const loadRouter = (() => {
  let loadPromise: Promise<void> | null = null

  return () => {
    if (routerModule) return Promise.resolve()
    if (loadPromise) return loadPromise

    // @ts-expect-error - optional dependency
    loadPromise = import('react-router-dom')
      .then((router) => {
        routerModule = {
          Link: router.Link,
          useNavigate: router.useNavigate,
          useInRouterContext: router.useInRouterContext,
        }
      })
      .catch(() => {
        // react-router-dom not available
        routerModule = null
        console.warn('react-router-dom is not installed. Breadcrumbs will use fallback navigation.')
      })

    return loadPromise
  }
})()

// Initialize router on module load
loadRouter()

export type BreadcrumbItem = {
  label: string
  to?: string
  onClick?: () => void
}

export type BreadcrumbsProps = {
  items: BreadcrumbItem[]
  separator?: React.ReactNode
  showBack?: boolean
  backLabel?: string
  onBackClick?: () => void
  useGoBack?: boolean
  className?: string
  itemClassName?: string
  backClassName?: string
}

function renderBreadcrumbItem(
  item: BreadcrumbItem,
  isLast: boolean,
  isInRouter: boolean,
  itemClassName?: string,
): React.ReactElement {
  const ariaCurrent = isLast ? 'page' : undefined
  const LinkComponent = routerModule?.Link

  // Use React Router Link if in router context and `to` is provided
  if (item.to && isInRouter && LinkComponent) {
    return (
      <LinkComponent
        to={item.to}
        className={cn('mining-sdk-breadcrumbs__link', itemClassName)}
        aria-current={ariaCurrent}
      >
        {item.label}
      </LinkComponent>
    )
  }

  // Fallback to anchor if `to` is provided but not in router
  if (item.to && !isInRouter) {
    return (
      <a
        href={item.to}
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
      useGoBack = false,
      className,
      itemClassName,
      backClassName,
    },
    ref,
  ) => {
    const isInRouter = React.useMemo(() => {
      try {
        return routerModule?.useInRouterContext?.() ?? false
      } catch {
        return false
      }
    }, [])

    const navigate = React.useMemo(() => {
      if (!isInRouter || !routerModule?.useNavigate) return null
      try {
        return routerModule.useNavigate()
      } catch {
        return null
      }
    }, [isInRouter])

    const handleBackClick = (): void => {
      if (onBackClick) {
        onBackClick()
      } else if (useGoBack && navigate) {
        navigate(-1)
      }
    }

    return (
      <nav ref={ref} className={cn('mining-sdk-breadcrumbs', className)} aria-label="Breadcrumb">
        {showBack && (
          <button
            onClick={handleBackClick}
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
                {renderBreadcrumbItem(item, isLast, isInRouter, itemClassName)}

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
