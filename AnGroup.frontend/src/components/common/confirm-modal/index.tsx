import { Modal, ModalProps } from 'antd'

import { AlertIconModal, SuccessIconModal, TrashIconModal } from '../icons'
import './style.scss'

export enum EConfirmModalType {
  remove = 'remove',
  success = 'success',
  warning = 'warning',
}
export type TConfirmModalListType = keyof typeof EConfirmModalType

export interface IPaperConfirmModalProps extends ModalProps {
  contentDelete?: string
  message?: string
  type?: TConfirmModalListType
}

const renderIcon = (type: string) => {
  switch (type) {
    case EConfirmModalType.remove:
      return <TrashIconModal />
    case EConfirmModalType.success:
      return <SuccessIconModal />
    case EConfirmModalType.warning:
      return <AlertIconModal />
    default:
      return null
  }
}

export const PaperConfirmModal = ({
  contentDelete,
  width = 320,
  okText = 'Ok',
  cancelText = 'Cancel',
  type = 'success',
  message = 'success',
  ...props
}: IPaperConfirmModalProps) => {
  const renderFooter = () => {
    return (
      <>
        {type === 'remove' ? (
          <div className="grid grid-cols-2">
            <button
              onClick={props.onCancel}
              className="border-solid border-r border-[#E5E5EA] text-base text-[#888888] font-bold"
            >
              {cancelText}
            </button>
            <button className="text-base text-[#3A3A3C] font-bold" onClick={props.onOk}>
              {okText}
            </button>
          </div>
        ) : (
          <button className="text-[#6A6A6A] text-base flex justify-center w-full" onClick={props.onOk}>
            {okText}
          </button>
        )}
      </>
    )
  }

  return (
    <Modal
      centered
      closable={false}
      width={width}
      footer={renderFooter()}
      {...props}
      className="papper-confirm-modal__custom"
    >
      <div className="flex justify-center mb-2">{renderIcon(type)}</div>
      {type === 'remove' ? (
        <>
          <p className="text-xl font-body-bold text-[#1C1C1E] m-0 p-0 text-center">Are you sure to remove</p>
          <p className="text-xl font-body-bold text-[#1C1C1E] m-0 p-0 text-center">{contentDelete} ?</p>
        </>
      ) : (
        <p className="text-xl font-body-bold text-[#1C1C1E] m-0 p-0 text-center">{message}</p>
      )}
    </Modal>
  )
}
