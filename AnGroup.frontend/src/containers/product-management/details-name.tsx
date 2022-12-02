import { ProductNameManagementDetailForm } from './components/details/form-name'
import { ProductNameManagementHeaderForDetails } from './components/header/for-details-name'

export const ProductNameDetailsContainer = () => {
  return (
    <div>
      <ProductNameManagementHeaderForDetails />
      <ProductNameManagementDetailForm />
    </div>
  )
}
