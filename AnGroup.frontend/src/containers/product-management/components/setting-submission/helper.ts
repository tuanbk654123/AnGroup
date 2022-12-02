import moment from 'moment'
import { ImageCountSelectData } from '~/components/common/form-control/image-count-select'
import {
  configApplicationCredit,
  configApplicationLoan,
  configIdCard,
  configResidence,
  ISubmissionDefaultConfigItem,
  listDefaultConfig,
} from './constant'
import { groupBy } from 'lodash'
import { EProductType } from '../../index.types'
import { ESubmissionDetailListType, EDocumentTypeId } from '~/containers/submission-management/index.types'

export const convertToFromValue = (dataArr = []): ImageCountSelectData[] => {
  return dataArr.map((item, index) => ({
    disabled: true,
    inputValue: item?.title,
    id: item?.id,
    key: index,
    selected: item?.isRequired === 'Y',
    showDelete: false,
  }))
}

const convertDefaultSetting = (dataArr = []): ImageCountSelectData[] => {
  return dataArr.map((item) => ({ ...item, selected: false }))
}

const mergeDataToDefault = (data = [], defaultData = []): ImageCountSelectData[] => {
  const dataWithouDefault = data
    .filter((item) => !defaultData.find((x) => x.inputValue === item.inputValue))
    .map((item) => ({ ...item, disabled: false, showDelete: true, isOther: true }))
  const dataMerged = defaultData.map((item) => {
    const dataReplace = data.find((x) => x.inputValue === item.inputValue)
    return dataReplace || item
  })
  return [...dataMerged, ...dataWithouDefault].map((item, index) => ({ ...item, key: index }))
}

const convertOtherToFromValue = (dataArr = []) => {
  return Object.entries(groupBy(dataArr, 'name')).reduce((prev, [key, values]) => {
    const require = values?.[0]?.isRequired === 'Y'
    const label = key
    const items = convertToFromValue(values).map((item) => ({
      ...item,
      isOther: true,
      showDelete: true,
      disabled: false,
    }))
    return [...prev, { label, require, items }]
  }, [])
}

