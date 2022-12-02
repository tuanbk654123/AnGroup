import { createSearchParams, useNavigate } from 'react-router-dom'
import { EProductCreateType } from '~/containers/product-management/index.types'
import { useCurrentParams } from '~/hooks'
import { RouterHelper } from '~/utils'
import { ProductModalBody } from '../create-product-management/body/product'

const modalByTypeParams = {
  [EProductCreateType.createNew]: ProductModalBody,
}

export const ProductManagementModalAdd = () => {
  const currentParams = useCurrentParams()

  const navigate = useNavigate()

  const typeParam = currentParams['type'] || EProductCreateType.createNew

  const CurrentModal = modalByTypeParams[typeParam]

  const handleClose = () => {
    navigate({
      pathname: RouterHelper.product_management,
      search: createSearchParams(currentParams).toString(),
    })
  }

  return (
    <div>
      <CurrentModal maskClosable visible={true} onCancel={() => handleClose()} onOk={() => handleClose()} />
    </div>
  )
}
