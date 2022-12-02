// import { useCurrentPath } from '~/hooks'

import { RoleManagementList } from './components/list'
import { RoleManagementHeaderForList } from './components/header'

export const RoleManagementContainer: React.FC<any> = () => {
  return (
    <div className="bg-white">
      <RoleManagementHeaderForList />
      <RoleManagementList />
    </div>
  )
}
