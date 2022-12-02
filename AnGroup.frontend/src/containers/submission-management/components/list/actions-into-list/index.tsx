import { Col, Row, RowProps } from 'antd'
import { ReactElement } from 'react'
import { SubmissionActionFormLeft } from './form-left'

export interface ISubmissionListActionsProps {
  wrapperJustify?: RowProps['justify']
  righElement?: ReactElement
}

export const SubmissionListActions = ({ wrapperJustify = 'start', righElement }: ISubmissionListActionsProps) => {
  return (
    <Row justify={wrapperJustify} className="pb-4">
      <Col span={12}>
        <SubmissionActionFormLeft />
      </Col>
      {righElement}
    </Row>
  )
}
