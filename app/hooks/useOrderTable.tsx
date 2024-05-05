import { useCallback, useState } from "react";
import { IColumn } from "../interface/column.interface";

type Order = 'asc' | 'desc';

export default function useOrderTable() {
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
        return {
            key: keyColumn,
            orderColumn: newDirection as Order
        }
    }

    const initialOrderColumns = useCallback((data: IColumn[]) => {
        const newOrdersColumn = data.map(column => {
            return {
                key: column.key,
                orderColumn: 'asc' as Order
            }
        }); setOrderColumns(newOrdersColumn);
    }, [])

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

        return newData;
    };

    return {
        ordersColumn,
        orderColumn,
        initialOrderColumns,
        changeOrder
    }
}