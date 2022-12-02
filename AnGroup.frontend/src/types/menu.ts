type Status = 'A' | 'I'
export interface Menu {
  id: number
  key: number
  parentId: number
  code: string
  name: string
  nameEn: string
  menuPosition: string
  url: string
  icon: string
  element: string
  description: string
  orderNumber: number
  layout: string
  showOnMenu: string
  isDeleted: string
  createdBy: string
  createdDate: string
  deletedBy: null | string
  deletedDate: null | string
  modifiedBy: null | string
  modifiedDate: null | string
  status: Status
  level: number
  menuActions: { actionId: any }[]
}

export interface MenuTree extends Menu {
  children?: Menu
}
