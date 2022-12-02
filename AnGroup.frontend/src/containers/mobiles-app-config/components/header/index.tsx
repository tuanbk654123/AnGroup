import React from 'react'
import { PaperPageHeaderForDetails } from '~/components/layout'
import { useAppTranslation } from '~/hooks/useAppTranslation'
import { RouterHelper } from '~/utils'

const MobileAppConfigHeader = () => {
  const { t } = useAppTranslation()
  const breadCrumbRoutes = [
    { breadcrumbName: t('configuration.configuration'), path: `${RouterHelper.home}` },
    {
      breadcrumbName: t('configuration.mobileAppConfig'),
      path: ``,
    },
  ]
  return <PaperPageHeaderForDetails title={t('configuration.mobileAppConfig')} breadCrumbRoutes={breadCrumbRoutes} />
}

export default MobileAppConfigHeader
