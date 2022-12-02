import { PaperPageHeaderForDetails } from '~/components/layout'
import { useCurrentParams } from '~/hooks'
import { RouterHelper } from '~/utils'
// import { EUserListType, EUserTabLabel } from '../../index.types'

export const HelpHeaderForDetails = () => {
  const currentParams = useCurrentParams()

  const breadCrumbRoutes = [
    { breadcrumbName: 'CMS ', path: `` },
    { breadcrumbName: 'Helps ', path: `${RouterHelper.cms_help}` },
    // {
    //   breadcrumbName: EUserTabLabel[currentParams['type'] || EUserListType.create],
    //   path: `${RouterHelper.administrator_user_management}?type=${currentParams['type'] || EUserListType.create}`,
    // },
    { breadcrumbName: currentParams['name'], path: '' },
  ]
  return <PaperPageHeaderForDetails title={currentParams['name']} breadCrumbRoutes={breadCrumbRoutes} />
}
