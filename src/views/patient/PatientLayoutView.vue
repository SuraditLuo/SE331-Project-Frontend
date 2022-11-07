<template>
  <div v-if="GStore.patients">
    <img v-for="url in GStore.patients.imageUrls" :key="url" :src="url" />
    <h1>{{ GStore.patients.firstname }} {{ GStore.patients.lastname }}</h1>
    <div id="nav">
      <router-link :to="{ name: 'PatientDetails' }">About</router-link>
      |
      <router-link :to="{ name: 'AddComment' }">Add Comment</router-link>
    </div>
    <router-view :patients="GStore.patients" />
  </div>
</template>
<script>
import AuthService from '@/services/AuthService'
export default {
  inject: ['GStore'],
  computed: {
    currentUser() {
      return localStorage.getItem('user')
    },
    isDoctor() {
      return AuthService.hasRoles('ROLE_DOCTOR')
    }
  }
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
h1 {
  border-radius: 5rem;
  background-color: azure;
  border: 0.25rem solid lightblue;
}
</style>
