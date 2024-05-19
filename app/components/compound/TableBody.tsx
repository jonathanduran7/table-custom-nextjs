import { IColumn } from "@/app/interface/column.interface"
import { GetColumnValue } from "@/app/utils/columns.util"
import { TableCell, TableBody as TableBodyMui, styled, TableRow, Checkbox, IconButton } from "@mui/material"
import { IRow } from "../table/Table"
import { getCellStyle } from "@/app/utils/cell.utils"
import { getRowStyle } from "@/app/utils/row.utils"
import { useContext, useEffect } from "react"
import CheckContext from "@/app/context/checks/check-context"
import { TableConfig } from "@/app/interface/table-config.interface"
import { useTableContext } from "@/app/hooks/useTableContext"
import { IAction } from "@/app/interface/actions.interface"

interface Props<T> {
  stylesRow?: IRow
  columns?: IColumn[]
  data?: Array<T & { id: number }>
  tableConfig?: Pick<TableConfig, 'hasCheckboxes' | 'hasActions'>
  actions?: IAction[]
}

const RowCustom = styled(TableRow)(({ theme }) => ({
  '& .MuiTableRow-root': {
    height: '20px',
    backgroundColor: '#f00',
  },
}));

export default function TableBody<T>({ columns, data, stylesRow, tableConfig, actions }: Props<T>) {
  const { hasCheckboxes, hasActions } = tableConfig || { hasCheckboxes: false, hasActions: false };
  const { initializeChecks, isItemChecked, handleCheck } = useContext(CheckContext);
  const { dataTable } = useTableContext()

  useEffect(() => {
    initializeChecks(data!);
  }, [data])

  return (
    <TableBodyMui>
      {dataTable?.map((row, index) => (
        <RowCustom key={index} sx={getRowStyle(row, stylesRow)}>
          {
            hasCheckboxes &&
            <TableCell>
              <Checkbox
                color="primary"
                inputProps={{ 'aria-label': 'select all desserts' }}
                checked={isItemChecked(row.id)}
                onChange={(event) => handleCheck(event, event.target.checked, row.id)}
              />
            </TableCell>
          }
          {columns?.map((column, index) => {
            return <TableCell key={index} sx={getCellStyle(row, column)}>
              {GetColumnValue(row, column, index)}
            </TableCell>
          })}
          {hasActions && <TableCell>
            {actions?.map(action => <IconButton key={action.label} onClick={action.action}>{action.icon}</IconButton>)}
          </TableCell>}
        </RowCustom>
      ))}
    </TableBodyMui>
  )
}
