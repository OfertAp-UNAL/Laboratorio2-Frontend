<template>
  <div class="col-lg-4 col-md-6 col-sm-12 text-center ofertapp-card">
    <h3>{{ enrolled.courseName }}</h3>
    <h4>Duración: {{ enrolled.courseDurationHours }}</h4>
    <h4>Rol: {{ enrolled.role.roleName }}</h4>
  </div>
</template>

<script>
export default {
  name: "Course",
  props: {
    enrolled: Object
  }
}
</script>

<style scoped>
.ofertapp-card {
  background-color: #f8f9fa;
  border-radius: 5px;
  padding: 10px;
  margin: 10px;
  border-style: solid !important;
}
</style>
