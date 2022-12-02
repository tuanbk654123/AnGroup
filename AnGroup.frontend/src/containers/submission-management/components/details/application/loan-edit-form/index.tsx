import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { TabPaneItem } from '~/components/common'
import {
  ApplicationEformLoanPage11Fields,
  ApplicationEformLoanPage1Fields,
  ApplicationEformLoanPage2Fields,
  ApplicationEformLoanPage3Fields,
  ApplicationEformLoanPage4Fields,
  ApplicationLoanPage11Fields,
  ApplicationLoanPage1Fields,
  ApplicationLoanPage2Fields,
  ApplicationLoanPage3Fields,
  ApplicationLoanPage4Fields,
} from '~/containers/submission-management/constants/fields'
import { EApplicationListType, ESubmissionDetailListType } from '~/containers/submission-management/index.types'
import DetailsForm from '../../form'
import LOANOptionalPageEditForm from './loan-optional-page'

export interface ILOANEditFormManagementProps {
  tabs?: TabPaneItem[]
  isEForm?: boolean
}

export default function LOANEditFormManagement({ tabs = [], isEForm }: ILOANEditFormManagementProps) {
  const [searchParams] = useSearchParams()

  const listType = searchParams.get('page') || tabs[0]?.key
  const isOptionalPage = listType === ESubmissionDetailListType.optional

  const config = useMemo(() => {
    const reasonPage = tabs.findIndex((item) => item.key === listType) + 1

    switch (listType) {
      case EApplicationListType.page_1: {
        const dataFields = isEForm
          ? [...ApplicationLoanPage1Fields, ...ApplicationEformLoanPage1Fields]
          : ApplicationLoanPage1Fields
        return {
          dataFields,
          reasonPage,
        }
      }
      case EApplicationListType.page_2: {
        const dataFields = isEForm
          ? [...ApplicationLoanPage2Fields, ...ApplicationEformLoanPage2Fields]
          : ApplicationLoanPage2Fields
        return {
          dataFields,
          reasonPage,
        }
      }
      case EApplicationListType.page_3: {
        const dataFields = isEForm
          ? [...ApplicationLoanPage3Fields, ...ApplicationEformLoanPage3Fields]
          : ApplicationLoanPage3Fields
        return {
          dataFields,
          reasonPage,
        }
      }
      case EApplicationListType.page_4: {
        const dataFields = isEForm
          ? [...ApplicationLoanPage4Fields, ...ApplicationEformLoanPage4Fields]
          : ApplicationLoanPage4Fields
        return {
          dataFields,
          reasonPage,
        }
      }
      case EApplicationListType.page_11: {
        const dataFields = isEForm
          ? [...ApplicationLoanPage11Fields, ...ApplicationEformLoanPage11Fields]
          : ApplicationLoanPage11Fields
        return {
          dataFields,
          reasonPage,
        }
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
    return <LOANOptionalPageEditForm reasonPage={config.reasonPage} isOptionalPage={isOptionalPage} />
  }

  return <DetailsForm dataKey="application" dataFields={config.dataFields} reasonPage={config.reasonPage} />
}
