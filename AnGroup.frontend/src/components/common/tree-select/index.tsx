import { TreeSelect, TreeSelectProps } from 'antd'
import { SizeType } from 'antd/lib/config-provider/SizeContext'
import clsx from 'clsx'

import { AngleDownIcon } from '../icons'
import './style.scss'

export interface ITreeSelectBoxProps extends TreeSelectProps {
  rounded?: 'small' | 'medium' | 'large'
  size?: SizeType
}

type TreeSelectBoxRounded = Record<NonNullable<ITreeSelectBoxProps['rounded']>, string>

const classByRounded: TreeSelectBoxRounded = {
  small: 'tree-select-rounded-small',
  medium: '',
  large: 'tree-select-rounded-large',
}

export const TreeSelectBox = ({ size = 'middle', rounded = 'medium', className, ...props }: ITreeSelectBoxProps) => {
  return (
    <TreeSelect
      className={clsx('papper-tree-select', classByRounded[rounded], className)}
      suffixIcon={<AngleDownIcon />}
      size={size}
      {...props}
    />
  )
}
