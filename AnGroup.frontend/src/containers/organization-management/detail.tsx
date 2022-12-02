import ORGEditManagement from './components/edit'
import { OrgManagementHeaderForDetails } from './components/header/for-details'

export const OrganizationEditContainer = () => {
  return (
    <div className="bg-white">
      <OrgManagementHeaderForDetails />
      <div className="p-4">
        <ORGEditManagement />
      </div>
    </div>
  )
}
