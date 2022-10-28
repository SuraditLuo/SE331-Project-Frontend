<template>
  <router-link
    class="patient-link"
    :to="{ name: 'PatientLayoutView', params: { id: patient.id } }"
  >
    <div class="patient-card">
      <div>
        <img v-for="url in patient.imageUrls" :key="url" :src="url" />
      </div>
      <div>
        <h4>{{ patient.name }} {{ patient.surname }}</h4>
        <h4>{{ patient.status }}</h4>
      </div>
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
</style>