export const convertProgramDocumentsToFormValues = (programDocuments = [], formType) => {
  const isLoan = formType === EProductType.loan
  const isCredit = formType === EProductType.credit

  const idCardData = programDocuments.filter((item) => item?.documentTypeId === EDocumentTypeId.idCard)
  const applicationData = programDocuments.filter((item) => item?.documentTypeId === EDocumentTypeId.application)
  const residenceData = programDocuments.filter((item) => item?.documentTypeId === EDocumentTypeId.residence)
  const optionData = programDocuments.filter(
    (item) =>
      item?.documentTypeId === EDocumentTypeId.other &&
      ![
        ESubmissionDetailListType.income,
        ESubmissionDetailListType.employment,
        ESubmissionDetailListType.customer,
        ESubmissionDetailListType.other,
      ].includes(item?.name),
  )
  const incomeData = programDocuments.filter(
    (item) => item?.documentTypeId === EDocumentTypeId.other && item?.name === ESubmissionDetailListType.income,
  )
  const employmentData = programDocuments.filter(
    (item) => item?.documentTypeId === EDocumentTypeId.other && item?.name === ESubmissionDetailListType.employment,
  )
  const customerData = programDocuments.filter(
    (item) => item?.documentTypeId === EDocumentTypeId.other && item?.name === ESubmissionDetailListType.customer,
  )
  const otherData = programDocuments.filter(
    (item) => item?.documentTypeId === EDocumentTypeId.other && item?.name === ESubmissionDetailListType.other,
  )

  const idCardDataConverted = convertToFromValue(idCardData)
  const applicationDataConverted = convertToFromValue(applicationData)
  const residenceDataConverted = convertToFromValue(residenceData)
  const incomeDataConverted = convertToFromValue(incomeData)
  const employmentDataConverted = convertToFromValue(employmentData)
  const customerDataConverted = convertToFromValue(customerData)
  const otherDataConverted = convertToFromValue(otherData)

  const defaultIdCard = convertDefaultSetting(configIdCard.value)
  const defaultApplicationLoan = convertDefaultSetting(configApplicationLoan.value)
  const defaultApplicationCredit = convertDefaultSetting(configApplicationCredit.value)
  const defaultResidence = convertDefaultSetting(configResidence.value)

  const idCardDocuments = mergeDataToDefault(idCardDataConverted, defaultIdCard)
  const residenceDocuments = mergeDataToDefault(residenceDataConverted, defaultResidence)
  const incomeDocuments = mergeDataToDefault(incomeDataConverted, [])
  const employmentDocuments = mergeDataToDefault(employmentDataConverted, [])
  const customerDocuments = mergeDataToDefault(customerDataConverted, [])
  const otherDocuments = mergeDataToDefault(otherDataConverted, [])
  const optionDocuments = convertOtherToFromValue(optionData)

  let defaultApplication = []
  if (isLoan) {
    defaultApplication = defaultApplicationLoan
  }
  if (isCredit) {
    defaultApplication = defaultApplicationCredit
  }
  const applicationDocuments = mergeDataToDefault(applicationDataConverted, defaultApplication)

  const idCardActive = idCardData[0]?.isDeleted === 'N'
  const applicationActive = applicationData[0]?.isDeleted === 'N'
  const residenceActive = residenceData[0]?.isDeleted === 'N'
  const incomeActive = incomeData[0]?.isDeleted === 'N'
  const employmentActive = employmentData[0]?.isDeleted === 'N'
  const customerActive = customerData[0]?.isDeleted === 'N'
  const otherActive = otherData[0]?.isDeleted === 'N'

  return {
    idCardDocuments,
    applicationDocuments,
    residenceDocuments,
    incomeDocuments,
    employmentDocuments,
    customerDocuments,
    otherDocuments,
    optionDocuments,
    idCardActive,
    applicationActive,
    residenceActive,
    incomeActive,
    employmentActive,
    customerActive,
    otherActive,
  }
}

export const createDocumentObject = ({ page, documentTypeId, isDeleted, ...data }) => {
  return {
    id: data?.id ?? 0,
    documentTypeId, // mã tài liệu 1 - idcard , 2- Residence , 3- Application Form , 4 -other
    name: data?.name || data?.inputValue || '',
    path: data?.inputValue || '',
    title: data?.title || data?.inputValue || '',
    page: page,
    isRequired: data?.isRequired,
    isDeleted,
    createdBy: 'admin', // người tạo
    createdDate: moment().format(),
  }
}

export const convertProgramDocumentsProductName = (data) => {
  let programDocuments = []
  const getConfigDocuments = (config: ISubmissionDefaultConfigItem) => {
    return (
      data?.[config.documentsName]
        // ?.filter((item) => item.selected)
        ?.map((item, index) =>
          createDocumentObject({
            ...item,
            page: index + 1,
            documentTypeId: config.documentTypeId,
            name: config.name,
            // isDeleted: data?.[config.activeName] ? 'N' : 'Y',
            isDeleted: 'N',
            isRequired: item?.selected ? 'Y' : 'N',
          }),
        ) || []
    )
  }

  listDefaultConfig.forEach((config) => {
    const configDocuments = getConfigDocuments(config)
    programDocuments = [...programDocuments, ...configDocuments]
  })

  const optionDocuments =
    data?.optionDocuments?.reduce?.((prev, od) => {
      const odItems =
        od.items?.map?.((item, index) =>
          createDocumentObject({
            ...item,
            page: index + 1,
            name: od.label,
            documentTypeId: EDocumentTypeId.other,
            isDeleted: 'N',
            // isRequired: od.require ? 'Y' : 'N',
            isRequired: item.selected ? 'Y' : 'N',
          }),
        ) || []
      return [...prev, ...odItems]
    }, []) || []

  programDocuments = [...programDocuments, ...optionDocuments]
  return programDocuments
}
