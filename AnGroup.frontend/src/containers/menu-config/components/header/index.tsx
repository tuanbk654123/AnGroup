import React from 'react'
import { PaperPageHeaderForDetails } from '~/components/layout'
import { useAppTranslation } from '~/hooks/useAppTranslation'
import { RouterHelper } from '~/utils'

const MenuConfigHeader = () => {
  const { t } = useAppTranslation()
  const breadCrumbRoutes = [
    { breadcrumbName: t('configuration.configuration'), path: `${RouterHelper.home}` },
    {
      breadcrumbName: t('configuration.menuConfig'),
      path: ``,
    },
  ]
  return <PaperPageHeaderForDetails title={t('configuration.menuConfig')} breadCrumbRoutes={breadCrumbRoutes} />
}

export default MenuConfigHeader
