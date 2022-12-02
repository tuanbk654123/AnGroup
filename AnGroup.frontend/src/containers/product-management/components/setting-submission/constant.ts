import { IImageCountSelectProps, ImageCountSelectData } from '~/components/common/form-control/image-count-select'
import {
  EApplicationTabLabel,
  EResidenceTabLabel,
  ESubmissionDetailListType,
  ESubmissionDetailTabLabel,
  EDocumentTypeId,
} from '~/containers/submission-management/index.types'

interface IConfigSubmission {
  value?: ImageCountSelectData[]
  showAddbutton?: IImageCountSelectProps['showAddbutton']
}

export const configIdCard: IConfigSubmission = {
  value: [
    {
      disabled: true,
      inputValue: 'Front ID Card',
      key: 0,
      selected: true,
      showDelete: false,
    },
    {
      disabled: true,
      inputValue: 'Back ID Card',
      key: 1,
      selected: true,
      showDelete: false,
    },
  ],
  showAddbutton: false,
}

export const configApplicationLoan: IConfigSubmission = {
  value: [
    {
      disabled: true,
      inputValue: EApplicationTabLabel.page_1,
      key: 0,
      selected: true,
      showDelete: false,
    },
    {
      disabled: true,
      inputValue: EApplicationTabLabel.page_2,
      key: 1,
      selected: true,
      showDelete: false,
    },
    {
      disabled: true,
      inputValue: EApplicationTabLabel.page_3,
      key: 2,
      selected: true,
      showDelete: false,
    },
    {
      disabled: true,
      inputValue: EApplicationTabLabel.page_4,
      key: 3,
      selected: true,
      showDelete: false,
    },
    {
      disabled: true,
      inputValue: EApplicationTabLabel.page_11,
      key: 4,
      selected: true,
      showDelete: false,
    },
  ],
  showAddbutton: true,
}

export const configApplicationCredit: IConfigSubmission = {
  value: [
    {
      disabled: true,
      inputValue: EApplicationTabLabel.page_1,
      key: 0,
      selected: true,
      showDelete: false,
    },
    {
      disabled: true,
      inputValue: EApplicationTabLabel.page_2,
      key: 1,
      selected: true,
      showDelete: false,
    },
    {
      disabled: true,
      inputValue: EApplicationTabLabel.page_3,
      key: 2,
      selected: true,
      showDelete: false,
    },
    {
      disabled: true,
      inputValue: EApplicationTabLabel.page_4,
      key: 4,
      selected: true,
      showDelete: false,
    },
  ],
  showAddbutton: true,
}

export const configResidence: IConfigSubmission = {
  value: [
    {
      disabled: true,
      inputValue: EResidenceTabLabel.page_of_cover,
      key: 0,
      selected: true,
      showDelete: false,
    },
    {
      disabled: true,
      inputValue: EResidenceTabLabel.page_of_customer,
      key: 1,
      selected: true,
      showDelete: false,
    },
  ],
  showAddbutton: true,
}

export interface ISubmissionDefaultConfigItem {
  label: ESubmissionDetailTabLabel
  activeName: string
  documentsName: string
  showAddbutton: boolean
  documentTypeId: EDocumentTypeId
  name: ESubmissionDetailListType
}

export const listDefaultConfig: ISubmissionDefaultConfigItem[] = [
  {
    label: ESubmissionDetailTabLabel.application,
    activeName: 'applicationActive',
    documentsName: 'applicationDocuments',
    showAddbutton: configApplicationLoan.showAddbutton,
    documentTypeId: EDocumentTypeId.application,
    name: ESubmissionDetailListType.application,
  },
  {
    label: ESubmissionDetailTabLabel.indentification,
    activeName: 'idCardActive',
    documentsName: 'idCardDocuments',
    showAddbutton: configIdCard.showAddbutton,
    documentTypeId: EDocumentTypeId.idCard,
    name: ESubmissionDetailListType.indentification,
  },
  {
    label: ESubmissionDetailTabLabel.customer,
    activeName: 'customerActive',
    documentsName: 'customerDocuments',
    showAddbutton: true,
    documentTypeId: EDocumentTypeId.other,
    name: ESubmissionDetailListType.customer,
  },
  {
    label: ESubmissionDetailTabLabel.residence,
    activeName: 'residenceActive',
    documentsName: 'residenceDocuments',
    showAddbutton: configResidence.showAddbutton,
    documentTypeId: EDocumentTypeId.residence,
    name: ESubmissionDetailListType.residence,
  },
  {
    label: ESubmissionDetailTabLabel.employment,
    activeName: 'employmentActive',
    documentsName: 'employmentDocuments',
    showAddbutton: true,
    documentTypeId: EDocumentTypeId.other,
    name: ESubmissionDetailListType.employment,
  },
  {
    label: ESubmissionDetailTabLabel.income,
    activeName: 'incomeActive',
    documentsName: 'incomeDocuments',
    showAddbutton: true,
    documentTypeId: EDocumentTypeId.other,
    name: ESubmissionDetailListType.income,
  },
  {
    label: ESubmissionDetailTabLabel.other,
    activeName: 'otherActive',
    documentsName: 'otherDocuments',
    showAddbutton: true,
    documentTypeId: EDocumentTypeId.other,
    name: ESubmissionDetailListType.other,
  },
]
