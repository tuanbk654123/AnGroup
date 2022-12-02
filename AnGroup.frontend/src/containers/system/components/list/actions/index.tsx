import { Col, Row } from 'antd'
import { createSearchParams, useNavigate } from 'react-router-dom'
import { useCurrentParams } from '~/hooks'
import { useAppTranslation } from '~/hooks/useAppTranslation'
import { RouterHelper } from '~/utils'
import { ActionButtonsRight } from './buttons-right'
import { ActionFormLeft } from './form-left'

export const SystemConfigListActions = () => {
  const currentParams = useCurrentParams()
  const navigate = useNavigate()
  const { t } = useAppTranslation()
  const handleClickAddNew = () => {
    navigate({
      pathname: RouterHelper.configuration_DMS_connection_create,
      search: createSearchParams(currentParams).toString(),
    })
  }
  const handleClickCancel = () => {
    // navigate({
    //   pathname: RouterHelper.configuration_system_config_cancel,
    //   search: createSearchParams(currentParams).toString(),
    // })
  }
  const handleClickInactive = () => {
    // navigate({
    //   pathname: RouterHelper.configuration_system_config_inactiveall,
    //   search: createSearchParams(currentParams).toString(),
    // })
  }

  return (
    <Row justify="space-between" className="pb-4">
      <Col span={12}>
        <ActionFormLeft />
      </Col>
      <Col span={12} className="flex justify-end">
        <ActionButtonsRight onActions={handleClickInactive} title={'Inactive all'} />
        <ActionButtonsRight onActions={handleClickCancel} title={t('button.cancel')} />
        <ActionButtonsRight onActions={handleClickAddNew} title={'Add new'} />
      </Col>
    </Row>
  )
}
