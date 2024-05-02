import { IColumn } from "../interface/column.interface"

export function GetColumnValue<T>(row: T, column: IColumn, index: number): string {
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