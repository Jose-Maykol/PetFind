import Cookies from 'js-cookie'
import api from '../config/axios'

class ReportService {
  async createReport (data, id) {
    try {
      const accessToken = Cookies.get('accessToken')
      const response = await api.post(`/reports/pet-reports/${id}`, data, {
        headers: {
          ...api.defaults.headers,
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'multipart/form-data'
        }
      })
      return response.data
    } catch (error) {
      return error
    }
  }
}

export default new ReportService()
