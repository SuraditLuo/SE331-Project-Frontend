import apiClient from '@/services/AxiosClient.js'

export default {
  addDoctorRole(user) {
    return apiClient.post('/add-doctor-role', user)
  },
  addPatientRole(user) {
    return apiClient.post('/add-patient-role', user)
  },
  RemoveDoctor(user) {
    return apiClient.post('/remove-doctor-role', user)
  },
  getDoctors(perPage, page) {
    return apiClient.get('/doctor?_limit=' + perPage + '&_page=' + page)
  },
  getUser() {
    return apiClient.get('/user')
  },
  getDoctorList() {
    return apiClient.get('/doctor')
  },
  getVaccines() {
    return apiClient.get('/vaccines')
  },
  saveDoctor(patient) {
    return apiClient.post('/save-doctor', patient)
  },
  saveVaccine(patient) {
    return apiClient.post('/save-vaccine', patient)
  }
}
