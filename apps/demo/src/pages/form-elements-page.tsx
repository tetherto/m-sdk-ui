import { useState } from 'react'
import { Input, TagInput } from '@mining-sdk/core'
import { CheckIcon } from '@radix-ui/react-icons'

export const FormElementsPage = (): JSX.Element => {
  const [tagInputTags, setTagInputTags] = useState<string[]>([])
  const [tagInputCustomTags, setTagInputCustomTags] = useState<string[]>([])

  return (
    <section className="demo-section">
      <h2 className="demo-section__title">Form Elements</h2>
      <div className="demo-section__select-grid demo-section__input-grid">
        <section>
          <h3>Default</h3>
          <Input label="MAC Address" placeholder="Enter MAC address" id="mac-default" />
        </section>
        <section className="demo-section__input-grid__search">
          <h3>Search</h3>
          <Input variant="search" placeholder="Search" id="search-default" />
        </section>
        <section>
          <h3>With value</h3>
          <Input
            label="MAC Address"
            placeholder="Enter MAC address"
            defaultValue="00:11:22:33:44:55"
            id="mac-filled"
          />
        </section>
        <section>
          <h3>Disabled</h3>
          <Input label="MAC Address" placeholder="Enter MAC address" disabled id="mac-disabled" />
        </section>
        <section>
          <h3>Validation error</h3>
          <Input label="Email" placeholder="Email" error="Email is required" id="email-error" />
        </section>
        <section>
          <h3>TagInput</h3>
          <TagInput
            label="Search miners"
            value={tagInputTags}
            onTagsChange={setTagInputTags}
            onSubmit={(tags) => {
              console.warn('TagInput submit:', tags)
            }}
            options={[
              'Bitdeer M30',
              'Bitdeer A1346',
              'Bitdeer M56',
              'Bitdeer S19XP',
              'Bitmain Hydro',
              'Bitmain Imm',
              'MicroBT Wonder',
              'MicroBT Kehua',
            ]}
            placeholder="Search miners..."
            variant="search"
          />
        </section>
        <section>
          <h3>TagInput with custom dropdown</h3>
          <TagInput
            label="Search miners"
            value={tagInputCustomTags}
            onTagsChange={setTagInputCustomTags}
            onSubmit={(tags) => {
              console.warn('TagInput submit:', tags)
            }}
            options={[
              'Bitdeer M30',
              'Bitdeer A1346',
              'Bitdeer M56',
              'Bitdeer S19XP',
              'Bitmain Hydro',
              'Bitmain Imm',
              'MicroBT Wonder',
              'MicroBT Kehua',
            ]}
            placeholder="Search miners..."
            variant="search"
            renderDropdown={({
              filteredOptions,
              selectedTags,
              highlightedIndex,
              setHighlightedIndex,
              onSelect,
              listboxId,
              getOptionId,
              getOptionValue,
              getOptionLabel,
            }) => (
              <div id={listboxId} role="listbox" className="tag-input-custom-dropdown">
                {filteredOptions.length === 0 ? (
                  <div className="tag-input-custom-dropdown__empty">No options</div>
                ) : (
                  filteredOptions.map((opt, i) => {
                    const value = getOptionValue(opt)
                    const isSelected = selectedTags.includes(value)
                    const isHighlighted = i === highlightedIndex
                    return (
                      <div
                        key={value}
                        id={getOptionId(i)}
                        role="option"
                        aria-selected={isHighlighted}
                        className={`tag-input-custom-dropdown__option ${isSelected ? 'tag-input-custom-dropdown__option--selected' : ''} ${isHighlighted ? 'tag-input-custom-dropdown__option--highlighted' : ''}`}
                        onMouseDown={(e) => {
                          e.preventDefault()
                          onSelect(opt)
                        }}
                        onMouseEnter={() => setHighlightedIndex(i)}
                      >
                        {getOptionLabel(opt)}
                        {isSelected && <CheckIcon className="tag-input-custom-dropdown__check" />}
                      </div>
                    )
                  })
                )}
              </div>
            )}
          />
        </section>
      </div>
    </section>
  )
}
