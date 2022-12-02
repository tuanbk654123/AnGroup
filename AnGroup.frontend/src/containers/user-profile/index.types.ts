export enum EUserListType {
  customer = 'customer',
  sale = 'sale',
  admin = 'admin',
}

export enum EUserTabLabel {
  customer = 'Customer    ',
  sale = 'Sale',
  admin = 'Admin',
}
export type TUserListType = keyof typeof EUserListType
