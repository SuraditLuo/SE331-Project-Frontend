<template>
  <div>
    <table>
      <tr>
        <th>Profile</th>
        <th>Information</th>
      </tr>
      <tr>
        <td>
          <img
            id="profile-img"
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            class="profile-img-card"
          />
        </td>
        <td>
          <h5>
            Firstname: {{ GStore.users.firstname }} | Lastname:
            {{ GStore.users.lastname }}
          </h5>
          <h5>E-mail: {{ GStore.users.email }}</h5>
          <h5>
            Age: {{ GStore.users.age }} | Address: {{ GStore.users.address }}
          </h5>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  inject: ['GStore'],
  name: 'UserInfoCard',
  props: {
    user: {
      type: Object,
      required: true
    }
  }
}
</script>
<style scoped>
h5 {
  font-size: 1.2rem;
}
table,
tr,
th,
td {
  font-family: 'Courier New', Courier, monospace;
  border: 1px solid;
}
img {
  max-width: 100px;
  max-height: 100px;
}
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
