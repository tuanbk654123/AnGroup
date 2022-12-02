import { Spin } from 'antd'
import moment from 'moment'
import { useMemo } from 'react'
import { createSearchParams, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { PapperTabs } from '~/components/common'
import { useCurrentParams } from '~/hooks'
import { useAppSelector } from '~/redux/hooks'
import OtherDetailsForm from '../other-form'

export function OtherDocumentForm() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const currentParams = useCurrentParams()
  const location = useLocation()

  const programConfig = useAppSelector((state) => state.submission.programConfig)
  const dataSubmissionDetails = useAppSelector((state) => state.submission.dataSubmissionDetails)

  const tabs = useMemo(() => {
    const type = searchParams.get('type')
    return programConfig
      .filter((item) => item.name === type)
      .map((item) => ({
        label: item.title,
        key: item.page,
      }))
  }, [programConfig, searchParams])

  const defaultActiveKey = searchParams.get('page') || tabs?.[0]?.key

  const handleChangeTab = (key: string) => {
    const searchParamsString = createSearchParams({
      ...currentParams,
      page: key,
    }).toString()
    navigate(`${location.pathname}?${searchParamsString}`, { replace: true })
  }
  const subStatus = dataSubmissionDetails?.profileStatuses?.slice().sort((a, b) => moment(a.createdDate).valueOf() - moment(b.createdDate).valueOf());
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
          <OtherDetailsForm activeKey={defaultActiveKey} />
        </div>
      )}
    </>
  )
}
