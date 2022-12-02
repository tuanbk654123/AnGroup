import { Select, SelectProps } from 'antd'
import { SizeType } from 'antd/lib/config-provider/SizeContext'
import clsx from 'clsx'

import { AngleDownIcon } from '../../icons'
import './style.scss'

interface IMultipleSelect extends SelectProps {
  rounded?: 'small' | 'medium' | 'large'
  size?: SizeType
}

type MultipleSelectRounded = Record<NonNullable<IMultipleSelect['rounded']>, string>

const classByRounded: MultipleSelectRounded = {
  small: 'multiple-select-rounded-small',
  medium: '',
  large: 'multiple-select-rounded-large',
}

export const MultipleSelect = ({ rounded = 'medium', size = 'middle', className, ...props }: IMultipleSelect) => {
  return (
    <Select
      mode="multiple"
      size={size}
      suffixIcon={<AngleDownIcon />}
      className={clsx('papper-multiple-select__custom', classByRounded[rounded], className)}
      {...props}
    />
  )
}
