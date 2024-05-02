'use client'
import { IColumn } from "@/app/interface/column.interface"
import { Table, TableBody, TableCell, TableHead, TableRow, styled } from "@mui/material"

interface IRow { [key: string]: any }

interface Props<T> {
    stylesHeader?: IRow
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

export default function CustomTable<T>({ columns, data, stylesRow, tableOptions, stylesHeader }: Props<T>) {
    return (
        <Table
            {...tableOptions}
        >
            <TableHead>
                <TableRow >
                    {columns.map((column, index) => (
                        <TableCell key={index} sx={stylesHeader}>{column.title}</TableCell>
                    ))}
                </TableRow>
            </TableHead>
            <TableBody>
                {data.map((row, index) => (
                    <RowCustom
                        key={index}
                        // sx={getRowStyle(row, stylesRow)}
                    >
                        {columns.map((column, index) => {
                            return <TableCell key={index} sx={getCellStyle(row, column)}>{
                                GetColumnValue(row, column, index)
                            }</TableCell>
                        })}
                    </RowCustom>
                ))}
            </TableBody>
        </Table>
    )
}

function GetColumnValue<T>(row: T, column: IColumn, index: number): string {
    const keys = column.key.split('.')
    let value = row as any
    keys.forEach(key => {
        if (value === undefined) return ''
        value = value[key]
    })

    if (value === undefined) return column.defaultValue || ''

    if (column.parse) {
        return column.parse(value)
    }

    return value
}

function getCellStyle<T>(row: T, column: IColumn): any {

    if (!column.styles) return {}
    let style: { [key: string]: any } = {};

    for (const key in column.styles) {
        const value = column.styles[key];
        if (typeof value === 'function') {
            style[key as any] = value(row)
        } else {
            style[key as any] = value
        }
    }

    return style
}

function getRowStyle<T>(row: T, stylesRow?: IRow): any {

    if (!stylesRow) return {}

    let style: { [key: string]: any } = {};

    for (const key in stylesRow) {
        const value = stylesRow[key];
        if (typeof value === 'function') {
            style[key as any] = value(row)
        } else {
            style[key as any] = value
        }
    }

    // return {
    //     ...style,
    //     '&:nth-of-type(odd)': {
    //         backgroundColor: '#ebebeb',
    //     }
    // };

    return style
}