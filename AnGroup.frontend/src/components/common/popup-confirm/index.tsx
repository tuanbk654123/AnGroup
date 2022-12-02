import { Popconfirm, PopconfirmProps } from 'antd'
import './styles.scss'

export interface IPapperPopupConfirmProps extends PopconfirmProps {}

export const PapperPopupConfirm = ({ title, ...props }: IPapperPopupConfirmProps) => {
  return <Popconfirm title={title} {...props} />
}
