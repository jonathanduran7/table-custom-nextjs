import { IColumn } from "../interface/column.interface";

export function getCellStyle<T>(row: T, column: IColumn): any {

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

