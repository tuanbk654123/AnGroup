import { PaperPageHeaderForDetails } from '~/components/layout'
import { useAppTranslation } from '~/hooks/useAppTranslation'
import { RouterHelper } from '~/utils'

export const RoleManagementHeaderForDetails = () => {
  const { t } = useAppTranslation()
  const breadCrumbRoutes = [
    { breadcrumbName: t('roleManagement.title'), path: `${RouterHelper.administrator_role_management}` },
    { breadcrumbName: t('roleManagement.createRole'), path: '' },
  ]
  return <PaperPageHeaderForDetails title={t('roleManagement.createRole')} breadCrumbRoutes={breadCrumbRoutes} />
}
