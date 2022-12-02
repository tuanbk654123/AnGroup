import { SubmissionHeaderForList } from './components/header/for-list'
import { SubmissionAssignSaleList } from './components/list'
import { useGetListSubmission } from './hooks'
import { ETabIndex } from './index.types'

export const AssignSaleContainer = () => {
  useGetListSubmission(ETabIndex.AssignSale)

  return (
    <div className="p-4">
      <SubmissionHeaderForList />
      <SubmissionAssignSaleList />
    </div>
  )
}
