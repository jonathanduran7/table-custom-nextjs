import { Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react"
import { TableContext } from "./table-context"
import { IColumn } from "@/app/interface/column.interface";

interface TableProviderProps {
    children: ReactNode
    initialData: any[]
}

type Order = 'asc' | 'desc';

export const TableProvider = ({ children, initialData }: TableProviderProps) => {

    const [dataTable, setData] = useState<any[]>(initialData)
    const [ordersColumn, setOrderColumns] = useState<{ key: string, orderColumn: Order }[]>([]);

    const orderColumn = (keyColumn: string) => {
        const newOrderColumns = ordersColumn.map(orderColumn => {
            if (orderColumn.key === keyColumn) {
                return {
                    key: orderColumn.key,
                    orderColumn: orderColumn.orderColumn === 'asc' ? 'desc' : 'asc' as Order
                }
            }
            return orderColumn;
        });
        setOrderColumns(newOrderColumns);
    }

    const initialOrderColumns = (data: IColumn[]) => {
        setOrderColumns(data.map((column) => { return { key: column.key, orderColumn: 'asc' } }))
    }

    return (
        <TableContext.Provider
            value={{
                dataTable,
                orderColumn,
                setData: setData as Dispatch<SetStateAction<unknown[]>>,
                initialOrderColumns,
                ordersColumn
            }}
        >
            {children}
        </TableContext.Provider>
    )
}