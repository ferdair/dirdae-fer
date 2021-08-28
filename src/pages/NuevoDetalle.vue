<template>
  <div class="q-pa-md">
    <div class="row">
      <div class="col-12">
        <q-input outlined v-model="nombreDetalle" label="nombre" />
      </div>
      <div class="col-12">
        <q-select
          square
          outlined
          v-model="relacionDetalle"
          :options="lineasInvestigacion"
          label="Lineas de investigación"
          option-value="idDetalle"
          option-label="nombreDetalle"
          autofocus
          v-if="tipoDetalle.idTipoDetalle === 9"
        />
      </div>
      <div class="col-12">
        <q-btn color="primary" label="Guardar" @click="insertDetalle" />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import axios from "axios";
const apiUrl = require("../graphql/constants").apiUrl;
import { mutations } from "../graphql/constants";
import env from "app/config/env";
const queries = require("../graphql/constants").queries;
export default defineComponent({
  name: "PageIndex",
  setup: () => ({}),
  data: () => ({
    nombreDetalle: "",
    tipoDetalle: { idTipoDetalle: 0, nombre: "Ninguno" },
    relacionDetalle: "",
    lineasInvestigacion: [],
  }),
  created() {
    this.tipoDetalle = this.$route.meta.tipo;
    this.getLineasInvestigacion();
  },

  methods: {
    async insertDetalle() {
      let dt = {
        nombreDetalle: this.nombreDetalle,
        tipoDetalle: this.tipoDetalle,
        relacionDetalle: this.relacionDetalle.idDetalle,
      };
      let det = await axios.post(apiUrl, {
        query: mutations.insertDetalleByTipo,
        variables: { object: dt },
      });
      this.$router.push({ path: `/proyecto` });
    },
    async getLineasInvestigacion() {
      const {
        data: {
          data: { Detalle },
        },
      } = await axios.post(apiUrl, { query: queries.getLineasInvestigacion });
      this.lineasInvestigacion = Detalle;
    },
  },
});
</script>
