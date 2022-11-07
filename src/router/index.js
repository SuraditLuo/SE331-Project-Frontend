import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/HomePage.vue'
import PatientListView from '@/views/PatientListView.vue'
import PatientLayoutView from '@/views/patient/PatientLayoutView.vue'
import PatientDetailView from '@/views/patient/PatientDetailView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import NetWorkErrorView from '@/views/NetworkErrorView.vue'
import AddVaccine from '@/views/AddVaccineForm.vue'
import NProgress from 'nprogress'
import GStore from '@/store'
import DoctorService from '@/services/DoctorService.js'
import AdminService from '@/services/AdminService.js'
import UserService from '@/services/UserService'
import Login from '@/views/LoginFormView.vue'
import Register from '@/views/RegisterFormView.vue'
import AddComment from '@/views/patient/DoctorComment.vue'
import AddDoctor from '@/views/AddDoctorForm.vue'
import UserInfo from '@/views/UserInfoView.vue'
import AddPatientRole from '@/views/role/AddPatientRole.vue'
import AddDoctorRole from '@/views/role/AddDoctorRole.vue'
import RemoveDoctorRole from '@/views/role/RemoveDoctorRole.vue'
const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: Home,
    props: true
  },
  {
    path: '/patient-list',
    name: 'PatientList',
    component: PatientListView,
    beforeEnter: () => {
      return UserService.getUserID(GStore.currentUser.id)
        .then((response) => {
          GStore.user = response.data
          DoctorService.getPatientList().then((response) => {
            GStore.patients = response.data
          })
        })
        .catch((error) => {
          if (error.response && error.response.start == 404) {
            return {
              name: '404Resource',
              params: { resource: 'user' }
            }
          } else {
            return { name: 'NetworkError' }
          }
        })
    },
    props: (route) => ({ page: parseInt(route.query.page) || 1 })
  },
  {
    path: '/userinfo',
    name: 'UserInfo',
    component: UserInfo,
    beforeEnter: () => {
      return UserService.getUserID(GStore.currentUser.id)
        .then((response) => {
          GStore.users = response.data
        })
        .catch((error) => {
          if (error.response && error.response.start == 404) {
            return {
              name: '404Resource',
              params: { resource: 'patient' }
            }
          } else {
            return { name: 'NetworkError' }
          }
        })
    }
  },
  {
    path: '/patient/:id',
    name: 'PatientLayoutView',
    component: PatientLayoutView,
    beforeEnter: (to) => {
      return DoctorService.getPatient(to.params.id)
        .then((response) => {
          GStore.patients = response.data
          return UserService.getUserID(GStore.currentUser.id).then(
            (response) => {
              GStore.users = response.data
            }
          )
        })
        .catch((error) => {
          if (error.response && error.response.start == 404) {
            return {
              name: '404Resource',
              parames: { resource: 'patient' }
            }
          } else {
            return { name: 'NetworkError' }
          }
        })
    },
    props: true,
    children: [
      {
        path: '',
        name: 'PatientDetails',
        component: PatientDetailView,
        props: true
      },
      {
        path: 'addcomment',
        name: 'AddComment',
        props: true,
        component: AddComment
      }
    ]
  },

  {
    path: '/save-vaccine',
    name: 'AddVaccine',
    component: AddVaccine,
    beforeEnter: () => {
      return DoctorService.getPatientList()
        .then((response) => {
          GStore.patients = response.data
          AdminService.getVaccines().then((response) => {
            GStore.vaccines = response.data
          })
        })
        .catch(() => {
          GStore.patient = null
          console.log('cannot load patient or vaccine')
        })
    }
  },
  {
    path: '/add-patient-role',
    name: 'AddPatientRole',
    component: AddPatientRole,
    beforeEnter: () => {
      return AdminService.getUser()
        .then((response) => {
          GStore.users = response.data
        })
        .catch(() => {
          GStore.users = null
          console.log('cannot load doctor')
        })
    }
  },
  {
    path: '/add-doctor-role',
    name: 'AddDoctorRole',
    component: AddDoctorRole,
    beforeEnter: () => {
      return AdminService.getUser()
        .then((response) => {
          GStore.users = response.data
        })
        .catch(() => {
          GStore.users = null
          console.log('cannot load doctor')
        })
    }
  },
  {
    path: '/remove-doctor-role',
    name: 'RemoveDoctorRole',
    component: RemoveDoctorRole,
    beforeEnter: () => {
      return AdminService.getDoctorList()
        .then((response) => {
          GStore.doctors = response.data
        })
        .catch(() => {
          GStore.users = null
          console.log('cannot load doctor')
        })
    }
  },
  {
    path: '/404/:resource',
    name: '404Resource',
    component: NotFoundView,
    props: true
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: NotFoundView
  },
  {
    path: '/network-error',
    name: 'NetworkError',
    component: NetWorkErrorView
  },
  {
    path: '/save-doctor',
    name: 'AddDoctor',
    component: AddDoctor,
    beforeEnter: () => {
      return DoctorService.getPatientList()
        .then((response) => {
          GStore.patients = response.data
          AdminService.getDoctorList().then((response) => {
            GStore.doctors = response.data
          })
        })
        .catch(() => {
          GStore.patients = null
          GStore.doctors = null
          console.log('cannot load data')
        })
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})
router.beforeEach(() => {
  NProgress.start()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
