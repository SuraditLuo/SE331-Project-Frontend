<template>
  <h1>Injection need</h1>
  <div class="patients">
    <div class="search-box">
      <BaseInput
        v-model="keyword"
        type="text"
        label="Search..."
        @input="updateKeyword"
      />
    </div>

    <div v-for="patient in patients" :key="patient.id">
      <div v-if="patient.doctor == null"></div>
      <div v-else-if="patient.doctor.firstname === this.GStore.user.firstname">
        <PatientCard :key="patient.id" :patient="patient"></PatientCard>
      </div>
    </div>

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
</template>

<script>
// @ is an alias to /src
import PatientCard from '@/components/PatientCard.vue'
import DoctorService from '@/services/DoctorService.js'
export default {
  inject: ['GStore'],
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
    DoctorService.getPatients(30, parseInt(routeTo.query.page) || 1)
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
      queryFunction = DoctorService.getPatients(
        3,
        parseInt(routeTo.query.page) || 1
      )
    } else {
      queryFunction = DoctorService.getPatientByKeyword(
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
        queryFunction = DoctorService.getPatients(30, 1)
      } else {
        queryFunction = DoctorService.getPatientByKeyword(this.keyword, 30, 1)
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
      let totalPages = Math.ceil(this.totalPatients / 30)
      return this.page < totalPages
    }
  }
}
</script>
<style scoped>
.hide-patient {
  display: none;
}
.patient-card div {
  display: inline-block;
  text-align: left;
}
img {
  max-width: 7.5rem;
  max-height: 7.5rem;
  margin-right: 4rem;
  margin-top: 0;
  border: 0.125rem solid azure;
}
.patient-card {
  padding: 20px;
  width: 700px;
  height: 150px;
  cursor: pointer;
  border: 2px solid #0000008d;
  border-radius: 25px;
  margin-bottom: 18px;
  background-color: #a28089;
}
.patient-card:hover {
  transform: scale(1.01);
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2);
}

.patient-link {
  color: #f5e76f;
  text-decoration: none;
}
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
