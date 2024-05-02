import { getCellStyle } from "@/app/utils/cell.utils"
import { GetColumnValue } from "@/app/utils/columns.util"
import { getRowStyle } from "@/app/utils/row.utils"
import { TableCell, TableBody as TableBodyMui, styled, TableRow } from "@mui/material"
import { IRow } from "./Table"
import { IColumn } from "@/app/interface/column.interface"

interface Props<T> {
    stylesRow?: IRow
    columns: IColumn[]
    data: T[]
    tableOptions?: {
        stickyHeader?: boolean
    }
}


const RowCustom = styled(TableRow)(({ theme }) => ({
    '& .MuiTableRow-root': {
        height: '20px',
        backgroundColor: '#f00',
    },
}));


export default function TableBody<T>({ columns, data, stylesRow }: Props<T>) {
    return (
        <TableBodyMui>
            {data.map((row, index) => (
                <RowCustom
                    key={index}
                    sx={getRowStyle(row, stylesRow)}
                >
                    {columns.map((column, index) => {
                        return <TableCell key={index} sx={getCellStyle(row, column)}>{
                            GetColumnValue(row, column, index)
                        }</TableCell>
                    })}
                </RowCustom>
            ))}
        </TableBodyMui>
    )
}