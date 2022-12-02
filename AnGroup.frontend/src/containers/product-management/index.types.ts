export enum EProductListType {
  product = 'product',
  productGroup = 'groupProgram',
  productName = 'programName',
}

export type TProductListType = keyof typeof EProductListType

export enum EProductCreateType {
  createNew = 'createNew',
}
export type TProductCreateType = keyof typeof EProductCreateType

export enum EProductType {
  loan = 1,
  credit = 2,
  eformLoan = 11,
  eformCredit = 21,
}
