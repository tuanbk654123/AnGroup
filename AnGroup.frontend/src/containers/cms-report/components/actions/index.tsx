import { Col, Row } from 'antd'
// import { ActionButtonsRight } from './buttons-right'
import { ActionFormFilter } from './filter'

export const CmsReviewListActions = () => {
  return (
    <>
      <Row gutter={24} className="pb-4">
        <Col span={24}>
          <ActionFormFilter />
        </Col>
      </Row>
      {/* <Row justify="space-between" className="pb-4">
        <Col span={24}>
          <ActionButtonsRight />
        </Col>
      </Row> */}
    </>
  )
}
