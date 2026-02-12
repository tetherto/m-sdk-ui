import { Cross2Icon, MagnifyingGlassIcon } from '@radix-ui/react-icons'
import * as React from 'react'

import { Popover, PopoverAnchor, PopoverContent } from '../popover'
import { cn } from '../../utils'

export type TagInputOption = string | { value: string; label: string }

export type TagInputProps = {
  /**
   * Controlled tags (array of tag values)
   */
  value?: string[]
  /**
   * Callback when tags change (add/remove)
   */
  onTagsChange?: (tags: string[]) => void
  /**
   * Callback when user presses Enter (submit). Receives current tags.
   * Called after adding a tag from selection or typed text, if applicable.
   */
  onSubmit?: (tags: string[]) => void
  /**
   * Options to show in the dropdown when input is focused
   */
  options?: TagInputOption[]
  /**
   * Placeholder when input is empty
   */
  placeholder?: string
  /**
   * Disabled state
   */
  disabled?: boolean
  /**
   * Whether to allow adding custom tags by typing and pressing Enter
   * @default true
   */
  allowCustomTags?: boolean
  /**
   * Filter options by input value. Receives options and query, returns filtered options.
   * When undefined, filters by case-insensitive includes.
   */
  filterOptions?: (options: TagInputOption[], query: string) => TagInputOption[]
  /**
   * Input variant - 'search' shows magnifying glass icon
   * @default 'search'
   */
  variant?: 'default' | 'search'
  /**
   * Label for the input
   */
  label?: string
  /**
   * HTML id for the input
   */
  id?: string
  /**
   * Custom className for the root
   */
  className?: string
  /**
   * Custom className for the wrapper
   */
  wrapperClassName?: string
}

function getOptionValue(opt: TagInputOption): string {
  return typeof opt === 'string' ? opt : opt.value
}

function getOptionLabel(opt: TagInputOption): string {
  return typeof opt === 'string' ? opt : opt.label
}

function defaultFilter(options: TagInputOption[], query: string): TagInputOption[] {
  if (!query.trim()) return options
  const q = query.toLowerCase()
  return options.filter((opt) => getOptionLabel(opt).toLowerCase().includes(q))
}

/**
 * TagInput - Input with dropdown options and tag display
 *
 * - Click to show dropdown with options
 * - Select option or type + Enter to add tag
 * - Enter triggers onSubmit
 * - Tags are removable via × button
 *
 * @example
 * ```tsx
 * <TagInput
 *   value={tags}
 *   onTagsChange={setTags}
 *   onSubmit={(tags) => console.log('Search', tags)}
 *   options={['Bitdeer M30', 'Bitdeer A1346']}
 *   placeholder="Search..."
 * />
 * ```
 */
