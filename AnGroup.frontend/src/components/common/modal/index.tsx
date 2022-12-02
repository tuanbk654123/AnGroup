import { Modal, ModalProps } from 'antd'

import { CloseIcon } from '../icons'
import './style.scss'

export interface IPapperModalProps extends ModalProps {}

export const PapperModal = (props: IPapperModalProps) => {
  return (
    <Modal
      wrapClassName="papper-modal__custom"
      //@ts-ignore
      closeIcon={<CloseIcon onClick={props.onCancel} />}
      {...props}
    />
  )
}
