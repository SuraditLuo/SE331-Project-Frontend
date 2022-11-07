<template>
  <table>
    <tr>
      <td>
        <h5>Hometown: {{ patients.hometown }}</h5>
      </td>
      <td>
        <h5>VaccinceStatus: {{ patients.status }}</h5>
      </td>
    </tr>
    <tr>
      <td>
        <h5>List of vaccine(s)</h5>
      </td>
      <td>
        <ul>
          <li v-for="vaccines in patients.vaccines" v-bind:key="vaccines.id">
            {{ vaccines.name }}
          </li>
        </ul>
      </td>
      <td class="none1"></td>
    </tr>
  </table>
  <h5>Doctor who's in charge: Dr. {{ patients.doctor.firstname }}</h5>
  <h3>Doctor comment</h3>
  <div
    class="comment"
    v-for="comments in patients.comments"
    v-bind:key="comments.id"
  >
    <label>From {{ comments.commentBy.firstname }}</label>
    <h5>{{ comments.content }}</h5>
  </div>
</template>

<script>
export default {
  props: ['id', 'patients']
}
</script>
<style scoped>
table {
  display: inline-table;
  margin-top: 2.5rem;
  margin-left: auto;
  margin-right: auto;
}
td {
  display: inline-block;
  margin-left: 7.5rem;
  margin-bottom: 1.5rem;
}
.none {
  padding-left: 13rem;
}
.none1 {
  padding-left: 6.5rem;
}
.comment {
  background-color: rgb(226, 224, 224);
  border: 0.04rem solid lightgray;
  margin-left: auto;
  margin-right: auto;
  margin: 0.55rem 7rem;
  padding: 0rem 2rem;
  box-shadow: 0.125rem 0.45rem #888888;
}
label {
  padding-right: 15rem;
  font-family: 'Courier New', Courier, monospace;
}
.comment h5 {
  background-color: azure;
}
</style>
