export enum ECategoryListType {
  category = 'category',
}
export enum ECategoryCreateType {
  createNew = 'createNew',
}

export enum ECategoryTabLabel {
  head_office = 'Head Office ',
  supper_admin = 'Super Admin',
}
export enum ECategoryListLayer {
  layer_01 = 'layer_01',
  layer_02 = 'layer_02',
  layer_03 = 'layer_03',
}
export type TCategoryListType = keyof typeof ECategoryListType
export type TCategoryListLayer = keyof typeof ECategoryListLayer
export type TCategoryCreateType = keyof typeof ECategoryCreateType
