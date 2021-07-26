<template>
  <div class="q-pa-md">
    <div class="row">
      <div class="col">
        <q-toggle v-model="editar" size="xl" label="Editar" left-label />
      </div>
    </div>
    <q-stepper v-model="step" header-nav ref="stepper" color="primary" animated>
      <q-step :name="1" title="Proyecto" icon="settings" :done="done1">
        <q-input outlined v-model="nombre" label="nombre" :readonly="!editar" />
        <q-input outlined v-model="descripcion" label="descripción" :readonly="!editar" />

        <q-select
          square
          outlined
          v-model="unidadBeneficiaria"
          :options="unidadesBeneficiarias"
          label="Unidades Beneficiarias"
          option-value="idDetalle"
          option-label="nombreDetalle"
          autofocus
          :readonly="!editar"
        />
        <q-select
          square
          outlined
          v-model="capacidadGenerica"
          :options="capacidadesGenericas"
          label="Capacidades Genericas"
          option-value="idDetalle"
          option-label="nombreDetalle"
          autofocus
          :readonly="!editar"
        />
        <q-select
          square
          outlined
          v-model="jefeProyecto"
          :options="jefesProyectos"
          label="Jefe de proyecto"
          option-value="idPersonal"
          option-label="nombre"
          autofocus
          :readonly="!editar"
        />
        <q-select
          square
          outlined
          v-model="lineaInvestigacion"
          :options="lineasInvestigacion"
          label="Lineas de investigación"
          option-value="idDetalle"
          option-label="nombreDetalle"
          autofocus
          :readonly="!editar"
        />
        <q-select
          square
          outlined
          v-model="lineaInvestigacion"
          :options="lineasInvestigacion"
          label="Linea especifica"
          option-value="idDetalle"
          option-label="nombreDetalle"
          autofocus
          :readonly="!editar"
        />
        <q-select
          v-if="tipoProyecto.idDetalle === 41"
          square
          outlined
          v-model="aplicacion"
          :options="aplicaciones"
          label="Aplicacion"
          option-value="idDetalle"
          option-label="nombreDetalle"
          autofocus
          :readonly="!editar"
        />

        <!--   <q-select
          square
          outlined
          v-model="tipoProyecto"
          :options="tiposProyectos"
          label="Tipo de proyecto"
          option-value="idDetalle"
          option-label="nombreDetalle"
          autofocus
        /> -->

        <q-stepper-navigation>
          <q-btn
            @click="
              () => {
                done1 = true;
                step = 2;
              }
            "
            color="primary"
            label="Siguiente"
          />
        </q-stepper-navigation>
      </q-step>

      <q-step
        :name="2"
        title="Criterios de prioridad"
        caption="De menor a mayor importancia"
        icon="unfold_more"
        :done="done2"
      >
        <q-input
          v-model.number="criterioPrioridad.requerimientoOperativo"
          type="number"
          filled
          label="Requerimiento Operativo"
          min="0"
          max="5"
          :rules="[(val) => (val >= 0 && val <= 5) || 'El valor debe estar entre 0 y 5']"
          @update:model-value="sumar()"
          :readonly="!editar"
        />
        <q-input
          v-model.number="criterioPrioridad.sostenimientoLogA29"
          type="number"
          filled
          label="Sostenimiento Log A-29"
          min="0"
          max="5"
          :rules="[(val) => (val >= 0 && val <= 5) || 'El valor debe estar entre 0 y 5']"
          @update:model-value="sumar()"
          :readonly="!editar"
        />
        <q-input
          v-model.number="criterioPrioridad.sostenimientoDA20"
          type="number"
          filled
          label="Sostenimiento DA-20"
          min="0"
          max="5"
          :rules="[(val) => (val >= 0 && val <= 5) || 'El valor debe estar entre 0 y 5']"
          @update:model-value="sumar()"
          :readonly="!editar"
        />
        <q-input
          v-model.number="criterioPrioridad.aporteLineasInvestigativo"
          type="number"
          filled
          label="Aporte Lineas Investigación"
          min="0"
          max="5"
          :rules="[(val) => (val >= 0 && val <= 5) || 'El valor debe estar entre 0 y 5']"
          @update:model-value="sumar()"
          :readonly="!editar"
        />
        <q-input
          v-model.number="criterioPrioridad.criteriodelDirector"
          type="number"
          filled
          label="Criterio del Director"
          min="0"
          max="3"
          :rules="[(val) => (val >= 0 && val <= 3) || 'El valor debe estar entre 0 y 3']"
          @update:model-value="sumar()"
          :readonly="!editar"
        />

        <q-input
          v-model.number="criterioPrioridad.disponedePresupuesto"
          type="number"
          filled
          label="Dispone de Presupuesto"
          min="0"
          max="5"
          :rules="[(val) => (val >= 0 && val <= 5) || 'El valor debe estar entre 0 y 5']"
          @update:model-value="sumar()"
          :readonly="!editar"
        />
        <q-input
          v-model.number="criterioPrioridad.suma"
          type="number"
          filled
          label="Suma"
          readonly
        />
        <q-stepper-navigation>
          <q-btn
            @click="
              () => {
                done2 = true;
                step = 3;
              }
            "
            color="primary"
            label="Siguiente"
          />
          <q-btn flat @click="step = 1" color="primary" label="Atrás" class="q-ml-sm" />
        </q-stepper-navigation>
      </q-step>

      <q-step :name="3" title="Desarrolladores" icon="person_add" :done="done3">
        <q-list bordered>
          <q-item
            v-for="desarrollador in desarrolladores"
            :key="desarrollador.idDesarrollador"
          >
            <q-item-section avatar top>
              <q-avatar color="primary" text-color="white">{{
                desarrollador.idDesarrollador
              }}</q-avatar>
            </q-item-section>
            <q-item-section cli>
              <q-item-label>{{ desarrollador.Personal.nombre }}</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-btn flat round color="primary" icon="delete" />
            </q-item-section>
          </q-item>
        </q-list>
        <q-stepper-navigation>
          <q-btn
            @click="
              () => {
                done2 = true;
                step = 4;
              }
            "
            color="primary"
            label="Continue"
          />
          <q-btn flat @click="step = 2" color="primary" label="Atrás" class="q-ml-sm" />
        </q-stepper-navigation>
      </q-step>
      <q-step :name="4" title="Fases" icon="checklist" :done="done4">
        <q-list bordered>
          <!-- <q-item v-for="(fase, index) in fases" :key="fase.idFase">
            <q-item-section avatar top>
              <q-avatar color="primary" text-color="white">
                {{ index }}
              </q-avatar>
            </q-item-section>
            <q-item-section cli>
              <q-item-label>{{ fase.tituloFase }}</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-btn flat round color="primary" icon="delete" />
            </q-item-section>
          </q-item> -->
          <q-expansion-item
            v-for="fase in fases"
            :key="fase.idFase"
            expand-separator
            icon="pending_actions"
            :label="fase.tituloFase"
          >
            <q-card>
              <q-card-section>
                <q-input
                  v-model="fase.fechaInicio"
                  filled
                  type="date"
                  label="Fecha de Inicio"
                  :readonly="!editar"
                />
                <q-input
                  v-model="fase.fechaFin"
                  filled
                  type="date"
                  label="Fecha de Fin"
                  :readonly="!editar"
                />
                <q-input
                  v-model="fase.fechaFinReal"
                  filled
                  type="date"
                  label="Fecha de Fin Real"
                  :readonly="!editar"
                />
                <q-input
                  filled
                  v-model="fase.presupuesto"
                  label="Presupuesto"
                  mask="#.##"
                  fill-mask="#"
                  reverse-fill-mask
                  input-class="text-right"
                  prefix="$"
                  :readonly="!editar"
                />
                <q-list bordered :header-inset-level="1">
                  <q-item v-for="retraso in fase.CausaRetrasos" :key="retraso.idRetraso">
                    <q-item-section avatar top>
                      <q-avatar color="primary" text-color="white">{{
                        retraso.idRetraso
                      }}</q-avatar>
                    </q-item-section>
                    <q-item-section cli>
                      <q-item-label>{{ retraso.descripcion }}</q-item-label>
                      <q-item-label caption lines="1">{{
                        retraso.TipoCausa.nombreDetalle
                      }}</q-item-label>
                    </q-item-section>
                    <q-item-section side>
                      <q-btn flat round color="primary" icon="delete" />
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-card-section>
            </q-card>
          </q-expansion-item>
        </q-list>
        <q-stepper-navigation>
          <q-btn color="primary" @click="done4 = true" label="Guardar" />
          <q-btn flat @click="step = 3" color="primary" label="Atrás" class="q-ml-sm" />
        </q-stepper-navigation>
      </q-step>
    </q-stepper>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import axios from "axios";
