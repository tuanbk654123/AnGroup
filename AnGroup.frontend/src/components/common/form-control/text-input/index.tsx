import { Input, InputProps } from 'antd'
import { SizeType } from 'antd/lib/config-provider/SizeContext'
import clsx from 'clsx'

export interface ITextInputProps extends InputProps {
  size?: SizeType
  rounded?: 'small' | 'medium' | 'large' | 'custom'
  withoutSpace?: boolean
}

type InputRounded = Record<NonNullable<ITextInputProps['rounded']>, string>

const classByRounded: InputRounded = {
  small: 'input-rounded-small',
  medium: '',
  large: 'input-rounded-large',
  custom: '',
}

export const TextInput = ({
  rounded = 'medium',
  withoutSpace,
  className,
  size = 'middle',
  ...props
}: ITextInputProps) => {
  const handleKeyDown = (e) => {
    if (withoutSpace && e.keyCode === 32) {
      e.preventDefault()
    }
  }

  return (
    <Input
      {...props}
      onKeyDown={handleKeyDown}
      size={size}
      className={clsx('text-input__custom', classByRounded[rounded], className)}
    />
  )
}
