import { reactive } from 'vue'
export default reactive({
  flashMessage: '',
  patients: null,
  organizers: null,
  vaccines: null,
  users: null,
  currentUser: JSON.parse(localStorage.getItem('user'))
})
