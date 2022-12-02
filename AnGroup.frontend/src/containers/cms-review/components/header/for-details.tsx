import { PaperPageHeaderForDetails } from '~/components/layout'
import { useAppTranslation } from '~/hooks/useAppTranslation'
import { RouterHelper } from '~/utils'

export const CMSReviewHeaderForDetails = () => {
  const { t } = useAppTranslation()
  const breadCrumbRoutes = [
    // { breadcrumbName: 'CMS', path: RouterHelper.cms },
    {
      breadcrumbName: t('review.title'),
      path: RouterHelper.cms_review,
    },
    { breadcrumbName: t('review.detailReview'), path: '' },
  ]

  return <PaperPageHeaderForDetails title={t('review.detailReview')} breadCrumbRoutes={breadCrumbRoutes} />
}
