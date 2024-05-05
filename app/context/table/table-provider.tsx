import { Dispatch, ReactNode, SetStateAction, useCallback, useEffect, useState } from "react"
import { TableContext } from "./table-context"
import { IColumn } from "@/app/interface/column.interface";
import useOrderTable from "@/app/hooks/useOrderTable";

interface TableProviderProps {
    children: ReactNode
    initialData: any[]
    columns: IColumn[]
}

export const TableProvider = ({ children, initialData, columns }: TableProviderProps) => {

    const [dataTable, setData] = useState<any[]>(initialData)
    const { orderColumn, initialOrderColumns, ordersColumn, changeOrder } = useOrderTable();

    const handleOrderColumn = (keyColumn: string) => {
        const order = orderColumn(keyColumn);
        const newData = changeOrder(dataTable, order.key, order.orderColumn);
        setData(newData);
    }

    useEffect(() => {
        initialOrderColumns(columns);
    }, [columns, initialOrderColumns])

    return (
        <TableContext.Provider
            value={{
                dataTable,
                ordersColumn,
                handleOrderColumn,
                setData: setData as Dispatch<SetStateAction<unknown[]>>,
                initialOrderColumns
            }}
        >
            {children}
        </TableContext.Provider>
    )
}