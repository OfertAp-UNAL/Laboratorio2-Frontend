<template>
    <div class="col-12 col-sm-10 col-md-8 offset-sm-1 offset-md-2">
        <div class="mt-5">
            <form class="border border-primary rounded form-inline" @submit="createCourse">

                <h2 class="col-12 text-center text-primary mt-3 mb-5 ofertapp-label">Agregue un periodo</h2>

                <div class="form-group col-12">
                    <label for="periodName" class="custom-label col-md-3">Nombre del periodo</label>
                    <input id="periodName" class="form-control col-12 col-sm-10 col-md-7 offset-sm-1" type="text"
                        placeholder="Nombre" v-model="name" required />
                </div>

                <div class="col-12 mb-3">
                    <button class="col-sm-6 col-md-4 offset-sm-5 offset-md-7 btn btn-primary ofertapp-button" type="submit">
                        Crear periodo
                    </button>
                </div>

            </form>
        </div>
    </div>
</template>
  
<script>
import axios from 'axios';
import { getAuthenticationToken } from '@/dataStorage';

export default {
    name: "AddPeriod",
    data() {
        return {
            name: ''
        }
    },
    beforeCreate() { },
    methods: {
        createCourse(event) {
            axios
                .post(this.buildURI(), {
                    periodName: this.name
                }, {
                    params: {
                        access_token: getAuthenticationToken()
                    }
                }
                ).then(response => {
                    if (response.status !== 201) {
                        alert("Error en la petición. Intente nuevamente");
                    } else {
                        alert("Se ha asignado exitosamente el nuevo periodo");
                    }
                }).catch(response => {
                    if (response.response.status === 401) {
                        alert("¡Ups! Al parecer tu contraseña es incorrecta o la sesión ha finalizado");
                    } else if (response.response.status === 400) {
                        alert("Revisa los datos ingresados");
                    } else {
                        alert("No es posible conectar con el backend en este momento");
                    }
                });
            event.preventDefault();
        },
        buildURI() {
            let associatePath = '/profesor/crear-periodo';
            return this.$store.state.backURL + associatePath;
        }
    }

}
</script>
  
<style scoped>
.ofertapp-label {
    color: #00BF63 !important;
    font-weight: bolder !important;
}

.ofertapp-button {
    background-color: #00BF63 !important;
    border-color: #00BF63 !important;
    color: white !important;
    font-weight: bolder !important;
}

.form-inline {
    width: auto;
    border-color: #00BF63 !important;
}

.form-inline .form-group {
    margin-bottom: 1rem;
}
</style>
  