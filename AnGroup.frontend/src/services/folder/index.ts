import { Folder } from '~/types'
import { ListAllResponse } from '~/types/common'
import axiosInstance from '../http'

export const folderServices = {
  getAll(): Promise<ListAllResponse<Folder>> {
    const url = '/api/fast-report/list-fast-dir?fromDate=&toDate='
    return axiosInstance.get(url)
  },
  download(folder: Folder): Promise<any> {
    const url = '/api/fast-report/download'
    return axiosInstance.post(url, folder, {
      headers: {
        Accept: 'application/zip',
      },
      responseType: 'blob',
    })
  },
}
