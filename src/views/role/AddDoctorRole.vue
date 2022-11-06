<template>
  <div>
    <h3>Add Role Doctor</h3>
    <form @submit.prevent="AddRoleDoctor">
      <select v-model="user.id">
        <option
          v-for="user in sortUsers"
          :value="user.id"
          :key="user.id"
          selected="index === user.id"
        >
          {{ user.firstname }} {{ user.lastname }}
        </option>
      </select>
      <button type="submit" class="button-6">Submit</button>
    </form>
  </div>
</template>

<script>
import AdminService from '@/services/AdminService'
export default {
  inject: ['GStore'],
  data() {
    return {
      user: {
        id: ''
      }
    }
  },
  methods: {
    AddRoleDoctor() {
      return AdminService.addDoctorRole(this.user)
        .then((response) => {
          console.log(response)
          this.$router.push({
            name: 'HomePage'
          })
          this.GStore.flashMessage =
            'You are successfully updated ' +
            response.data.username +
            ' role to doctor.'
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
    sortUsers: function () {
      return this.GStore.users.filter((i) => i.authorities.length == 1)
    }
  }
}
</script>

<style scoped>
select {
  margin-bottom: 0.75rem;
  border-radius: 1.5rem;
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
</style>
