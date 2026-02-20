import { ArrowIcon, DropdownMenu, ExportIcon, Spinner } from '@mining-sdk/core'
import { useState } from 'react'
import { EXPORT_ITEM_KEYS, EXPORT_ITEMS, EXPORT_LABEL } from './constants'

type StatsExportProps = {
  showLabel?: boolean
  disabled?: boolean
  onCsvExport: () => Promise<void>
  onJsonExport: () => Promise<void>
}

export const StatsExport = ({
  onJsonExport,
  onCsvExport,
  disabled = false,
  showLabel = false,
}: StatsExportProps): React.ReactElement => {
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const isButtonDisabled = isLoading || disabled

  const handleMenuClick = async (key: string): Promise<void> => {
    setOpen(false)
    setIsLoading(true)

    if (key === EXPORT_ITEM_KEYS.CSV) {
      await onCsvExport()
    }
    if (key === EXPORT_ITEM_KEYS.JSON) {
      await onJsonExport()
    }
    setIsLoading(false)
  }

  const handleOpenChange = (isOpened: boolean): void => {
    if (!isButtonDisabled) {
      setOpen(isOpened)
    }
  }

  return (
    <DropdownMenu.Root open={open} onOpenChange={handleOpenChange}>
      <DropdownMenu.Trigger asChild disabled={isButtonDisabled}>
        <button
          className={`stats-export__button ${isButtonDisabled ? 'stats-export__button--disabled' : ''}`}
          disabled={isButtonDisabled}
        >
          {isLoading ? <Spinner type="circle" size="sm" color="secondary" /> : <ExportIcon />}
          {!showLabel && <span className="stats-export__label">{EXPORT_LABEL}</span>}
          <span className="stats-export__divider" />
          <ArrowIcon isOpen={open} />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content align="start" className="stats-export__dropdown">
        {EXPORT_ITEMS.map((item, index) => (
          <DropdownMenu.Item
            key={item.key}
            className={`stats-export__item ${index !== EXPORT_ITEMS.length - 1 ? 'stats-export__item--bordered' : ''}`}
            onSelect={() => handleMenuClick(item.key)}
          >
            {item.label}
          </DropdownMenu.Item>
        ))}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}
