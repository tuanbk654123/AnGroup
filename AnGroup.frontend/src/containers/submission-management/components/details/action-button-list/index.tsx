import { Col, Row, Spin } from 'antd'
import moment from 'moment'
import { toast } from 'react-toastify'
import { ConfirmableButton } from '~/components/common'
import { EProductType } from '~/containers/product-management/index.types'
import {
  ApplicationCreditFields,
  ApplicationLoanFields,
  IdCardFields,
} from '~/containers/submission-management/constants/fields'
import { EReasonStatus } from '~/containers/submission-management/index.types'
import { useAppTranslation } from '~/hooks/useAppTranslation'
import { useAppDispatch, useAppSelector } from '~/redux/hooks'
import { submissionGetByIdRequest, submissionUpdateRequest } from '~/redux/slices/submission/middleware'

export default function ActionButtonList() {
  const dispatch = useAppDispatch()
  const { t } = useAppTranslation()
  const dataSubmissionDetails = useAppSelector((state) => state.submission.dataSubmissionDetails)
  const subStatus = dataSubmissionDetails?.profileStatuses?.slice().sort((a, b) => moment(a.createdDate).valueOf() - moment(b.createdDate).valueOf());
  const submissionSubStatus = (subStatus || []).at(-1)?.subStatus
  const isApproved = submissionSubStatus === EReasonStatus.Approval
  const isReUpload = submissionSubStatus === EReasonStatus.Reupload
  const isReject = submissionSubStatus === EReasonStatus.Reject
  const isCreateNewApplication = submissionSubStatus === EReasonStatus.CreateNewApplication
  const isProcessing = submissionSubStatus === EReasonStatus.Processing
  const isDataCheck = submissionSubStatus === EReasonStatus.DataCheck
  const isAssessment = submissionSubStatus === EReasonStatus.Assessment
  const isFastApproval = submissionSubStatus === EReasonStatus.FastApproval
  const isDefer = submissionSubStatus === EReasonStatus.Defer
  const isAI_Approval = submissionSubStatus === EReasonStatus.AI_Approval
  const isAI_Execution = submissionSubStatus === EReasonStatus.AI_Execution
  const isAI_Reject = submissionSubStatus === EReasonStatus.AI_Reject
  const isAI_Cancel = submissionSubStatus === EReasonStatus.AI_Cancel
  console.log("status", submissionSubStatus)
  console.log("dataSubmissionDetails", dataSubmissionDetails)
  console.log("profileDocumentNotes", dataSubmissionDetails?.profileDocumentNotes)
  const checkDataValid = () => {
    if (!dataSubmissionDetails) return false

    const { idDoc, application } = dataSubmissionDetails
    const isCreditCard = dataSubmissionDetails?.application?.formType === EProductType.credit
    const idCardRequireFields = IdCardFields.filter((item) => item.require)
    const applicationRequireFields = (isCreditCard ? ApplicationCreditFields : ApplicationLoanFields).filter(
      (item) => item.require,
    )
    let isValid = true
    idCardRequireFields.forEach((field) => {
      if (!isValid) return
      if (!idDoc?.[field.name]) {
        isValid = false
      }
    })
    applicationRequireFields.forEach((field) => {
      if (!isValid) return
      if (!application?.[field.name]) {
        isValid = false
      }
    })

    return isValid
  }
  const handleChangeStatus = (status) => {
    console.log(status)
    console.log("statusdataSubmissionDetails", dataSubmissionDetails)
    console.log("profileDocumentNotes", dataSubmissionDetails?.profileDocumentNotes)
    if (!dataSubmissionDetails) {
      return
    }
    if (isApproved) {
      toast.warning('This submission is approved')
      return
    }
    if (status === 'CMS_REJECT' && dataSubmissionDetails?.profileDocumentNotes.length === 0) {
      toast.warning('Please select reason field')
      return
    }
    const { id, programId, clientName, rating, isHead, userId, idCard, application, residenceDoc, ghpappid, idDoc } =
      dataSubmissionDetails

    const dataSubmit = {
      id,
      programId,
      userId,
      clientName,
      idCard,
      status, // 0 - đang kiểm tra , 1 - duyệt 2 - tư chối
      ghpappid,
      rating,
      isHead,
      application,
      residenceDoc,
      idDoc,
    }

    const statusApprove = status === 'CMS_APPROVAL'
    const statusReject = status === 'CMS_REJECT'

    dispatch(
      submissionUpdateRequest({
        data: dataSubmit,
        approve: statusApprove,
        reject: statusReject,
        onSuccess() {
          dispatch(
            submissionGetByIdRequest({
              data: { id },
            }),
          )
        },
      }),
    )
  }

  return (
    <>
      {submissionSubStatus === undefined ? (
        <div className="d-flex">
          <Spin size="default"></Spin>
          <span className="pl-3">{t('message.loading')}</span>
        </div>
      ) : (
        <Row justify="end">
          <Col span={12} className="flex justify-end">
            <ConfirmableButton
              disableConfirm={isApproved || isReUpload || isReject || isCreateNewApplication || isProcessing || isDataCheck || isAssessment || isFastApproval || isDefer || isAI_Approval || isAI_Execution || isAI_Reject || isAI_Cancel}
              confirmText="Do you want reject this submission?"
              onConfirm={() => handleChangeStatus(EReasonStatus.Reject)}
              variant="primary"
              rounded="large"
              className="mr-4"
            >
              {t('button.reject')}
            </ConfirmableButton>
            <ConfirmableButton
              disableConfirm={isApproved || isReUpload || isReject || isCreateNewApplication || isProcessing || isDataCheck || isAssessment || isFastApproval || isDefer || isAI_Approval || isAI_Execution || isAI_Reject || isAI_Cancel}
              confirmText="Do you want save this submission?"
              onConfirm={() => handleChangeStatus(EReasonStatus.Update)}
              variant="primary"
              rounded="large"
              className="mr-4"
            >
              {t('button.save')}
            </ConfirmableButton>
            <ConfirmableButton
              disableConfirm={isApproved || isReUpload || isReject || !checkDataValid() || isCreateNewApplication || isProcessing || isDataCheck || isAssessment || isFastApproval || isDefer || isAI_Approval || isAI_Execution || isAI_Reject || isAI_Cancel}
              confirmText="Do you want approve this submission?"
              onConfirm={() => handleChangeStatus(EReasonStatus.Approval)}
              variant="primary"
              rounded="large"
              className="mr-4"
            >
              {t('button.approve')}
            </ConfirmableButton>
          </Col>
        </Row>
      )}
    </>
  )
}
