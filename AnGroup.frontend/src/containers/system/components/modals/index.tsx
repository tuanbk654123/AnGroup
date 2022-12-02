import { useNavigate } from 'react-router-dom'

import { useCurrentParams } from '~/hooks'
import { RouterHelper } from '~/utils'
import { ESystemListType } from '../../index.types'
import { CreateReasonModal } from './create-reason'

const modalByTypeParams = {
  [ESystemListType.reason]: CreateReasonModal,
}

export const SystemCreateManagementModal = () => {
  const currentParams = useCurrentParams()
  const navigate = useNavigate()
  const typeParam = currentParams['create-type']

  const CurrentModal = modalByTypeParams[typeParam]

  const handleClose = () => {
    navigate({
      pathname: RouterHelper.configuration_system,
    })
  }

  return (
    <div>
      <CurrentModal maskClosable visible={true} onCancel={() => handleClose()} onOk={() => handleClose()} />
    </div>
  )
}
