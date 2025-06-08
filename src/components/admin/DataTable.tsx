'use client'

interface Column {
  id: string
  header: string
  width?: number
}

interface DataTableProps {
  columns: Column[]
  data: any[]
  onRowClick?: (id: string) => void
}

export function DataTable({ columns, data, onRowClick }: DataTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="bg-card-background">
            {columns.map((column) => (
              <th
                key={column.id}
                className="px-4 py-3 text-left text-sm font-medium text-gray-400"
                style={{ width: column.width }}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr
              key={row.id || index}
              onClick={() => onRowClick?.(row.id)}
              className="border-t border-gray-800 hover:bg-card-background cursor-pointer transition-colors"
            >
              {columns.map((column) => (
                <td
                  key={column.id}
                  className="px-4 py-3 text-sm text-white"
                >
                  {row[column.id]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
} 