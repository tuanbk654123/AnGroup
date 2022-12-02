import { Spin } from 'antd'
import { useMemo } from 'react'
import { createSearchParams, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import { PapperTabs } from '~/components/common'
import { EProductType } from '~/containers/product-management/index.types'
import { convertProgramConfigToTabs } from '~/containers/submission-management/helpers'
import { useCurrentParams } from '~/hooks'
import { useAppSelector } from '~/redux/hooks'
import CreditCardEditFormManagement from './credit-card-edit-form'
import LOANEditFormManagement from './loan-edit-form'

export default function ApplicationEditForm() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const currentParams = useCurrentParams()
  const location = useLocation()

  const dataSubmissionDetails = useAppSelector((state) => state.submission.dataSubmissionDetails)
  const programConfig = useAppSelector((state) => state.submission.programConfig)

  const applicationFormType = dataSubmissionDetails?.application?.formType
  const isCreditCard = [EProductType.credit, EProductType.eformCredit].includes(applicationFormType)
  const isEForm = dataSubmissionDetails?.isEform === 'Y'

  const tabs = useMemo(() => {
    return convertProgramConfigToTabs(programConfig, {
      documentTypeName: 'application',
      isLoan: !isCreditCard,
      withOptionTab: true,
    })
  }, [programConfig, isCreditCard])

  const defaultActiveKey = searchParams.get('page') || tabs?.[0]?.key

  const handleChangeTab = (key: string) => {
    const searchParamsString = createSearchParams({
      form: isCreditCard ? 'credit-card' : 'loan',
      ...currentParams,
      page: key,
    }).toString()
    navigate(`${location.pathname}?${searchParamsString}`, { replace: true })
  }
  // const submissionSubStatus = (dataSubmissionDetails?.profileStatuses || []).at(-1)?.subStatus
  const subStatus = dataSubmissionDetails?.profileStatuses?.slice().sort((a, b) => a.id - b.id);
  const submissionSubStatus = (subStatus || []).at(-1)?.subStatus
  return (
    <>
      {submissionSubStatus === undefined ? (
        <div className="flex justify-center items-center">
          <Spin size="default"></Spin>
        </div>
      ) : (
        <div>
          <PapperTabs
            centered
            tabs={tabs}
            defaultActiveKey={defaultActiveKey}
            activeKey={defaultActiveKey}
            onChange={handleChangeTab}
            className="mb-4"
          />
          {tabs.length > 0 &&
            (isCreditCard ? (
              <CreditCardEditFormManagement isEForm={isEForm} tabs={tabs} />
            ) : (
              <LOANEditFormManagement isEForm={isEForm} tabs={tabs} />
            ))}
        </div>
      )}
    </>
  )
}
