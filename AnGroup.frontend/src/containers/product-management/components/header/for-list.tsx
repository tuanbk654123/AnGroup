import { PaperPageHeaderForList } from '~/components/layout'
import { useAppTranslation } from '~/hooks/useAppTranslation'

export const ProductManagementHeaderForList = () => {
  const { t } = useAppTranslation()
  return <PaperPageHeaderForList title={t('product.productManagement')} />
}
