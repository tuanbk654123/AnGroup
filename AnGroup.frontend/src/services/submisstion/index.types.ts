import { ETabIndex } from '~/containers/submission-management/index.types'
import { IPaginationRequest } from '../index.types'

export interface ISubmissionSearchByNameFilter {
  querySearch?: string
  name?: string
  TabIndex?: ETabIndex
}

export type SubmissionSubfix = 'viewall' | 'verify' | 'assign-sale' | 'push-to-fast' | ''
export interface ISubmissionSearchByNameBody {
  subfix: SubmissionSubfix
  pagination?: IPaginationRequest
  filter?: ISubmissionSearchByNameFilter
}
