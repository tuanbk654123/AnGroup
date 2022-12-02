import { Button, ButtonProps } from 'antd'
import clsx from 'clsx'
import './style.scss'

export interface PapperButtonProps extends ButtonProps {
  rounded?: 'small' | 'medium' | 'large' | 'button'
  variant?: 'primary' | 'secondary' | 'danger' | 'outline' | 'error' | 'cancel' | 'warning'
  fixedWidth?: boolean
}

type ButtonVariants = Record<NonNullable<PapperButtonProps['variant']>, string>
type ButtonRounded = Record<NonNullable<PapperButtonProps['rounded']>, string>
const classByVariants: ButtonVariants = {
  danger: 'btn-danger',
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  error: 'btn-error',
  outline: 'btn-outline',
  warning: 'btn-warning',
  cancel: 'btn-cancel',
}
const classByRounded: ButtonRounded = {
  small: 'rounded-small',
  medium: 'rounded-medium',
  large: 'rounded-large',
  button: 'rounded-button',
}
export const PappperButton = ({ children, variant, className, rounded, fixedWidth, ...props }: PapperButtonProps) => {
  return (
    <Button
      {...props}
      className={clsx(
        `${fixedWidth && 'w-[141px]'}`,
        classByVariants[variant],
        classByRounded[rounded],
        className,
        's-pappper-button',
      )}
    >
      {children}
    </Button>
  )
}
