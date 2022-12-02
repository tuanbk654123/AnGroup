import { PaperPageHeaderForDetails } from '~/components/layout'
import { useCurrentParams } from '~/hooks'
import { useAppTranslation } from '~/hooks/useAppTranslation'
import { RouterHelper } from '~/utils'
// import { EUserListType, EUserTabLabel } from '../../index.types'

export const AitherConfigHeaderForDetails = () => {
  const { t } = useAppTranslation()
  const currentParams = useCurrentParams()

  const breadCrumbRoutes = [
    // { breadcrumbName: t('configuration.configuration'), path: `` },
    {
      breadcrumbName: t('configuration.aitherConnectionConfig'),
      path: `${RouterHelper.configuration_aither_connection}`,
    },
    // {
    //   breadcrumbName: EUserTabLabel[currentParams['type'] || EUserListType.create],
    //   path: `${RouterHelper.administrator_user_management}?type=${currentParams['type'] || EUserListType.create}`,
    // },
    { breadcrumbName: currentParams['varname'], path: '' },
  ]
  return <PaperPageHeaderForDetails title={currentParams['varname']} breadCrumbRoutes={breadCrumbRoutes} />
}
