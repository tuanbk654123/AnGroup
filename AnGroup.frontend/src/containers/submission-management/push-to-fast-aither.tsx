import { SubmissionHeaderForList } from './components/header/for-list'
import { PushToFastAitherList } from './components/list'
import { useGetListSubmission } from './hooks'
import { ETabIndex } from './index.types'

export const PushToFastAitherContainer = () => {
  useGetListSubmission(ETabIndex.PushToFast)

  return (
    <div className="p-4">
      <SubmissionHeaderForList />
      <PushToFastAitherList />
    </div>
  )
}
