import { AppLayout } from '~/components/layout'
import {
  AddProductManagementPage,
  CreateProductManagementPage,
  DetailProductManagementPage,
  ListProductManagementPage,
} from '~/pages/product-management'
import { DetailProductGroupManagementPage } from '~/pages/product-management/details-group'
import { DetailProductNameManagementPage } from '~/pages/product-management/details-name'
import { RouterHelper } from '~/utils'
import { RoutesItem } from '.'

const DefaultLayout = AppLayout

export const productRoutes: RoutesItem[] = [
  {
    key: RouterHelper.product_management,
    label: 'Product Management',
    path: RouterHelper.product_management,
    element: ListProductManagementPage,
    showOnMenu: true,
    layout: DefaultLayout,
    isPrivate: true,
  },
  {
    key: RouterHelper.product_edit,
    label: 'EditProductManagementPage',
    path: RouterHelper.product_edit,
    element: DetailProductManagementPage,
    showOnMenu: false,
    layout: DefaultLayout,
    isPrivate: true,
  },
  {
    key: RouterHelper.product_group_edit,
    label: 'EditProductGroupManagementPage',
    path: RouterHelper.product_group_edit,
    element: DetailProductGroupManagementPage,
    showOnMenu: false,
    layout: DefaultLayout,
    isPrivate: true,
  },
  {
    key: RouterHelper.product_name_edit,
    label: 'EditProductNameManagementPage',
    path: RouterHelper.product_name_edit,
    element: DetailProductNameManagementPage,
    showOnMenu: false,
    layout: DefaultLayout,
    isPrivate: true,
  },
  {
    key: RouterHelper.product_management_create,
    label: 'CreateProductManagementPage',
    path: RouterHelper.product_management_create,
    element: CreateProductManagementPage,
    showOnMenu: false,
    layout: DefaultLayout,
    isPrivate: true,
  },
  {
    key: RouterHelper.product_management_product_group_add,
    label: 'AddProductManagementPage',
    path: RouterHelper.product_management_product_group_add,
    element: AddProductManagementPage,
    showOnMenu: false,
    layout: DefaultLayout,
  },
  {
    key: RouterHelper.product_management_add,
    label: 'AddProductManagementPage',
    path: RouterHelper.product_management_add,
    element: AddProductManagementPage,
    showOnMenu: false,
    layout: DefaultLayout,
  },
]
