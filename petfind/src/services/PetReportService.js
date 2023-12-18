import Cookies from 'js-cookie'
import api from '../config/axios'

class PetReportService {
  async getPetReports (params) {
    try {
      const response = await api.get('/pet-reports', { params })
      return response.data
    } catch (error) {
      return error.response.data
    }
  }

  async getPetReport (id) {
    try {
      const response = await api.get(`/pet-reports/${id}`)
      return response.data
    } catch (error) {
      return error.response.data
    }
  }

  async createPetReport (data) {
    try {
      const jwtToken = Cookies.get('jwtToken')
      const response = await api.post('/pet-reports/own', data, {
        headers: {
          ...api.defaults.headers,
          Authorization: `Bearer ${jwtToken}`,
          'Content-Type': 'multipart/form-data'
        }
      })
      return response.data
    } catch (error) {
      return error.response.data
    }
  }
}

export default new PetReportService()
