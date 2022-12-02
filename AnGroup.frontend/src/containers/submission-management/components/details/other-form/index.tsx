import { Col, Form, Row } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import moment from 'moment'
import React, { useEffect, useState, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import {
  FormItem,
  PappperButton,
  TextInputArea,
  PapperPopupConfirm,
  SelectBox,
  RotatableImage,
} from '~/components/common'
import { EReasonStatus } from '~/containers/submission-management/index.types'
import { useAppTranslation } from '~/hooks/useAppTranslation'
import { useAppSelector } from '~/redux/hooks'
import { getImageUrlWithToken } from '~/utils/helper'

export interface OtherDetailsFormProps {
  activeKey?: string
}

export default function OtherDetailsForm({ activeKey }: OtherDetailsFormProps) {
  const [form] = useForm()
  const { t } = useAppTranslation()

  const [searchParams] = useSearchParams()

  const reasonOptions = useAppSelector((state) => state.submission.reasonOptions)
  const dataSubmissionDetails = useAppSelector((state) => state.submission.dataSubmissionDetails)

  const [documents, setDocuments] = useState([])

  const getDocumentsByActiveKey = useCallback(() => {
    const type = searchParams.get('type')
    if (!dataSubmissionDetails || !activeKey) return
    const _documents =
      dataSubmissionDetails.profileDocuments
        ?.filter?.((item) => item.name === type && `${activeKey}` === `${item.page}`)
        ?.map((item) => getImageUrlWithToken(item.path)) || []
    setDocuments(_documents)
  }, [dataSubmissionDetails, activeKey, searchParams])

  useEffect(() => {
    getDocumentsByActiveKey()
  }, [getDocumentsByActiveKey])

  const subStatus = dataSubmissionDetails?.profileStatuses?.slice().sort((a, b) => moment(a.createdDate).valueOf() - moment(b.createdDate).valueOf());
  const submissionSubStatus = (subStatus || []).at(-1)?.subStatusus
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

  const handleReject = () => {
    const reason = form.getFieldValue('reason')
    if (!reason) {
      toast.warning('Please select reason field')
    } else {
      console.log('SUBMIT')
    }
  }

  return (
    <div>
      <Form layout="vertical" form={form}>
        <Row justify="end" className="mb-4">
          <Col>
            <PapperPopupConfirm title="Do you want reject this data?" onConfirm={handleReject}>
              <PappperButton
                variant="primary"
                rounded="large"
                className="mr-4"
                disabled={isApproved || isReUpload || isReject || isCreateNewApplication || isProcessing || isDataCheck || isAssessment || isFastApproval || isDefer || isAI_Approval || isAI_Execution || isAI_Reject || isAI_Cancel}
              >
                {t('button.fail')}
              </PappperButton>
            </PapperPopupConfirm>
          </Col>
        </Row>

        <Row gutter={24}>
          {/* image */}
          <Col span={16} className="px-4">
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
    </div>
  )
}
