import { PositionFilterTypes } from '~/services/position/index.types'
import { Position } from '~/types'

export interface IFectchPositionRequest {
  positionFilter: PositionFilterTypes
  onSuccess?: (data?: Position[]) => void
  onError?: (error?: any) => void
  forSelect?: boolean
}
