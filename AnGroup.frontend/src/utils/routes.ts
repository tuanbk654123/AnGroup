import { RoutesItem } from '~/routes/config'

export const RouterHelper = {
  admin_notification: '/admin-notification',
  home: '/',
  login: '/login',
  signinoidc: '/signin-oidc',
  signoutoidc: '/signout-oidc',

  forgot_password: '/forgot-password',
  verify_otp: '/verify-otp',
  reset_password: '/reset-password',

  change_password: '/change-password',
  user_profile: '/user-profile',
  user_profile_ref: (id: string) => `/user-profile/${id}`,

  administrator: '/administrator',
  administrator_user_management: '/administrator/users-management',
  administrator_user_detail: '/administrator/user-management/detail/:id',
  administrator_user_edit: '/administrator/user-management/edit/:id',
  administrator_user_create: '/administrator/user-management/create',
  administrator_user_detail_ref: (id: string | number) => `/administrator/user-management/detail/${id}`,
  administrator_user_edit_ref: (id: string | number) => `/administrator/user-management/edit/${id}`,

  administrator_organization_management: '/administrator/organization-management',
  administrator_organization_create: '/administrator/organization-management/create',
  administrator_organization_edit: '/administrator/organization-management/edit/:id',
  administrator_organization_edit_ref: (id: string) => `/administrator/organization-management/edit/${id}`,

  administrator_role_management: '/administrator/role-management',
  administrator_role_management_create: '/administrator/role-management/create',
  administrator_role_management_edit: '/administrator_role_management/edit/:id',
  administrator_role_management_edit_ref: (id: string) => `/administrator_role_management/edit/${id}`,

  product_management: '/product-management',
  product_management_create: '/product-management/create',
  product_detail: '/product-management/detail/:id',
  product_edit: '/product-management/edit/:id',
  product_edit_ref: (id: string) => `/product-management/edit/${id}`,
  product_detail_ref: (id: string) => `/product-management/detail/${id}`,
  product_management_add_product: '/product-management/product-add/:id',
  product_management_add_product_ref: (id: string) => `/product-management/product-add/${id}`,

  product_management_add: '/product-management/:id/add',
  product_management_add_ref: (id: string) => `/product-management/${id}/add`,

  product_management_product_group_add: '/product-management/:productId/product-group/:id/add',
  product_management_product_group_add_ref: (productId: string, id: string) =>
    `/product-management/${productId}/product-group/${id}/add`,

  product_group_edit: '/product-management/group/edit/:id',
  product_group_edit_ref: (id: string) => `/product-management/group/edit/${id}`,
  product_name_edit: '/product-management/name/edit/:id',
  product_name_edit_ref: (id: string) => `/product-management/name/edit/${id}`,

  submission: '/submission',
  submission_view_all: '/submission/view-all',
  submission_detail: `/submission/detail/:id`,
  submission_detail_ref: (id: string) => `/submission/detail/${id}`,
  submission_verify: '/submission/verify',
  submission_assign_sale: '/submission/assign-sale',
  submission_listing: '/submission/listing-submission',
  submission_push_to: '/submission/push-to-fast-aither',

  cms: '/cms',
  cms_help: '/cms/help',
  cms_help_detail: '/cms/help/detail/:id',
  cms_help_detail_ref: (id: string) => `/cms/help/detail/${id}`,
  cms_help_inactive_all: '/cms/help/inactive-all',
  cms_help_cancel: '/cms/help/cancel',
  cms_help_create: '/cms/help/create',
  cms_notification: '/cms/notification',
  cms_notification_create: '/cms/notification/create',
  cms_notification_detail: '/cms/notification/detail/:id',
  cms_notification_detail_ref: (id: string) => `/cms/notification/detail/${id}`,
  cms_review: '/cms/review',
  cms_review_detail: `/cms/review/detail/:id`,
  cms_review_detail_ref: (id: string) => `/cms/review/detail/${id}`,
  cms_report: '/cms/report',
  cms_user_logwork: '/cms/user-log-work',
  cms_user_logwork_detail: '/cms/user-logwork/detail/:id',
  cms_user_logwork_detail_ref: (id: string) => `/cms/user-logwork/detail/${id}`,
  cms_folder: '/cms/folder',
  cms_folder_detail: `/cms/folder/:id`,
  cms_folder_detail_ref: (name: string) => `/cms/folder/${name}`,

  category_management: '/category-management',
  category_create: '/category-management/create',
  category_edit: '/category-management/edit/:id',


  configuration: '/configuration',
  configuration_system: '/configuration/system-config',
  configuration_aither_connection: '/configuration/aither-connection',
  configuration_aither_connection_detail: '/configuration-aither-connection/edit/:id',
  configuration_aither_connection_detail_ref: (id: string) => `/configuration-aither-connection/edit/${id}`,
  configuration_aither_connection_create: '/configuration/aither-connection/create',
  configuration_DMS_connection: '/configuration/dms-connection',
  configuration_DMS_connection_detail: '/configuration-fast-connection/edit/:id',
  configuration_DMS_connection_detail_ref: (id: string) => `/configuration-fast-connection/edit/${id}`,
  configuration_DMS_connection_create: '/configuration/dms-connection/create',
  configuration_mobile_app: '/configuration/mobile-app',
  configuration_mobile_app_detail: '/configuration-mobile-app/edit/:id',
  configuration_mobile_app_detail_ref: (id: string) => `/configuration-mobile-app/edit/${id}`,
  configuration_menu: '/configuration/menu',
  configuration_menu_create: '/configuration/menu/create',
  configuration_menu_edit: '/configuration_menu/edit/:id',
  configuration_menu_edit_ref: (id: string) => `/configuration_menu/edit/${id}`,

  notification: '/notification/:id',
  notification_ref: (id: string) => `/notification/${id}`,

  creativepost: '/creativepost',
  creativepostcrawl: '/creativepostcrawl',
  categorycrawl: '/categorycrawl',
}

export const flattenRoutes = (routes: RoutesItem[]) => {
  const result = []
  const appendRoute = (router: RoutesItem) => {
    const routesChild = router?.children || []
    result.push(router)
    if (routesChild.length > 0) {
      routesChild.forEach((rc) => appendRoute(rc))
    }
  }
  ;[...routes].forEach((router) => appendRoute(router))
  return result
}
