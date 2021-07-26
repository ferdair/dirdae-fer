<template>
  <div class="q-pa-md">
    <div class="row justify-between">
      <div class="col-md-6 col-sm-12">
        <q-btn color="white" text-color="black" size="lg" label="Nuevo" />
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
      <div class="col-sm-12">
        <q-table
          title="Capacidades Genericas"
          dense
          :rows="capacidadesGenericas"
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
    busqueda: "",
    capacidadesGenericas: [],
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
        name: "capacidades",
        required: false,
        label: "Capacidades Genéricas",
        align: "left",
        field: (row) => row.nombreDetalle,
        format: (val) => `${val}`,
        sortable: true,
      },
    ],
  }),
  async created() {
    this.getCapacidadesGenericas();
  },

  methods: {
    async getCapacidadesGenericas() {
      const {
        data: {
          data: { Detalle },
        },
      } = await axios.post(apiUrl, {
        query: queries.getCapacidadesGenericas,
      });
      this.capacidadesGenericas = Detalle;
    },

    onRowClick(evt, row) {
      console.log("clicked on", row.idDetalle);
    },
  },
});
</script>
