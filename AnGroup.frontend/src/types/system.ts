export type SystemStatus = {
  id: number
  key: number
  parentId: number | null
  code: string
  nameEn: string
  nameVn: string
  color: string
  description: string
  createdBy: string
  createdDate: string
  modifiedBy: string
  modifiedDate: string
  subStatus: SystemStatus[]
}

export type SystemReason = {
  id: number
  key: number
  code: string
  nameVn: string
  nameEn: string
  description: string
  orderNumber: number
  isDeleted: string
  createdBy: string
  createdDate: string
  deletedBy: string
  deletedDate: string
  modifiedBy: string
  modifiedDate: string
  profileDocumentNotes: (string | number)[]
}
