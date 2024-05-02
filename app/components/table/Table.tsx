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
    data: T[]
    tableOptions?: {
        stickyHeader?: boolean
    }
}

export default function CustomTable<T>({ columns, data, stylesRow, tableOptions, stylesHeader }: Props<T>) {
    return (
        <Table {...tableOptions}>
            <TableHead columns={columns} stylesHeader={stylesHeader} />
            <TableBody columns={columns} data={data} stylesRow={stylesRow} />
        </Table>
    )
}