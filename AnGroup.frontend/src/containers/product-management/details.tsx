import { ProductManagementDetailForm } from './components/details/form'
import { ProductManagementHeaderForDetails } from './components/header/for-details'

export const ProductDetailsContainer = () => {
  return (
    <div>
      <ProductManagementHeaderForDetails />
      <ProductManagementDetailForm />
    </div>
  )
}
