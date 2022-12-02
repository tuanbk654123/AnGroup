import { PaperPageHeaderForDetails } from '~/components/layout'
import { useCurrentParams } from '~/hooks'
import { useAppTranslation } from '~/hooks/useAppTranslation'
import { RouterHelper } from '~/utils'

export const MenuHeaderForDetails = () => {
  const currentParams = useCurrentParams()
  const { t } = useAppTranslation()

  const breadCrumbRoutes = [
    // { breadcrumbName: 'Configuration ', path: `` },
    { breadcrumbName: t('configuration.mobileAppConfig'), path: `${RouterHelper.configuration_mobile_app}` },
    // {
    //   breadcrumbName: EUserTabLabel[currentParams['type'] || EUserListType.create],
    //   path: `${RouterHelper.administrator_user_management}?type=${currentParams['type'] || EUserListType.create}`,
    // },
    { breadcrumbName: currentParams['varname'], path: '' },
  ]
  return <PaperPageHeaderForDetails title={currentParams['varname']} breadCrumbRoutes={breadCrumbRoutes} />
}
