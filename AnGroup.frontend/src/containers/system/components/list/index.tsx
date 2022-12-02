import { Button } from 'antd'
import { useState } from 'react'
import { createSearchParams, useNavigate } from 'react-router-dom'
import { PappperButton } from '~/components/common'
import { useCurrentParams } from '~/hooks'
import { useAppTranslation } from '~/hooks/useAppTranslation'
import { RouterHelper } from '~/utils'
import { isEmpty } from '~/utils/helper'
import { ESystemListType } from '../../index.types'
import { SystemCreateManagementModal } from '../modals'
import ReasonSystemConfigList from './reason'
import StatusSystemConfigList from './status'

const SystemConfigList = () => {
  const [dropStatus, setDropStatus] = useState<boolean>(true)
  const [dropReason, setDropReason] = useState<boolean>(true)
  const params = useCurrentParams()

  const navigate = useNavigate()
  const handleDropStatus = () => {
    setDropStatus(!dropStatus)
  }
  const handleDropReason = () => {
    setDropReason(!dropReason)
  }
  const handleOpenModalCreate = () => {
    navigate({
      pathname: RouterHelper.configuration_system,
      search: createSearchParams({ 'create-type': ESystemListType.reason, ...params }).toString(),
    })
  }
  const { t } = useAppTranslation()
  const showModal = !isEmpty(params['create-type'])

  return (
    <div className="bg-white p-4">
      <div className="flex items-center mb-4">
        <div className="text-xl font-bold text-blue-900 mr-4">{t('table.column.status')}</div>
        <Button onClick={() => handleDropStatus()}>+</Button>
      </div>
      <div className="mb-8">{dropStatus ? <StatusSystemConfigList /> : null}</div>

      <div className="flex mb-4 justify-between">
        <div className="flex items-center">
          <div className="text-xl font-bold text-blue-900 mr-4">{t('configuration.reason')}</div>
          <Button onClick={() => handleDropReason()}>+</Button>
        </div>
        <PappperButton variant="primary" rounded="medium" onClick={handleOpenModalCreate}>
          {t('button.addReason')}
        </PappperButton>
      </div>
      <div>{dropReason ? <ReasonSystemConfigList /> : null}</div>

      {showModal && <SystemCreateManagementModal />}
    </div>
  )
}

export default SystemConfigList
