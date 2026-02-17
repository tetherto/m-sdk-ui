import * as React from 'react'

import { cn } from '../../utils'
import { Loader } from '../loader'

function legendFillColor(color: string): string {
  if (color.startsWith('hsl')) {
    return color.replace(')', ' / 0.25)')
  }
  return `${color}40`
}

export type RangeSelectorOption = {
  label: string
  value: string
}

export type RangeSelectorProps = {
  options: RangeSelectorOption[]
  value: string
  onChange: (value: string) => void
  /** Custom class for the button group wrapper */
  className?: string
  /** Custom styles for the button group wrapper */
  style?: React.CSSProperties
  /** Custom class for each range button */
  buttonClassName?: string
}

export type HighlightedValueProps = {
  /** The main value (e.g. "3.590") - rendered prominently in primary color */
  value: string | number
  /** Optional unit (e.g. "PH/s") - rendered smaller in muted color */
  unit?: string
  /** Custom class for the highlighted value wrapper */
  className?: string
  /** Custom styles for the highlighted value wrapper */
  style?: React.CSSProperties
}

export type LegendItem = {
  label: string
  color: string
}

export type ChartContainerProps = {
  /** Chart title */
  title?: string
  /** Custom header (overrides title if both provided) */
  header?: React.ReactNode
  /** Legend items when using grid layout (chart must hide its built-in legend via showLegend={false}) */
  legendData?: LegendItem[]
  /** Highlighted value displayed in top right (e.g. current/latest metric) */
  highlightedValue?: HighlightedValueProps
  /** Time range selector buttons (e.g. 5 Min, 30 Min, 3 H, 1 D) */
  rangeSelector?: RangeSelectorProps
  /** Show loading state */
  loading?: boolean
  /** Show empty state */
  empty?: boolean
  /** Message when empty */
  emptyMessage?: string
  /** Footer content (e.g. Min/Max/Avg stats) */
  footer?: React.ReactNode
  /** Custom class for the footer wrapper */
  footerClassName?: string
  className?: string
  children: React.ReactNode
}

/**
 * ChartContainer - Common wrapper for charts with title, loading, and empty states
 *
 * @example
 * ```tsx
 * <ChartContainer title="Revenue" loading={isLoading} empty={!data.length}>
 *   <LineChart data={data} options={options} />
 * </ChartContainer>
 * ```
 */
export const ChartContainer = React.forwardRef<HTMLDivElement, ChartContainerProps>(
  (
    {
      title,
      header,
      legendData,
      highlightedValue,
      rangeSelector,
      loading,
      empty,
      emptyMessage = 'No data available',
      footer,
      footerClassName,
      className,
      children,
    },
    ref,
  ) => {
    const [hiddenIndices, setHiddenIndices] = React.useState<Set<number>>(new Set())

    const toggleDataset = React.useCallback((index: number) => {
      setHiddenIndices((prev) => {
        const next = new Set(prev)
        if (next.has(index)) next.delete(index)
        else next.add(index)
        return next
      })
    }, [])

    const useGridLayout = (legendData && legendData.length > 0) || highlightedValue || rangeSelector
    const hasHeaderRow1 = header ?? title ?? (rangeSelector && rangeSelector.options.length > 0)
    const hasLegendRow = legendData && legendData.length > 0

    const chartChildren =
      hasLegendRow && hiddenIndices.size > 0
        ? React.Children.map(children, (child) =>
            React.isValidElement(child)
              ? React.cloneElement(child as React.ReactElement<{ hiddenDatasets?: Set<number> }>, {
                  hiddenDatasets: hiddenIndices,
                })
              : child,
          )
        : children

    return (
      <div
        ref={ref}
        className={cn(
          'mining-sdk-chart-container',
          useGridLayout && 'mining-sdk-chart-container--grid',
          className,
        )}
      >
        {useGridLayout ? (
          <>
            <div className="mining-sdk-chart-container__title-area">
              {hasHeaderRow1 &&
                (header ??
                  (title && <h3 className="mining-sdk-chart-container__title">{title}</h3>))}
            </div>
            <div className="mining-sdk-chart-container__range-area">
              {rangeSelector && rangeSelector.options.length > 0 && (
                <div
                  className={cn(
                    'mining-sdk-chart-container__range-selector',
                    rangeSelector.className,
                  )}
                  style={rangeSelector.style}
                  role="group"
                  aria-label="Time range"
                >
                  {rangeSelector.options.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      aria-pressed={rangeSelector.value === opt.value}
                      className={cn(
                        'mining-sdk-chart-container__range-btn',
                        rangeSelector.value === opt.value &&
                          'mining-sdk-chart-container__range-btn--active',
                        rangeSelector.buttonClassName,
                      )}
                      onClick={() => rangeSelector.onChange(opt.value)}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="mining-sdk-chart-container__legend-area">
              {hasLegendRow && (
                <div className="mining-sdk-chart-container__legend">
                  {legendData!.map((item, i) => {
                    const isHidden = hiddenIndices.has(i)
                    return (
                      <button
                        key={i}
                        type="button"
                        className="mining-sdk-chart-container__legend-item"
                        style={{ opacity: isHidden ? 0.3 : 1 }}
                        onClick={() => toggleDataset(i)}
                      >
                        <span
                          className="mining-sdk-chart-container__legend-box"
                          style={{
                            backgroundColor: legendFillColor(item.color),
                            borderColor: item.color,
                          }}
                        />
                        <span className="mining-sdk-chart-container__legend-label">
                          {item.label}
                        </span>
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
            <div className="mining-sdk-chart-container__highlight-area">
              {highlightedValue && (
                <div
                  className={cn(
                    'mining-sdk-chart-container__highlighted-value',
                    highlightedValue.className,
                  )}
                  style={highlightedValue.style}
                >
                  <span className="mining-sdk-chart-container__highlighted-value__number">
                    {highlightedValue.value}
                  </span>
                  {highlightedValue.unit && (
                    <span className="mining-sdk-chart-container__highlighted-value__unit">
                      {highlightedValue.unit}
                    </span>
                  )}
                </div>
              )}
            </div>
            <div className="mining-sdk-chart-container__chart-area">
              {loading && (
                <div className="mining-sdk-chart-container__loading-overlay">
                  <Loader />
                </div>
              )}
              {empty && !loading && (
                <div className="mining-sdk-chart-container__empty">{emptyMessage}</div>
              )}
              {!empty && chartChildren}
            </div>
          </>
        ) : (
          <>
            {hasHeaderRow1 && (
              <div className="mining-sdk-chart-container__header-row">
                <div className="mining-sdk-chart-container__header-left">
                  {header ??
                    (title && <h3 className="mining-sdk-chart-container__title">{title}</h3>)}
                </div>
              </div>
            )}
            <div className="mining-sdk-chart-container__body">
              {loading && (
                <div className="mining-sdk-chart-container__loading-overlay">
                  <Loader />
                </div>
              )}
              {empty && !loading && (
                <div className="mining-sdk-chart-container__empty">{emptyMessage}</div>
              )}
              {!empty && chartChildren}
            </div>
          </>
        )}
        {footer && !loading && !empty && (
          <div className={cn('mining-sdk-chart-container__footer', footerClassName)}>{footer}</div>
        )}
      </div>
    )
  },
)
ChartContainer.displayName = 'ChartContainer'
