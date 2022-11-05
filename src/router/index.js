import { createRouter, createWebHistory } from 'vue-router'
import PatientListView from '@/views/PatientListView.vue'
import AboutView from '../views/AboutView.vue'
import PatientLayoutView from '@/views/patient/PatientLayoutView.vue'
import PatientDetailView from '@/views/patient/PatientDetailView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import NetWorkErrorView from '@/views/NetworkErrorView.vue'
import AddPatient from '@/views/PatientForm.vue'
import NProgress from 'nprogress'
import GStore from '@/store'
import PatientService from '@/services/PatientService'
import DoctorService from '@/services/DoctorService.js'
import Login from '@/views/LoginFormView.vue'
import Register from '@/views/RegisterFormView.vue'
import AddComment from '@/views/patient/DoctorComment.vue'
import AddRole from '@/views/AddRole.vue'
import AddDoctor from '@/views/AddDoctorForm.vue'
import UserInfo from '@/views/UserInfoView.vue'
const routes = [
  {
    path: '/',
    name: 'PatientList',
    component: PatientListView,
    props: (route) => ({ page: parseInt(route.query.page) || 1 })
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView
  },
  {
    path: '/userinfo',
    name: 'UserInfo',
    component: UserInfo,
    beforeEnter: () => {
      return DoctorService.getUserID(GStore.currentUser.id)
        .then((response) => {
          GStore.users = response.data
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
    }
  },
  {
    path: '/patient/:id',
    name: 'PatientLayoutView',
    component: PatientLayoutView,
    beforeEnter: (to) => {
      return PatientService.getPatient(to.params.id)
        .then((response) => {
          GStore.patients = response.data
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
    path: '/add-patient',
    name: 'AddPatient',
    component: AddPatient,
    beforeEnter: () => {
      return DoctorService.getPatients()
        .then((response) => {
          GStore.patients = response.data
          DoctorService.getDoctors().then((response) => {
            GStore.doctors = response.data
          })
          DoctorService.getVaccine().then((response) => {
            GStore.vaccines = response.data
          })
        })
        .catch(() => {
          GStore.patient = null
          console.log('cannot load doctor')
        })
    }
  },
  {
    path: '/add-role',
    name: 'AddRole',
    component: AddRole,
    beforeEnter: () => {
      return DoctorService.getUser()
        .then((response) => {
          GStore.users = response.data
          DoctorService.getDoctors().then((response) => {
            GStore.doctors = response.data
          })
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
    path: '/add-doctor',
    name: 'AddDoctor',
    component: AddDoctor,
    beforeEnter: () => {
      return DoctorService.getPatients()
        .then((response) => {
          GStore.patients = response.data
          DoctorService.getDoctors().then((response) => {
            GStore.doctors = response.data
          })
          DoctorService.getVaccine().then((response) => {
            GStore.vaccines = response.data
          })
        })
        .catch(() => {
          GStore.patient = null
          console.log('cannot load doctor')
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
