export enum EAppConfigListType {
  logo = 'logo',
  onboarding_screen = 'onboarding_screen',
}

export enum EAppConfigTabLabel {
  logo = 'Head Office ',
  onboarding_screen = 'Supper Admin',
}

export type TAppConfigListType = keyof typeof EAppConfigListType
