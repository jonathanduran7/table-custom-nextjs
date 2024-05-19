'use client'
import { IColumn } from "@/app/interface/column.interface"
import { Table } from "@mui/material"
import TableBody from "./TableBody"
import TableHead from "./TableHead"

export interface IRow { [key: string]: any }

interface Props<T> {
  stylesHeader?: IRow
  stylesRow?: IRow
  columns: IColumn[]
  data: Array<T & { id: number }>
  tableOptions?: { stickyHeader?: boolean }
  checkbox?: boolean
  checkboxFunctions?: {
    isItemChecked: (id: number) => boolean
    initializeChecks: (data: { id: number }[]) => void
    checks: { id: number, checked: boolean }[]
    handleCheck: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean, id: number) => void
    handleCheckAll: (checked: boolean) => void
  }
}

export default function CustomTable<T>({ columns, data, stylesRow, tableOptions, stylesHeader, checkbox, checkboxFunctions }: Props<T>) {

  return (
    <Table {...tableOptions}>
      <TableHead
        columns={columns}
        stylesHeader={stylesHeader}
        checkbox={checkbox}
        checkboxFunctions={checkboxFunctions}
      />

      <TableBody
        columns={columns}
        data={data}
        stylesRow={stylesRow}
        checkbox={checkbox}
        checkboxFunctions={checkboxFunctions}
      />
    </Table>
  )
}
