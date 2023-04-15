<template>
    <div class="col-12 col-sm-10 col-md-8 offset-sm-1 offset-md-2">
        <div class="mt-5">
            <form class="border border-primary rounded form-inline" @submit="associate">

                <h2 class="col-12 text-center text-primary mt-3 mb-5 ofertapp-label">Inscribase en un curso</h2>

                <div class="form-group col-12">
                    <label class="custom-label col-md-3 display" for="rol">Tipo de Usuario</label>
                    <select id="rol" class="form-control col-12 col-sm-10 col-md-7 offset-sm-1" v-model="role" required>
                        <option value="" disabled selected>-- Seleccione un Rol --</option>
                        <option v-for="role in roles" :key="role.id" :value="role.id">{{ role.roleName }}</option>
                    </select>
                </div>

                <div class="form-group col-12">
                    <label class="custom-label col-md-3 display" for="period">Periodo</label>
                    <select id="period" class="form-control col-12 col-sm-10 col-md-7 offset-sm-1" v-model="period"
                        required>
                        <option value="" disabled selected>-- Seleccione un Periodo --</option>
                        <option v-for="period in periods" :key="period.id" :value="period.id">{{ period.periodName }}
                        </option>
                    </select>
                </div>

                <div class="form-group col-12">
                    <label class="custom-label col-md-3 display" for="course">Curso</label>
                    <select id="course" class="form-control col-12 col-sm-10 col-md-7 offset-sm-1" v-model="course"
                        required>
                        <option value="" disabled selected>-- Seleccione un Curso --</option>
                        <option v-for="course in courses" :key="course.id" :value="course.id">{{ course.courseName }}
                        </option>
                    </select>
                </div>
                <div class="col-12 mb-3">
                    <button class="col-sm-6 col-md-4 offset-sm-5 offset-md-7 btn btn-primary ofertapp-button" type="submit">
                        Suscribirme
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
    name: "AddAssociation",
    data() {
        return {
            password: '',
            role: '',
            period: '',
            course: '',
            roles: [],
            periods: [],
            courses: []
        }
    },
    beforeCreate() {
        // Read all roles
        const rolesPath = '/mis-roles';
        axios
            .get(this.$store.state.backURL + rolesPath, {
                params: {
                    access_token: getAuthenticationToken()
                }
            })
            .then(response => {
                if (response.status !== 200) {
                    alert("Error en la petición. Intente nuevamente")
                } else {
                    this.roles = response.data;
                }
            }).catch(response => {
                alert("No es posible conectar con el backend en este momento");
            });

        // Read all periods
        const periodsPath = '/periodos';
        axios
            .get(this.$store.state.backURL + periodsPath)
            .then(response => {
                if (response.status !== 200) {
                    alert("Error en la petición. Intente nuevamente")
                } else {
                    this.periods = response.data;
                }
            }).catch(response => {
                alert("No es posible conectar con el backend en este momento");
            });

        // Read all courses
        const coursesPath = '/cursos';
        axios
            .get(this.$store.state.backURL + coursesPath)
            .then(response => {
                if (response.status !== 200) {
                    alert("Error en la petición. Intente nuevamente")
                } else {
                    this.courses = response.data;
                }
            }).catch(response => {
                alert("No es posible conectar con el backend en este momento");
            });
    },
    methods: {
        associate(event) {
            axios
                .post(this.buildURI(), {
                    password: this.password
                }, {
                    params: {
                        access_token: getAuthenticationToken()
                    }
                }
                ).then(response => {
                    if (response.status !== 201) {
                        alert("Error en la petición. Intente nuevamente");
                    } else {
                        alert("Se ha inscrito correctamente");
                    }
                }).catch(response => {
                    if (response.response.status === 401) {
                        alert("¡Ups! Al parecer tu contraseña es incorrecta o la sesión ha finalizado");
                    } else if (response.response.status === 400) {
                        alert("Revise los datos ingresados");
                    } else {
                        alert("No es posible conectar con el backend en este momento");
                    }
                });
            event.preventDefault();
        },
        buildURI() {
            let associatePath = "/inscribir/rol/" +
                this.role + "/periodo/" +
                this.period + "/curso/" +
                this.course;
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
  