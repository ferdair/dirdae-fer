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
        <q-input
          outlined
          v-model="busqueda"
          @update:model-value="getProyectoByNombre()"
        >
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
          title="Proyectos"
          :rows="proyectos"
          :columns="columnas"
          row-key="id "
          class="my-sticky-column-table"
          @row-click="onRowClick"
        >
          <template v-slot:body-cell-actions="props">
            <q-td :props="props">
              <q-btn
                dense
                round
                flat
                color="grey"
                icon="edit"
                @click.stop="editarProyecto(props)"
              ></q-btn>
              <q-btn
                dense
                round
                flat
                color="grey"
                icon="delete"
                @click.stop=""
              ></q-btn>
            </q-td>
          </template>
        </q-table>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import axios from "axios";
import { useQuasar } from "quasar";
import { computed } from "vue";
const apiUrl = require("../graphql/constants").apiUrl;
const queries = require("../graphql/constants").queries;
export default defineComponent({
  name: "PageIndex",
  setup() {
    const $q = useQuasar();
    const buttonColor = computed(() => {
      return $q.screen.lt.md ? "primary" : "secondary";
    });

    return { buttonColor };
  },
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
      { name: "actions", label: "Actions", field: "", align: "center" },
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
    editarProyecto(props) {
      this.$router.push({ path: `/proyecto/${props.row.idProyecto}` });
    },
    onRowClick(evt, row) {
      console.log("clicked on", row.idProyecto);
      this.$router.push({ path: `/reporte/${row.idProyecto}` });
    },
  },
});
</script>
