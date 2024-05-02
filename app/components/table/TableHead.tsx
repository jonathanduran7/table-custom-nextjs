import { IColumn } from "@/app/interface/column.interface";
import { TableRow, TableHead as HeadMui, TableCell} from "@mui/material";
import { IRow } from "./Table";

interface Props {
    columns: IColumn[];
    stylesHeader?: IRow
}

export default function TableHead({ columns, stylesHeader}: Props) {
    return (
        <HeadMui>
            <TableRow >
                {columns.map((column, index) => (
                    <TableCell key={index} sx={stylesHeader}>{column.title}</TableCell>
                ))}
            </TableRow>
        </HeadMui>

    )
}