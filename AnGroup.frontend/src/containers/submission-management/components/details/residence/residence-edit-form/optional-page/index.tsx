import { Col, Form, Row } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import moment from 'moment'
import React, { useEffect, useState, useMemo, useCallback } from 'react'
import { toast } from 'react-toastify'
import { PappperButton, PapperPopupConfirm, FormItem, SelectBox, TextInputArea, RotatableImage } from '~/components/common'
import { getDocumentsByProps } from '~/containers/submission-management/helpers'
import { EReasonStatus } from '~/containers/submission-management/index.types'
import { useAppTranslation } from '~/hooks/useAppTranslation'
import { useAppSelector } from '~/redux/hooks'
import { getImageUrlWithToken } from '~/utils/helper'

export interface IResidenceOptionalPageEditFormProps {
  reasonPage?: number
  isOptionalPage?: boolean
}

export default function ResidenceOptionalPageEditForm({
  reasonPage,
  isOptionalPage,
}: IResidenceOptionalPageEditFormProps) {
  const { t } = useAppTranslation()
  const dataSubmissionDetails = useAppSelector((state) => state.submission.dataSubmissionDetails)
  const reasonOptions = useAppSelector((state) => state.submission.reasonOptions)
  const [documents, setDocuments] = useState([])
  const [data, setData] = useState(null)
  const [form] = useForm()

  const subStatus = dataSubmissionDetails?.profileStatuses?.slice().sort((a, b) => moment(a.createdDate).valueOf() - moment(b.createdDate).valueOf());
  const submissionSubStatus = (subStatus || []).at(-1)?.subStatus
  const isTotalApproved = submissionSubStatus === EReasonStatus.Approval
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

  const convertData = useCallback(() => {
    setData(dataSubmissionDetails?.['residenceDoc'])
    const documentsData = getDocumentsByProps({
      documents: dataSubmissionDetails?.profileDocuments || [],
      dataKey: 'residenceDoc',
      reasonPage,
      isOptional: isOptionalPage,
    })
    const _documents = documentsData.map((item) => getImageUrlWithToken(item.path))
    setDocuments(_documents)
  }, [setDocuments, setData, isOptionalPage, reasonPage, dataSubmissionDetails])

  const isDisable = useMemo(() => {
    const reasonFromData = data?.reasonNote?.find((item) => item.page === reasonPage)
    return reasonFromData?.status === EReasonStatus.Reject || isTotalApproved
  }, [data, reasonPage, isTotalApproved])

  useEffect(() => {
    if (dataSubmissionDetails) {
      convertData()
    }
  }, [dataSubmissionDetails, reasonPage, convertData])

  const handleReject = () => {
    const reason = form.getFieldValue('reason')
    if (!reason) {
      toast.warning('Please select reason field')
    } else {
      console.log('SUBMIT')
    }
  }

  return (
    <Form layout="vertical" form={form}>
      <Row justify="end" className="mb-4">
        <Col>
          <PapperPopupConfirm title="Do you want reject this data?" onConfirm={handleReject}>
            <PappperButton
              variant="primary"
              rounded="large"
              className="mr-4"
              disabled={isApproved || isReUpload || isReject || isDisable || isCreateNewApplication || isProcessing || isDataCheck || isAssessment || isFastApproval || isDefer || isAI_Approval || isAI_Execution || isAI_Reject || isAI_Cancel}
            >
              {t('button.fail')}
            </PappperButton>
          </PapperPopupConfirm>
        </Col>
      </Row>
      <Row gutter={24} className="justify-center flex">
        <Col span={10} className="px-4 ">
          {documents.map((doc, index) => (
            <React.Fragment key={index}>
              <Row>
                <RotatableImage zoomable className="mb-2" src={doc} />
              </Row>
              <br></br>
            </React.Fragment>
          ))}
        </Col>
      </Row>
      {/* <Row gutter={24}>
        {documents.map((doc, index) => (
          <Col key={index} className="justify-center flex">
            <div className={`flex justify-center mb-10 ${isOptionalPage ? 'w-1/4' : 'w-1/2'}`}>
              <img alt="alt" src={doc} />
            </div>
          </Col>
        ))}
      </Row> */}
      <Row>
        <Col span={24}>
          <FormItem label="Reason" name="reason">
            <SelectBox options={reasonOptions} size="large" />
          </FormItem>
        </Col>
        <Col span={24}>
          <FormItem label="Notes" name="note">
            <TextInputArea rows={8} />
          </FormItem>
        </Col>
      </Row>
    </Form>
  )
}
