import apiClient from '@/services/AxiosClient.js'
export default {
  getUserID(id) {
    return apiClient.get('/user/' + id)
  },
  uploadFile(file) {
    let formData = new FormData()
    formData.append('file', file)
    return apiClient.post('/uploadFile', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },
  saveUser(user) {
    return apiClient.post('/save-user-profile', user)
  }
}
