import { IColumn } from "@/app/interface/column.interface"
import TableBody from "./TableBody"
import { TableHead } from "./TableHead"
import React from "react"
import { Checkbox, Table, TableCell } from "@mui/material"

interface Props<T> {
    children: React.ReactNode
    columns: IColumn[]
    data: Array<T & { id: number }>
    tableOptions?: { stickyHeader?: boolean }
    hasCheckboxes?: boolean;
}

export default function TableCompound<T>({ children, tableOptions, ...restProps }: Props<T>) {
    return (
        <Table {...tableOptions}>
            {React.Children.map(children, child => {
                if (React.isValidElement(child)) {
                    return React.cloneElement(child, restProps);
                }
                return child;
            })}
        </Table>
    )
}

TableCompound.Head = TableHead
TableCompound.Body = TableBody