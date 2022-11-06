<template>
  <div>
    <img v-for="url in GStore.users.imageUrls" :key="url" :src="url" />
  </div>
  <h5>firstname: {{ GStore.users.firstname }}</h5>

  <h5>lastname: {{ GStore.users.lastname }}</h5>

  <h5>email: {{ GStore.users.email }}</h5>

  <h5>address: {{ GStore.users.address }}</h5>

  <h5>age: {{ GStore.users.age }}</h5>
</template>

<script>
// @ is an alias to /src
export default {
  inject: ['GStore']
}
</script>
<style scoped>
h1 {
  border-radius: 5rem;
  background-color: azure;
  border: 0.25rem solid lightblue;
}
.patients {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.pagination {
  display: flex;
  width: 290px;
}

.pagination a {
  flex: 1;
  text-decoration: none;
  color: #2c3e50;
}

#page-prev {
  text-align: left;
}

#page-next {
  text-align: right;
}

.search-box {
  width: 300px;
}
</style>
