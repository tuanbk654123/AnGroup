import { AppLayout } from '~/components/layout'
import {  ListUsersPage } from '~/pages/user-management'
import { RouterHelper } from '~/utils'
import { RoutesItem } from '.'

const DefaultLayout = AppLayout

export const userRoutes: RoutesItem[] = [
  {
    key: RouterHelper.administrator_user_management,
    label: 'User Management',
    path: RouterHelper.administrator_user_management,
    element: ListUsersPage,
    showOnMenu: true,
    layout: DefaultLayout,
    isPrivate: true,
  },
  // {
  //   key: RouterHelper.administrator_user_create,
  //   label: 'Create User',
  //   path: RouterHelper.administrator_user_create,
  //   element: CreateUsersPage,
  //   showOnMenu: false,
  //   layout: DefaultLayout,
  //   isPrivate: true,
  // },
  // {
  //   key: RouterHelper.administrator_user_edit,
  //   label: 'Edit User',
  //   path: RouterHelper.administrator_user_edit,
  //   element: EditUserPage,
  //   showOnMenu: false,
  //   layout: DefaultLayout,
  //   isPrivate: true,
  // },
]
