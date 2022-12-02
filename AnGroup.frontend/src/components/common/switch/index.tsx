import { Switch, SwitchProps } from 'antd'

export interface IPapperSwitchProps extends SwitchProps {
  value?: boolean
}

export const PapperSwitch = ({ value, className, ...props }: IPapperSwitchProps) => {
  return <Switch checked={value} className={`custom-switch ${className}`} {...props} />
}
