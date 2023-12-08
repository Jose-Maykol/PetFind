import { camelizeKeys, decamelizeKeys } from 'humps'
import axios from 'axios'
import { API_URL } from './config'
import Cookies from 'js-cookie'

const api = axios.create({
  baseURL: API_URL
})

api.interceptors.response.use((response) => {
  if (
    response.data &&
    response.headers['content-type'] === 'application/json; charset=utf-8'
  ) {
    response.data = camelizeKeys(response.data)
  }
  return response
})

api.interceptors.request.use((config) => {
  const jwtToken = Cookies.get('jwtToken')

  const newConfig = { ...config }
  newConfig.url = `${API_URL}${config.url}`

  if (newConfig.headers['Content-Type'] === 'multipart/form-data') {
    return newConfig
  }

  if (config.params) {
    newConfig.params = decamelizeKeys(config.params)
  }

  if (config.data) {
    newConfig.data = decamelizeKeys(config.data)
  }

  if (jwtToken) {
    newConfig.headers.Authorization = `Bearer ${jwtToken}`
  }

  return newConfig
})

export default api
