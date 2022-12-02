import { PaperPageHeaderForList } from '~/components/layout'
import { useAppTranslation } from '~/hooks/useAppTranslation'

export const NotificationHeaderForList = () => {
  const { t } = useAppTranslation()
  return <PaperPageHeaderForList title={t('notification.notification')} />
}
