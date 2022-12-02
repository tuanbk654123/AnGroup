import { createSearchParams, useNavigate } from 'react-router-dom'
import { useCurrentParams } from '~/hooks'
import { RouterHelper } from '~/utils'
import { EMenuConfigListType } from '../../index.types'
import { CreateMenuConfigModal } from './create-menu'

const modalByTypeParams = {
  [EMenuConfigListType.create]: CreateMenuConfigModal,
}

export const MeuConfigModal = () => {
  const currentParams = useCurrentParams()

  const navigate = useNavigate()

  const typeParam = currentParams['type'] || EMenuConfigListType.create

  const CurrentModal = modalByTypeParams[typeParam]

  const handleClose = () => {
    navigate({
      pathname: RouterHelper.configuration_menu,
      search: createSearchParams(currentParams).toString(),
    })
  }

  return (
    <div>
      <CurrentModal maskClosable visible={true} onCancel={() => handleClose()} onOk={() => handleClose()} />
    </div>
  )
}
