import { IRow } from "../components/table/Table";

export function getRowStyle<T>(row: T, stylesRow?: IRow): any {

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

    return style
}