<template>
  <p></p>
  <p></p>
  <h5>VaccinceStatus:{{ patients.status }}</h5>
  <p v-for="vaccines in patients.vaccines" v-bind:key="vaccines.id">
    vaccine: {{ vaccines.name }}
  </p>
  <h5>Hometown: {{ patients.hometown }}</h5>
  <h5>Doctor who Inchange: {{ patients.doctor.name }}</h5>
  <h3>Doctor comment</h3>
  <p v-for="comments in patients.comments" v-bind:key="comments.id">
    comment: {{ comments.content }}
  </p>
  <h3>Patient image</h3>
  <img v-for="url in patients.imageUrls" :key="url" :src="url" />
</template>

<script>
export default {
  props: ['id', 'patients']
}
</script>
<style scoped>
img {
  border: 1px solid #ddd; /* Gray border */
  border-radius: 4px; /* Rounded border */
  padding: 5px; /* Some padding */
  margin: 5px; /* Some margin */
  width: 150px; /* Set a small width */
}
/* Add a hover effect (blue shadow) */
img:hover {
  box-shadow: 0 0 2px 1px rgba(0, 140, 186, 0.5);
}
</style>
