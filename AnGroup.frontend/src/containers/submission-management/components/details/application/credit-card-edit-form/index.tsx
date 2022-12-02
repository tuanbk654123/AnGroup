import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { TabPaneItem } from '~/components/common'
import {
  ApplicationCreditPage1Fields,
  ApplicationCreditPage2Fields,
  ApplicationCreditPage3Fields,
  ApplicationCreditPage4Fields,
  ApplicationEformCreditPage2Fields,
  ApplicationEformCreditPage3Fields,
} from '~/containers/submission-management/constants/fields'
import { EApplicationListType, ESubmissionDetailListType } from '~/containers/submission-management/index.types'
import DetailsForm from '../../form'
import CreditCardOptionalPageEditForm from './credit-card-optional-page'

export interface ICreditCardEditFormManagementProps {
  tabs?: TabPaneItem[]
  isEForm?: boolean
}

export default function CreditCardEditFormManagement({ tabs = [], isEForm }: ICreditCardEditFormManagementProps) {
  const [searchParams] = useSearchParams()

  const listType = searchParams.get('page') || tabs[0]?.key
  const isOptionalPage = listType === ESubmissionDetailListType.optional

  const config = useMemo(() => {
    const reasonPage = tabs.findIndex((item) => item.key === listType) + 1
    switch (listType) {
      case EApplicationListType.page_1:
        return {
          dataFields: ApplicationCreditPage1Fields,
          reasonPage,
        }
      case EApplicationListType.page_2: {
        const dataFields = isEForm
          ? [...ApplicationCreditPage2Fields, ...ApplicationEformCreditPage2Fields]
          : ApplicationCreditPage2Fields
        return {
          dataFields,
          reasonPage,
        }
      }
      case EApplicationListType.page_3: {
        const dataFields = isEForm
          ? [...ApplicationCreditPage3Fields, ...ApplicationEformCreditPage3Fields]
          : ApplicationCreditPage3Fields
        return {
          dataFields,
          reasonPage,
        }
      }
      case EApplicationListType.page_4:
        return {
          dataFields: ApplicationCreditPage4Fields,
          reasonPage,
        }
      default:
        return {
          dataFields: [],
          reasonPage,
        }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listType, tabs])

  if (config.dataFields.length === 0) {
    return <CreditCardOptionalPageEditForm reasonPage={config.reasonPage} isOptionalPage={isOptionalPage} />
  }

  return <DetailsForm dataKey="application" dataFields={config.dataFields} reasonPage={config.reasonPage} />
}
