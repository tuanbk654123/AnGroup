import React from 'react'
import { PaperPageHeaderForDetails } from '~/components/layout'
import { useAppTranslation } from '~/hooks/useAppTranslation'
import { RouterHelper } from '~/utils'

const FastConfigHeader = () => {
  const { t } = useAppTranslation()
  const breadCrumbRoutes = [
    { breadcrumbName: t('configuration.configuration'), path: `${RouterHelper.home}` },
    {
      breadcrumbName: t('configuration.FASTConnectionConfig'),
      path: ``,
    },
  ]
  return (
    <PaperPageHeaderForDetails title={t('configuration.FASTConnectionConfig')} breadCrumbRoutes={breadCrumbRoutes} />
  )
}

export default FastConfigHeader
