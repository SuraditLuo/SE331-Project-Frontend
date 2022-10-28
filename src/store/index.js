import { reactive } from 'vue'
export default reactive({
  flashMessage: '',
  patients: null,
  doctors: null,
  vaccines: null,
  users: null,
  currentUser: JSON.parse(localStorage.getItem('user'))
})
