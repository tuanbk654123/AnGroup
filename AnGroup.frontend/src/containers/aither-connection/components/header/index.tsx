import React from 'react'
import { PaperPageHeaderForDetails } from '~/components/layout'
import { useAppTranslation } from '~/hooks/useAppTranslation'
import { RouterHelper } from '~/utils'

const AitherConfigHeader = () => {
  const { t } = useAppTranslation()
  const breadCrumbRoutes = [
    { breadcrumbName: t('configuration.configuration'), path: `${RouterHelper.home}` },
    {
      breadcrumbName: t('configuration.aitherConnectionConfig'),
      path: ``,
    },
  ]
  return (
    <PaperPageHeaderForDetails title={t('configuration.aitherConnectionConfig')} breadCrumbRoutes={breadCrumbRoutes} />
  )
}

export default AitherConfigHeader
