import { ArchiveIcon } from '@radix-ui/react-icons'
import { flexRender } from '@tanstack/react-table'
import type { Row, Table } from '@tanstack/react-table'
import { cn } from '../../utils'
import React from 'react'

export type TableBodyProps<I = unknown> = {
  table: Table<I>
  renderExpandedContent?: (row: Row<I>) => React.ReactNode
}

export function TableBody<I = unknown>({
  table,
  renderExpandedContent,
}: TableBodyProps<I>): JSX.Element {
  return (
    <tbody>
      {table.getRowModel().rows.map((row) => (
        <React.Fragment key={row.id}>
          <tr>
            {row.getVisibleCells().map((cell) => (
              <td
                key={cell.id}
                style={{
                  width: cell.column.getSize(),
                }}
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
          {row.getIsExpanded() && (
            <tr>
              <td colSpan={row.getAllCells().length}>{renderExpandedContent?.(row)}</td>
            </tr>
          )}
        </React.Fragment>
      ))}
    </tbody>
  )
}

export const EmptyTableBody = ({
  description = 'No data present',
  hideContent,
}: {
  description?: string
  hideContent?: boolean
}): JSX.Element => {
  return (
    <div
      className={cn('mining-sdk-table-element-empty-body', {
        'mining-sdk-table-element-empty-body--hidden': hideContent,
      })}
    >
      {!hideContent && (
        <>
          <ArchiveIcon width="128px" height="128px" />
          <p>{description}</p>
        </>
      )}
    </div>
  )
}
