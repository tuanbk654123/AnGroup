import { ProductManagementList } from './components/list'
import { useCurrentPath } from '~/hooks'
import { RouterHelper } from '~/utils'
import { ProductManagementModal } from './components/modals'
import { ProductManagementHeaderForList } from './components/header/for-list'

export const ProductsContainer: React.FC = () => {
  const currentPath = useCurrentPath()

  const showModal = currentPath !== RouterHelper.product_management

  return (
    <div className="bg-white">
      <ProductManagementHeaderForList />
      <ProductManagementList />
      {showModal && <ProductManagementModal />}
    </div>
  )
}
