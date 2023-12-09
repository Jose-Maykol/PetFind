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
}

export default new PetReportService()
