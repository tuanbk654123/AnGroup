import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom'
import { PaperPageHeaderForDetails } from '~/components/layout'
import { useCurrentParams } from '~/hooks'
import { useAppTranslation } from '~/hooks/useAppTranslation'
import { RouterHelper } from '~/utils'
import { EOrganizationListType, EOrganizationTabLabel } from '../../index.types'

const tabs = [
  {
    key: EOrganizationListType.head_office,
    label: 'Head Office',
  },
  {
    key: EOrganizationListType.supper_admin,
    label: 'Super Admin',
  },
]

export const OrgManagementHeaderForDetails = () => {
  const currentParams = useCurrentParams()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { t } = useAppTranslation()

  const breadCrumbRoutes = [
    {
      breadcrumbName: t('organizationManagement.title'),
      path: `${RouterHelper.administrator_organization_management}`,
    },
    {
      breadcrumbName: EOrganizationTabLabel[currentParams['type'] || 'head_office'],
      path: `${RouterHelper.administrator_organization_management}?type=${currentParams['type'] || 'head_office'}`,
    },
    { breadcrumbName: currentParams['org_name'], path: '' },
  ]

  const defaultActiveKey = searchParams.get('type') || tabs[0].key

  const handleChangeTab = (key: string) => {
    navigate({
      pathname: RouterHelper.administrator_organization_management,
      search: createSearchParams({
        type: key,
      }).toString(),
    })
  }

  return (
    <PaperPageHeaderForDetails
      defaultActiveKey={defaultActiveKey}
      onTabChange={handleChangeTab}
      tabs={tabs}
      title="Organization Management"
      breadCrumbRoutes={breadCrumbRoutes}
      displayTabs
    />
  )
}
