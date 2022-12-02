import { AppLayout } from '~/components/layout'
import {
  //CreateCategoryManagementPage,
  //DetailCategoryManagementPage,
  ListCategoryManagementPage,
} from '~/pages/category-management'
import { RouterHelper } from '~/utils'
import { RoutesItem } from '.'

const DefaultLayout = AppLayout

export const categoryRoutes: RoutesItem[] = [
  {
    key: RouterHelper.category_management,
    label: 'Category Management',
    path: RouterHelper.category_management,
    element: ListCategoryManagementPage,
    showOnMenu: true,
    layout: DefaultLayout,
    isPrivate: true,
  },
  // {
  //   key: RouterHelper.category_edit,
  //   label: 'EditCategoryManagementPage',
  //   path: RouterHelper.category_edit,
  //   element: DetailCategoryManagementPage,
  //   showOnMenu: false,
  //   layout: DefaultLayout,
  //   isPrivate: false,
  // },
  // {
  //   key: RouterHelper.category_create,
  //   label: 'CreateCategoryManagementPage',
  //   path: RouterHelper.category_create,
  //   element: CreateCategoryManagementPage,
  //   showOnMenu: false,
  //   layout: DefaultLayout,
  //   isPrivate: false,
  // },
]
