import { useContext, useEffect, useState } from "react";
import { TableRow, TableHead as HeadMui, TableCell, Checkbox, TableSortLabel } from "@mui/material";
import { IColumn } from "@/app/interface/column.interface";
import { IRow } from "../table/Table";
import CheckContext from "@/app/context/checks/check-context";

interface TableCompoundProps {
    columns?: IColumn[]
    stylesHeader?: IRow
    hasCheckboxes?: boolean;
    hasOrder?: boolean;
}

type Order = 'asc' | 'desc';

export function TableHead({ columns, hasCheckboxes, stylesHeader, hasOrder }: TableCompoundProps) {

    const { handleCheckAll } = useContext(CheckContext);
    const [ordersColumn, setOrderColumns] = useState<{ key: string, orderColumn: Order }[]>([]);

    const changeOrder = (keyColumn: string) => {
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

    useEffect(() => {
        setOrderColumns(columns?.map(column => { return { key: column.key, orderColumn: 'asc' } }) || []);
    }, [columns])

    return (
        <HeadMui>
            <TableRow >
                {
                    hasCheckboxes &&
                    <TableCell sx={stylesHeader}>
                        <Checkbox
                            color="primary"
                            inputProps={{ 'aria-label': 'select all desserts' }}
                            onChange={(event) => handleCheckAll(event.target.checked)}
                        />
                    </TableCell>
                }
                {columns?.map((column, index) => (
                    <TableCell
                        key={index}
                        sx={stylesHeader}
                    >
                        <TableSortLabel
                            active={hasOrder}
                            direction={ordersColumn.find(orderColumn => orderColumn.key === column.key)?.orderColumn || 'asc'}
                            onClick={() => changeOrder(column.key)}
                        >
                            {column.title}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>

        </HeadMui>
    )
}