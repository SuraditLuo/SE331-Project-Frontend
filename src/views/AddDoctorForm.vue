<template>
  <div>
    <form @submit.prevent="saveDoctor">
      <h3>Patient select</h3>
      <BaseSelect
        :options="sortPatients"
        v-model="patient.id"
        label="Select User"
      />
      <h3>Select Doctor</h3>
      <BaseSelect
        :options="GStore.doctors"
        v-model="patient.doctor.id"
        label="Select Doctor"
      />

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
        doctor: { id: '' }
      }
    }
  },
  methods: {
    editValue(value) {
      this.patient.vaccines = value
    },
    saveDoctor() {
      AdminService.saveDoctor(this.patient)
        .then((response) => {
          console.log(response)
          this.$router.push({
            name: 'HomePage'
          })
          this.GStore.flashMessage = 'Successfully add doctor.'
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
      return this.GStore.patients.filter((i) => i.doctor == null)
    }
  }
}
</script>
<style scoped>
/* CSS */
select {
  margin-bottom: 0.75rem;
  border-radius: 1.5rem;
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
</style>
