'use client'

import { IColumn } from "@/app/interface/column.interface"
import TableBody from "./TableBody"
import { TableHead } from "./TableHead"
import React from "react"
import { Table } from "@mui/material"
import CheckProvider from "@/app/context/checks/check-provider"
import { TableConfig } from "@/app/interface/table-config.interface"
import { TableProvider } from "@/app/context/table/table-provider"

interface Props<T> {
    children: React.ReactNode
    columns: IColumn[]
    data: Array<T & { id: number }>
    tableOptions?: { stickyHeader?: boolean }
    tableConfig?: TableConfig
}

export default function TableCompound<T>({ children, tableOptions, ...restProps }: Props<T>) {

    const { data } = restProps

    return (
        <TableProvider initialData={data} >
            <CheckProvider>
                <Table {...tableOptions}>
                    {React.Children.map(children, child => {
                        if (React.isValidElement(child)) {
                            return React.cloneElement(child, { ...restProps });
                        }
                        return child;
                    })}
                </Table>
            </CheckProvider>
        </TableProvider>
    )
}

TableCompound.Head = TableHead
TableCompound.Body = TableBody