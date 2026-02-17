import type { CascaderOption, IndicatorProps, LocalFilters } from '@mining-sdk/core'
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  EmptyState,
  Indicator,
  ListViewFilter,
  Tag,
  Typography,
} from '@mining-sdk/core'
import * as React from 'react'

/**
 * Mock data - Mining Equipment
 */
type MiningDevice = {
  id: string
  name: string
  type: string
  status: 'online' | 'offline' | 'maintenance' | 'error'
  pool: string
  hashrate: number
  temperature: number
  power: number
  location: string
}

const mockDevices: MiningDevice[] = [
  {
    id: '1',
    name: 'Device-Alpha-001',
    type: 'Model X-100',
    status: 'online',
    pool: 'Pool 1',
    hashrate: 140,
    temperature: 65,
    power: 3250,
    location: 'Data Center A',
  },
  {
    id: '2',
    name: 'Device-Beta-002',
    type: 'Model X-200',
    status: 'online',
    pool: 'Pool 1',
    hashrate: 198,
    temperature: 55,
    power: 5445,
    location: 'Data Center A',
  },
  {
    id: '3',
    name: 'Device-Gamma-003',
    type: 'Model Y-300',
    status: 'offline',
    pool: 'Pool 2',
    hashrate: 0,
    temperature: 0,
    power: 0,
    location: 'Data Center B',
  },
  {
    id: '4',
    name: 'Device-Delta-004',
    type: 'Model Z-150',
    status: 'maintenance',
    pool: 'Pool 1',
    hashrate: 0,
    temperature: 0,
    power: 0,
    location: 'Data Center A',
  },
  {
    id: '5',
    name: 'Device-Epsilon-005',
    type: 'Model Z-250',
    status: 'error',
    pool: 'Pool 3',
    hashrate: 0,
    temperature: 85,
    power: 3360,
    location: 'Data Center C',
  },
  {
    id: '6',
    name: 'Device-Zeta-006',
    type: 'Model Z-350',
    status: 'online',
    pool: 'Pool 2',
    hashrate: 230,
    temperature: 62,
    power: 5500,
    location: 'Data Center B',
  },
  {
    id: '7',
    name: 'Device-Eta-007',
    type: 'Model X-100',
    status: 'online',
    pool: 'Pool 1',
    hashrate: 140,
    temperature: 68,
    power: 3250,
    location: 'Data Center A',
  },
  {
    id: '8',
    name: 'Device-Theta-008',
    type: 'Model Y-300',
    status: 'online',
    pool: 'Pool 3',
    hashrate: 100,
    temperature: 60,
    power: 3420,
    location: 'Data Center C',
  },
  {
    id: '9',
    name: 'Device-Iota-009',
    type: 'Model Z-150',
    status: 'offline',
    pool: 'Pool 2',
    hashrate: 0,
    temperature: 0,
    power: 0,
    location: 'Data Center B',
  },
  {
    id: '10',
    name: 'Device-Kappa-010',
    type: 'Model X-200',
    status: 'online',
    pool: 'Pool 1',
    hashrate: 198,
    temperature: 58,
    power: 5445,
    location: 'Data Center A',
  },
]

/**
 * Filter options configuration
 */
const filterOptions: CascaderOption[] = [
  {
    value: 'type',
    label: 'Device Type',
    children: [
      { value: 'Model X-100', label: 'Model X-100' },
      { value: 'Model X-200', label: 'Model X-200' },
      { value: 'Model Y-300', label: 'Model Y-300' },
      { value: 'Model Z-150', label: 'Model Z-150' },
      { value: 'Model Z-250', label: 'Model Z-250' },
      { value: 'Model Z-350', label: 'Model Z-350' },
    ],
  },
  {
    value: 'status',
    label: 'Status',
    children: [
      { value: 'online', label: 'Online' },
      { value: 'offline', label: 'Offline' },
      { value: 'maintenance', label: 'Maintenance' },
      { value: 'error', label: 'Error' },
    ],
  },
  {
    value: 'pool',
    label: 'Mining Pool',
    children: [
      { value: 'Pool 1', label: 'Pool 1' },
      { value: 'Pool 2', label: 'Pool 2' },
      { value: 'Pool 3', label: 'Pool 3' },
    ],
  },
  {
    value: 'location',
    label: 'Location',
    children: [
      { value: 'Data Center A', label: 'Data Center A' },
      { value: 'Data Center B', label: 'Data Center B' },
      { value: 'Data Center C', label: 'Data Center C' },
    ],
  },
]

/**
 * ListViewFilter Example Component
 */
