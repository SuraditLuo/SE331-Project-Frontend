import apiClient from '@/services/AxiosClient.js'
export default {
  getOrganizers() {
    return apiClient.get('/doctor')
  },
  getEventes() {
    return apiClient.get('/patient')
  },
  getVaccine() {
    return apiClient.get('/vaccines')
  },
  PostComment(comment) {
    return apiClient.post('/comment', comment)
  },
  getUser() {
    return apiClient.get('/user')
  },
  addDoctorUser(user) {
    return apiClient.post('/changeRole', user)
  }
}
