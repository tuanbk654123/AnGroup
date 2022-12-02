// export enum ESubmissionDetailListType {
//   general = 'general',
//   indentification = 'idCard',
//   residence = 'residence',
//   application = 'application',
//   income = 'income',
//   employment = 'employment',
//   customer = 'customer',
// }
export enum ESubmissionDetailListType {
  general = 'general',
  indentification = 'ID_PP_WP',
  residence = 'Residence_Document',
  application = 'Application',
  income = 'Income',
  employment = 'Employment',
  customer = 'Customer_Signature',
  other = 'Others',
  optional = 'Optional',
}
export enum ESubmissionDetailTabLabel {
  general = 'General',
  indentification = 'IDCard',
  residence = 'Residence',
  application = 'Application',
  income = 'IncomeDoc',
  customer = 'CustomerDoc',
  employment = 'EmploymentDoc',
  other = 'Other',
  optional = 'Optional page',
}

// for Residence
export enum EResidenceListType {
  page_of_cover = 'page_of_cover',
  page_of_customer = 'page_of_customer',
  optional_page = 'optional_page',
  page_of_host = 'page_of_host',
}
export enum EResidenceTabLabel {
  page_of_cover = 'Page of cover',
  page_of_customer = 'Page of customer',
  optional_page = 'Optional Page',
  page_of_host = 'Page of host',
}

// for Application
export enum EApplicationListType {
  optional_page = 'optional_page',
  page_1 = 'page_1',
  page_2 = 'page_2',
  page_3 = 'page_3',
  page_4 = 'page_4',
  page_11 = 'page_11',
}

//for verify
export enum EVerifyDetailListType {
  general = 'general',
  indentification = 'indentification',
}
export enum EVerifyDetailTabLabel {
  general = 'Gerenal',
  indentification = 'Indentification',
}

export enum EApplicationTabLabel {
  optional_page = 'Optional Page',
  page_1 = 'Page 1',
  page_2 = 'Page 2',
  page_3 = 'Page 3',
  page_4 = 'Page 4',
  page_11 = 'Page 11',
}

export enum EReasonStatus {
  Update = 'CMS_REVIEWING',
  Reject = 'CMS_REJECT',
  Approval = 'CMS_APPROVAL',
  Declined = 'DECLINED',
  Reupload = 'CMS_REUPLOAD',
  CreateNewApplication = 'CMS_CREATENEWAPPLICATION',
  Processing = 'CMS_OCRPROCESSING',
  DataCheck = 'DATACHECK',
  Assessment = 'ASSESSMENT',
  FastApproval = 'APPROVED',
  Defer = 'DEFER',
  AI_Approval = 'AI_NON_PROCESS_AFTER_APPROVAL',
  AI_Execution = 'AI_EXECUTION',
  AI_Reject = 'AI_REJECT',
  AI_Cancel = 'AI_CANCEL',
}

export enum ETabIndex {
  ViewAll,
  Submission,
  AssignSale,
  VerifySubmission,
  PushToFast,
}

export enum ESubmisionStatus {
  Draft = -1,
  VerifySubmit,
  Approval,
  Reject,
}

export type TReasonStatus = keyof typeof EReasonStatus

export enum EDataFieldType {
  selectbox = 'selectbox',
  text = 'text',
  address = 'address',
  date = 'date',
  formlist = 'formlist',
  datejoining = 'datejoining',
}

export interface IAddressOptionConfig {
  level: number
  dependOnFieldName?: string
}

export type TDataFieldType = keyof typeof EDataFieldType
export interface IDataFields {
  label?: string
  name?: string
  colSpan?: number
  require?: boolean
  type?: TDataFieldType
  addressOptionConfig?: IAddressOptionConfig
}

export enum DocumentTypeIdByDataKey {
  idDoc = 1,
  residenceDoc = 2,
  application = 3,
}

export type TDataKey = 'idDoc' | 'residenceDoc' | 'application'

export interface IDetailsFormProps {
  dataFields?: IDataFields[]
  dataKey?: TDataKey
  reasonPage?: number
}

export enum EDocumentTypeId {
  idCard = 1,
  residence = 2,
  application = 3,
  other = 4,
}

export type TDocumentTypeId = keyof typeof EDocumentTypeId
