import { PaperPageHeaderForDetails } from '~/components/layout'
import { useCurrentParams } from '~/hooks'
import { RouterHelper } from '~/utils'

export const NotificationHeaderForDetails = () => {
  const currentParams = useCurrentParams()

  const breadCrumbRoutes = [
    { breadcrumbName: 'CMS ', path: `` },
    { breadcrumbName: 'Notification ', path: `${RouterHelper.cms_notification}` },
    { breadcrumbName: currentParams['name'], path: '' },
  ]
  return <PaperPageHeaderForDetails title={currentParams['name']} breadCrumbRoutes={breadCrumbRoutes} />
}
