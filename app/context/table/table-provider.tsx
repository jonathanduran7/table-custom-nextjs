import { ReactNode, useState } from "react"
import { TableContext } from "./table-context"

interface TableProviderProps {
    children: ReactNode
}

export const TableProvider = ({ children }: TableProviderProps) => {

    const [data, setData] = useState<any[]>([])

    const orderColumn = (column: string) => {
        console.log('orderColumn', column)
    }

    return (
        <TableContext.Provider
            value={{ data, setData, orderColumn }}
        >
            {children}
        </TableContext.Provider>
    )
}