import { useContext, useEffect, useState } from "react";
import { TableRow, TableHead as HeadMui, TableCell, Checkbox, TableSortLabel } from "@mui/material";
import { IColumn } from "@/app/interface/column.interface";
import { IRow } from "../table/Table";
import CheckContext from "@/app/context/checks/check-context";
import { TableConfig } from "@/app/interface/table-config.interface";
import { useTableContext } from "@/app/hooks/useTableContext";

interface TableCompoundProps {
    columns?: IColumn[]
    stylesHeader?: IRow
    tableConfig?: TableConfig
    deafultOrder?: Order;
}

type Order = 'asc' | 'desc';

export function TableHead({ columns, stylesHeader, deafultOrder, tableConfig }: TableCompoundProps) {

    const { hasCheckboxes, hasOrder } = tableConfig || { hasCheckboxes: false, hasOrder: false };
    const { handleCheckAll } = useContext(CheckContext);
    const { orderColumn, initialOrderColumns, ordersColumn } = useTableContext()

    useEffect(() => {
        initialOrderColumns(columns || []);
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
                            onClick={() => orderColumn(column.key)}
                        >
                            {column.title}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </HeadMui>
    )
}