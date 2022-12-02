import { Col, Row } from 'antd'
import { createSearchParams, useNavigate } from 'react-router-dom'
import { useCurrentParams } from '~/hooks'
import { useAppTranslation } from '~/hooks/useAppTranslation'
import { RouterHelper } from '~/utils'
import { ActionButtonsRight } from './buttons-right'
import { ActionFormLeft } from './form-left'

export const UserManagementListActions = () => {
  const currentParams = useCurrentParams()
  const navigate = useNavigate()
  const { t } = useAppTranslation()
  const handleClickAddNew = () => {
    navigate({
      pathname: RouterHelper.cms_help_create,
      search: createSearchParams(currentParams).toString(),
    })
  }
  // const handleClickCancel = () => {
  //   props.parentCallback()
  // }
  // const handleClickInactive = () => {
  //   // navigate({
  //   //   pathname: RouterHelper.cms_help_inactive_all,
  //   //   search: createSearchParams(currentParams).toString(),
  //   // })
  // }

  return (
    <Row justify="space-between" className="pb-4">
      <Col span={12}>
        <ActionFormLeft />
      </Col>
      <Col span={12} className="flex justify-end">
        {/* <ActionButtonsRight onActions={handleClickInactive} title="Inactive all" />
        <ActionButtonsRight onActions={handleClickCancel} title="Cancel" /> */}
        <ActionButtonsRight onActions={handleClickAddNew} title={t('button.addNew')} />
      </Col>
    </Row>
  )
}
