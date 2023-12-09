import api from '../config/axios'

class PetTypesService {
  async getAll () {
    try {
      const response = await api.get('/pet-types')
      return response.data
    } catch (error) {
      return error.response
    }
  }
}

export default new PetTypesService()
