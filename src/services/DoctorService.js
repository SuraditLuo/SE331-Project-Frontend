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
    return apiClient.post('/add-doctor-role', user)
  },
  addPatient(user) {
    return apiClient.post('/add-patient-role', user)
  },
  RemoveDoctor(user) {
    return apiClient.post('/remove-doctor-role', user)
  },
  getdoctors(perPage, page) {
    return apiClient.get('/doctor?_limit=' + perPage + '&_page=' + page)
  },
  getUserID(id) {
    return apiClient.get('/user/' + id)
  }
}
