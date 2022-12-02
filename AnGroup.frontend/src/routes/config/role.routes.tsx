import { AppLayout } from '~/components/layout'
import { CreateRoleManagementPage } from '~/pages/role-management/create'
import { EditRoleManagementPage } from '~/pages/role-management/edit'
import { ListRoleManagementPage } from '~/pages/role-management/list'
import { RouterHelper } from '~/utils'
import { RoutesItem } from '.'

const DefaultLayout = AppLayout

export const roleRoutes: RoutesItem[] = [
  {
    key: RouterHelper.administrator_role_management,
    label: 'Role Management',
    path: RouterHelper.administrator_role_management,
    element: ListRoleManagementPage,
    showOnMenu: true,
    layout: DefaultLayout,
    isPrivate: true,
  },
  {
    key: RouterHelper.administrator_role_management_create,
    label: 'Create Role Management',
    path: RouterHelper.administrator_role_management_create,
    element: CreateRoleManagementPage,
    showOnMenu: false,
    layout: DefaultLayout,
    isPrivate: true,
  },
  {
    key: RouterHelper.administrator_role_management_edit,
    label: 'Edit Role Management',
    path: RouterHelper.administrator_role_management_edit,
    element: EditRoleManagementPage,
    showOnMenu: false,
    layout: DefaultLayout,
    isPrivate: true,
  },
]
