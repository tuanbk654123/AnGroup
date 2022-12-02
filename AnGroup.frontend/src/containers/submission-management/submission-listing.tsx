import { SubmissionHeaderForList } from './components/header/for-list'
import { SubmissionListing } from './components/list'
import { useGetListSubmission } from './hooks'
import { ETabIndex } from './index.types'

export const SubmissionListingContainer = () => {
  useGetListSubmission(ETabIndex.Submission)

  return (
    <div className="p-4">
      <SubmissionHeaderForList />
      <SubmissionListing />
    </div>
  )
}
