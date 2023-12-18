import api from '../config/axios'

class UserService {
  async getInfoUser () {
    try {
      const response = await api.get('/users/info')
      return response.data
    } catch (error) {
      return error.response
    }
  }

  async logOut () {
    try {
      const response = await api.post('/auth/logout', {}, { withCredentials: true })
      return response.data
    } catch (error) {
      return error.response
    }
  }
}

export default new UserService()
