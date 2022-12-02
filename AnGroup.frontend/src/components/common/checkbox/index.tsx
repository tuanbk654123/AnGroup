import { Checkbox, CheckboxProps } from 'antd'

export interface IPapperCheckboxProps extends CheckboxProps {
  value?: boolean
}

export const PapperCheckbox = ({ value, onChange, ...props }: IPapperCheckboxProps) => {
  const handleChange = (e) => {
    onChange?.(e.target.checked)
  }

  return <Checkbox checked={value} onChange={handleChange} />
}
