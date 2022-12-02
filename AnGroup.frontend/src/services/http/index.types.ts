export enum EKindResponse {
  ok = 'ok',
  error = 'error',
  badRequest = 'bad-request',
  forbidden = 'forbidden',
  unauthor = 'unauthor',
  notFound = 'not-found',
  timeout = 'timeout',
}

export type ResponseKindType = keyof typeof EKindResponse

export interface IApiResponse {
  kind: ResponseKindType
  data: any
  error: any
  isSuccess:any
}
