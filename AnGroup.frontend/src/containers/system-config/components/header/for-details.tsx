import { PaperPageHeaderForDetails } from '~/components/layout'
import { useCurrentParams } from '~/hooks'
import { useAppTranslation } from '~/hooks/useAppTranslation'
import { RouterHelper } from '~/utils'
// import { EUserListType, EUserTabLabel } from '../../index.types'

export const FastConfigHeaderForDetails = () => {
  const { t } = useAppTranslation()
  const currentParams = useCurrentParams()

  const breadCrumbRoutes = [
    // { breadcrumbName: t('configuration.configuration'), path: `` },
    { breadcrumbName: t('configuration.FASTConnectionConfig'), path: `${RouterHelper.configuration_DMS_connection}` },
    { breadcrumbName: currentParams['varname'], path: '' },
  ]
  return <PaperPageHeaderForDetails title={currentParams['varname']} breadCrumbRoutes={breadCrumbRoutes} />
}
