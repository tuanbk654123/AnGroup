import { Input } from 'antd'
import { TextAreaProps } from 'antd/lib/input'
import clsx from 'clsx'

interface ITextInputAreaProps extends TextAreaProps {
  rounded?: 'small' | 'medium' | 'large'
}

const { TextArea } = Input

type TextInputAreaRounded = Record<NonNullable<ITextInputAreaProps['rounded']>, string>

const classByRounded: TextInputAreaRounded = {
  small: 'input-area-rounded-small',
  medium: '',
  large: 'input-area-rounded-large',
}

export const TextInputArea = ({ rows = 4, rounded = 'medium', className, ...props }: ITextInputAreaProps) => {
  return (
    <TextArea {...props} rows={rows} className={clsx('text-input-area__custom', classByRounded[rounded], className)} />
  )
}
