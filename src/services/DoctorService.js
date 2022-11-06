import apiClient from '@/services/AxiosClient.js'
export default {
  getPatients(perPage, page) {
    return apiClient.get('/patient?_limit=' + perPage + '&_page=' + page)
  },
  getPatientList() {
    return apiClient.get('/patient')
  },
  getDoctor(id) {
    return apiClient.get('/doctor/' + id)
  },
  getDoctors(perPage, page) {
    return apiClient.get('/doctor?_limit=' + perPage + '&_page=' + page)
  },
  getPatient(id) {
    return apiClient.get('/patient/' + id)
  },
  PostComment(comment) {
    return apiClient.post('/comment', comment)
  },
  getPatientByKeyword(keyword, perPage, page) {
    return apiClient.get(
      'patient?_limit=' + perPage + '&_page=' + page + '&name=' + keyword
    )
  }
}
