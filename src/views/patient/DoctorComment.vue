<template>
  <div>
    <form @submit.prevent="saveComment">
      <BaseInput v-model="comment.content" type="text" label="review" />

      <p>Sincerely: {{ patients.doctor.name }}</p>

      <button type="submit" class="button-6">Submit</button>
    </form>

    <pre>{{ comment }}</pre>
  </div>
</template>

<script>
import DoctorService from '@/services/DoctorService'
export default {
  inject: ['GStore'],
  props: ['id', 'patients'],
  data() {
    return {
      comment: {
        id: '',
        content: '',
        commentBy: { id: this.patients.doctor.id },
        commentTo: { id: this.patients.id }
      }
    }
  },
  methods: {
    saveComment() {
      return DoctorService.PostComment(this.comment)
        .then((response) => {
          console.log(response)
          this.$router.push({
            name: 'PatientDetails',
            params: { id: response.data.id }
          })
          this.GStore.flashMessage =
            'Successfully add comment to ' + response.data.name
          setTimeout(() => {
            this.GStore.flashMessage = ''
          }, 3000)
        })
        .catch(() => {
          this.$router.push('NetworkError')
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
