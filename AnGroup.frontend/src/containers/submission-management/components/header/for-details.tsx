import { useEffect, useMemo, useCallback } from 'react'
import { createSearchParams, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { uniqBy } from 'lodash'

import { useAppDispatch, useAppSelector } from '~/redux/hooks'
import { submissionGetProgramConfigRequest } from '~/redux/slices/submission/middleware'

import { useCurrentParams, useAppTranslation } from '~/hooks'
import { RouterHelper } from '~/utils'

import { PaperPageHeaderForDetails } from '~/components/layout'
import { EDocumentTypeId, ESubmissionDetailListType } from '../../index.types'
import ActionButtonList from '../details/action-button-list'

export const SubmissionHeaderForDetails = () => {
  const currentParams = useCurrentParams()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { id } = useParams()
  const dispatch = useAppDispatch()
  const { t } = useAppTranslation()
  const dataSubmissionDetails = useAppSelector((state) => state.submission.dataSubmissionDetails)
  const programConfig = useAppSelector((state) => state.submission.programConfig)

  const getProgramConfig = useCallback(
    (programId) => {
      if (!programId) {
        return
      }
      dispatch(
        submissionGetProgramConfigRequest({
          data: { programId, forSelect: true },
          requestWithLoading: false,
        }),
      )
    },
    [dispatch],
  )

  useEffect(() => {
    getProgramConfig(dataSubmissionDetails?.programId)
  }, [dataSubmissionDetails, getProgramConfig])

  // const otherTabs = useMemo(() => {
  //   return uniqBy(
  //     programConfig.filter(
  //       (item) =>
  //         item?.documentTypeId === EDocumentTypeId.other &&
  //         ![
  //           ESubmissionDetailListType.income,
  //           ESubmissionDetailListType.employment,
  //           ESubmissionDetailListType.customer,
  //           ESubmissionDetailListType.other,
  //         ].includes(item?.name),
  //     ),
  //     'name',
  //   ).map((item) => ({
  //     key: `${item?.name}`,
  //     label: item?.name,
  //   }))
  // }, [programConfig])

  const otherTabs = useMemo(() => {
    return uniqBy(
      programConfig.filter(
        (item) =>
          item?.documentTypeId === EDocumentTypeId.other
      ),
      'name',
    ).map((item) => ({
      key: `${item?.name}`,
      label: item?.name,
    }))
  }, [programConfig])

  const defaultTabs = [
    {
      key: ESubmissionDetailListType.general,
      // label: ESubmissionDetailTabLabel.general,
      label: t('submissionManagement.general'),
    },
    {
      key: ESubmissionDetailListType.indentification,
      // label: ESubmissionDetailTabLabel.indentification,
      label: t('submissionManagement.indentification'),
    },
    {
      key: ESubmissionDetailListType.residence,
      // label: ESubmissionDetailTabLabel.residence,
      label: t('submissionManagement.residence'),
    },
    {
      key: ESubmissionDetailListType.application,
      // label: ESubmissionDetailTabLabel.application,
      label: t('submissionManagement.application'),
    },
    // {
    //   key: ESubmissionDetailListType.customer,
    //   // label: ESubmissionDetailTabLabel.customer,
    //   label: t('submissionManagement.customers'),
    // },
    // {
    //   key: ESubmissionDetailListType.income,
    //   // label: ESubmissionDetailTabLabel.income,
    //   label: t('submissionManagement.income'),
    // },
    // {
    //   key: ESubmissionDetailListType.other,
    //   // label: ESubmissionDetailTabLabel.other,
    //   label: t('submissionManagement.other'),
    // },
  ]

  const breadCrumbRoutes = [
    { breadcrumbName: t('submissionManagement.title'), path: `${RouterHelper.submission_view_all}` },
    {
      breadcrumbName: t('submissionManagement.viewAll'),
      // path: `${RouterHelper.submission_view_all}?type=${currentParams['type']}`,
      path: `${RouterHelper.submission_view_all}`,
    },
    { breadcrumbName: currentParams['name'], path: '' },
  ]

  const defaultActiveKey = searchParams.get('type') || defaultTabs[0].key

  const handleChangeTab = (key: string) => {
    delete currentParams['page']
    delete currentParams['form']
    const searchParamsString = createSearchParams({
      ...currentParams,
      type: key,
    }).toString()
    navigate(`${RouterHelper.submission_detail_ref(id)}?${searchParamsString}`, {
      replace: true,
    })
  }
  return (
    <PaperPageHeaderForDetails
      defaultActiveKey={defaultActiveKey}
      onTabChange={handleChangeTab}
      tabs={[...defaultTabs, ...otherTabs]}
      title={t('submissionManagement.title')}
      breadCrumbRoutes={breadCrumbRoutes}
      displayTabs
      headerRightElement={<ActionButtonList />}
    />
  )
}
