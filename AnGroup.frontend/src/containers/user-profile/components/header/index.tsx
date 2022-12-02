import { PaperPageHeaderForDetails } from '~/components/layout'
import { useCurrentParams } from '~/hooks'

export const UserProfileForDetails = () => {
  const currentParams = useCurrentParams()

  const breadCrumbRoutes = [
    { breadcrumbName: 'Home', path: `/` },
    { breadcrumbName: currentParams['name'], path: '' },
  ]
  return <PaperPageHeaderForDetails title={currentParams['name']} breadCrumbRoutes={breadCrumbRoutes} />
}
