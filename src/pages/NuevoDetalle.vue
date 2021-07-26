<template>
  <div class="q-pa-md">
    <q-input outlined v-model="nombre" label="nombre" />
    <q-btn color="primary" label="Guardar" @click="insertDetalle" />
  </div>
</template>

<script>
import { defineComponent } from "vue";
import axios from "axios";
const apiUrl = require("../graphql/constants").apiUrl;
import { mutations } from "../graphql/constants";
const queries = require("../graphql/constants").queries;
export default defineComponent({
  name: "PageIndex",
  setup: () => ({}),
  data: () => ({
    nombre: "",
    ruta: "",
  }),
  created() {
    this.ruta = this.$route.name;
  },

  methods: {
    async insertDetalle() {
      let pe = {
        nombre: this.nombre,
        rango: null,
        telefono: String(this.telefono),
        correo: this.correo,
        es_jefe: this.esjefe,
      };
      const {
        data: {
          data: { insert_Personal_one },
        },
      } = await axios.post(apiUrl, {
        query: mutations.insertPersonal,
        variables: { object: pe },
      });
    },
    onRowClick(evt, row) {
      console.log("clicked on", row.idProyecto);
    },
  },
});
</script>
