<template>
  <div class="q-pa-md">
    <div class="row justify-between">
      <div class="col-md-6 col-sm-12">
        <q-btn
          color="white"
          text-color="black"
          size="lg"
          label="Nuevo"
          to="/personal/create"
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
      <div class="col-sm-12">
        <q-table
          title="Personal"
          dense
          :rows="personal"
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
    personal: [],
    columnas: [
      {
        name: "id",
        required: true,
        label: "id",
        align: "left",
        field: (row) => row.idPersonal,
        format: (val) => `${val}`,
        sortable: true,
      },
      {
        name: "rango",
        required: false,
        label: "rango",
        align: "left",
        field: (row) => row.rango,
        format: (val) => `${val}`,
        sortable: true,
      },
      {
        name: "nombre",
        required: true,
        label: "Nombre",
        align: "left",
        field: (row) => row.nombre,
        format: (val) => `${val}`,
        sortable: true,
      },
    ],
  }),
  async created() {
    this.getPersonal();
  },

  methods: {
    async getPersonal() {
      const {
        data: {
          data: { Personal },
        },
      } = await axios.post(apiUrl, {
        query: queries.getPersonal,
      });
      this.personal = Personal;
    },

    onRowClick(evt, row) {
      console.log("clicked on", row.idPersonal);
      this.$router.push({ path: `/personal/${row.idPersonal}` });
    },
  },
});
</script>
