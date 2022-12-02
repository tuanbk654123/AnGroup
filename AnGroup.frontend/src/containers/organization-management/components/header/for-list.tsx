import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom'
import { PaperPageHeaderForList } from '~/components/layout'
import { useAppTranslation } from '~/hooks/useAppTranslation'
import { RouterHelper } from '~/utils'
import { EOrganizationListType } from '../../index.types'

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

export const OrgManagementHeaderForList = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { t } = useAppTranslation()
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
    <PaperPageHeaderForList
      title={t('organizationManagement.title')}
      tabs={tabs}
      defaultActiveKey={defaultActiveKey}
      onTabChange={handleChangeTab}
    />
  )
}
