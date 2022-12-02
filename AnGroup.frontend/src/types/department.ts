import { User } from './user'

type Status = 'A' | 'D' | 'I'

type DepartmentUser = {
  createdBy: string
  createdDate: string
  departmentId: number
  id: number
  modifiedBy: string
  modifiedDate: string
  user: User
  userId: number
}

export type Root = {
  childCount: number
  children: Root
  code: string
  disabled: string | boolean
  icon: string
  id: number
  idPath: number
  key: number
  label: string | null
  opened: string | null
  parent: string | null
  parentId: number | null
  path: null | string
  selected: null | string
  text: string
}
export interface Department {
  id: number
  key: number
  parentId: number
  code: string
  name: string
  isDeleted: string
  createdBy: string
  createdDate: string
  deletedBy: null | string
  deletedDate: null | string
  modifiedBy: null | string
  modifiedDate: null | string
  userId: number
  user: null | string
  status: Status
  level: number
  text: string
  departmentType: '0' | '1'
  UserIds: number[]
  userIds: number[]
  departmentUsers: DepartmentUser[]
  root: Root
}

export interface DepartmentTree extends Department {
  children?: Department
}
