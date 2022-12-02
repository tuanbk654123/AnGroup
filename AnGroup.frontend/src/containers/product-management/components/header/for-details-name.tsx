import { useParams } from 'react-router-dom'
import { PaperPageHeaderForDetails } from '~/components/layout'
import { useAppTranslation, useCurrentParams } from '~/hooks'
import { useAppSelector } from '~/redux/hooks'
import { RouterHelper } from '~/utils'

export const ProductNameManagementHeaderForDetails = () => {
  const { t } = useAppTranslation()
  const currentParams = useCurrentParams()
  const dataProgramDetails = useAppSelector((state) => state.program.dataProgramDetails)
  const { id } = useParams()

  const breadCrumbRoutes = [
    { breadcrumbName: t('product.productManagement'), path: `${RouterHelper.product_management}` },
    {
      breadcrumbName: dataProgramDetails?.group?.product?.nameEn,
      path: `${RouterHelper.product_edit_ref(dataProgramDetails?.group?.product?.id)}?name=${
        dataProgramDetails?.group?.product?.nameEn
      }`,
    },
    {
      breadcrumbName: dataProgramDetails?.group?.nameEn,
      path: `${RouterHelper.product_group_edit_ref(dataProgramDetails?.group?.id)}?name=${
        dataProgramDetails?.group?.nameEn
      }`,
    },
    {
      breadcrumbName: currentParams['name'],
      path: `${RouterHelper.product_name_edit_ref(id)}?name=${currentParams['name']}`,
    },
  ]

  return <PaperPageHeaderForDetails title={currentParams['name']} breadCrumbRoutes={breadCrumbRoutes} />
}
