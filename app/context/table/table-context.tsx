import { IColumn } from "@/app/interface/column.interface";
import { Dispatch, SetStateAction, createContext } from "react";

interface TableContextProps {
    dataTable: any[]
    setData: Dispatch<SetStateAction<any[]>>
    handleOrderColumn: (column: string) => void
    initialOrderColumns: (data: IColumn[]) => void
    ordersColumn: { key: string, orderColumn: 'asc' | 'desc' }[]
}

export const TableContext = createContext<TableContextProps | null>(null)