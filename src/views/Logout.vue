<template>
    <h1>Cerrando sesion...</h1>
</template>
  
<script>
import { removeAuthenticationToken } from '@/dataStorage';

const requestPath = '/oauth/logout';
export default {
    name: "Logout",
    async beforeCreate() {
        removeAuthenticationToken()
        this.$router.push({ name: 'login' })
    }
}
</script>
  
<style></style>
  