const apiUrl = require("../graphql/constants").apiUrl;
const queries = require("../graphql/constants").queries;
export default defineComponent({
  name: "PageIndex",
  setup: () => ({}),
  data: () => ({
    idPr: 0,
    nombre: "",
    descripcion: "",
    aplicacion: "",
    aplicaciones: [],
    capacidadGenerica: "",
    capacidadesGenericas: [],
    criterioPrioridad: {
      idCriterioPrioridad: 0,
      disponedePresupuesto: 0,
      criteriodelDirector: 0,
      aporteLineasInvestigativo: 0,
      requerimientoOperativo: 0,
      sostenimientoLogA29: 0,
      sostenimientoDA20: 0,
      suma: 0,
    },
    jefeProyecto: "",
    jefesProyectos: [],
    lineaInvestigacion: "",
    lineasInvestigacion: [],
    unidadBeneficiaria: "",
    unidadesBeneficiarias: [],
    tipoProyecto: { idDetalle: 41, nombreDetalle: "Concurso de Ingenios" },
    tiposProyectos: [],
    desarrolladores: [],
    fases: [],
    retrasos: [],
    step: 1,
    done1: false,
    done2: false,
    done3: false,
    done4: false,
    editar: false,
  }),
  created() {
    this.idPr = this.$route.params.id;
    this.getAplicaciones();
    this.getCapacidadesGenericas();
    this.getJefesProyecto();
    this.getTipoProyecto();
    this.getUnidadBeneficiaria();
    this.getLineasInvestigacion();
    this.getProyectoById(this.idPr);
    this.getDesarrolladoresByIdProyecto(this.idPr);
    this.getFasesByIdProyecto(this.idPr);
  },

  methods: {
    async getProyectoById(ide) {
      const {
        data: {
          data: { Proyecto },
        },
      } = await axios.post(apiUrl, {
        query: queries.getProyectoById,
        variables: { id: ide },
      });
      this.nombre = Proyecto[0].nombreProyecto;
      this.descripcion = Proyecto[0].descripcionProyecto;
      this.aplicacion = Proyecto[0].aplicacion;
      this.capacidadGenerica = Proyecto[0].CapacidadesGenericas;
      this.criterioPrioridad = Proyecto[0].CriterioPrioridad;
      this.jefeProyecto = Proyecto[0].JefeProyecto;
      this.lineaInvestigacion = Proyecto[0].LineasInvestigacion;
      this.tipoProyecto = Proyecto[0].TipoProyecto;
      this.unidadBeneficiaria = Proyecto[0].UnidadBeneficiaria;
    },
    async getAplicaciones() {
      const {
        data: {
          data: { Detalle },
        },
      } = await axios.post(apiUrl, { query: queries.getAplicaciones });
      this.aplicaciones = Detalle;
    },

    async getCapacidadesGenericas() {
      const {
        data: {
          data: { Detalle },
        },
      } = await axios.post(apiUrl, { query: queries.getCapacidadesGenericas });
      this.capacidadesGenericas = Detalle;
      console.log(Detalle);
    },
    //falta jefes de proyecto
    async getJefesProyecto() {
      const {
        data: {
          data: { Personal },
        },
      } = await axios.post(apiUrl, { query: queries.getJefesProyecto });
      this.jefesProyectos = Personal;
    },

    async getLineasInvestigacion() {
      const {
        data: {
          data: { Detalle },
        },
      } = await axios.post(apiUrl, { query: queries.getLineasInvestigacion });
      this.lineasInvestigacion = Detalle;
    },

    async getTipoProyecto() {
      const {
        data: {
          data: { Detalle },
        },
      } = await axios.post(apiUrl, { query: queries.getTipoProyecto });
      this.tiposProyectos = Detalle;
    },

    async getUnidadBeneficiaria() {
      const {
        data: {
          data: { Detalle },
        },
      } = await axios.post(apiUrl, { query: queries.getUnidadBeneficiaria });
      this.unidadesBeneficiarias = Detalle;
    },
    async getDesarrolladoresByIdProyecto(ide) {
      const {
        data: {
          data: { Desarrollador },
        },
      } = await axios.post(apiUrl, {
        query: queries.getDesarrolladoresByIdProyecto,
        variables: { _id: ide },
      });
      this.desarrolladores = Desarrollador;
      console.log(Desarrollador);
    },
    async getFasesByIdProyecto(ide) {
      const {
        data: {
          data: { Fase },
        },
      } = await axios.post(apiUrl, {
        query: queries.getFasesByIdProyecto,
        variables: { _id: ide },
      });
      this.fases = Fase;
      console.log(Fase);
    },

    onRowClick(evt, row) {
      console.log("clicked on", row.idProyecto);
    },
    sumar() {
      this.criterioPrioridad.suma =
        this.criterioPrioridad.requerimientoOperativo +
        this.criterioPrioridad.sostenimientoLogA29 +
        this.criterioPrioridad.sostenimientoDA20 +
        this.criterioPrioridad.aporteLineasInvestigativo +
        this.criterioPrioridad.criteriodelDirector +
        this.criterioPrioridad.disponedePresupuesto;
    },
  },
});
</script>
