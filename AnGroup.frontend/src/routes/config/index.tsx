import { RouterHelper } from '~/utils'
import { MenuItem } from '~/components/layout/sidebar'
import { AppLayout } from '~/components/layout'
import { userRoutes } from './user.routes'
import { organizationRoutes } from './organization.routes'
import { submissionRoutes } from './submission.routes'
import { cmsRoutes } from './cms.routes'
import { configurationRoutes } from './configuration.routes'
import { roleRoutes } from './role.routes'
import { HomePage } from '~/pages/home'
import { productRoutes } from './product.routes'
import { authRoutes } from './auth.routes'
import { userProfile } from './user-profile.routes'
import { AdminNotificationPage } from '~/pages/admin-notification'
import { ListCategoryManagementPage } from '~/pages/category-management'
import { categoryRoutes } from './category'
import { SearchCreativePostPage } from '~/pages/creativepost'
import { SearchCreativePostCrawlPage } from '~/pages/creativepostcrawl'
import {SearchCategoryCrawlPage } from '~/pages/category-crawl'

export const DefaultLayout = AppLayout

export type RoutesItem = {
  path: string
  label?: string
  element: React.FC
  children?: RoutesItem[]
  icon?: React.ReactNode
  showOnMenu?: boolean
  layout?: React.FC
  isPrivate?: boolean
} & MenuItem

export const routes: RoutesItem[] = [
  {
    key: RouterHelper.creativepost,
    label: 'creative post',
    path: RouterHelper.creativepost,
    element: SearchCreativePostPage,
    showOnMenu: true,
    layout: DefaultLayout,
    isPrivate: true
  },
  {
    key: RouterHelper.creativepostcrawl,
    label: 'creative post crawl',
    path: RouterHelper.creativepostcrawl,
    element: SearchCreativePostCrawlPage,
    showOnMenu: true,
    layout: DefaultLayout,
    isPrivate: true
  },
  {
    key: RouterHelper.categorycrawl,
    label: 'category crawl',
    path: RouterHelper.categorycrawl,
    element: SearchCategoryCrawlPage,
    showOnMenu: true,
    layout: DefaultLayout,
    isPrivate: true
  },
  {
    key: RouterHelper.home,
    label: 'Home',
    path: RouterHelper.home,
    element: HomePage,
    showOnMenu: true,
    layout: DefaultLayout,
    isPrivate: true
  },
  ...categoryRoutes,
  {
    key: RouterHelper.submission,
    label: 'Submission Management',
    path: RouterHelper.submission,
    element: null,
    showOnMenu: true,
    layout: DefaultLayout,
    isPrivate: true,
    children: [...submissionRoutes],
  },
  {
    key: RouterHelper.administrator,
    label: 'Administrator',
    path: RouterHelper.administrator,
    element: null,
    showOnMenu: true,
    layout: DefaultLayout,
    children: [...userRoutes, ...organizationRoutes, ...roleRoutes],
  },
  ...productRoutes,
  {
    key: RouterHelper.cms,
    label: 'CMS',
    path: RouterHelper.cms,
    element: null,
    showOnMenu: true,
    layout: DefaultLayout,
    children: [...cmsRoutes],
  },
  {
    key: RouterHelper.configuration,
    label: 'Configuration',
    path: RouterHelper.configuration,
    element: null,
    showOnMenu: true,
    layout: DefaultLayout,
    isPrivate: true,
    // children: [...configurationRoutes],
  },
  ...authRoutes,
  // ...userProfile,
]