<template>
  <div class="q-pa-md">
    <div class="row">
      <div class="col">
        <q-toggle v-model="editar" size="xl" label="Editar" left-label />
      </div>
    </div>

    <q-input outlined v-model="nombre" label="nombre" :readonly="!editar" />
    <q-select
      square
      outlined
      v-model="rango"
      :options="rangos"
      label="Rangos"
      option-value="idDetalle"
      option-label="nombreDetalle"
      autofocus
      :readonly="!editar"
    />
    <q-input outlined v-model="telefono" label="telefono" :readonly="!editar" />

    <q-input outlined v-model="correo" label="Correo" :readonly="!editar" />
    <q-toggle
      v-model="esjefe"
      size="xl"
      label="Es jefe"
      left-label
      :readonly="!editar"
    />

    <div class="row">
      <div class="col-12">
        <q-btn color="primary" label="Guardar" @click="editarPersonal" />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import axios from "axios";
import { mutations } from "../graphql/constants";
const apiUrl = require("../graphql/constants").apiUrl;
const queries = require("../graphql/constants").queries;
export default defineComponent({
  name: "PageIndex",
  setup: () => ({}),
  data: () => ({
    idP: 0,
    nombre: "",
    rango: "",
    rangos: [],
    correo: "",
    telefono: "",
    esjefe: false,
    editar: false,
  }),
  created() {
    this.idP = Number(this.$route.params.id);
    this.getRangos();
    this.getPersonalById();
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
    async getPersonalById() {
      const {
        data: {
          data: { Personal },
        },
      } = await axios.post(apiUrl, {
        query: queries.getPersonalById,
        variables: { id: this.idP },
      });
      this.nombre = Personal[0].nombre;
      this.rango = Personal[0].rango;
      this.telefono = Personal[0].telefono;
      this.correo = Personal[0].correo;
      this.esjefe = Personal[0].es_jefe;
    },
    async editarPersonal() {
      const p = {
        idPersonal: this.idP,
        _set: {
          nombre: this.nombre,
          rango: this.rango.idDetalle,
          correo: this.correo,
          telefono: this.telefono,
          es_jefe: this.esjefe,
        },
      };

      const np = await axios.post(apiUrl, {
        query: mutations.updatePersonalByPk,
        variables: { idPersonal: p.idPersonal, _set: p._set },
      });

      console.log(np);
      this.$router.push({ path: `/personal` });
    },

    onRowClick(evt, row) {
      console.log("clicked on", row.idProyecto);
    },
  },
});
</script>
