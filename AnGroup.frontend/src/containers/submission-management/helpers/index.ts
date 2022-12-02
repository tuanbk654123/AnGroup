import { uniq } from 'lodash'

import { defaultApplicationTabs, defaultResidenceTabs } from '../constants/tabs'
import {
  EDocumentTypeId,
  TDocumentTypeId,
  EReasonStatus,
  IDetailsFormProps,
  TDataKey,
  ESubmissionDetailListType,
  ESubmissionDetailTabLabel,
} from '../index.types'
import {
  submissionUpdateApplicationRequest,
  submissionUpdateIdDocRequest,
  submissionUpdateResidenceDocRequest,
} from '~/redux/slices/submission/middleware'
import { ApplicationAllFields } from '../constants/fields'

export const defaultReasonNote = {
  id: 0,
  profileId: 0,
  documentTypeId: 1,
  reasonId: 1,
  status: EReasonStatus.Update,
  page: 1,
  note: '',
}

export const getDefaultTabsByDocumentTypeId = (
  documentTypeId: number,
  options: { isLoan?: boolean; isHost?: boolean } = {},
) => {
  const { isHost, isLoan } = options
  switch (documentTypeId) {
    case EDocumentTypeId.idCard:
      return []
    case EDocumentTypeId.residence:
      return isHost ? defaultResidenceTabs.host : defaultResidenceTabs.customer
    case EDocumentTypeId.application:
      return isLoan ? defaultApplicationTabs.loan : defaultApplicationTabs.credit
    default:
      return []
  }
}

export const convertProgramConfigToTabs = (
  configData = [],
  options: {
    documentTypeName: TDocumentTypeId
    isLoan?: boolean
    isHost?: boolean
    withOptionTab?: boolean
  },
) => {
  const { documentTypeName, isLoan, isHost, withOptionTab } = options
  const documentTypeId = EDocumentTypeId[documentTypeName]

  const defaultTabs = getDefaultTabsByDocumentTypeId(documentTypeId, { isLoan, isHost })

  const allTabsFromConfig = configData.filter((item) => item?.documentTypeId === documentTypeId)

  const defaultTabsFromConfig = [...defaultTabs].filter((item) =>
    allTabsFromConfig.find((x) => x?.title === item.label),
  )

  const otherTabs = allTabsFromConfig
    .filter((item) => ![...defaultTabs].find((x) => item?.title === x?.label))
    .map((item) => ({
      key: `${item?.title}-${item?.id}`,
      label: item?.title,
    }))

  const optionalTabs = withOptionTab
    ? [
      {
        key: ESubmissionDetailListType.optional,
        label: ESubmissionDetailTabLabel.optional,
      },
    ]
    : []

  return [...defaultTabsFromConfig, ...otherTabs, ...optionalTabs]
}

export const getConfigByDataKey = (dataKey: TDataKey) => {
  switch (dataKey) {
    case 'idDoc':
      return {
        saveActionRequest: submissionUpdateIdDocRequest,
        rejectActionRequest: submissionUpdateIdDocRequest,
        documentTypeId: EDocumentTypeId.idCard,
      }
    case 'residenceDoc':
      return {
        saveActionRequest: submissionUpdateResidenceDocRequest,
        rejectActionRequest: submissionUpdateResidenceDocRequest,
        documentTypeId: EDocumentTypeId.residence,
      }
    case 'application':
      return {
        saveActionRequest: submissionUpdateApplicationRequest,
        rejectActionRequest: submissionUpdateApplicationRequest,
        documentTypeId: EDocumentTypeId.application,
      }
    default:
      return {
        saveActionRequest: submissionUpdateIdDocRequest,
        rejectActionRequest: submissionUpdateIdDocRequest,
        documentTypeId: EDocumentTypeId.idCard,
      }
  }
}

export const getDocumentsByProps = ({
  documents = [],
  dataKey,
  reasonPage,
  isOptional,
}: {
  documents: any[]
  dataKey: IDetailsFormProps['dataKey']
  reasonPage: IDetailsFormProps['reasonPage']
  isOptional?: boolean
}) => {
  const config = getConfigByDataKey(dataKey)
  if (dataKey === 'idDoc') {
    return documents.filter((item) => item.documentTypeId === config.documentTypeId)
  }
  if (isOptional) {
    return documents.filter((item) => item.documentTypeId === config.documentTypeId && item.isOptionalPage === 'Y')
  }
  return documents.filter(
    (item) => item.documentTypeId === config.documentTypeId && item.page === reasonPage && item.isOptionalPage === 'N',
  )
}

export const convertEformData = (data = {}) => {
  const needConvertFieldNames = ApplicationAllFields.filter(
    ({ type }) => type === 'address' || type === 'selectbox',
  ).map((item) => item.name)

  const uniqueFieldNames = uniq(needConvertFieldNames)

  const dataConverted = {}

  Object.entries(data).forEach(([key, value]: any) => {
    const needConvert = uniqueFieldNames.includes(key)
    if (needConvert && value) {
      if (value.includes('value')) {
        dataConverted[key] = JSON.parse(`${value}`).value || value
      } else {
        dataConverted[key] = value
      }
    } else {
      dataConverted[key] = value
    }
  })

  return dataConverted
}
export const nonAccentVietnamese = (str: string) => {
  str = str.toLowerCase();
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
  str = str.replace(/đ/g, 'd');
  // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ''); // Huyền sắc hỏi ngã nặng
  str = str.replace(/\u02C6|\u0306|\u031B/g, ''); // Â, Ê, Ă, Ơ, Ư
  return str;
};