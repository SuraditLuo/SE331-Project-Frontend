import apiClient from '@/services/AxiosClient.js'
export default {
  getDoctors() {
    return apiClient.get('/doctor')
  },
  getPatients() {
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
