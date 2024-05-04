import { IColumn } from "@/app/interface/column.interface";
import { TableRow, TableHead as HeadMui, TableCell, Checkbox } from "@mui/material";
import { IRow } from "../table/Table";
import { useContext } from "react";
import CheckContext from "@/app/context/checks/check-context";

interface TableCompoundProps {
    columns?: IColumn[]
    stylesHeader?: IRow
    hasCheckboxes?: boolean;
}

export function TableHead({ columns, hasCheckboxes, stylesHeader }: TableCompoundProps) {

    const {handleCheckAll} = useContext(CheckContext)
    
    return (
        <HeadMui>
            <TableRow >
                {
                    hasCheckboxes &&
                    <TableCell sx={stylesHeader}>
                        <Checkbox
                            color="primary"
                            inputProps={{ 'aria-label': 'select all desserts' }}
                            onChange={(event) => handleCheckAll(event.target.checked)}
                        />
                    </TableCell>
                }
                {columns?.map((column, index) => (
                    <TableCell key={index} sx={stylesHeader}>{column.title}</TableCell>
                ))}
            </TableRow>

        </HeadMui>
    )
}