import { createSearchParams, useNavigate } from 'react-router-dom'
import { useCurrentParams } from '~/hooks'
import { RouterHelper } from '~/utils'
import { EProductListType } from '../../index.types'
import { CreateProductModal } from './create-product-management'

const modalByTypeParams = {
  [EProductListType.product]: CreateProductModal,
  [EProductListType.productGroup]: CreateProductModal,
  [EProductListType.productName]: CreateProductModal,
}
export const ProductManagementModal = () => {
  const currentParams = useCurrentParams()
  const navigate = useNavigate()

  const typeParam = currentParams['type'] || EProductListType.product

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
