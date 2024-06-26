import { useContext } from "react";
import { TableRow, TableHead as HeadMui, TableCell, Checkbox, TableSortLabel } from "@mui/material";
import { IColumn } from "@/app/interface/column.interface";
import { IRow } from "../table/Table";
import CheckContext from "@/app/context/checks/check-context";
import { TableConfig } from "@/app/interface/table-config.interface";
import { useTableContext } from "@/app/hooks/useTableContext";
import { styleHeader } from "@/app/styles.table";

interface TableCompoundProps {
  columns?: IColumn[]
  stylesHeader?: IRow
  tableConfig?: TableConfig
  deafultOrder?: Order;
  customOrder?: {
    handleOrderColumn: (key: string, order: 'asc' | 'desc') => Promise<unknown>
    ordersColumn?: { key: string, orderColumn: Order }[]
  }
}

type Order = 'asc' | 'desc';

export function TableHead({ columns, stylesHeader, deafultOrder, customOrder, tableConfig }: TableCompoundProps) {

  const { hasCheckboxes, hasOrder, hasActions } = tableConfig || { hasCheckboxes: false, hasOrder: false };
  const { handleCheckAll } = useContext(CheckContext);
  const { handleOrderColumn, ordersColumn, getOrderColumn, setData } = useTableContext()

  const customHandleOrder = async (keyColumn: string) => {
    const orders = getOrderColumn(keyColumn);
    const response = await customOrder?.handleOrderColumn(keyColumn, orders.orderColumn)
    setData(response as any[])
  }

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
              onClick={() =>
                customOrder?.handleOrderColumn
                  ? customHandleOrder(column.key)
                  : handleOrderColumn(column.key)
              }
            >
              {column.title}
            </TableSortLabel>
          </TableCell>
        ))}
        {hasActions && <TableCell sx={styleHeader}>Acciones</TableCell>}
      </TableRow>
    </HeadMui>
  )
}
