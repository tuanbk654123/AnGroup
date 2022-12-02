import { Input } from 'antd'
import { PasswordProps } from 'antd/lib/input'
import clsx from 'clsx'
export interface ITextInputPasswordProps extends PasswordProps {
  className?: string
  withoutSpace?: boolean
}

const { Password } = Input

export const TextInputPassword = ({ withoutSpace, className, ...props }: ITextInputPasswordProps) => {
  const handleKeyDown = (e) => {
    if (withoutSpace && e.keyCode === 32) {
      e.preventDefault()
    }
  }
  return <Password className={clsx('', className)} onKeyDown={handleKeyDown} {...props} />
}
