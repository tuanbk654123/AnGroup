import axios, { AxiosRequestConfig } from 'axios'
import { storageKeys } from '~/constants/storageKeys'
import { getResponseKind } from '~/utils/http-service'
import { deleteAllDataStorage, getValueFromStorage } from '~/utils/storage.utils'
import { EKindResponse, IApiResponse } from './index.types'
import { store } from '~/redux/store'
import { createBrowserHistory } from 'history'
import { toast } from 'react-toastify'
import { loadingContainerRequest } from '~/redux/slices/loading-container/middleware'
import { deleteAllDataCookie, getDataFromCookie } from '~/utils/cookie.utils'
import { t } from 'i18next'
import { logoutRequest } from '~/redux/slices/auth/middleware'
import { RouterHelper } from '~/utils'

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_API_URL,
  timeout: 300000,
})

export const history = createBrowserHistory()

axiosInstance.interceptors.request.use((config) => {
  const currentPage = getValueFromStorage(storageKeys.CURRENT_PAGE)
  const token = getDataFromCookie(storageKeys.TOKEN)
  const _config = {
    ...config,
    headers: {
      ...config.headers,
      Authorization: `Bearer ${token}`,
      codeMenu: currentPage ?? 'none-code',
    },
  }
  return _config
})

axiosInstance.interceptors.response.use(
  (response) => {
    const kind = getResponseKind(response?.status)
    if (kind === EKindResponse.unauthor) {
      // TO DO SOMETHING WHEN UNAUTHOR
    }
    store.dispatch(
      loadingContainerRequest({
        isLoadingContainer: false,
      }),
    )
    return { kind, data: response?.data, error: null }
  },

  (error) => {
    if (getResponseKind(error.response?.data?.code) === EKindResponse.forbidden) {
      // store.dispatch(
      //   logoutRequest({
      //     data: {},
      //     onSuccess: () => {
      //       deleteAllDataStorage()
      //       deleteAllDataCookie()
      //       toast.error('Permission denied. User logout !')
      //       history.push(RouterHelper.login)
      //     },
      //   }),
      // )
      toast.error(t('message.denied'))
    }
    if (error?.response?.status === 401) {
      store.dispatch(
        logoutRequest({
          data: {},
          onSuccess: () => {
            deleteAllDataStorage()
            deleteAllDataCookie()
            history.push(RouterHelper.login)
          },
        }),
      )
      toast.error(t('message.unauthor'))
    }
    const kind = getResponseKind(error.response?.status)
    store.dispatch(
      loadingContainerRequest({
        isLoadingContainer: false,
      }),
    )
    return { kind, data: null, error }
  },
)

const get = async (path: string, options: AxiosRequestConfig = {}) => {
  const result: IApiResponse = await axiosInstance.get(path, options)
  return result
}

const post = async (path: string, data: any, options: AxiosRequestConfig = {}) => {
  const result: IApiResponse = await axiosInstance.post(path, data, options)
  return result
}
const put = async (path: string, data: any, options: AxiosRequestConfig = {}) => {
  const result: IApiResponse = await axiosInstance.put(path, data, options)
  return result
}
const remove = async (path: string, options: AxiosRequestConfig = {}) => {
  const result: IApiResponse = await axiosInstance.delete(path, options)
  return result
}

export const httpService = {
  get,
  post,
  put,
  delete: remove,
}

export default axiosInstance
