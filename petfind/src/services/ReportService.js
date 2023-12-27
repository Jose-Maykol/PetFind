import Cookies from 'js-cookie'
import api from '../config/axios'

class ReportService {
  async createReport (data, id) {
    try {
      const jwtToken = Cookies.get('jwtToken')
      const response = await api.post(`/reports/pet-reports/${id}`, data, {
        headers: {
          ...api.defaults.headers,
          Authorization: `Bearer ${jwtToken}`,
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
