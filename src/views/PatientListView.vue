<template>
  <h1>Injection need</h1>
  <span v-if="isUser">
    <div class="patients">
      <div class="search-box">
        <BaseInput
          v-model="keyword"
          type="text"
          label="Search..."
          @input="updateKeyword"
        />
      </div>

      <PatientCard
        v-for="patient in patients"
        :key="patient.id"
        :patient="patient"
      ></PatientCard>

      <div class="pagination">
        <router-link
          id="page-prev"
          :to="{ name: 'PatientList', query: { page: page - 1 } }"
          rel="prev"
          v-if="page != 1"
        >
          Prev Page
        </router-link>

        <router-link
          id="page-next"
          :to="{ name: 'PatientList', query: { page: page + 1 } }"
          rel="next"
          v-if="hasNextPage"
        >
          Next Page
        </router-link>
      </div>
    </div>
  </span>
</template>

<script>
// @ is an alias to /src
import PatientCard from '@/components/PatientCard.vue'
import PatientService from '@/services/PatientService.js'
import AuthService from '@/services/AuthService.js'
export default {
  name: 'PatientListView',
  props: {
    page: {
      type: Number,
      required: true
    }
  },
  components: {
    PatientCard
  },
  data() {
    return {
      patients: null,
      totalPatients: 0,
      keyword: null
    }
  },
  // eslint-disable-next-line no-unused-vars
  beforeRouteEnter(routeTo, routeFrom, next) {
    PatientService.getPatients(3, parseInt(routeTo.query.page) || 1)
      .then((response) => {
        next((comp) => {
          comp.patients = response.data
          comp.totalPatients = response.headers['x-total-count']
        })
      })
      .catch(() => {
        next({ name: 'NetworkError' })
      })
  },
  beforeRouteUpdate(routeTo) {
    var queryFunction
    if (this.keyword == null || this.keyword === '') {
      queryFunction = PatientService.getPatients(
        3,
        parseInt(routeTo.query.page) || 1
      )
    } else {
      queryFunction = PatientService.getPatientByKeyword(
        this.keyword,
        3,
        parseInt(routeTo.query.page) || 1
      )
    }

    queryFunction
      .then((response) => {
        this.patients = response.data // <---
        this.totalPatients = response.headers['x-total-count'] // <---
      })
      .catch(() => {
        return { name: 'NetworkError' } // <---
      })
  },
  methods: {
    updateKeyword() {
      var queryFunction
      if (this.keyword === '') {
        queryFunction = PatientService.getPatients(3, 1)
      } else {
        queryFunction = PatientService.getPatientByKeyword(this.keyword, 3, 1)
      }

      queryFunction
        .then((response) => {
          this.patients = response.data
          console.log(this.patients)
          this.totalPatients = response.headers['x-total-count']
          console.log(this.totalPatients)
        })
        .catch(() => {
          return { name: 'NetworkError' }
        })
    }
  },

  computed: {
    hasNextPage() {
      let totalPages = Math.ceil(this.totalPatients / 3)
      return this.page < totalPages
    },
    isUser() {
      return AuthService.hasRoles('ROLE_USER')
    }
  }
}
</script>
<style scoped>
h1 {
  border-radius: 5rem;
  background-color: azure;
  border: 0.25rem solid lightblue;
}
.patients {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.pagination {
  display: flex;
  width: 290px;
}

.pagination a {
  flex: 1;
  text-decoration: none;
  color: #2c3e50;
}

#page-prev {
  text-align: left;
}

#page-next {
  text-align: right;
}

.search-box {
  width: 300px;
}
</style>
