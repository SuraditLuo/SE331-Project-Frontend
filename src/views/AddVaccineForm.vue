<template>
  <div>
    <form @submit.prevent="saveVaccine">
      <h3>Select patient</h3>
      <select v-model="patient.id">
        <option disabled value="">Select unvaccinate patient</option>
        <option
          v-for="patient in sortPatients"
          :value="patient.id"
          :key="patient.id"
        >
          {{ patient.firstname }}
          {{ patient.lastname }}
        </option>
      </select>
      <h3>Select status</h3>
      <table class="checkbox">
        <tr>
          <td>
            <input
              type="radio"
              id="one"
              value="get only one dose"
              v-model="patient.status"
              v-on:click="editValue(vaccine)"
            />
            <label for="get only one dose">get only one dose</label>
          </td>
          <td>
            <input
              type="radio"
              id="two"
              value="already get second doses"
              v-model="patient.status"
              v-on:click="editValue(vaccines)"
            />
            <label for="already get second doses"
              >already get second doses</label
            >
          </td>
        </tr>
      </table>
      <div v-if="patient.status === 'get only one dose'">
        <select v-model="patient.vaccines[0].id">
          <option disabled value="">Select the vaccine</option>
          <option
            v-for="option in GStore.vaccines"
            :value="option.id"
            :key="option.id"
            :selected="option.id === patient.id"
          >
            {{ option.name }}
          </option>
        </select>
      </div>

      <div v-if="patient.status === 'already get second doses'">
        <select v-model="patient.vaccines[0].id">
          <option disabled value="">Select the first vaccine</option>
          <option
            v-for="option in GStore.vaccines"
            :value="option.id"
            :key="option.id"
            :selected="option.id === patient.id"
          >
            {{ option.name }}
          </option>
        </select>
        <select v-model="patient.vaccines[1].id">
          <option disabled value="">Select the secone vaccine</option>
          <option
            v-for="option in GStore.vaccines"
            :value="option.id"
            :key="option.id"
            :selected="option.id === patient.id"
          >
            {{ option.name }}
          </option>
        </select>
      </div>
      <br />
      <button type="submit" class="button-6">Submit</button>
    </form>
  </div>
</template>

<script>
import AdminService from '@/services/AdminService.js'
export default {
  inject: ['GStore'],
  data() {
    return {
      patient: {
        id: '',
        status: '',
        vaccines: []
      },
      vaccine: [{ id: '' }],
      vaccines: [{ id: '' }, { id: '' }]
    }
  },
  methods: {
    editValue(value) {
      this.patient.vaccines = value
    },
    saveVaccine() {
      AdminService.saveVaccine(this.patient)
        .then((response) => {
          console.log(response)
          this.$router.push({
            name: 'HomePage'
          })
          this.GStore.flashMessage = 'Successfully assign the vaccine data.'
          setTimeout(() => {
            this.GStore.flashMessage = ''
          }, 3000)
        })
        .catch(() => {
          this.$router.push('NetworkError')
        })
    }
  },
  computed: {
    sortPatients: function () {
      return this.GStore.patients.filter((i) => i.status == null)
    }
  }
}
</script>
<style scoped>
/* CSS */
table {
  align-content: center;
  display: inline-table;
  margin-bottom: 2rem;
}
h3 {
  border-radius: 5rem;
  background-color: azure;
  border: 0.25rem solid lightblue;
  margin-bottom: 3rem;
}
.button-6 {
  align-items: center;
  background-color: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 0.25rem;
  box-shadow: rgba(0, 0, 0, 0.02) 0 1px 3px 0;
  box-sizing: border-box;
  color: rgba(0, 0, 0, 0.85);
  cursor: pointer;
  display: inline-flex;
  font-family: system-ui, -apple-system, system-ui, 'Helvetica Neue', Helvetica,
    Arial, sans-serif;
  font-size: 16px;
  font-weight: 600;
  justify-content: center;
  line-height: 1.25;
  margin: 20px;
  min-height: 3rem;
  padding: calc(0.875rem - 1px) calc(1.5rem - 1px);
  position: relative;
  text-decoration: none;
  transition: all 250ms;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: baseline;
  width: auto;
  border-radius: 1.5rem;
}

.button-6:hover,
.button-6:focus {
  border-color: rgba(0, 0, 0, 0.15);
  box-shadow: rgba(0, 0, 0, 0.1) 0 4px 12px;
  color: rgba(0, 0, 0, 0.65);
}

.button-6:hover {
  transform: translateY(-1px);
}

table {
  align-content: center;
  display: inline-table;
  margin-bottom: 2rem;
}
.button-6:active {
  background-color: #f0f0f1;
  border-color: rgba(0, 0, 0, 0.15);
  box-shadow: rgba(0, 0, 0, 0.06) 0 2px 4px;
  color: rgba(0, 0, 0, 0.65);
  transform: translateY(0);
}
select {
  margin-bottom: 0.75rem;
  border-radius: 1.5rem;
}
h3 {
  margin-bottom: 0.5rem;
}
div {
  margin-left: 2.5rem;
  margin-right: 2.5rem;
}
</style>
