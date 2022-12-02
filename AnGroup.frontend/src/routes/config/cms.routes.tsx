import { AppLayout } from '~/components/layout'
import { CMSHelpPage, CMSNotificationPage, CMSReportPage, CMSUserLogWorkPage } from '~/pages/cms-management'
import { CMSReviewsPage } from '~/pages/cms-management/reviews'
import CMSReviewDetailPage from '~/pages/cms-management/reviews/review-detail-page'
import { CMSHelpAddlPage } from '~/pages/cms-management/help-add'
import { CMSHelpDetailPage } from '~/pages/cms-management/help-detail'
import { RouterHelper } from '~/utils'
import { RoutesItem } from '.'
import { CMSNotificationAddPage } from '~/pages/cms-management/notification-add'
import { CMSNotificationDetailPage } from '~/pages/cms-management/notification-detail'
import { CMSFolderPage } from '~/pages/cms-management/folder'
import { CMSFolderDetailPage } from '~/pages/cms-management/folder-detail'
import { CMSUserLogWorkDetailPage } from '~/pages/cms-management/user-log-work-detail'

const DefaultLayout = AppLayout

export const cmsRoutes: RoutesItem[] = [
  {
    key: RouterHelper.cms_help,
    label: 'Help',
    path: RouterHelper.cms_help,
    element: CMSHelpPage,
    showOnMenu: true,
    layout: DefaultLayout,
    isPrivate: true,
  },
  {
    key: RouterHelper.cms_help_detail,
    label: 'Help Detail',
    path: RouterHelper.cms_help_detail,
    element: CMSHelpDetailPage,
    showOnMenu: false,
    layout: DefaultLayout,
    isPrivate: true,
  },
  {
    key: RouterHelper.cms_help_create,
    label: 'Help Create',
    path: RouterHelper.cms_help_create,
    element: CMSHelpAddlPage,
    showOnMenu: false,
    layout: DefaultLayout,
    isPrivate: true,
  },
  {
    key: RouterHelper.cms_help_inactive_all,
    label: 'Help Inactive all',
    path: RouterHelper.cms_help_inactive_all,
    element: CMSHelpPage,
    showOnMenu: false,
    layout: DefaultLayout,
    isPrivate: true,
  },
  {
    key: RouterHelper.cms_help_cancel,
    label: 'Help Cancel',
    path: RouterHelper.cms_help_cancel,
    element: CMSHelpPage,
    showOnMenu: false,
    layout: DefaultLayout,
    isPrivate: true,
  },
  {
    key: RouterHelper.cms_notification,
    label: 'Notification',
    path: RouterHelper.cms_notification,
    element: CMSNotificationPage,
    showOnMenu: true,
    layout: DefaultLayout,
    isPrivate: true,
  },
  {
    key: RouterHelper.cms_notification_create,
    label: 'Notification',
    path: RouterHelper.cms_notification_create,
    element: CMSNotificationAddPage,
    showOnMenu: false,
    layout: DefaultLayout,
    isPrivate: true,
  },
  {
    key: RouterHelper.cms_notification_detail,
    label: 'Notification',
    path: RouterHelper.cms_notification_detail,
    element: CMSNotificationDetailPage,
    showOnMenu: false,
    layout: DefaultLayout,
    isPrivate: true,
  },
  {
    key: RouterHelper.cms_review,
    label: 'Review',
    path: RouterHelper.cms_review,
    element: CMSReviewsPage,
    showOnMenu: true,
    layout: DefaultLayout,
    isPrivate: true,
  },

  {
    key: RouterHelper.cms_review_detail,
    label: 'Review Details',
    path: RouterHelper.cms_review_detail,
    element: CMSReviewDetailPage,
    showOnMenu: false,
    layout: DefaultLayout,
    isPrivate: true,
  },

  {
    key: RouterHelper.cms_report,
    label: 'Report',
    path: RouterHelper.cms_report,
    element: CMSReportPage,
    showOnMenu: true,
    layout: DefaultLayout,
    isPrivate: true,
  },
  {
    key: RouterHelper.cms_user_logwork,
    label: 'User Logwork',
    path: RouterHelper.cms_user_logwork,
    element: CMSUserLogWorkPage,
    showOnMenu: true,
    layout: DefaultLayout,
    isPrivate: true,
  },
  {
    key: RouterHelper.cms_user_logwork_detail,
    label: 'User Logwork Detail',
    path: RouterHelper.cms_user_logwork_detail,
    element: CMSUserLogWorkDetailPage,
    showOnMenu: false,
    layout: DefaultLayout,
    isPrivate: true,
  },
  {
    key: RouterHelper.cms_folder,
    label: 'Folder',
    path: RouterHelper.cms_folder,
    element: CMSFolderPage,
    showOnMenu: true,
    layout: DefaultLayout,
    isPrivate: true,
  },
  {
    key: RouterHelper.cms_folder_detail,
    label: 'Folder Details',
    path: RouterHelper.cms_folder_detail,
    element: CMSFolderDetailPage,
    showOnMenu: false,
    layout: DefaultLayout,
    isPrivate: true,
  },
]
