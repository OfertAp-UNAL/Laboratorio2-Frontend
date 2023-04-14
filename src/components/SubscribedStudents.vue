<template>
    <div class="col-12 col-sm-10 col-md-8 offset-sm-1 offset-md-2">
        <div class="mt-5">
            <div class="row text-center">
                <h2 class="col-12">Tus roles son</h2>
            </div>
            <div class="row text-center">
                <div class="ofertapp-roleinfo col-md-3" v-for="role in roles" :key="role.id">
                    <h3>{{ role.roleName }}</h3>
                </div>
            </div>
        </div>

    </div>
</template>
  
<script>
import axios from 'axios';
import { getAuthenticationToken } from '@/dataStorage';

const requestPath = '/mis-roles';

export default {
    name: 'SubscribedStudients',
    data() {
        return {
            roles: []
        }
    },
    beforeCreate() {
        axios.get(this.$store.state.backURL + requestPath, { params: { access_token: getAuthenticationToken() } })
            .then(response => {
                if (response.status !== 200) {
                    alert('Error Obteniendo sus roles');
                } else {
                    this.roles = response.data;
                }
            }).catch(error => {
                alert('Error en la petición');
                console.log(error);
            });
    }
}
</script>
  
<style scoped>
.ofertapp-roleinfo {
    background-color: #f8f9fa;
    border-radius: 5px;
    padding: 10px;
    margin: 10px;
    border-style: solid !important;
}
</style>
  