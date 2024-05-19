import { useContext } from "react";
import { TableContext } from "../context/table/table-context";

export const useTableContext = () => {
    const context = useContext(TableContext);

    if (!context) {
        throw new Error('useTableContext must be used within a TableProvider');
    }

    return context;
}