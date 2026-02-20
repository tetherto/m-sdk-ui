import { ListViewFilter, RadioCard, RadioGroup, TagInput } from '@mining-sdk/core'
import type { CascaderValue, LocalFilters } from '@mining-sdk/core'
import type {
  DeviceExplorerDeviceType,
  DeviceExplorerFilterOption,
  DeviceExplorerSearchOption,
} from './types'

export type DeviceExplorerToolbarProps = {
  filters: LocalFilters
  filterOptions: DeviceExplorerFilterOption[]
  onFiltersChange: (value: CascaderValue[]) => void
  searchOptions: DeviceExplorerSearchOption[]
  searchTags: string[]
  onSearchTagsChange: (tags: string[]) => void
  deviceType: DeviceExplorerDeviceType
  onDeviceTypeChange: (type: DeviceExplorerDeviceType) => void
}

const deviceTypeRadioOptions = [
  {
    value: 'container',
    label: 'Container',
  },
  {
    value: 'miner',
    label: 'Miner',
  },
  {
    value: 'cabinet',
    label: 'Cabinet',
  },
]

export const DeviceExplorerToolbar = ({
  filters,
  filterOptions,
  onFiltersChange,
  searchOptions,
  searchTags,
  onSearchTagsChange,
  deviceType,
  onDeviceTypeChange,
}: DeviceExplorerToolbarProps): JSX.Element => {
  const showFilter = filterOptions.length > 0

  return (
    <div className="mining-sdk-device-explorer__toolbar">
      {showFilter && (
        <ListViewFilter
          localFilters={filters}
          options={filterOptions}
          onChange={onFiltersChange}
          className="mining-sdk-device-explorer__toolbar__filter"
        />
      )}
      <TagInput
        allowCustomTags
        placeholder="Search"
        options={searchOptions}
        onTagsChange={onSearchTagsChange}
        value={searchTags}
      />
      <RadioGroup
        className="mining-sdk-device-explorer__toolbar__radio-group"
        orientation="horizontal"
        onValueChange={onDeviceTypeChange}
        value={deviceType}
      >
        {deviceTypeRadioOptions.map(({ label, value }) => (
          <RadioCard
            key={value}
            className="mining-sdk-device-explorer__toolbar__radio-card"
            color={deviceType === value ? 'primary' : 'default'}
            value={value}
            label={label}
          />
        ))}
      </RadioGroup>
    </div>
  )
}
