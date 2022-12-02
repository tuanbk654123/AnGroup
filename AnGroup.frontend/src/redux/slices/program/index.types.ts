import { IBaseMiddlewareRequest } from '../index.types'
export interface IProgramState {
  dataProgram?: any[]
  dataProgramDetails?: any
}

export interface IProgramRequest extends IBaseMiddlewareRequest<any> {}
