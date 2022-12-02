import { PaperPageHeaderForList } from '~/components/layout'
import { useAppTranslation } from '~/hooks/useAppTranslation'

export const RoleManagementHeaderForList = () => {
  const { t } = useAppTranslation()
  return <PaperPageHeaderForList title={t('roleManagement.title')} />
}
