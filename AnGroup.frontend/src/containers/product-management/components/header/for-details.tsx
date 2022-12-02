import { useParams } from 'react-router-dom'
import { PaperPageHeaderForDetails } from '~/components/layout'
import { useCurrentParams } from '~/hooks'
import { useAppTranslation } from '~/hooks/useAppTranslation'
import { RouterHelper } from '~/utils'

export const ProductManagementHeaderForDetails = () => {
  const currentParams = useCurrentParams()
  const { id } = useParams()
  const { t } = useAppTranslation()

  const breadCrumbRoutes = [
    { breadcrumbName: t('product.productManagement'), path: `${RouterHelper.product_management}` },
    {
      breadcrumbName: currentParams['name'],
      path: `${RouterHelper.product_edit_ref(id)}?name=${currentParams['name']}`,
    },
  ]

  return <PaperPageHeaderForDetails title={currentParams['name']} breadCrumbRoutes={breadCrumbRoutes} />
}
