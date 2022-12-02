export enum ECreativePostType {
    waiting = 'waiting',
    approval = 'approval',
    reject = 'reject',
    calendar = 'calendar',
    draft = 'draft'
  }
  
  export enum ECreativePostTypeValue {
    draft = 0,
    waiting = 1,
    approval = 2,
    reject = 3,
    calendar = 4,
  }
  
  export enum ECreativePostTabLabel {
    waiting = 'Chờ duyệt',
    approval = 'Đã duyệt',
    reject = 'Từ chối',
    calendar = 'Đặt lịch',
    draft = 'Bản nháp'
  }
  export enum ECreativePostNewsType {
    regular = 'regular',
    image = 'image',
    video = 'video'
  }
  
  export enum ECreativePostTypeNewsValue {
    regular = 1,
    image = 2,
    video = 3,
  }

  export type TCreativePostType = keyof typeof ECreativePostType
  export type TCreativePostNewsType = keyof typeof ECreativePostNewsType
  