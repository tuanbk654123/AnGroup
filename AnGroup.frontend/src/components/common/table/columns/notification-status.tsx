import { useAppTranslation } from '~/hooks/useAppTranslation'
export const NotificationRead = () => {
  const { t } = useAppTranslation()
  return <div className="active-flag">{t('adminNotification.read')}</div>
}

export const NotificationUnRead = () => {
  const { t } = useAppTranslation()
  return <div className="inactive-flag">{t('adminNotification.unRead')}</div>
}
