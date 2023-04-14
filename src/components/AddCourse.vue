<template>
    <div class="col-12 col-sm-10 col-md-8 offset-sm-1 offset-md-2">
        <div class="mt-5">
            <form class="border border-primary rounded form-inline" @submit="createCourse">

                <h2 class="col-12 text-center text-primary mt-3 mb-5 ofertapp-label">Agregue un curso</h2>

                <div class="form-group col-12">
                    <label for="courseName" class="custom-label col-md-3">Nombre del curso</label>
                    <input id="courseName" class="form-control col-12 col-sm-10 col-md-7 offset-sm-1" type="text"
                        placeholder="Nombre" v-model="courseName" required />
                </div>

                <div class="form-group col-12">
                    <label for="courseDuration" class="custom-label col-md-3">Duración del curso</label>
                    <input id="courseDuration" class="form-control col-12 col-sm-10 col-md-7 offset-sm-1" type="number"
                        min="0" step="1" placeholder="Duración en horas (Entero)" v-model="courseDuration" required />
                </div>

                <div class="col-12 mb-3">
                    <button class="col-sm-6 col-md-4 offset-sm-5 offset-md-7 btn btn-primary ofertapp-button" type="submit">
                        Crear Curso
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
    name: "AddCourse",
    data() {
        return {
            courseName: '',
            courseDuration: '',
        }
    },
    beforeCreate() { },
    methods: {
        createCourse(event) {
            axios
                .post(this.buildURI(), {
                    courseName: this.courseName,
                    courseDuration: this.courseDuration
                }, {
                    params: {
                        access_token: getAuthenticationToken()
                    }
                }
                ).then(response => {
                    if (response.status !== 201) {
                        alert("Error en la petición. Intente nuevamente");
                    } else {
                        alert("Se ha asignado exitosamente el nuevo rol");
                    }
                }).catch(response => {
                    if (response.response.status === 401) {
                        alert("¡Ups! Al parecer tu contraseña es incorrecta o la sesión ha finalizado");
                    } else if (response.response.status === 400) {
                        alert("¿Estás seguro de que aún no tienes ese rol asignado?");
                    } else {
                        alert("No es posible conectar con el backend en este momento");
                    }
                });
            event.preventDefault();
        },
        buildURI() {
            let associatePath = '/profesor/crear-curso';
            console.log(this.$store.state.backURL + associatePath);
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
  