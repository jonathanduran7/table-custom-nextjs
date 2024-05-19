import { IColumn } from "@/app/interface/column.interface";
import { Dispatch, SetStateAction, createContext } from "react";

type Order = 'asc' | 'desc'

interface TableContextProps {
    dataTable: any[]
    setData: Dispatch<SetStateAction<any[]>>
    handleOrderColumn: (column: string) => void
    initialOrderColumns: (data: IColumn[]) => void
    ordersColumn: { key: string, orderColumn: 'asc' | 'desc' }[]
    getOrderColumn:(keyColumn: string) => { key: keyColumn, orderColumn: Order}
}

export const TableContext = createContext<TableContextProps | null>(null)
