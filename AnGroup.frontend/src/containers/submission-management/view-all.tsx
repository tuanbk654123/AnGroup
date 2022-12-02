import { SubmissionHeaderForList } from './components/header/for-list'
import { SubmissionViewAllList } from './components/list'
import { useGetListSubmission } from './hooks'
import { ETabIndex } from './index.types'

export const ViewAllSubmissionContainer = () => {
  useGetListSubmission(ETabIndex.ViewAll)

  return (
    <div className="p-4">
      <SubmissionHeaderForList />
      <SubmissionViewAllList />
    </div>
  )
}
