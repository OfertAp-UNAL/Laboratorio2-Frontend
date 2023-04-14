<template>
  <div class="container-fluid mt-2">
    <h1 class="ofertapp-home-title">Bienvenido!, un cordial saludo de parte de OfertApp!!</h1>
    <div class="row">
      <div class="col-sm-4 text-center ofertapp-link-container">
        <router-link :to="{ name: 'roles' }" class="ofertapp-link stretched-link">Mis Roles</router-link>
      </div>
      <div class="col-sm-4 text-center ofertapp-link-container">
        <router-link :to="{ name: 'add-role' }" class="ofertapp-link stretched-link">Registrarme a un rol</router-link>
      </div>
      <div class="col-sm-4 text-center ofertapp-link-container">
        <router-link :to="{ name: 'courses' }" class="ofertapp-link stretched-link">Mis cursos</router-link>
      </div>
      <div class="col-sm-4 text-center ofertapp-link-container">
        <router-link :to="{ name: 'add-association' }" class="ofertapp-link stretched-link">Registrarme en un
          curso</router-link>
      </div>
      <div class="col-sm-4 text-center ofertapp-link-container" v-show="isTeacher">
        <router-link :to="{ name: 'add-course' }" class="ofertapp-link stretched-link">Crear un curso</router-link>
      </div>
      <div class="col-sm-4 text-center ofertapp-link-container" v-show="isTeacher">
        <router-link :to="{ name: 'add-period' }" class="ofertapp-link stretched-link">Crear un periodo</router-link>
      </div>
      <div class="col-sm-4 text-center ofertapp-link-container" v-show="isTeacher">
        <router-link :to="{ name: 'view-subscribed' }" class="ofertapp-link stretched-link">Ver inscritos</router-link>
      </div>
      <div class="col-sm-4 text-center ofertapp-link-container">
        <router-link :to="{ name: 'logout' }" class="ofertapp-link stretched-link">Cerrar Sesión</router-link>
      </div>
    </div>
    <div class="row">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { getAuthenticationToken } from '@/dataStorage';

const requestPath = '/mis-roles';
export default {
  name: "Home",
  data: function () {
    return {
      isTeacher: false
    }
  },
  beforeCreate() {
    if (!getAuthenticationToken()) {
      this.$router.push({ name: 'login' })
    }

    // Now checkout for this user's roles
    axios.get(this.$store.state.backURL + requestPath, { params: { access_token: getAuthenticationToken() } })
      .then(response => {
        if (response.status !== 200) {
          alert('Error Obteniendo sus roles');
        } else {
          const roles = response.data;
          const teacherRole = roles.find(role => role.roleName === 'Profesor');
          console.log(teacherRole)
          this.isTeacher = teacherRole !== undefined;

        }
      }).catch(error => {
        alert('Error en la petición');
        console.log(error);
      });
  }
}
</script>

<style>
.ofertapp-home-title {
  text-align: center;
  font-size: 2.5rem;
  font-weight: bold;
  color: #1a237e;
}

.ofertapp-link {
  font-size: 1.5rem;
  color: inherit;
}

.ofertapp-link:hover {
  color: inherit;
}

.ofertapp-link-container {
  background-color: #00BF63 !important;
  color: white !important;
  border-width: 2px !important;
  border-style: solid !important;
  border-color: white !important;
}

.ofertapp-link-container:hover {
  color: #00BF63 !important;
  background-color: white !important;
  border-color: #00BF63 !important;
}
</style>
