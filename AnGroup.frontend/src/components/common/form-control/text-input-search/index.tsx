import { Input } from 'antd'
import { SizeType } from 'antd/lib/config-provider/SizeContext'
import { SearchProps } from 'antd/lib/input'
import clsx from 'clsx'

import './style.scss'
export interface ITextInputSearchProps extends SearchProps {
  size?: SizeType
  rounded?: 'small' | 'medium' | 'large' | 'custom'
}

const { Search } = Input

type SearchInputRounded = Record<NonNullable<ITextInputSearchProps['rounded']>, string>

const classByRounded: SearchInputRounded = {
  small: 'search-input-rounded-small',
  medium: '',
  large: 'search-input-rounded-large',
  custom: '',
}

export const TextInputSearch = ({
  height = 'medium',
  rounded = 'medium',
  className,
  size = 'middle',
  ...props
}: ITextInputSearchProps) => {
  return <Search className={clsx('search-input__custom', classByRounded[rounded], className)} size={size} {...props} />
}
