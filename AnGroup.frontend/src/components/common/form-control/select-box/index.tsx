import { useRef, forwardRef, useImperativeHandle } from 'react'
import { Select, SelectProps } from 'antd'
import { SizeType } from 'antd/lib/config-provider/SizeContext'
import { BaseSelectRef } from 'rc-select'
import clsx from 'clsx'

import { AngleDownIcon } from '../../icons'
import './style.scss'

export interface ISelectBoxProps extends SelectProps {
  preset?: 'normal' | 'custom'
  rounded?: 'small' | 'medium' | 'large'
  size?: SizeType
}

type SelectBoxRounded = Record<NonNullable<ISelectBoxProps['rounded']>, string>

const classByRounded: SelectBoxRounded = {
  small: 'select-rounded-small',
  medium: '',
  large: 'select-rounded-large',
}
export const { Option } = Select

export const SelectBox = forwardRef(
  ({ preset = 'custom', rounded = 'medium', className, size = 'middle', ...props }: ISelectBoxProps, ref) => {
    const selectRef = useRef<BaseSelectRef>()

    useImperativeHandle(ref, () => ({
      blur: () => {
        selectRef.current.blur()
      },
    }))

    return (
      <Select
        ref={selectRef}
        className={clsx(`${preset === 'custom' ? 'paper-select' : ''}`, classByRounded[rounded], className)}
        size={size}
        suffixIcon={<AngleDownIcon />}
        {...props}
      />
    )
  },
)
