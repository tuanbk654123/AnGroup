import { RouterHelper } from '~/utils'
import { CreateOrganizationPage, EditOrganizationPage, ListOrganizationPage } from '~/pages/organization'
import { RoutesItem } from '.'
import { AppLayout } from '~/components/layout'

const DefaultLayout = AppLayout

export const organizationRoutes: RoutesItem[] = [
  {
    key: RouterHelper.administrator_organization_management,
    label: 'Organization management',
    path: RouterHelper.administrator_organization_management,
    element: ListOrganizationPage,
    showOnMenu: true,
    layout: DefaultLayout,
    isPrivate: true,
  },
  {
    key: RouterHelper.administrator_organization_create,
    label: 'Create Organization',
    path: RouterHelper.administrator_organization_create,
    element: CreateOrganizationPage,
    showOnMenu: false,
    layout: DefaultLayout,
    isPrivate: true,
  },
  {
    key: RouterHelper.administrator_organization_edit,
    label: 'Create Organization',
    path: RouterHelper.administrator_organization_edit,
    element: EditOrganizationPage,
    showOnMenu: false,
    layout: DefaultLayout,
    isPrivate: true,
  },
]
