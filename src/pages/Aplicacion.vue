<template>
  <div class="q-pa-md">
    <div class="row justify-between">
      <div class="col-6">
        <q-btn
          color="white"
          text-color="black"
          size="lg"
          label="Nuevo"
          to="/aplicacion/create"
        />
      </div>
      <div class="col-md-6 col-sm-12">
        <q-input outlined v-model="busqueda">
          <template v-slot:prepend>
            <q-icon name="search" />
          </template>
        </q-input>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <q-table
          title="Aplicacion"
          dense
          :rows="aplicaciones"
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
import env from "app/config/env";
const apiUrl = require("../graphql/constants").apiUrl;
const queries = require("../graphql/constants").queries;
export default defineComponent({
  name: "LineasInvestigacion",
  data: () => ({
    busqueda: "",
    aplicaciones: [],
    columnas: [
      {
        name: "id",
        required: true,
        label: "id",
        align: "left",
        field: (row) => row.idDetalle,
        format: (val) => `${val}`,
        sortable: true,
      },
      {
        name: "aplicacion",
        required: false,
        label: "Aplicacion",
        align: "left",
        field: (row) => row.nombreDetalle,
        format: (val) => `${val}`,
        sortable: true,
      },
    ],
  }),
  async created() {
    this.getAplicaciones();
  },

  methods: {
    async getAplicaciones() {
      const {
        data: {
          data: { Detalle },
        },
      } = await axios.post(apiUrl, {
        query: queries.getAplicaciones,
      });
      this.aplicaciones = Detalle;
    },

    onRowClick(evt, row) {
      console.log("clicked on", row.idDetalle);
    },
  },
});
</script>
