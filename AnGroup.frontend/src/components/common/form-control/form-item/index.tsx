import { Form, FormItemProps } from 'antd'
import clsx from 'clsx'

import './style.scss'

interface IFormItemProps extends FormItemProps {
  layout?: 'vertical' | 'horizontal'
}

export const FormItem = ({ children, className, layout = 'vertical', ...props }: IFormItemProps) => {
  return (
    <Form.Item {...props} className={clsx(`form-item__custom ${layout}`, className)}>
      {children}
    </Form.Item>
  )
}
