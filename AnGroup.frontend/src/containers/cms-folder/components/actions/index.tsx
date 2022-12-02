import { Col, Row } from 'antd'
import { ActionButtonsRight } from './buttons-right'

export const CmsReviewListActions = () => {
  return (
    <>
      <Row justify="space-between" className="pb-4">
        <Col span={24}>
          <ActionButtonsRight />
        </Col>
      </Row>
    </>
  )
}
