import { toast } from 'react-toastify'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { ISubmissionSearchByNameRequest, ISubmissionRequest } from './index.types'
import { submissionServices } from '~/services/submisstion'
import { programServices } from '~/services/program'
import { testServices } from '~/services'
import { systemServices } from '~/services/system'

export const submissionGetAllRequest = createAsyncThunk(
  'submission/getAll',
  async ({ onSuccess, onError }: ISubmissionRequest, { fulfillWithValue, rejectWithValue }) => {
    const response = await submissionServices.getAll()
    if (response.kind === 'ok' && response.data?.status === 1) {
      const _dataSubmission =
        response.data.data?.map?.((item) => {
          return {
            ...item,
            productName: 'Credit',
            saleCode: '0005 - Nguyen Van A',
            programName: item?.program?.name || '',
            pushToFastAither: 'Waiting for push',
            statusName: item?.status === '0' ? 'Chờ duyệt' : 'Đã duyệt',
          }
        }) || []
      onSuccess?.(_dataSubmission)
      return fulfillWithValue(_dataSubmission)
    } else {
      onError?.(response)
      return rejectWithValue(response)
    }
  },
)

export const submissionGetByIdRequest = createAsyncThunk(
  'submission/getById',
  async ({ data, onSuccess, onError }: ISubmissionRequest, { fulfillWithValue, rejectWithValue }) => {
    const { id } = data
    const response = await submissionServices.getById(id)
    if (response.kind === 'ok') {
      onSuccess?.(response.data)
      return fulfillWithValue(response.data?.data)
    } else {
      onError?.(response)
      return rejectWithValue(response)
    }
  },
)

export const submissionUpdateRequest = createAsyncThunk(
  'submission/update',
  async ({ data, onSuccess, onError, approve, reject }: ISubmissionRequest, { fulfillWithValue, rejectWithValue }) => {
    const response = await toast.promise(submissionServices.update(data, approve, reject), {
      pending: 'Progressing',
      success: 'Update succeed',
      error: 'Update failed',
    })
    // const response = await submissionServices.update(data, approve, reject)

    if (response.kind === 'ok' && response.data?.status === 1) {
      onSuccess?.(response.data)
      return fulfillWithValue(response.data?.data)
    } else {
      onError?.(response)
      return rejectWithValue(response)
    }

    // const response = await toast.promise(submissionServices.update(data))
    // if (response.kind === 'ok' && response.data?.status === 1) {
    //   // toast.success(response?.data?.message || 'Update Succeed!')
    //   onSuccess?.(response.data)
    //   return fulfillWithValue(response.data?.data)
    // } else {
    //   toast.error(response.data?.message || 'Something went wrong!')
    //   onError?.(response)
    //   return rejectWithValue(response)
    // }
  },
)

export const submissionUpdateIdDocRequest = createAsyncThunk(
  'submission/updateIdDoc',
  async ({ data, onSuccess, onError }: ISubmissionRequest, { fulfillWithValue, rejectWithValue }) => {
    const response = await submissionServices.updateIdDoc(data)
    if (response.kind === 'ok' && response.data?.status === 1) {
      toast.success('Update Succeed!')
      onSuccess?.(response.data)
      return fulfillWithValue(response.data?.data)
    } else {
      toast.error(response.data?.message || 'Something went wrong!')
      onError?.(response)
      return rejectWithValue(response)
    }
  },
)

export const submissionUpdateResidenceDocRequest = createAsyncThunk(
  'submission/updateResidenceDoc',
  async ({ data, onSuccess, onError }: ISubmissionRequest, { fulfillWithValue, rejectWithValue }) => {
    const response = await submissionServices.updateResidenceDoc(data)
    if (response.kind === 'ok' && response.data?.status === 1) {
      toast.success('Update Succeed!')
      onSuccess?.(response.data)
      return fulfillWithValue(response.data?.data)
    } else {
      toast.error(response.data?.message || 'Something went wrong!')
      onError?.(response)
      return rejectWithValue(response)
    }
  },
)

export const submissionUpdateApplicationRequest = createAsyncThunk(
  'submission/updateApplication',
  async ({ data, onSuccess, onError }: ISubmissionRequest, { fulfillWithValue, rejectWithValue }) => {
    const response = await submissionServices.updateApplication(data)
    if (response.kind === 'ok' && response.data?.status === 1) {
      toast.success('Update Succeed!')
      onSuccess?.(response.data)
      return fulfillWithValue(response.data?.data)
    } else {
      toast.error(response.data?.message || 'Something went wrong!')
      onError?.(response)
      return rejectWithValue(response)
    }
  },
)

export const submissionSearchByNameRequest = createAsyncThunk(
  'submission/searchByName',
  async ({ data, onSuccess, onError }: ISubmissionSearchByNameRequest, { fulfillWithValue, rejectWithValue }) => {
    const response = await submissionServices.searchByName(data)
    if (response.kind === 'ok' && response.data?.status === 1) {
      const _dataSubmission =
        response.data.data?.result?.map?.((item) => {
          const productName = item?.program?.group?.product?.nameEn || ''
          const programName = item?.program?.nameEn || ''
          const saleData = item?.userHandle || item?.user || {}
          const saleCode = `${saleData?.employeeCode || ''} - ${saleData?.username || ''}`
          // const createdDate = moment(item?.createdDate).format(DATE_FORMAT)
          const pushToFastAither = item?.fastPushStatus
          return {
            ...item,
            saleCode,
            productName,
            programName,
            pushToFastAither,
            // createdDate,
          }
        }) || []

      const dataTransfer = {
        result: _dataSubmission,
        pagination: response.data?.data?.pagination,
      }
      onSuccess?.(dataTransfer)
      return fulfillWithValue(dataTransfer)
    } else {
      onError?.(response)
      return rejectWithValue(response)
    }
  },
)

