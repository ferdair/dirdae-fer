<template>
  <div class="q-pa-md">
    <div class="row justify-between">
      <div class="col-md-4 col-sm-12">
        <q-select
          square
          filled
          v-model="tipoProyecto"
          :options="tiposProyecto"
          label="Tipo de proyecto"
          option-value="idDetalle"
          option-label="nombreDetalle"
          autofocus
          @update:model-value="consultarProyectos()"
        />
      </div>
      <div class="col-md-4 col-sm-12">
        <q-btn
          color="white"
          text-color="black"
          size="lg"
          label="Nuevo"
          to="/proyecto/create"
        />
      </div>
      <div class="col-md-4 col-sm-12">
        <q-input outlined v-model="busqueda" @update:model-value="getProyectoByNombre()">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <!--  <q-table class="my-sticky-header-table" title="Treats" :rows="proyectos"
        :columns="columnas" flat bordered @row-click:"onRowClick" row-key="id" /> -->
        <q-table
          title="Treats"
          dense
          :rows="proyectos"
          :columns="columnas"
          row-key="id"
          @row-click="onRowClick"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { useQuery } from "@vue/apollo-composable";
import gql from "graphql-tag";
import axios from "axios";
const apiUrl = require("../graphql/constants").apiUrl;
const queries = require("../graphql/constants").queries;
export default defineComponent({
  name: "PageIndex",
  data: () => ({
    cargando: false,
    tipoProyecto: { idDetalle: 40, nombreDetalle: "Proyecto" },
    tiposProyecto: [],
    busqueda: "",
    proyectos: [],
    columnas: [
      {
        name: "id",
        required: true,
        label: "id",
        align: "left",
        field: (row) => row.idProyecto,
        format: (val) => `${val}`,
        sortable: true,
      },
      {
        name: "Prioridad",
        required: true,
        label: "Prioridad",
        align: "left",
        field: (row) => row.CriterioPrioridad.suma,
        format: (val) => `${val}`,
        sortable: true,
      },
      {
        name: "Nombre",
        required: true,
        label: "Nombre del Proyecto",
        align: "left",
        field: (row) => row.nombreProyecto,
        format: (val) => `${val}`,
        sortable: true,
      },
    ],
  }),
  async created() {
    this.getProyectos();
    this.getTipoProyecto();
  },

  methods: {
    async getProyectos() {
      const {
        data: {
          data: { Proyecto },
        },
      } = await axios.post(apiUrl, {
        query: queries.getProyectos,
      });
      this.proyectos = Proyecto;
    },
    async getTipoProyecto() {
      const {
        data: {
          data: { Detalle },
        },
      } = await axios.post(apiUrl, {
        query: queries.getTipoProyecto,
      });
      this.tiposProyecto = Detalle;
      console.log(Detalle);
    },
    async getConcursosIngenio() {
      const {
        data: {
          data: { Proyecto },
        },
      } = await axios.post(apiUrl, {
        query: queries.getConcursosIngenio,
      });
      this.proyectos = Proyecto;
    },
    consultarProyectos() {
      if (this.tipoProyecto.idDetalle === 40) {
        this.getProyectos();
      } else {
        this.getConcursosIngenio();
      }
    },
    async getProyectoByNombre() {
      if (this.tipoProyecto === 40) {
      }
      const {
        data: {
          data: { Proyecto },
        },
      } = await axios.post(apiUrl, {
        query: queries.getProyectoByNombre,
        variables: {
          texto: "%" + this.busqueda + "%",
          tipo: Number(this.tipoProyecto.idDetalle),
        },
      });
      this.proyectos = Proyecto;
    },

    onRowClick(evt, row) {
      console.log("clicked on", row.idProyecto);
      this.$router.push({ path: `/proyecto/${row.idProyecto}` });
    },
  },
});
</script>
