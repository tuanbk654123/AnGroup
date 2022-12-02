export type Report = {
  id: string
  programId: string
  userId: string
  clientName: string
  idCard: string
  status: string
  isDeleted: string
  createdBy: string
  createdDate: string
  deletedBy: string
  deletedDate: string
  modifiedBy: string
  modifiedDate: string
  ghpappid: string
  rating: string
  isHead: string
  fastPushStatus: string
  fastLastPushTime: string
  fastLastPushBy: string
  formType: string
  statusName: string
  handleUserId: string
}
export interface IProduct {
  key: number,
  id: number,
  nameVn: string,
  nameEn: string,
  isDeleted: string,
  createdBy: string,
  createdDate: string,
  deletedBy: null,
  deletedDate: null,
  modifiedBy: string,
  modifiedDate: string,
  orderNumber: number,
  note: null,
  content: null,
  status: string,
  isPublic: string,
  formType: number,
  parentId: null,
  productGroups: []
}
export interface IGroup {
    keyParrent: number,
    index: number,
    key: number,
    id: number,
    productId: number,
    nameVn: string,
    nameEn: string,
    isDeleted: string,
    createdBy: string,
    createdDate: string,
    deletedBy: null,
    deletedDate: null,
    modifiedBy: string,
    modifiedDate: string,
    orderNumber: number,
    note: null,
    content: string,
    status: string,
    isPublic: string,
    startDate: null,
    endDate: null,
    product: IProduct,
    programs: []
}

export interface IProgram {
  content: string
  createdBy: string
  createdDate: string
  deletedBy: null | string
  deletedDate: null | string
  documents: []
  endDate: null | string
  group: IGroup
  groupId: string
  id: number
  index: number
  isDeleted: string
  isPublich: string
  key: number
  keyParrent: number
  mapping: string
  modifiedBy: string
  modifiedDate: string
  nameEn: string
  nameVn: string
  note: string
  orderNumber: number
  product: null
  productId: number
  programDocuments: []
  startDate: null | string
  status: string
}

export interface IDeparment {
    id: number,
    parentId: number,
    code: string,
    name: string,
    isDeleted: string,
    createdBy: string,
    createdDate: string,
    deletedBy: null,
    deletedDate: null,
    modifiedBy: null,
    modifiedDate: null,
    userId: number,
    user: null,
    departmentType: number,
    status: string,
    userIds: null,
    departmentUsers: [],
    root: null,
    users: [],
    branchCode: string,
    branchTree: string
}

export type ReportCSV = {
  id?: string,
  ghpappid?: string
  clientName?: string,
  idCard?: string,
  program?: IProgram,
  department?: IDeparment,
  sale?: any

  user?: any
  status?: string
  fastPushStatus?: null | string
  profileStatuses?: any
  createdDate?: string

  userHandle?: any
}
