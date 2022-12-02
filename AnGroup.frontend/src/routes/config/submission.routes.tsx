import { AppLayout } from '~/components/layout'
import {
  SubmissionAssignSalePage,
  SubmissionListingPage,
  SubmissionPushToFastAitherPage,
  SubmissionVerifyPage,
  SubmissionViewAllPage,
} from '~/pages/submission-management'
import { SubmissionDetailPage } from '~/pages/submission-management/details'
import { RouterHelper } from '~/utils'
import { RoutesItem } from '.'

const DefaultLayout = AppLayout

export const submissionRoutes: RoutesItem[] = [
  {
    key: RouterHelper.submission_view_all,
    label: 'View all',
    path: RouterHelper.submission_view_all,
    element: SubmissionViewAllPage,
    showOnMenu: true,
    layout: DefaultLayout,
    isPrivate: true,
  },
  {
    key: RouterHelper.submission_verify,
    label: 'Verify Submission',
    path: RouterHelper.submission_verify,
    element: SubmissionVerifyPage,
    showOnMenu: true,
    layout: DefaultLayout,
    isPrivate: true,
  },
  {
    key: RouterHelper.submission_assign_sale,
    label: 'Assign Sale',
    path: RouterHelper.submission_assign_sale,
    element: SubmissionAssignSalePage,
    showOnMenu: true,
    layout: DefaultLayout,
    isPrivate: true,
  },
  {
    key: RouterHelper.submission_listing,
    label: 'Submission',
    path: RouterHelper.submission_listing,
    element: SubmissionListingPage,
    showOnMenu: true,
    layout: DefaultLayout,
  },
  {
    key: RouterHelper.submission_push_to,
    label: 'Push to FAST & Aither',
    path: RouterHelper.submission_push_to,
    element: SubmissionPushToFastAitherPage,
    showOnMenu: true,
    layout: DefaultLayout,
    isPrivate: true,
  },
  {
    key: RouterHelper.submission_detail,
    label: 'Submission Detail',
    path: RouterHelper.submission_detail,
    element: SubmissionDetailPage,
    showOnMenu: false,
    layout: DefaultLayout
  },
]
