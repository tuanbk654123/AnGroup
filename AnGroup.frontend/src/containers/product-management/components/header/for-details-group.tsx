import { useParams } from 'react-router-dom'
import { PaperPageHeaderForDetails } from '~/components/layout'
import { useCurrentParams } from '~/hooks'
import { useAppTranslation } from '~/hooks/useAppTranslation'
import { useAppSelector } from '~/redux/hooks'
import { RouterHelper } from '~/utils'

export const ProductGroupManagementHeaderForDetails = () => {
  const currentParams = useCurrentParams()
  const dataProductgroupDetail = useAppSelector((state) => state.productgroup.dataProductgroupDetail)
  const { t } = useAppTranslation()
  const { id } = useParams()

  const breadCrumbRoutes = [
    { breadcrumbName: t('product.productManagement'), path: `${RouterHelper.product_management}` },
    {
      breadcrumbName: dataProductgroupDetail?.product?.nameEn,
      path: `${RouterHelper.product_edit_ref(dataProductgroupDetail?.product?.id)}?name=${
        dataProductgroupDetail?.product?.nameEn
      }`,
    },
    {
      breadcrumbName: currentParams['name'],
      path: `${RouterHelper.product_group_edit_ref(id)}?name=${currentParams['name']}`,
    },
  ]

  return <PaperPageHeaderForDetails title={currentParams['name']} breadCrumbRoutes={breadCrumbRoutes} />
}
