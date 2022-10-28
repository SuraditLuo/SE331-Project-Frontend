<template>
  <div>
    <h1>Add vaccine data</h1>
    <form @submit.prevent="savePatient">
      <h3>Patient infomation</h3>
      <BaseInput v-model="patient.name" type="text" label="name" />
      <BaseInput v-model="patient.surname" type="text" label="surname" />
      <BaseInput v-model="patient.age" type="text" label="age" />
      <BaseInput v-model="patient.hometown" type="text" label="hometown" />
      <label>Vaccine status</label>

      <input
        type="radio"
        id="one"
        value="get only one dose"
        v-model="patient.status"
        v-on:click="editValue(vaccine)"
      />
      <label for="get only one dose">get only one dose</label>

      <input
        type="radio"
        id="two"
        value="already get second doses"
        v-model="patient.status"
        v-on:click="editValue(vaccines)"
      />
      <label for="already get second doses">already get second doses</label>

      <div v-if="patient.status === 'get only one dose'">
        <BaseSelect
          :options="GStore.vaccines"
          v-model="patient.vaccines[0].id"
          label="Select the vaccince"
        />
      </div>

      <div v-if="patient.status === 'already get second doses'">
        <BaseSelect
          :options="GStore.vaccines"
          v-model="patient.vaccines[0].id"
          label="Select first vaccince"
        />
        <BaseSelect
          :options="GStore.vaccines"
          v-model="patient.vaccines[1].id"
          label="Select second vaccince"
        />
      </div>
      <h3>doctor who take care of this patient?</h3>

      <BaseSelect
        :options="GStore.doctors"
        v-model="patient.doctor.id"
        label="Select an doctor"
      />
      <h3>Choose profile image</h3>
      <UploadImages
        @changed="handleImages"
        :max="1"
        maxError="Max files exceed"
      />

      <button type="submit" class="button-6">Submit</button>
    </form>

    <pre>{{ patient }}</pre>
  </div>
</template>

<script>
import PatientService from '@/services/PatientService.js'
import UploadImages from 'vue-upload-drop-images'
export default {
  inject: ['GStore'],
  components: {
    UploadImages
  },
  data() {
    return {
      patient: {
        id: '',
        name: '',
        surname: '',
        status: '',
        age: '',
        hometown: '',
        vaccines: [],
        doctor: { id: '', name: '' },
        imageUrls: []
      },
      files: [],
      vaccine: [{ id: '' }],
      vaccines: [{ id: '' }, { id: '' }]
    }
  },
  methods: {
    editValue(value) {
      this.patient.vaccines = value
    },
    savePatient() {
      Promise.all(
        this.files.map((file) => {
          return PatientService.uploadFile(file)
        })
      ).then((response) => {
        this.patient.imageUrls = response.map((r) => r.data)
        PatientService.savePatient(this.patient)
          .then((response) => {
            console.log(response)
            this.$router.push({
              name: 'PatientDetails',
              params: { id: response.data.id }
            })
            this.GStore.flashMessage = 'Successfully add new patient.'
            setTimeout(() => {
              this.GStore.flashMessage = ''
            }, 3000)
          })
          .catch(() => {
            this.$router.push('NetworkError')
          })
      })
    },
    handleImages(files) {
      this.files = files
    }
  }
}
</script>
<style scoped>
/* CSS */
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

.button-6:active {
  background-color: #f0f0f1;
  border-color: rgba(0, 0, 0, 0.15);
  box-shadow: rgba(0, 0, 0, 0.06) 0 2px 4px;
  color: rgba(0, 0, 0, 0.65);
  transform: translateY(0);
}
</style>
