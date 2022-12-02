export enum EUserStatus {
  active = 'A',
  inactive = 'I',
}

export type Role = {
  label?: string
  roleId: string
}

export type UserRole = {
  label?: string
  roleId: string
  userId?: string
}

export type UserStatus = 'A' | 'I'

export type User = {
  username: string
  fullname: string
  password: string
  status: UserStatus
  isDeleted: string
  parentId: null | string
  address: null | string
  email: string
  description: null | string
  usertype: null | string
  departmentId: null | number
  positionId: null | number
  lastLogin: null | string
  lastFailedLogin: null | string
  deletedBy: null | string
  deletedDate: null | string
  otpConfirm: null | string
  ipDevice: null | string
  deviceName: null | string
  resetPasswordToken: null | string
  phone: null | string
  resetPasswordTokenExp: null | string
  position: null | any
  department: null | string
  parentUser: null | string
  otpConfirmExp: null | string
  profiles: []
  id: number | string
  createdBy: string
  createdDate: string
  modifiedBy: null | string
  modifiedDate: null | string
  employeeCode: null | string
  profileImageUrl: null | string
  saleCode: string
  roles: Role[]
  userRoles: UserRole[]
  userCanAccess: string
}

export type Customer = Pick<User, 'id' | 'fullname' | 'email' | 'phone' | 'createdDate' | 'createdBy' | 'status'>
export type Sale = Pick<
  User,
  | 'id'
  | 'username'
  | 'fullname'
  | 'email'
  | 'usertype'
  | 'department'
  | 'createdDate'
  | 'status'
  | 'saleCode'
  | 'employeeCode'
>
export type Admin = Pick<User, 'id' | 'fullname' | 'username' | 'position' | 'roles' | 'status'>
