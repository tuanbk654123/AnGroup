import { useEffect } from 'react'
import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from '~/components/common/table/table/index.props'
import { useCurrentParams } from '~/hooks'
import { useAppDispatch } from '~/redux/hooks'
import { submissionActions } from '~/redux/slices'
import { submissionSearchByNameRequest } from '~/redux/slices/submission/middleware'
import { SubmissionSubfix } from '~/services/submisstion/index.types'
import { ETabIndex } from '../index.types'

export const useGetListSubmission = (tabIndex: ETabIndex) => {
  const dispatch = useAppDispatch()
  const currentParams = useCurrentParams()

  useEffect(() => {
    return () => {
      dispatch(submissionActions.resetSlice())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    getData(currentParams)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentParams, tabIndex])

  const getSubfixByTabIndex = (_tabIndex: ETabIndex): SubmissionSubfix => {
    return ''
    // switch (_tabIndex) {
    //   case ETabIndex.ViewAll:
    //     return 'viewall'
    //   case ETabIndex.AssignSale:
    //     return 'assign-sale'
    //   case ETabIndex.PushToFast:
    //     return 'push-to-fast'
    //   case ETabIndex.VerifySubmission:
    //     return 'verify'
    //   case ETabIndex.Submission:
    //     return ''
    //   default:
    //     return 'viewall'
    // }
  }

  const getData = (_params) => {
    const { name, pageIndex = DEFAULT_PAGE_INDEX, pageSize = DEFAULT_PAGE_SIZE } = _params

    const subfix = getSubfixByTabIndex(tabIndex)

    dispatch(
      submissionSearchByNameRequest({
        data: {
          subfix,
          filter: {
            name,
            TabIndex: Number(tabIndex),
          },
          pagination: {
            pageIndex: Number(pageIndex),
            pageSize: Number(pageSize),
          },
        },
      }),
    )
  }
}
