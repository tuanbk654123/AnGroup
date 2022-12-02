import { Report, ReportCSV } from '~/types'
import { ListResponse } from '~/types/common'
import axiosInstance from '../http'
import { ReportFilterTypes } from './index.type'

export const reportServices = {
  getAll(reportFilters: ReportFilterTypes): Promise<ListResponse<Report>> {
    const url = '/api/docs/report/profile'
    return axiosInstance.post(url, reportFilters)
  },

  getAlls(reportFilters: ReportFilterTypes): Promise<ListResponse<ReportCSV>> {
    const url = '/api/docs/report/profile'
    return axiosInstance.post(url, reportFilters)
  },
}
