<template>
  <div class="q-pa-md">
    <q-input outlined v-model="nombre" label="nombre" />
    <q-select
      square
      outlined
      v-model="rango"
      :options="rangos"
      label="Rangos"
      option-value="idDetalle"
      option-label="nombreDetalle"
      autofocus
    />
    <q-input outlined v-model="telefono" label="telefono" />

    <q-input outlined v-model="correo" label="Correo" />
    <q-toggle v-model="esjefe" size="xl" label="Es jefe" left-label />
    <q-btn color="primary" label="Guardar" @click="insertPersonal" />
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
    rango: "",
    rangos: [],
    correo: "",
    telefono: "",
    esjefe: false,
  }),
  created() {
    this.getRangos();
  },

  methods: {
    async getRangos() {
      const {
        data: {
          data: { Detalle },
        },
      } = await axios.post(apiUrl, {
        query: queries.getRangos,
      });
      this.rangos = Detalle;
    },

    async insertPersonal() {
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

      this.$router.push({ path: `/personal` });
    },
    onRowClick(evt, row) {
      console.log("clicked on", row.idProyecto);
    },
  },
});
</script>
