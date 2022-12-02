import { SubmissionHeaderForList } from './components/header/for-list'
import { VerifySubmissionList } from './components/list'
import { useGetListSubmission } from './hooks'
import { ETabIndex } from './index.types'

export const VerifySubmissionContainer = () => {
  useGetListSubmission(ETabIndex.VerifySubmission)

  return (
    <div className="p-4">
      <SubmissionHeaderForList />
      <VerifySubmissionList />
    </div>
  )
}
