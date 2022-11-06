<template>
  <div class="user-card">
    <div>
      <h4>Name: {{ user.firstname }} {{ user.lastname }}</h4>
      <h4>Age: {{ user.age }} Address: {{ user.address }}</h4>
      <h4>Email: {{ user.email }}</h4>
    </div>
    <div>
      <img v-for="url in user.imageUrls" :key="url" :src="url" />
    </div>
  </div>
</template>
<script>
export default {
  name: 'UserCard',
  props: {
    user: {
      type: Object,
      required: true
    }
  }
}
</script>
<style scoped>
.user-card div {
  display: inline-block;
  text-align: left;
  border: 0.25px solid lightgrey;
}
img {
  max-width: 3.5rem;
  max-height: 3.5rem;
  margin-left: 1.5rem;
  margin-top: 0;
  border: 0.125rem solid azure;
}
.user-card {
  padding: 20px;
  width: 700px;
  height: 150px;
  cursor: pointer;
  border: 2px solid #0000008d;
  border-radius: 25px;
  margin-bottom: 18px;
  background-color: #a28089;
}
</style>
