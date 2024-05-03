import { ChangeEvent, useState } from "react";

export default function useChecks() {
    const [checks, setChecks] = useState<{ id: number, checked: boolean }[]>([]);

    const initializeChecks = (data: { id: number }[]) => {
        setChecks(data.map(item => ({ id: item.id, checked: false })));
    }
    
    const isItemChecked = (id: number) => {
        return checks.find(check => check.id === id)?.checked || false;
    }

    const handleCheck = (event: ChangeEvent<HTMLInputElement>, checked: boolean, id: number) => {
        setChecks(checks.map(check => check.id === id ? { ...check, checked } : check));
    }

    const handleCheckAll = (checked: boolean) => {
        setChecks(checks.map(check => ({ ...check, checked})));
    }

    return {
        checks,
        isItemChecked,
        handleCheck,
        handleCheckAll,
        initializeChecks
    }
}