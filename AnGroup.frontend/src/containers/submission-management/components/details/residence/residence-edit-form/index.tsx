import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { TabPaneItem } from '~/components/common'
import {
  ResidenceCoverFields,
  ResidenceCustomerField,
  ResidenceHostField,
} from '~/containers/submission-management/constants/fields'
import { EResidenceListType, ESubmissionDetailListType } from '~/containers/submission-management/index.types'
import DetailsForm from '../../form'
import ResidenceOptionalPageEditForm from './optional-page'

export interface IResidenceEditFormManagementProps {
  tabs?: TabPaneItem[]
}

export default function ResidenceEditFormManagement({ tabs = [] }: IResidenceEditFormManagementProps) {
  const [searchParams] = useSearchParams()

  const listType = searchParams.get('page') || tabs[0]?.key
  const isOptionalPage = listType === ESubmissionDetailListType.optional

  const config = useMemo(() => {
    const reasonPage = tabs.findIndex((item) => item.key === listType) + 1
    switch (listType) {
      case EResidenceListType.page_of_cover:
        return {
          dataFields: ResidenceCoverFields,
          reasonPage,
        }
      case EResidenceListType.page_of_customer:
        return {
          dataFields: ResidenceCustomerField,
          reasonPage,
        }
      case EResidenceListType.page_of_host:
        return {
          dataFields: ResidenceHostField,
          reasonPage,
        }
      default:
        return {
          dataFields: [],
          reasonPage,
        }
    }
  }, [listType, tabs])

  if (config.dataFields.length === 0) {
    return <ResidenceOptionalPageEditForm reasonPage={config.reasonPage} isOptionalPage={isOptionalPage} />
  }

  return <DetailsForm dataKey="residenceDoc" dataFields={config.dataFields} reasonPage={config.reasonPage} />
}
