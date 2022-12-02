import { Col, Form, Row, Spin } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import moment from 'moment'
import React, { useEffect, useMemo, useState, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import {
  FormItem,
  PappperButton,
  TextInputArea,
  PapperPopupConfirm,
  SelectBox,
  RotatableImage,
} from '~/components/common'
import {
  convertEformData,
  defaultReasonNote,
  getConfigByDataKey,
  getDocumentsByProps,
} from '~/containers/submission-management/helpers'
import {
  EReasonStatus,
  IDataFields,
  IDetailsFormProps,
  DocumentTypeIdByDataKey,
} from '~/containers/submission-management/index.types'
import { useAppTranslation } from '~/hooks/useAppTranslation'
import { useAppDispatch, useAppSelector } from '~/redux/hooks'
import { submissionActions } from '~/redux/slices'
import { submissionGetByIdRequest } from '~/redux/slices/submission/middleware'
import { getImageUrlWithToken } from '~/utils/helper'
import { FormElement } from './form-element'

export default function DetailsForm({ dataFields = [], dataKey = 'idDoc', reasonPage = 1 }: IDetailsFormProps) {
  const [data, setData] = useState(null)
  const [documents, setDocuments] = useState([])
  const [positionData, setPositionData] = useState(null)
  const [isEdit, setIsEdit] = useState<boolean>(false)

  const [form] = useForm()

  const dispatch = useAppDispatch()
  const { t } = useAppTranslation()
  const dataSubmissionDetails = useAppSelector((state) => state.submission.dataSubmissionDetails)
  const reasonOptions = useAppSelector((state) => state.submission.reasonOptions)

  const subStatus = dataSubmissionDetails?.profileStatuses?.slice().sort((a, b) => moment(a.createdDate).valueOf() - moment(b.createdDate).valueOf());
  const submissionSubStatus = (subStatus || []).at(-1)?.subStatus
  const applicationFormType = dataSubmissionDetails?.application?.formType
  const isTotalApproved = submissionSubStatus === EReasonStatus.Approval

  const isApproved = submissionSubStatus === EReasonStatus.Approval
  const isReUpload = submissionSubStatus === EReasonStatus.Reupload
  const isReject = submissionSubStatus === EReasonStatus.Reject
  const isCreateNewApplication = submissionSubStatus === EReasonStatus.CreateNewApplication
  const isEForm = dataSubmissionDetails?.isEform === 'Y'
  const isProcessing = submissionSubStatus === EReasonStatus.Processing
  const isDataCheck = submissionSubStatus === EReasonStatus.DataCheck
  const isAssessment = submissionSubStatus === EReasonStatus.Assessment
  const isFastApproval = submissionSubStatus === EReasonStatus.FastApproval
  const isDefer = submissionSubStatus === EReasonStatus.Defer
  const isAI_Approval = submissionSubStatus === EReasonStatus.AI_Approval
  const isAI_Execution = submissionSubStatus === EReasonStatus.AI_Execution
  const isAI_Reject = submissionSubStatus === EReasonStatus.AI_Reject
  const isAI_Cancel = submissionSubStatus === EReasonStatus.AI_Cancel
  const isDisable = useMemo(() => {
    const reasonFromData = data?.reasonNote?.find((item) => item.page === reasonPage)
    return reasonFromData?.status === EReasonStatus.Reject || isTotalApproved
  }, [data, reasonPage, isTotalApproved])
  const { id } = useParams()
  const convertData = useCallback(() => {
    if (!dataSubmissionDetails) return

    const dataSave = isEForm ? convertEformData(dataSubmissionDetails?.[dataKey]) : dataSubmissionDetails?.[dataKey]

    console.log({ dataSave, isEForm })

    setData(dataSave)
    const documentsData = getDocumentsByProps({
      documents: (dataSubmissionDetails?.profileDocuments || [])?.slice().sort((a, b) => a.page - b.page),
      dataKey,
      reasonPage,
      isOptional: false,
    })
    const _documents = documentsData.map((item) => getImageUrlWithToken(item.path))
    setDocuments(_documents)
    console.log(_documents)
  }, [dataSubmissionDetails, reasonPage, isEForm, dataKey])

  useEffect(() => {
    convertData()
  }, [convertData])

  useEffect(() => {
    const reasonFromData = data?.reasonNote?.find((item) => item.page === reasonPage)
    const reasonSelected = reasonOptions.find((item) => `${item.value}` === `${reasonFromData?.reasonId}`)
    const note = reasonFromData?.note
    form?.setFieldsValue?.({
      ...data,
      idcardType: data?.idcardType === null ? "" : String(data?.idcardType),
      reason: reasonSelected?.value,
      note,
    })
  }, [data, reasonPage, reasonOptions, form])

  const handleCancel = () => {
    setIsEdit(false)
    form?.setFieldsValue?.({
      ...data,
    })
  }

  const convertReasonNoteSelected = (values, reasonStatus = EReasonStatus.Update) => {
    const prevReasonNote = data?.reasonNote?.[0] || defaultReasonNote
    return {
      ...prevReasonNote,
      note: values.note || '',
      profileId: data?.profileId,
      reasonId: Number(values?.reason) || defaultReasonNote.reasonId,
      page: reasonPage,
      status: reasonStatus,
    }
  }

  const handleSave = () => {
    form.validateFields().then(
      function onFulfilled(formValues) {
        const reasonNote = convertReasonNoteSelected(formValues)
        const dataSubmit = {
          ...data,
          ...formValues,
          reasonNote: [reasonNote],
        }
        console.log(dataSubmit)
        const actionRequest = getConfigByDataKey(dataKey).saveActionRequest
        dispatch(
          actionRequest({
            data: dataSubmit,
            onSuccess(data?) {
              const _dataSubmissionDetails = {
                ...dataSubmissionDetails,
                [dataKey]: dataSubmit,
              }
              dispatch(submissionActions.setDataSubmissionDetails(_dataSubmissionDetails))
            },
          }),
        )
      },
      function onRejected(reason) {
        toast.warning('Some field is required')
      },
    )
  }

  const handleReject = () => {
    const reason = form.getFieldValue('reason')
    if (!reason) {
      toast.warning('Please select reason field')
    } else {
      const formValues = form.getFieldsValue()
      const reasonNote = convertReasonNoteSelected(formValues, EReasonStatus.Reject)
      const dataSubmit = {
        ...data,
        reasonNote: [reasonNote],
      }
      const actionRequest = getConfigByDataKey(dataKey).rejectActionRequest
      dispatch(
        actionRequest({
          data: dataSubmit,
          onSuccess() {
            setData(dataSubmit)
          },
        }),
      )
      dispatch(
        submissionGetByIdRequest({
          data: { id },
        }),
      )
    }
  }
  const handleClickEdit = () => {
    setIsEdit(true)
  }

  const getPositionByField = (fieldName: string) => {
    const documentTypeId = DocumentTypeIdByDataKey[dataKey]
    return (dataSubmissionDetails?.profilePeropertyPositions || []).find(
      (item) =>
        item.documentTypeId === documentTypeId &&
        item.page === reasonPage &&
        `${item.columnName}`.toLowerCase() === fieldName.toLowerCase(),
    )
  }

  const handleFocusField = (field: IDataFields) => {
    const _positionData = getPositionByField(field.name)
    setPositionData(_positionData)
  }

  return (
    <div>
      {submissionSubStatus === undefined ? (
        <div className="flex justify-center items-center">
          <Spin size="default"></Spin>
        </div>
      ) : (
        <Form layout="vertical" form={form}>
          <Row justify="end" className="mb-4">
            <Col>
              {isEdit ? (
                <>
                  <PapperPopupConfirm title="All changed data will restore. Are you sure?" onConfirm={handleCancel}>
                    <PappperButton
                      disabled={isApproved || isReUpload || isReject || isDisable || isCreateNewApplication || isProcessing || isDataCheck || isAssessment || isFastApproval || isDefer || isAI_Approval || isAI_Execution || isAI_Reject || isAI_Cancel}
                      variant="primary"
                      rounded="large"
                      className="mr-4"
                    >
                      {t('button.cancel')}
                    </PappperButton>
                  </PapperPopupConfirm>
                  <PapperPopupConfirm title="Do you want save this data?" onConfirm={handleSave}>
                    <PappperButton
                      disabled={isApproved || isReUpload || isReject || isDisable || isCreateNewApplication || isProcessing || isDataCheck || isAssessment || isFastApproval || isDefer || isAI_Approval || isAI_Execution || isAI_Reject || isAI_Cancel}
                      variant="primary"
                      rounded="large"
                    >
                      {t('button.save')}
                    </PappperButton>
                  </PapperPopupConfirm>
                </>
              ) : (
                <>
                  <PapperPopupConfirm title="Do you want reject this data?" onConfirm={handleReject}>
                    <PappperButton
                      disabled={isApproved || isReUpload || isReject || isDisable || isCreateNewApplication || isProcessing || isDataCheck || isAssessment || isFastApproval || isDefer || isAI_Approval || isAI_Execution || isAI_Reject || isAI_Cancel}
                      variant="primary"
                      rounded="large"
                      className="mr-4"
                    >
                      {t('button.fail')}
                    </PappperButton>
                  </PapperPopupConfirm>
                  <PappperButton
                    disabled={isApproved || isReUpload || isReject || isDisable || isCreateNewApplication || isProcessing || isDataCheck || isAssessment || isFastApproval || isDefer || isAI_Approval || isAI_Execution || isAI_Reject || isAI_Cancel}
                    variant="primary"
                    rounded="large"
                    onClick={handleClickEdit}
                  >
                    {t('button.edit')}
                  </PappperButton>
                </>
              )}
            </Col>
          </Row>

          <Row gutter={24}>
            <Col id="submission-form" className="h-[70vh] overflow-auto mb-6" span={14}>
              <Row>
                {dataFields.map((item, index) => (
                  <Col span={item?.colSpan || 24} key={index}>
                    <FormElement
                      field={item}
                      formInstance={form}
                      className={`${item.require && !data?.[item.name] ? 'ocr-null' : ''}`}
                      onFocus={() => handleFocusField(item)}
                      onBlur={() => setPositionData(null)}
                      disabled={!isEdit}
                      applicationFormType={applicationFormType}
                      dataKey={dataKey}
                    />
                  </Col>
                ))}
              </Row>
            </Col>

            {/* image */}
            <Col span={10} className="px-4">
              {documents.map((doc, index) => (
                <React.Fragment key={index}>
                  <Row>
                    <RotatableImage positionData={positionData} zoomable className="mb-2" src={doc} />
                  </Row>
                  <br></br>
                </React.Fragment>
              ))}
            </Col>
          </Row>

          <Row>
            <Col span={24}>
              <FormItem label="Reason" name="reason">
                <SelectBox
                  disabled={isEdit || isApproved || isReUpload || isDisable || isCreateNewApplication}
                  options={reasonOptions}
                  size="large"
                />
              </FormItem>
            </Col>
            <Col span={24}>
              <FormItem label="Notes" name="note">
                <TextInputArea rows={8} />
              </FormItem>
            </Col>
          </Row>
        </Form>
      )}
    </div>
  )
}
