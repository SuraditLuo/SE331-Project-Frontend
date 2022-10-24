<template>
  <router-link
    class="event-link"
    :to="{ name: 'EventLayoutView', params: { id: event.id } }"
  >
    <div class="event-card">
      <h4>{{ event.name }} on {{ event.surname }}</h4>
      <h4>{{ event.status }}</h4>
      <span>by</span>
      <h5>doctor {{ event.doctor.name }}</h5>
    </div>
  </router-link>
</template>
<script>
export default {
  name: 'EventCard',
  props: {
    event: {
      type: Object,
      required: true
    }
  }
}
</script>
<style scoped>
.event-card {
  padding: 20px;
  width: 250px;
  cursor: pointer;
  border: 2px solid #51e2f5;
  border-radius: 25px;
  margin-bottom: 18px;
  background-color: #a28089;
}

.event-card:hover {
  transform: scale(1.01);
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2);
}

.event-link {
  color: #edf7f6;
  text-decoration: none;
}
</style>
