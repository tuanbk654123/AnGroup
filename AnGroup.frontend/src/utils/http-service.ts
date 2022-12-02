import { EKindResponse, ResponseKindType } from '~/services/http/index.types'

export const mappingResponseCodeToKind = {
  200: EKindResponse.ok,
  201: EKindResponse.ok,
  400: EKindResponse.badRequest,
  401: EKindResponse.unauthor,
  403: EKindResponse.forbidden,
  404: EKindResponse.notFound,
  408: EKindResponse.timeout,
}

export const getResponseKind = (responseCode: number): ResponseKindType => {
  return mappingResponseCodeToKind[`${responseCode}`] || EKindResponse.error
}
