import React from 'react'
import { PaperPageHeaderForDetails } from '~/components/layout'
import { useAppTranslation } from '~/hooks/useAppTranslation'
import { RouterHelper } from '~/utils'

const SystemConfigHeader = () => {
  const { t } = useAppTranslation()

  const breadCrumbRoutes = [
    { breadcrumbName: t('configuration.configuration'), path: `${RouterHelper.home}` },
    {
      breadcrumbName: t('configuration.systemConfig'),
      path: ``,
    },
  ]
  return <PaperPageHeaderForDetails title={t('configuration.systemConfig')} breadCrumbRoutes={breadCrumbRoutes} />
}

export default SystemConfigHeader