const TagInput = React.forwardRef<HTMLInputElement, TagInputProps>(
  (
    {
      value = [],
      onTagsChange,
      onSubmit,
      options = [],
      placeholder = 'Search...',
      disabled = false,
      allowCustomTags = true,
      filterOptions = defaultFilter,
      variant = 'search',
      label,
      id: idProp,
      className,
      wrapperClassName,
    },
    ref,
  ) => {
    const id = idProp ?? React.useId()
    const [open, setOpen] = React.useState(false)
    const [inputValue, setInputValue] = React.useState('')
    const [highlightedIndex, setHighlightedIndex] = React.useState(0)
    const inputRef = React.useRef<HTMLInputElement>(null)
    const listRef = React.useRef<HTMLDivElement>(null)

    const tags = value
    const setTags = onTagsChange ?? (() => {})

    const filteredOptions = React.useMemo(
      () => filterOptions(options, inputValue),
      [options, inputValue, filterOptions],
    )

    const addTag = React.useCallback(
      (tagValue: string) => {
        const trimmed = tagValue.trim()
        if (!trimmed || tags.includes(trimmed)) return false
        setTags([...tags, trimmed])
        setInputValue('')
        setHighlightedIndex(0)
        return true
      },
      [tags, setTags],
    )

    const removeTag = React.useCallback(
      (index: number) => {
        const next = tags.filter((_, i) => i !== index)
        setTags(next)
      },
      [tags, setTags],
    )

    const handleKeyDown = React.useCallback(
      (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
          e.preventDefault()
          let nextTags = tags
          const opt = filteredOptions[highlightedIndex]
          if (opt !== undefined) {
            const v = getOptionValue(opt)
            if (addTag(v)) nextTags = [...tags, v]
          } else if (allowCustomTags && inputValue.trim()) {
            const v = inputValue.trim()
            if (addTag(v)) nextTags = [...tags, v]
          }
          onSubmit?.(nextTags)
          return
        }
        if (e.key === 'Backspace' && !inputValue && tags.length > 0) {
          e.preventDefault()
          removeTag(tags.length - 1)
          return
        }
        if (e.key === 'ArrowDown') {
          e.preventDefault()
          setHighlightedIndex((i) => Math.min(i + 1, filteredOptions.length - 1))
          return
        }
        if (e.key === 'ArrowUp') {
          e.preventDefault()
          setHighlightedIndex((i) => Math.max(i - 1, 0))
        }
      },
      [
        inputValue,
        tags,
        filteredOptions,
        highlightedIndex,
        addTag,
        removeTag,
        allowCustomTags,
        onSubmit,
      ],
    )

    const handleOptionSelect = (opt: TagInputOption): void => {
      addTag(getOptionValue(opt))
      inputRef.current?.focus()
    }

    const handleFocus = (): void => {
      setOpen(true)
    }

    const handleBlur = (): void => {
      // Delay close so click on option can register
      setTimeout(() => setOpen(false), 150)
    }

    const showSearchIcon = variant === 'search'

    const handleOpenChange = React.useCallback((next: boolean) => {
      // Keep open when input is focused (user is typing) - Radix may try to close on "interact outside"
      if (!next && inputRef.current === document.activeElement) return
      setOpen(next)
    }, [])

    const content = (
      <Popover open={open} onOpenChange={handleOpenChange} modal={false}>
        <PopoverAnchor asChild>
          <div
            className={cn(
              'mining-sdk-tag-input__wrapper',
              showSearchIcon && 'mining-sdk-tag-input__wrapper--search',
              disabled && 'mining-sdk-tag-input__wrapper--disabled',
              wrapperClassName,
            )}
            onClick={() => inputRef.current?.focus()}
          >
            <div className="mining-sdk-tag-input__inner">
              {tags.map((tag, i) => (
                <span key={`${tag}-${i}`} className="mining-sdk-tag-input__tag">
                  <span className="mining-sdk-tag-input__tag-chip">
                    {tag}
                    <button
                      type="button"
                      className="mining-sdk-tag-input__tag-remove"
                      onClick={(e) => {
                        e.stopPropagation()
                        removeTag(i)
                      }}
                      aria-label={`Remove ${tag}`}
                      tabIndex={-1}
                    >
                      <Cross2Icon />
                    </button>
                  </span>
                </span>
              ))}
              <input
                ref={(node) => {
                  ;(inputRef as React.MutableRefObject<HTMLInputElement | null>).current = node
                  if (typeof ref === 'function') ref(node)
                  else if (ref)
                    (ref as React.MutableRefObject<HTMLInputElement | null>).current = node
                }}
                id={id}
                type="text"
                value={inputValue}
                onChange={(e) => {
                  setInputValue(e.target.value)
                  setHighlightedIndex(0)
                }}
                onKeyDown={handleKeyDown}
                onFocus={handleFocus}
                onBlur={handleBlur}
                disabled={disabled}
                placeholder={tags.length === 0 ? placeholder : ''}
                className={cn('mining-sdk-tag-input__input', className)}
                autoComplete="off"
                aria-autocomplete="list"
                aria-expanded={open}
                aria-controls={open ? `${id}-listbox` : undefined}
                aria-activedescendant={
                  open && filteredOptions.length > 0
                    ? `${id}-option-${highlightedIndex}`
                    : undefined
                }
                role="combobox"
                aria-haspopup="listbox"
              />
            </div>
            {showSearchIcon && (
              <span className="mining-sdk-tag-input__icon" aria-hidden>
                <MagnifyingGlassIcon />
              </span>
            )}
          </div>
        </PopoverAnchor>
        <PopoverContent
          align="start"
          side="bottom"
          sideOffset={4}
          onOpenAutoFocus={(e) => e.preventDefault()}
          onCloseAutoFocus={(e) => e.preventDefault()}
          className="mining-sdk-tag-input__dropdown"
        >
          <div
            ref={listRef}
            id={`${id}-listbox`}
            role="listbox"
            className="mining-sdk-tag-input__list"
          >
            {filteredOptions.length === 0 ? (
              <div className="mining-sdk-tag-input__empty">No options</div>
            ) : (
              filteredOptions.map((opt, i) => (
                <div
                  key={getOptionValue(opt)}
                  id={`${id}-option-${i}`}
                  role="option"
                  aria-selected={i === highlightedIndex}
                  className={cn(
                    'mining-sdk-tag-input__option',
                    i === highlightedIndex && 'mining-sdk-tag-input__option--highlighted',
                  )}
                  onMouseDown={(e) => {
                    e.preventDefault()
                    handleOptionSelect(opt)
                  }}
                  onMouseEnter={() => setHighlightedIndex(i)}
                >
                  {getOptionLabel(opt)}
                </div>
              ))
            )}
          </div>
        </PopoverContent>
      </Popover>
    )

    if (label) {
      return (
        <div className={cn('mining-sdk-tag-input-root', wrapperClassName)}>
          <label htmlFor={id} className="mining-sdk-tag-input__label">
            {label}
          </label>
          {content}
        </div>
      )
    }

    return content
  },
)

TagInput.displayName = 'TagInput'

export { TagInput }
