export enum EOrganizationListType {
  head_office = 'head_office',
  supper_admin = 'supper_admin',
}

export enum EOrganizationTabLabel {
  head_office = 'Head Office ',
  supper_admin = 'Super Admin',
}

export enum EOrganizationListLayer {
  layer_01 = 'layer_01',
  layer_02 = 'layer_02',
  layer_03 = 'layer_03',
}
export type TOrganizationListType = keyof typeof EOrganizationListType
export type TOrganizationListLayer = keyof typeof EOrganizationListLayer
