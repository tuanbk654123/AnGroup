import { Col, Row } from 'antd'
import { ActionFormLeft } from './form-left'

export const UserLogworkListActions = () => {
  return (
    <Row justify="space-between" className="pb-4">
      <Col span={12}>
        <ActionFormLeft />
      </Col>
    </Row>
  )
}
