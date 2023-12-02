import api from './../config/axios'

class PetReportService {
  async getPetReports () {
    try {
      const response = await api.get('/pet-reports')
      return response.data
    } catch (error) {
      return error.response.data
    }
  }
}

export default new PetReportService()
