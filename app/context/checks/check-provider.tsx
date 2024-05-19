import React, { ChangeEvent, ReactNode, useState } from "react"
import CheckContext from "./check-context"

interface CheckProviderProps {
    children: ReactNode
}

const CheckProvider = ({ children }: CheckProviderProps) => {
    const [checks, setChecks] = useState<{ id: number, checked: boolean }[]>([]);

    function initializeChecks<T>(data: Array<T & { id: number }>) {
        setChecks(data.map(item => ({ id: item.id, checked: false })));
    }

    const isItemChecked = (id: number) => {
        return checks.find(check => check.id === id)?.checked || false;
    }

    const handleCheck = (event: ChangeEvent<HTMLInputElement>, checked: boolean, id: number) => {
        setChecks(checks.map(check => check.id === id ? { ...check, checked } : check));
    }

    const handleCheckAll = (checked: boolean) => {
        setChecks(checks.map(check => ({ ...check, checked })));
    }

    return (
        <CheckContext.Provider
            value={{
                checks,
                initializeChecks,
                isItemChecked,
                handleCheck,
                handleCheckAll
            }}>
            {children}
        </CheckContext.Provider>
    )
}

export default CheckProvider