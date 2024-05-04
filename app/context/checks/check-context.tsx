import { ChangeEvent, createContext } from "react"

interface CheckContextProps {
    checks: { id: number, checked: boolean }[]
    initializeChecks: (data: { id: number }[]) => void
    isItemChecked: (id: number) => boolean
    handleCheck: (event: ChangeEvent<HTMLInputElement>, checked: boolean, id: number) => void
    handleCheckAll: (checked: boolean) => void
}

const CheckContext = createContext<CheckContextProps>({} as CheckContextProps)

export default CheckContext