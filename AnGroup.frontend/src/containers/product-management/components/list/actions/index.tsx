import { Col, Row } from 'antd'
import { createSearchParams, useNavigate } from 'react-router-dom'
import { useCurrentParams } from '~/hooks'
import { RouterHelper } from '~/utils'
import { ActionButtonsRight } from './buttons-right'
import { ActionFormLeft } from './form-left'

export const ProductManagementListActions = () => {
  const currentParams = useCurrentParams()
  const navigate = useNavigate()

  const handleClickAddNew = () => {
    navigate({
      pathname: RouterHelper.product_management_create,
      search: createSearchParams(currentParams).toString(),
    })
  }
  return (
    <Row justify="space-between" className="pb-4">
      <Col span={12}>
        <ActionFormLeft />
      </Col>
      <Col span={12}>
        <ActionButtonsRight onActions={handleClickAddNew} />
      </Col>
    </Row>
  )
}
