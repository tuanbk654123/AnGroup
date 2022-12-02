import { ProductGroupManagementDetailForm } from './components/details/form-group'
import { ProductGroupManagementHeaderForDetails } from './components/header/for-details-group'

export const ProductGroupDetailsContainer = () => {
  return (
    <div>
      <ProductGroupManagementHeaderForDetails />
      <ProductGroupManagementDetailForm />
    </div>
  )
}
