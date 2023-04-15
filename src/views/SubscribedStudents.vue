<template>
    <div class="col-12 col-sm-10 col-md-8 offset-sm-1 offset-md-2">
        <div class="mt-5">
            <form class="border border-primary rounded form-inline" @submit="filter">

                <h2 class="col-12 text-center text-primary mt-3 mb-5 ofertapp-label">Seleccione el curso</h2>

                <div class="form-group col-12">
                    <label class="custom-label col-md-3 display" for="course">Curso</label>
                    <select id="course" class="form-control col-12 col-sm-10 col-md-7 offset-sm-1" v-model="course"
                        required>
                        <option value="" disabled selected>-- Seleccione un Curso --</option>
                        <option v-for="course in courses" :key="course.courseId" :value="course.courseId">{{
                            course.courseName }}
                        </option>
                    </select>
                </div>
                <div class="col-12 mb-3">
                    <button class="col-sm-6 col-md-4 offset-sm-5 offset-md-7 btn btn-primary ofertapp-button" type="submit">
                        Filtrar
                    </button>
                </div>
            </form>

            <div class="row text-center">
                <Subscribed v-for="enrolled in enrollments" :key="enrolled.id" :subscribed="enrolled">
                </Subscribed>
            </div>
        </div>

    </div>
</template>
  
<script>
import axios from 'axios';
import { getAuthenticationToken } from '@/dataStorage';
import Subscribed from '@/components/Subscribed.vue';

export default {
    name: 'SubscribedStudients',
    components: { Subscribed },
    data() {
        return {
            course: '',
            courses: [],
            enrollments: []
        }
    },
    beforeCreate() {
        const requestPath = '/mis-cursos';
        axios.get(this.$store.state.backURL + requestPath, { params: { access_token: getAuthenticationToken() } })
            .then(response => {
                if (response.status !== 200) {
                    alert('Error Obteniendo sus cursos');
                } else {
                    let uniqueCourses = [];
                    let uniqueCoursesIds = {};
                    for (const association of response.data) {
                        if (!uniqueCoursesIds[association.courseId]) {
                            uniqueCoursesIds[association.courseId] = true;
                            uniqueCourses.push(association);
                        }
                    }
                    this.courses = uniqueCourses;
                }
            }).catch(error => {
                alert('Error en la petición');
            });
    },
    methods: {
        filter(event) {
            axios
                .get(this.buildURI(), {
                    params: {
                        access_token: getAuthenticationToken()
                    }
                }
                ).then(response => {
                    if (response.status !== 200) {
                        alert("Error en la petición. Intente nuevamente");
                    } else {
                        this.enrollments = response.data;
                    }
                }).catch(response => {
                    if (response.response.status === 401) {
                        alert("¡Ups! Al parecer tu contraseña es incorrecta o la sesión ha finalizado");
                    } else if (response.response.status === 400) {
                        alert("Verifica la información suministrada");
                    } else {
                        alert("No es posible conectar con el backend en este momento");
                    }
                });
            event.preventDefault();
        },
        buildURI() {
            let associatePath = "/profesor/ver-inscritos/curso/" +
                this.course;
            return this.$store.state.backURL + associatePath;
        }
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
  