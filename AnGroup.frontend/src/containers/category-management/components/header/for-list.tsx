import { PaperPageHeaderForList } from '~/components/layout'
import { useAppTranslation } from '~/hooks/useAppTranslation'

export const CategoryManagementHeaderForList = () => {
  const { t } = useAppTranslation()
  return <PaperPageHeaderForList title={t('category.categoryManagement')} />
}
