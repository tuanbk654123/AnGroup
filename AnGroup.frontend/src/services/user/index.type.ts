import { FilterTypes } from '~/types/common'

type UserFilter = 'querySearch' | 'fullname' | 'email' | 'userType' | 'queryString' | 'departmentId' | 'status' | 'positionId'

export interface UserFilterTypes extends FilterTypes {
  filter?: Partial<Record<UserFilter, any>>
  forSelect?: any
}
