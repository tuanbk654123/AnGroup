import { useSearchParams, useParams } from 'react-router-dom'

import ApplicationEditForm from './application'
import IndentificationEditForm from './indentification'
import ResidenceEditForm from './residence'
import { ESubmissionDetailListType } from '../../index.types'
import { useEffect } from 'react'
import { useAppDispatch } from '~/redux/hooks'
import {
  submissionGetByIdRequest,
  submissionGetReasonOptionsRequest,
  submissionGetSourceRequest,
} from '~/redux/slices/submission/middleware'
import GeneralForm from './general'
import { OtherDocumentForm } from './other-document'

export default function SubmissionEditManagement() {
  const [searchParams] = useSearchParams()
  const { id } = useParams()

  const dispatch = useAppDispatch()

  const listType = searchParams.get('type') || ESubmissionDetailListType.general

  useEffect(() => {
    getDataById()
    getReasonOptions()
    getSubmissionSource()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getDataById = () => {
    dispatch(
      submissionGetByIdRequest({
        data: { id },
      }),
    )
  }

  const getSubmissionSource = () => {
    dispatch(submissionGetSourceRequest({}))
  }

  const getReasonOptions = () => {
    dispatch(submissionGetReasonOptionsRequest({forSelect: true}))
  }

  const renderFormEdit = () => {
    switch (listType) {
      case ESubmissionDetailListType.general:
        return <GeneralForm />
      case ESubmissionDetailListType.indentification:
        return <IndentificationEditForm />
      case ESubmissionDetailListType.residence:
        return <ResidenceEditForm />
      case ESubmissionDetailListType.application:
        return <ApplicationEditForm />
      default:
        return <OtherDocumentForm />
    }
  }
  return renderFormEdit()
}
