<template>
  <div class="col-4 text-center ofertapp-card">
    <h3>{{ subscribed.username }}</h3>
    <h4>Rol: {{ subscribed.role }}</h4>
    <h4>Aprobado: {{ subscribed.gradePOJO ? subscribed.gradePOJO.approved : "Indefinido aún" }}</h4>
    <h4>Nota: {{ subscribed.gradePOJO ? subscribed.gradePOJO.note : "Indefinido aún" }}</h4>
    <h4>
      Nueva estado: <select v-model="approved" required>
        <option :value="true">Aprobado</option>
        <option :value="false">Reprobado</option>
      </select>
    </h4>
    <h4>
      Nueva nota: <input type="number" v-model="note" min="0" max="5" step="0.1" required>
    </h4>
    <h4>
      <button class="btn btn-primary ofertapp-button" @click="updateGrade">Actualizar</button>
    </h4>
  </div>
</template>

<script>
import axios from "axios";
import { getAuthenticationToken } from "@/dataStorage";
export default {
  name: "Subscribed",
  data() {
    return {
      approved: this.subscribed.gradePOJO ? this.subscribed.gradePOJO.approved : false,
      note: this.subscribed.gradePOJO ? this.subscribed.gradePOJO.note : 0
    };
  },
  props: {
    subscribed: Object
  },
  methods: {
    updateGrade() {
      const requestPath = "/profesor/asignar-nota/asociacion/" + this.subscribed.associationId;
      axios
        .post(
          this.$store.state.backURL + requestPath,
          {
            approved: Boolean(this.approved),
            note: parseInt(this.note)
          },
          {
            params: {
              access_token: getAuthenticationToken()
            }
          }
        )
        .then(response => {
          if (response.status !== 201) {
            alert("Error actualizando la nota");
          } else {
            alert("Nota actualizada");
          }
        })
        .catch(error => {
          alert("Error en la petición");
        });
    }
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

.ofertapp-button {
  background-color: #00BF63 !important;
  border-color: #00BF63 !important;
  color: white !important;
  font-weight: bolder !important;
}
</style>