export const submissionGetProgramConfigRequest = createAsyncThunk(
  'submission/getProgramConfig',
  async ({ data, onSuccess, onError }: ISubmissionRequest, { fulfillWithValue, rejectWithValue }) => {
    const { programId, forSelect } = data
    const response = await programServices.getById(programId, forSelect)
    if (response.kind === 'ok' && response.data?.status === 1) {
      onSuccess?.(response.data)
      return fulfillWithValue(response.data?.data?.programDocuments || [])
    } else {
      onError?.(response)
      return rejectWithValue(response)
    }
  },
)

export const submissionAssignSaleRequest = createAsyncThunk(
  'submission/assignSale',
  async ({ data, onSuccess, onError }: ISubmissionRequest, { fulfillWithValue, rejectWithValue }) => {
    const response = await submissionServices.assignSale(data)
    if (response.kind === 'ok' && response.data?.status === 1) {
      onSuccess?.(response.data)
      return fulfillWithValue(response.data)
    } else {
      onError?.(response)
      toast.error(response.data?.message || 'Something went wrong!')
      return rejectWithValue(response)
    }
  },
)

export const submissionChangeStatusRequest = createAsyncThunk(
  'submission/changeStatus',
  async ({ data, onSuccess, onError }: ISubmissionRequest, { fulfillWithValue, rejectWithValue }) => {
    const response = await testServices.changeSubmissionStatus(data)
    if (response.kind === 'ok' && response.data?.status === 1) {
      onSuccess?.(response.data)
      toast.success(response.data?.message || 'Success')
      return fulfillWithValue({
        newStatus: data?.status,
        ...(response.data || {}),
      })
    } else {
      onError?.(response)
      toast.error(response.data?.message || 'Something went wrong!')
      return rejectWithValue(response)
    }
  },
)

export const submissionSearchLogRequest = createAsyncThunk(
  'submission/searchLogs',
  async ({ data, onSuccess, onError }: ISubmissionRequest, { fulfillWithValue, rejectWithValue }) => {
    const response = await submissionServices.searchLogById(data)
    if (response.kind === 'ok' && response.data?.status === 1) {
      const submisionLogs =
        response.data?.data?.result?.map?.((item) => ({
          ...item,
          // createdDate: moment(item?.createdDate).format(DATE_FORMAT),
        })) || []
      onSuccess?.({
        pagination: response.data?.data?.pagination,
        result: submisionLogs,
      })
      return fulfillWithValue(submisionLogs)
    } else {
      onError?.(response)
      return rejectWithValue(response)
    }
  },
)

export const submissionGetReasonOptionsRequest = createAsyncThunk(
  'submission/getReasonOptions',
  async ({ onSuccess, onError, forSelect }: ISubmissionRequest, { fulfillWithValue, rejectWithValue }) => {
    const response = await systemServices.getAllReason(forSelect)
    if (response.kind === 'ok' && response.data?.status === 1) {
      const reasonOptions = response.data?.data?.map((item) => ({
        value: item?.id,
        label: item?.nameEn,
      }))
      onSuccess?.(response.data)
      return fulfillWithValue(reasonOptions)
    } else {
      onError?.(response)
      return rejectWithValue(response)
    }
  },
)

export const submissionGetSourceRequest = createAsyncThunk(
  'submission/getSourceRequest',
  async ({ onSuccess, onError }: ISubmissionRequest, { fulfillWithValue, rejectWithValue }) => {
    const response = await submissionServices.getSource()
    if (response.kind === 'ok' && response.data?.status === 1) {
      return fulfillWithValue(response.data.data)
    } else {
      onError?.(response)
      return rejectWithValue(response)
    }
  },
)

export const submissionGetAddressRequest = createAsyncThunk(
  'submission/getAddress',
  async ({ data, onSuccess, onError }: ISubmissionRequest, { fulfillWithValue, rejectWithValue }) => {
    const response = await submissionServices.getAddress(data)
    if (response.kind === 'ok' && response.data?.status === 1) {
      onSuccess?.(response.data.data)
      return fulfillWithValue(response.data.data)
    } else {
      onError?.(response)
      return rejectWithValue(response)
    }
  },
)
export const submissionGetAddressCityRequest = createAsyncThunk(
  'submission/getAddress',
  async ({ data, onSuccess, onError }: ISubmissionRequest, { fulfillWithValue, rejectWithValue }) => {
    const response = await submissionServices.getAddressCity(data)
    if (response.kind === 'ok' && response.data?.status === 1) {
      onSuccess?.(response.data.data)
      return fulfillWithValue(response.data.data)
    } else {
      onError?.(response)
      return rejectWithValue(response)
    }
  },
)
export const submissionGetAddressDistrictRequest = createAsyncThunk(
  'submission/getAddress',
  async ({ data, onSuccess, onError }: ISubmissionRequest, { fulfillWithValue, rejectWithValue }) => {
    const response = await submissionServices.getAddressDistrict(data)
    if (response.kind === 'ok' && response.data?.status === 1) {
      onSuccess?.(response.data.data)
      return fulfillWithValue(response.data.data)
    } else {
      onError?.(response)
      return rejectWithValue(response)
    }
  },
)
export const submissionGetAddressWardRequest = createAsyncThunk(
  'submission/getAddress',
  async ({ data, onSuccess, onError }: ISubmissionRequest, { fulfillWithValue, rejectWithValue }) => {
    const response = await submissionServices.getAddressWard(data)
    if (response.kind === 'ok' && response.data?.status === 1) {
      onSuccess?.(response.data.data)
      return fulfillWithValue(response.data.data)
    } else {
      onError?.(response)
      return rejectWithValue(response)
    }
  },
)
