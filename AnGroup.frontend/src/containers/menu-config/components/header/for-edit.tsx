import { PaperPageHeaderForDetails } from '~/components/layout'
import { useAppTranslation } from '~/hooks/useAppTranslation'
import { RouterHelper } from '~/utils'

export const MenuHeaderForDetails = () => {
  const { t } = useAppTranslation()
  const breadCrumbRoutes = [
    // { breadcrumbName: t('configuration.configuration'), path: `` },
    { breadcrumbName: t('configuration.menuConfig'), path: `${RouterHelper.configuration_menu}` },
    { breadcrumbName: t('configuration.editMenu'), path: '' },
  ]
  return <PaperPageHeaderForDetails title={t('configuration.editMenu')} breadCrumbRoutes={breadCrumbRoutes} />
}
