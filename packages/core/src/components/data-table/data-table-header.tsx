import { flexRender } from '@tanstack/react-table'
import type { Header, Table } from '@tanstack/react-table'
import { cn } from '../../utils'
import { SimpleTooltip } from '../tooltip'
import { TriangleDownIcon, TriangleUpIcon } from '@radix-ui/react-icons'
import React from 'react'

type TableHeaderProps<I> = {
  table: Table<I>
}

export function TableHeader<I = unknown>({ table }: TableHeaderProps<I>): JSX.Element {
  const renderTableHeaderCell = (header: Header<I, unknown>): React.ReactNode => {
    return (
      <th
        colSpan={header.colSpan}
        style={{
          width: header.getSize(),
        }}
        className={cn({
          sortable: header.column.getCanSort(),
        })}
        onClick={header.column.getToggleSortingHandler()}
      >
        <div className="mining-sdk-table-header-content">
          {flexRender(header.column.columnDef.header, header.getContext())}
          {{
            asc: <TriangleUpIcon />,
            desc: <TriangleDownIcon />,
          }[header.column.getIsSorted() as string] ?? null}
        </div>
      </th>
    )
  }

  return (
    <thead>
      {table.getHeaderGroups().map((headerGroup) => (
        <tr key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
            <React.Fragment key={header.id}>
              {header.isPlaceholder ? null : header.column.getCanSort() ? (
                <SimpleTooltip
                  content={
                    {
                      asc: 'Sort ascending',
                      desc: 'Sort descending',
                    }[header.column.getNextSortingOrder() as string] ?? 'Clear sort'
                  }
                >
                  {renderTableHeaderCell(header)}
                </SimpleTooltip>
              ) : (
                renderTableHeaderCell(header)
              )}
            </React.Fragment>
          ))}
        </tr>
      ))}
    </thead>
  )
}
