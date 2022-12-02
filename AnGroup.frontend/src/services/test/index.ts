import { httpService } from '../http'

export const testServices = {
  changeSubmissionStatus: async (data) => {
    const response = await httpService.post('/api/module/execute/02T01', { data })
    return response
  },
}