export const ListViewFilterExample = (): JSX.Element => {
  const [filters, setFilters] = React.useState<LocalFilters>({})

  /**
   * Handle filter changes
   * Converts array of tuples to LocalFilters object
   */
  const handleFilterChange = React.useCallback(
    (selections: Array<Array<string | number | boolean>>) => {
      if (!selections || selections.length === 0) {
        setFilters({})
        return
      }

      const newFilters: LocalFilters = {}

      selections.forEach((selection) => {
        if (!Array.isArray(selection) || selection.length < 2) return

        const category = String(selection[0])
        const value = selection[selection.length - 1] // Get the leaf value

        if (value === undefined) return

        if (newFilters[category]) {
          // Category already exists
          const existingValue = newFilters[category]
          if (Array.isArray(existingValue)) {
            // Already an array, add if not exists
            if (!existingValue.includes(value)) {
              existingValue.push(value)
            }
          } else {
            // Convert to array if values are different
            if (existingValue !== value) {
              newFilters[category] = [existingValue, value]
            }
          }
        } else {
          // New category
          newFilters[category] = value
        }
      })
      setFilters(newFilters)
    },
    [],
  )

  /**
   * Filter devices based on active filters
   */
  const filteredDevices = React.useMemo(() => {
    if (Object.keys(filters).length === 0) {
      return mockDevices
    }

    return mockDevices.filter((device) => {
      // Check each filter category
      return Object.entries(filters).every(([category, filterValue]) => {
        const deviceValue = device[category as keyof MiningDevice]

        if (Array.isArray(filterValue)) {
          // Multiple values for same category (OR logic within category)
          return filterValue.some((val) => String(deviceValue) === String(val))
        }

        // Single value - exact match
        return String(deviceValue) === String(filterValue)
      })
    })
  }, [filters])

  /**
   * Clear all filters
   */
  const handleClearFilters = (): void => {
    setFilters({})
  }

  // Count statistics
  const stats = React.useMemo(() => {
    return {
      total: mockDevices.length,
      filtered: filteredDevices.length,
      online: filteredDevices.filter((d) => d.status === 'online').length,
      offline: filteredDevices.filter((d) => d.status === 'offline').length,
      maintenance: filteredDevices.filter((d) => d.status === 'maintenance').length,
      error: filteredDevices.filter((d) => d.status === 'error').length,
      totalHashrate: filteredDevices.reduce((sum, d) => sum + d.hashrate, 0),
    }
  }, [filteredDevices])

  // Status to color mapping for Indicator
  const statusColorMap: Record<MiningDevice['status'], IndicatorProps['color']> = {
    online: 'green',
    offline: 'gray',
    maintenance: 'amber',
    error: 'red',
  }

  return (
    <div style={{ padding: '2rem' }}>
      <div>
        {/* Header */}
        <Typography style={{ marginBottom: '2rem' }}>List view filter</Typography>

        {/* Toolbar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '2rem',
            padding: '1.5rem',
            backgroundColor: '#1a1a1a',
            border: '1px solid #333',
            borderRadius: '0.5rem',
            gap: '1rem',
            flexWrap: 'wrap',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
            }}
          >
            <ListViewFilter
              options={filterOptions}
              localFilters={filters}
              onChange={handleFilterChange}
            />
            {Object.keys(filters).length > 0 && (
              <Button onClick={handleClearFilters}>Clear Filters</Button>
            )}
          </div>

          <div>
            <Typography size="sm">
              Showing{' '}
              <Typography variant="caption" color="primary">
                {stats.filtered}
              </Typography>{' '}
              of{' '}
              <Typography color="primary" variant="caption">
                {stats.total}
              </Typography>{' '}
              devices
            </Typography>
          </div>
        </div>

        {/* Active Filters Display */}
        {Object.keys(filters).length > 0 && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              padding: '1rem 1.5rem',
              backgroundColor: 'rgba(255, 147, 0, 0.1)',
              border: '1px solid rgba(255, 147, 0, 0.3)',
              borderRadius: '0.5rem',
              marginBottom: '2rem',
            }}
          >
            <Typography size="md" color="primary">
              Active Filters:
            </Typography>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {Object.entries(filters).map(([key, value]) => {
                const values = Array.isArray(value) ? value : [value]
                return values.map((val, idx) => (
                  <div key={`${key}-${val}-${idx}`}>
                    <Tag>
                      {key}:{String(val)}
                    </Tag>
                  </div>
                ))
              })}
            </div>
          </div>
        )}

        {/* Device List */}
        <div>
          {filteredDevices.length === 0 ? (
            <EmptyState description="No devices found" />
          ) : (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
                gap: '1.5rem',
              }}
            >
              {filteredDevices.map((device) => (
                <Card key={device.id}>
                  <CardHeader
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <Typography variant="heading3" size="md" weight="light">
                      {device.name}
                    </Typography>
                    <Indicator color={statusColorMap[device.status]}>{device.status}</Indicator>
                  </CardHeader>

                  <CardBody>
                    <div>
                      <span>Type:</span>
                      <span>{device.type}</span>
                    </div>

                    <div
                      style={{ display: 'flex', gap: '0.5rem', justifyContent: 'space-between' }}
                    >
                      <span>Pool:</span>
                      <span>{device.pool}</span>
                    </div>

                    <div
                      style={{ display: 'flex', gap: '0.5rem', justifyContent: 'space-between' }}
                    >
                      <span>Location:</span>
                      <span>{device.location}</span>
                    </div>

                    <div>
                      <div>
                        <span>Hashrate</span>
                        <span>{device.hashrate > 0 ? `${device.hashrate} TH/s` : 'N/A'}</span>
                      </div>

                      <div>
                        <span>Temp</span>
                        <span>{device.temperature > 0 ? `${device.temperature}°C` : 'N/A'}</span>
                      </div>
                    </div>
                  </CardBody>

                  <CardFooter>
                    <Typography variant="caption">Power</Typography>
                    <Typography variant="body" weight="medium" color="primary">
                      {device.power > 0 ? `${device.power}W` : 'N/A'}
                    </Typography>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
