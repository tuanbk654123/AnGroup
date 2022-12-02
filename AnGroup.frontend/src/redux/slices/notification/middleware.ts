import { createAsyncThunk } from '@reduxjs/toolkit'
import { notificationServices } from '~/services/notification'
import { ICreateNotificationRequest, IFectchNotificationRequest, IUpdateNotificationRequest } from './index.types'

export const notificationGetAllRequest = createAsyncThunk(
  'notification/getAll',
  async ({ notificationFilters, onSuccess }: IFectchNotificationRequest) => {
    const response = await notificationServices.getAll(notificationFilters)

    if (response.kind === 'ok') {
      const _dataRole =
        response.data.data?.result?.map?.((item) => {
          return {
            ...item,
          }
        }) || []

      const dataTransfer = {
        result: _dataRole,
        pagination: response.data?.data?.pagination,
      }
      onSuccess?.(response.data.data.pagination.rowCount)
      return dataTransfer
    } else {
      return []
    }
  },
)

export const updateNotification = createAsyncThunk(
  'helps/update',
  async ({ notification, onSuccess, onError }: IUpdateNotificationRequest) => {
    const response = await notificationServices.update(notification)
    if (response.kind === 'ok') {
      onSuccess?.(response.data)
      // toast.success('Update Succeed!')
      return response.data
    } else {
      // toast.error('Something went wrong!')
      onError?.(response.data)
      return response
    }
  },
)

export const createNotification = createAsyncThunk(
  'notification/create',
  async ({ notification, onSuccess, onError }: ICreateNotificationRequest) => {
    const response = await notificationServices.create(notification)

    if (response.kind === 'ok' && response.data.status === 1) {
      onSuccess?.(response.data)
      // toast.success('Create Succeed!')
      return response.data
    } else {
      // toast.error('Something went wrong!')
      onError?.(response.data)
      return response
    }
  },
)
