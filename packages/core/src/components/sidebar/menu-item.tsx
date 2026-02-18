import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons'
import { cn } from '../../utils'
import type { MenuItemInternalProps } from './types'
import { getFirstLeaf, hasActiveDescendant } from './helpers'
import { OverlayContent } from './overlay-content'

const initialOverlayPos = { top: 0, left: 0 }

export const MenuItemInternal = ({
  item,
  activeId,
  depth = 0,
  overlayId,
  isExpanded,
  onItemClick,
  onOverlayChange,
  inOverlay = false,
}: MenuItemInternalProps): React.ReactNode => {
  const isActive = item.id === activeId
  const isOverlayOpen = overlayId === item.id
  const hasChildren = Boolean(item.items?.length)
  const isGroupActive = hasChildren && hasActiveDescendant(item, activeId)

  const [groupOpen, setGroupOpen] = useState(isGroupActive)
  const [overlayPos, setOverlayPos] = useState(initialOverlayPos)

  const hoverOverlay = useRef(false)
  const hoverContainer = useRef(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (hasChildren && isGroupActive) {
      setGroupOpen(true)
    }
  }, [hasChildren, isGroupActive])

  const handleClick = useCallback((): void => {
    if (item.disabled) return

    if (hasChildren && item.items?.length) {
      setGroupOpen(true)
      onItemClick?.(getFirstLeaf(item))
      return
    }

    onItemClick?.(item)
  }, [item, hasChildren, onItemClick])

  const handleGroupToggle = useCallback((e: React.MouseEvent): void => {
    e.stopPropagation()
    setGroupOpen((prev) => !prev)
  }, [])

  const dismissOverlay = useCallback((): void => {
    requestAnimationFrame(() => {
      if (!hoverContainer.current && !hoverOverlay.current) {
        onOverlayChange((current) => (current === item.id ? null : current))
      }
    })
  }, [item.id, onOverlayChange])

  const handleMouseEnter = useCallback((): void => {
    hoverContainer.current = true

    if (isExpanded || !hasChildren || item.disabled) return

    if (!inOverlay && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      setOverlayPos({ top: rect.top, left: rect.right })
    }

    onOverlayChange(item.id)
  }, [isExpanded, hasChildren, item.disabled, inOverlay, onOverlayChange, item.id])

  const handleMouseLeave = useCallback((): void => {
    hoverContainer.current = false
    dismissOverlay()
  }, [dismissOverlay])

  const overlayMouseEnter = useCallback((): void => {
    hoverOverlay.current = true
  }, [])

  const overlayMouseLeave = useCallback((): void => {
    hoverOverlay.current = false
    dismissOverlay()
  }, [dismissOverlay])

  const baseItemClass = cn(
    'mining-sdk-sidebar__item',
    (isActive || isGroupActive) && 'mining-sdk-sidebar__item--active',
    item.disabled && 'mining-sdk-sidebar__item--disabled',
    depth > 0 && 'mining-sdk-sidebar__item--sub',
  )

  const renderLabel = (isExpanded || depth > 0) && (
    <span className="mining-sdk-sidebar__item-label">{item.label}</span>
  )

  if (!hasChildren) {
    return (
      <button
        type="button"
        className={baseItemClass}
        onClick={handleClick}
        disabled={item.disabled}
        title={!isExpanded && depth === 0 ? item.label : undefined}
        aria-label={!isExpanded && depth === 0 ? item.label : undefined}
      >
        {item.icon && <span className="mining-sdk-sidebar__item-icon">{item.icon}</span>}
        {renderLabel}
      </button>
    )
  }

  return (
    <>
      <div
        ref={containerRef}
        className="mining-sdk-sidebar__group"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <button
          type="button"
          onClick={handleClick}
          disabled={item.disabled}
          className={baseItemClass}
          title={!isExpanded && depth === 0 ? item.label : undefined}
          aria-label={!isExpanded && depth === 0 ? item.label : undefined}
        >
          {item.icon && <span className="mining-sdk-sidebar__item-icon">{item.icon}</span>}

          {renderLabel}

          {isExpanded && !item.disabled && (
            <span
              className="mining-sdk-sidebar__group-toggle"
              role="button"
              tabIndex={0}
              onClick={handleGroupToggle}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  setGroupOpen((prev) => !prev)
                }
              }}
              aria-label={groupOpen ? `Collapse ${item.label}` : `Expand ${item.label}`}
            >
              {groupOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
            </span>
          )}
        </button>

        {groupOpen && isExpanded && item.items?.length && (
          <div className="mining-sdk-sidebar__group-items">
            {item.items.map((child) => (
              <MenuItemInternal
                key={child.id}
                item={child}
                depth={depth + 1}
                activeId={activeId}
                overlayId={overlayId}
                isExpanded={isExpanded}
                onItemClick={onItemClick}
                onOverlayChange={onOverlayChange}
              />
            ))}
          </div>
        )}

        {isOverlayOpen && !isExpanded && inOverlay && item.items?.length && (
          <div
            className="mining-sdk-sidebar__overlay mining-sdk-sidebar__overlay--nested"
            onMouseEnter={overlayMouseEnter}
            onMouseLeave={overlayMouseLeave}
          >
            <OverlayContent
              items={item.items}
              activeId={activeId}
              onItemClick={(clicked) => {
                onOverlayChange(null)
                onItemClick?.(clicked)
              }}
            />
          </div>
        )}
      </div>

      {isOverlayOpen &&
        !isExpanded &&
        !inOverlay &&
        item.items?.length &&
        createPortal(
          <div
            className="mining-sdk-sidebar__overlay"
            style={overlayPos}
            onMouseEnter={overlayMouseEnter}
            onMouseLeave={overlayMouseLeave}
          >
            <OverlayContent
              items={item.items}
              activeId={activeId}
              onItemClick={(clicked) => {
                onOverlayChange(null)
                onItemClick?.(clicked)
              }}
            />
          </div>,
          document.body,
        )}
    </>
  )
}

MenuItemInternal.displayName = 'Sidebar.MenuItem'
