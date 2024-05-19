export interface IAction {
  label: string
  icon: JSX.Element
  action: (row: any) => void
}
