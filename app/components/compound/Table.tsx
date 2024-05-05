'use client'

import { IColumn } from "@/app/interface/column.interface"
import TableBody from "./TableBody"
import { TableHead } from "./TableHead"
import React from "react"
import { Table } from "@mui/material"
import CheckProvider from "@/app/context/checks/check-provider"

interface Props<T> {
    children: React.ReactNode
    columns: IColumn[]
    data: Array<T & { id: number }>
    tableOptions?: { stickyHeader?: boolean }
    hasCheckboxes?: boolean;
    hasOrder?: boolean;
}

export default function TableCompound<T>({ children, tableOptions, ...restProps }: Props<T>) {
    return (
        <CheckProvider>
            <Table {...tableOptions}>
                {React.Children.map(children, child => {
                    if (React.isValidElement(child)) {
                        return React.cloneElement(child, restProps);
                    }
                    return child;
                })}
            </Table>
        </CheckProvider>
    )
}

TableCompound.Head = TableHead
TableCompound.Body = TableBody