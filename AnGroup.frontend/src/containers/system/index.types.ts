export enum ESystemListType {
  status = 'status',
  reason = 'reason',
}

export type TSystemListType = keyof typeof ESystemListType
