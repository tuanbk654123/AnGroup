import { Col, Row } from 'antd'
import { createSearchParams, useNavigate } from 'react-router-dom'
import { useCurrentParams } from '~/hooks'
import { useAppTranslation } from '~/hooks/useAppTranslation'
import { RouterHelper } from '~/utils'
import { ActionButtonsRight } from './buttons-right'
import { ActionFormLeft } from './form-left'

export const NotificationManagementListActions = () => {
  const currentParams = useCurrentParams()
  const navigate = useNavigate()
  const { t } = useAppTranslation()
  const handleClickAddNew = () => {
    navigate({
      pathname: RouterHelper.cms_notification_create,
      search: createSearchParams(currentParams).toString(),
    })
  }

  return (
    <Row justify="space-between" className="pb-4">
      <Col span={12}>
        <ActionFormLeft />
      </Col>
      <Col span={12} className="flex justify-end">
        <ActionButtonsRight onActions={handleClickAddNew} title={t('button.addNew')} />
      </Col>
    </Row>
  )
}
