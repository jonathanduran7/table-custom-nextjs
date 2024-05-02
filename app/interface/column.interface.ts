export type StyleColumn = {
    [key: string]: string | number | ((row: any) => string | number)
}

export interface IColumn {
    title: string;
    key: string;
    defaultValue?: string;
    styles?: StyleColumn;
    parse?: (value: any) => any;
    children?: () => JSX.Element;
}