import { Cross2Icon, MagnifyingGlassIcon } from '@radix-ui/react-icons'
import * as React from 'react'

import { Popover, PopoverAnchor, PopoverContent } from '../popover'
import { cn } from '../../utils'

// eslint-disable-next-line style/member-delimiter-style -- CI expects comma for this inline type
export type TagInputOption = string | { value: string, label: string }

export type TagInputDropdownProps = {
  /** Filtered options to display */
  filteredOptions: TagInputOption[]
  /** Current tags (selected values) - use to show selected state in custom dropdown */
  selectedTags: string[]
  /** Index of the currently highlighted option (for keyboard nav) */
  highlightedIndex: number
  /** Call to update highlighted index (e.g. on mouse enter) */
  setHighlightedIndex: (index: number) => void
  /** Call when user selects an option */
  onSelect: (opt: TagInputOption) => void
  /** Current input value (for custom filtering) */
  inputValue: string
  /** HTML id for the combobox (for aria) */
  id: string
  /** ID for the listbox element */
  listboxId: string
  /** Helper to get option id for aria-activedescendant. Use: id={getOptionId(i)} */
  getOptionId: (index: number) => string
  /** Helper to get option value from TagInputOption */
  getOptionValue: (opt: TagInputOption) => string
  /** Helper to get option label from TagInputOption */
  getOptionLabel: (opt: TagInputOption) => string
}

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
  /**
   * Render custom dropdown content. When provided, replaces the default dropdown.
   * Use this to apply your own styling or structure.
   */
  renderDropdown?: (props: TagInputDropdownProps) => React.ReactNode
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
 *
 * @example
 * ```tsx
 * // Custom dropdown with selected state (checkmark + different background)
 * <TagInput
 *   value={tags}
 *   onTagsChange={setTags}
 *   options={options}
 *   renderDropdown={({ filteredOptions, selectedTags, highlightedIndex, setHighlightedIndex, onSelect, listboxId, getOptionId, getOptionValue, getOptionLabel }) => (
 *     <div id={listboxId} role="listbox" className="my-custom-list">
 *       {filteredOptions.map((opt, i) => {
 *         const isSelected = selectedTags.includes(getOptionValue(opt))
 *         return (
 *           <div
 *             key={getOptionValue(opt)}
 *             id={getOptionId(i)}
 *             role="option"
 *             aria-selected={i === highlightedIndex}
 *             onMouseDown={(e) => { e.preventDefault(); onSelect(opt) }}
 *             onMouseEnter={() => setHighlightedIndex(i)}
 *           >
 *             {getOptionLabel(opt)}
 *             {isSelected && <CheckIcon />}
 *           </div>
 *         )
 *       })}
 *     </div>
 *   )}
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
      renderDropdown,
    },
    ref,
  ) => {
    const id = idProp ?? React.useId()
    const [open, setOpen] = React.useState(false)
    const [inputValue, setInputValue] = React.useState('')
    const [highlightedIndex, setHighlightedIndex] = React.useState(0)
    const inputRef = React.useRef<HTMLInputElement>(null)
    const listRef = React.useRef<HTMLDivElement>(null)
    const wrapperRef = React.useRef<HTMLDivElement>(null)
    const dropdownRef = React.useRef<HTMLDivElement>(null)

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
            const idx = tags.indexOf(v)
            if (idx >= 0) {
              nextTags = tags.filter((_, i) => i !== idx)
              removeTag(idx)
            } else if (addTag(v)) {
              nextTags = [...tags, v]
            }
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
      const v = getOptionValue(opt)
      const index = tags.indexOf(v)
      if (index >= 0) {
        removeTag(index)
      } else {
        addTag(v)
      }
      inputRef.current?.focus()
    }

    const handleFocus = (): void => {
      setOpen(true)
    }

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>): void => {
      const relatedTarget = e.relatedTarget as Node | null
      const isInWrapper = relatedTarget && wrapperRef.current?.contains(relatedTarget)
      const isInDropdown = relatedTarget && dropdownRef.current?.contains(relatedTarget)
      const keepOpen = isInWrapper || isInDropdown
      if (!keepOpen) {
        setTimeout(() => setOpen(false), 150)
      }
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
            ref={wrapperRef}
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
          ref={dropdownRef}
          align="start"
          side="bottom"
          sideOffset={4}
          onOpenAutoFocus={(e) => e.preventDefault()}
          onCloseAutoFocus={(e) => e.preventDefault()}
          className="mining-sdk-tag-input__dropdown"
        >
          {renderDropdown ? (
            renderDropdown({
              filteredOptions,
              selectedTags: tags,
              highlightedIndex,
              setHighlightedIndex,
              onSelect: handleOptionSelect,
              inputValue,
              id,
              listboxId: `${id}-listbox`,
              getOptionId: (i) => `${id}-option-${i}`,
              getOptionValue,
              getOptionLabel,
            })
          ) : (
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
          )}
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
