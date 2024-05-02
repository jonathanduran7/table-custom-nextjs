import { IColumn } from "@/app/interface/column.interface";
import { TableRow, TableHead as HeadMui, TableCell, Checkbox} from "@mui/material";
import { IRow } from "./Table";

interface Props {
    columns: IColumn[];
    stylesHeader?: IRow
    checkbox?: boolean
}

export default function TableHead({ columns, stylesHeader, checkbox}: Props) {
    return (
        <HeadMui>
            <TableRow >
                {
                    checkbox &&
                    <TableCell sx={stylesHeader}>
                        <Checkbox
                            color="primary"
                            inputProps={{ 'aria-label': 'select all desserts' }}
                        />
                    </TableCell>
                }
                
                {columns.map((column, index) => (
                    <TableCell key={index} sx={stylesHeader}>{column.title}</TableCell>
                ))}
            </TableRow>
        </HeadMui>

    )
}