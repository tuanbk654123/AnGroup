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

  export type TCreativePostType = keyof typeof ECreativePostType
  