export enum ECategoryCrawlType {
    category = 'category',
    page = 'page',
    detailpage = 'detailpage'
  }
  
  export enum ECategoryCrawlTypeValue {
    category = 0,
    page = 1,
    detailpage = 2
  }
  
  export enum ECategoryCrawlTabLabel {
    waiting = 'Chờ duyệt',
    approval = 'Đã duyệt',
    reject = 'Từ chối',
    calendar = 'Đặt lịch',
    draft = 'Bản nháp'
  }

  export type TCategoryCrawlType = keyof typeof ECategoryCrawlType
  