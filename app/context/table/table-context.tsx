import { createContext } from "react";

interface TableContextProps<T> {
    data: Array<T & { id: number }>
    setData: React.Dispatch<React.SetStateAction<Array<T & { id: number }>>>
    orderColumn: (column: string) => void
}

export const TableContext = createContext<TableContextProps<unknown> | null>(null)