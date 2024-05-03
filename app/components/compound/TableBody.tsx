import { IColumn } from "@/app/interface/column.interface"
import { GetColumnValue } from "@/app/utils/columns.util"
import { TableCell, TableBody as TableBodyMui, styled, TableRow, Checkbox } from "@mui/material"
import { IRow } from "../table/Table"
import { getCellStyle } from "@/app/utils/cell.utils"
import { getRowStyle } from "@/app/utils/row.utils"

interface Props<T> {
    stylesRow?: IRow
    columns?: IColumn[]
    data?: Array<T & { id: number }>
    hasCheckboxes?: boolean;
}

const RowCustom = styled(TableRow)(({ theme }) => ({
    '& .MuiTableRow-root': {
        height: '20px',
        backgroundColor: '#f00',
    },
}));

export default function TableBody<T>({ columns, data, stylesRow, hasCheckboxes }: Props<T>) {
    return (
        <TableBodyMui>
            {data?.map((row, index) => (
                <RowCustom key={index} sx={getRowStyle(row, stylesRow)}>
                    {
                        hasCheckboxes &&
                        <TableCell>
                            <Checkbox
                                color="primary"
                                inputProps={{ 'aria-label': 'select all desserts' }}
                            />
                        </TableCell>
                    }
                    {columns?.map((column, index) => {
                        return <TableCell key={index} sx={getCellStyle(row, column)}>
                            {GetColumnValue(row, column, index)}
                        </TableCell>
                    })}
                </RowCustom>
            ))}
        </TableBodyMui>
    )
}