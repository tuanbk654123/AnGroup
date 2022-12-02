import { Fragment } from 'react'
import { PapperButtonProps, PappperButton } from '../button'
import { PapperPopupConfirm } from '../popup-confirm'

interface IConfirmableButtonProps extends PapperButtonProps {
  confirmText?: string
  disableConfirm?: boolean
  onConfirm?: () => void
}

export const ConfirmableButton = ({
  confirmText,
  disableConfirm,
  onConfirm,
  ...buttonProps
}: IConfirmableButtonProps) => {
  const WrapperComponent = disableConfirm ? Fragment : PapperPopupConfirm

  return (
    <WrapperComponent title={confirmText} onConfirm={onConfirm}>
      <PappperButton disabled={disableConfirm} {...buttonProps} />
    </WrapperComponent>
  )
}
