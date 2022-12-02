import { useCurrentPath } from '~/hooks'
import { RouterHelper } from '~/utils'
import { OrgManagementHeaderForList } from './components/header/for-list'
import { ORGManagementList } from './components/list'
import { OrganizationManagementModal } from './components/modals/modal-management'

export const OrganizationContainer: React.FC<any> = () => {
  const currentPath = useCurrentPath()
  const showModal = currentPath !== RouterHelper.administrator_organization_management

  return (
    <div>
      {showModal && <OrganizationManagementModal />}
      <OrgManagementHeaderForList />
      <div className="p-4 bg-white">
        <ORGManagementList />
      </div>
    </div>
  )
}
