import { createRouter, createWebHistory } from 'vue-router'
import EventListView from '@/views/PatientListView.vue'
import EventRegisterView from '@/views/event/PatientRegisterView.vue'
import AboutView from '../views/AboutView.vue'
import EventLayoutView from '@/views/event/PatientLayoutView.vue'
import EventDetailView from '@/views/event/PatientDetailView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import NetWorkErrorView from '@/views/NetworkErrorView.vue'
import AddEvent from '@/views/PatientForm.vue'
import NProgress from 'nprogress'
import GStore from '@/store'
import PatientService from '@/services/PatientService'
import DoctorService from '@/services/DoctorService.js'
import Login from '@/views/LoginFormView.vue'
import Register from '@/views/RegisterFormView.vue'
import AddComment from '@/views/event/DoctorComment.vue'
const routes = [
  {
    path: '/',
    name: 'EventList',
    component: EventListView,
    props: (route) => ({ page: parseInt(route.query.page) || 1 })
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView
  },
  {
    path: '/event/:id',
    name: 'EventLayoutView',
    component: EventLayoutView,
    beforeEnter: (to) => {
      return PatientService.getEvent(to.params.id)
        .then((response) => {
          GStore.patients = response.data
        })
        .catch((error) => {
          if (error.response && error.response.start == 404) {
            return {
              name: '404Resource',
              parames: { resource: 'event' }
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
        name: 'EventDetails',
        component: EventDetailView,
        props: true
      },
      {
        path: 'register',
        name: 'EventRegister',
        props: true,
        component: EventRegisterView
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
    path: '/add-event',
    name: 'AddEvent',
    component: AddEvent,
    beforeEnter: () => {
      return DoctorService.getEventes()
        .then((response) => {
          GStore.patients = response.data
          DoctorService.getOrganizers().then((response) => {
            GStore.organizers = response.data
          })
          DoctorService.getVaccine().then((response) => {
            GStore.vaccines = response.data
          })
        })
        .catch(() => {
          GStore.event = null
          console.log('cannot load organizer')
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
