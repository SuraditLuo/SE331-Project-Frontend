<template>
  <router-link
    class="patient-link"
    :to="{ name: 'PatientLayoutView', params: { id: patient.id } }"
  >
    <div class="patient-card">
      <h4>{{ patient.name }} {{ patient.surname }}</h4>
      <h4>{{ patient.status }}</h4>
    </div>
  </router-link>
</template>
<script>
export default {
  name: 'PatientCard',
  props: {
    patient: {
      type: Object,
      required: true
    }
  }
}
</script>
<style scoped>
.patient-card {
  padding: 20px;
  width: 500px;
  cursor: pointer;
  border: 2px solid #51e2f5;
  border-radius: 25px;
  margin-bottom: 18px;
  background-color: #a28089;
}

.patient-card:hover {
  transform: scale(1.01);
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2);
}

.patient-link {
  color: #edf7f6;
  text-decoration: none;
}
</style>
