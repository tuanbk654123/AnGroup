import { FilterTypes } from '~/types/common'

export interface ReportFilter {
  querySearch: string
  name: string // tìm kiếm theo tên
  Status: string // -1 bản nháp , 0 verify submit, 1 apprpval , 2 reject
  StartDate: string //format us yyyy/mm/dd
  EndDate: string //format us yyyy/mm/dd,
  DepartmentIds: any[] // danh sách phòng ban
  ChannelIds: any[] // danh sách team
  TeamIds: any[] // danh sách nhóm
  ProductIds: any[] // danh sách sản phẩm
  GroupIds: any[] // danh sách nhóm sản phẩm
  ProgramIds: any[] // danh sách chương trình
}

export interface ReportFilterTypes extends FilterTypes {
  filter?: ReportFilter
  pagination: {
    pageIndex: number
    pageSize: number
    isAll: boolean
  }
}
