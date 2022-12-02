import { AppLayout } from '~/components/layout'
import { UserProfilePage } from '~/pages/user-profile'
import { RouterHelper } from '~/utils'
import { RoutesItem } from '.'

const DefaultLayout = AppLayout

export const userProfile: RoutesItem[] = [
  {
    key: RouterHelper.user_profile,
    label: 'User Profile',
    path: RouterHelper.user_profile,
    element: UserProfilePage,
    showOnMenu: true,
    layout: DefaultLayout,
    isPrivate: true,
  },
]
