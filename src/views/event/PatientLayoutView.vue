<template>
  <div v-if="GStore.patients">
    <h1>{{ GStore.patients.name }} {{ GStore.patients.surname }}</h1>
    <div id="nav">
      <router-link :to="{ name: 'EventDetails' }">Details</router-link>
      <span v-if="isAdmin">
        |
        <router-link :to="{ name: 'AddComment' }">AddComment</router-link>
      </span>
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
    isAdmin() {
      return AuthService.hasRoles('ROLE_ADMIN')
    }
  }
}
</script>
