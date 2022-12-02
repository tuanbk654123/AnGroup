import { AppLayout } from '~/components/layout'
import {
  ConfigurationAitherConnectionConfigPage,
  ConfigurationDMSConnectionConfigPage,
  ConfigurationMobilesAppConfigPage,
  ConfigurationSystemConfigPage,
} from '~/pages/configuration-management'

import { ConfigurationAitherConnectionConfigDetailPage } from '~/pages/configuration-management/aither-connection-config-edit'
import { DMSConnectionConfigCreatePage } from '~/pages/configuration-management/dms-connection-config-create'
import { ConfigurationFastConnectionConfigDetailPage } from '~/pages/configuration-management/dms-connection-config-edit'
import { MenuConfigPage } from '~/pages/configuration-management/menu-config'
import { MenuConfigCreatePage } from '~/pages/configuration-management/menu-config-create'
import { MenuConfigEditPage } from '~/pages/configuration-management/menu-config-edit'
import { ConfigurationMobilesAppConfigDetailPage } from '~/pages/configuration-management/mobiles-app-config-edit'
import { RouterHelper } from '~/utils'
import { RoutesItem } from '.'

const DefaultLayout = AppLayout

export const configurationRoutes: RoutesItem[] = [
  {
    key: RouterHelper.configuration_system,
    label: 'System',
    path: RouterHelper.configuration_system,
    element: ConfigurationSystemConfigPage,
    showOnMenu: true,
    layout: DefaultLayout,
    isPrivate: true,
  },
  {
    key: RouterHelper.configuration_aither_connection,
    label: 'Aither Connection Config',
    path: RouterHelper.configuration_aither_connection,
    element: ConfigurationAitherConnectionConfigPage,
    showOnMenu: true,
    layout: DefaultLayout,
    isPrivate: true,
  },
  {
    key: RouterHelper.configuration_aither_connection_detail,
    label: 'Aither Connection Config Edit',
    path: RouterHelper.configuration_aither_connection_detail,
    element: ConfigurationAitherConnectionConfigDetailPage,
    showOnMenu: false,
    layout: DefaultLayout,
    isPrivate: true,
  },
  {
    key: RouterHelper.configuration_DMS_connection,
    label: 'FAST Connection Config',
    path: RouterHelper.configuration_DMS_connection,
    element: ConfigurationDMSConnectionConfigPage,
    showOnMenu: true,
    layout: DefaultLayout,
    isPrivate: true,
  },
  {
    key: RouterHelper.configuration_DMS_connection_detail,
    label: 'FAST Connection Config Detail',
    path: RouterHelper.configuration_DMS_connection_detail,
    element: ConfigurationFastConnectionConfigDetailPage,
    showOnMenu: false,
    layout: DefaultLayout,
    isPrivate: true,
  },
  {
    key: RouterHelper.configuration_DMS_connection_create,
    label: 'DMS Connection Config Create',
    path: RouterHelper.configuration_DMS_connection_create,
    element: DMSConnectionConfigCreatePage,
    showOnMenu: false,
    layout: DefaultLayout,
    isPrivate: true,
  },
  {
    key: RouterHelper.configuration_mobile_app,
    label: 'Mobile App Config',
    path: RouterHelper.configuration_mobile_app,
    element: ConfigurationMobilesAppConfigPage,
    showOnMenu: true,
    layout: DefaultLayout,
    isPrivate: true,
  },
  {
    key: RouterHelper.configuration_mobile_app_detail,
    label: 'Mobile App Config Detail',
    path: RouterHelper.configuration_mobile_app_detail,
    element: ConfigurationMobilesAppConfigDetailPage,
    showOnMenu: false,
    layout: DefaultLayout,
    isPrivate: true,
  },
  {
    key: RouterHelper.configuration_menu,
    label: 'Menu Config',
    path: RouterHelper.configuration_menu,
    element: MenuConfigPage,
    showOnMenu: true,
    layout: DefaultLayout,
    isPrivate: true,
  },
  {
    key: RouterHelper.configuration_menu_create,
    label: 'Menu Config Create',
    path: RouterHelper.configuration_menu_create,
    element: MenuConfigCreatePage,
    showOnMenu: false,
    layout: DefaultLayout,
    isPrivate: true,
  },
  {
    key: RouterHelper.configuration_menu_edit,
    label: 'Menu Config Edit',
    path: RouterHelper.configuration_menu_edit,
    element: MenuConfigEditPage,
    showOnMenu: false,
    layout: DefaultLayout,
    isPrivate: true,
  },
]
