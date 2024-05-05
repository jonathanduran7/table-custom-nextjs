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
        let newDirection = 'asc';
        const newOrderColumns = ordersColumn.map(orderColumn => {
            if (orderColumn.key === keyColumn) {
                newDirection = orderColumn.orderColumn === 'asc' ? 'desc' : 'asc';
                return {
                    key: orderColumn.key,
                    orderColumn: newDirection as Order
                }
            }
            return orderColumn;
        });
        setOrderColumns(newOrderColumns);
        changeOrder(dataTable, keyColumn, newDirection as Order);
    }

    const initialOrderColumns = (data: IColumn[]) => {
        setOrderColumns(data.map((column) => { return { key: column.key, orderColumn: 'asc' } }))
    }

    const getNestedValue = (obj: any, key: string): any => {
        return key.split('.').reduce((nestedObj, part) => {
            return nestedObj ? nestedObj[part] : undefined;
        }, obj);
    };

    const changeOrder = (data: any[], keyColumn: string, orderColumn: Order) => {
        const newData = data.sort((a, b) => {
            const valueA = getNestedValue(a, keyColumn);
            const valueB = getNestedValue(b, keyColumn);

            if (valueA > valueB) {
                return orderColumn === 'asc' ? 1 : -1;
            }
            if (valueA < valueB) {
                return orderColumn === 'asc' ? -1 : 1;
            }
            return 0;
        });

        setData([...newData]);
    };

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