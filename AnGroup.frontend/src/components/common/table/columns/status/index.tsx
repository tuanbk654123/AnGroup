import { useAppTranslation } from '~/hooks/useAppTranslation'

export const ActiveStatus = () => {
  const { t } = useAppTranslation()
  return <div className="active-flag">{t('select.active')}</div>
}

export const InActiveStatus = () => {
  const { t } = useAppTranslation()
  return <div className="inactive-flag">{t('select.inActive')}</div>
}
