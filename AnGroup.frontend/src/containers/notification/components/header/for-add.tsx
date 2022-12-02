import { PaperPageHeaderForDetails } from '~/components/layout'
import { useAppTranslation } from '~/hooks/useAppTranslation'
import { RouterHelper } from '~/utils'

export const NotificationHeaderForAdd = () => {
  const { t } = useAppTranslation()
  const breadCrumbRoutes = [
    { breadcrumbName: 'CMS ', path: `` },
    { breadcrumbName: t('notification.notification'), path: `${RouterHelper.cms_notification}` },
    { breadcrumbName: t('notification.createNewContent'), path: '' },
  ]
  return <PaperPageHeaderForDetails title="CREATE NEW CONTENT" breadCrumbRoutes={breadCrumbRoutes} />
}
