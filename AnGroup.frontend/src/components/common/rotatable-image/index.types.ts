export interface IRotatableImageProps {
  src?: string
  className?: string
  zoomable?: boolean
  positionData?: any
}

export enum ERotateType {
  Increment = 'Increment',
  Decrement = 'Decrement',
}
