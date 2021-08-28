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
        <q-input
          outlined
          v-model="descripcion"
          label="descripción"
          :readonly="!editar"
        />

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
          @update:model-value="filtrarLineas"
        />
        <q-select
          square
          outlined
          v-model="lineaEspecifica"
          :options="lineasEspecificasFilt"
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
        <!-- Cambiar el evento -->
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
          :rules="[
            (val) =>
              (val >= 0 && val <= 5) || 'El valor debe estar entre 0 y 5',
          ]"
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
          :rules="[
            (val) =>
              (val >= 0 && val <= 5) || 'El valor debe estar entre 0 y 5',
          ]"
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
          :rules="[
            (val) =>
              (val >= 0 && val <= 5) || 'El valor debe estar entre 0 y 5',
          ]"
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
          :rules="[
            (val) =>
              (val >= 0 && val <= 5) || 'El valor debe estar entre 0 y 5',
          ]"
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
          :rules="[
            (val) =>
              (val >= 0 && val <= 3) || 'El valor debe estar entre 0 y 3',
          ]"
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
          :rules="[
            (val) =>
              (val >= 0 && val <= 5) || 'El valor debe estar entre 0 y 5',
          ]"
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
          <q-btn
            flat
            @click="step = 1"
            color="primary"
            label="Atrás"
            class="q-ml-sm"
          />
        </q-stepper-navigation>
      </q-step>

      <q-step :name="3" title="Desarrolladores" icon="person_add" :done="done3">
        <q-select
          square
          filled
          v-model="nuevoDesarrollador"
          :options="personal"
          label="Desarrollador"
          option-value="idPersonal"
          option-label="nombre"
          autofocus
          @update:model-value="agregarDesarrollador"
        />
        <q-list bordered>
          <q-item
            v-for="(desarrollador, index) in desarrolladores"
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
              <q-btn
                flat
                round
                color="primary"
                icon="delete"
                @click="quitarDesarrollador(index)"
              />
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
          <q-btn
            flat
            @click="step = 3"
            color="primary"
            label="Atrás"
            class="q-ml-sm"
          />
        </q-stepper-navigation>
      </q-step>
      <q-step :name="4" title="Fases" icon="checklist" :done="done4">
        <q-input
          outlined
          v-model="nuevaFase.tituloFase"
          label="Nombre"
          :rules="[(val) => !!val || 'Nombre de la fase es requerido']"
        />
        <q-input
          v-model="nuevaFase.fechaInicio"
          filled
          type="date"
          label="Fecha de Inicio"
        />
        <q-input
          v-model="nuevaFase.fechaFin"
          filled
          type="date"
          label="Fecha de Fin"
        />
        <q-input
          v-model="nuevaFase.fechaFinReal"
          filled
          type="date"
          label="Fecha de Fin Real"
        />
        <q-input
          filled
          v-model="nuevaFase.presupuesto"
          label="Presupuesto"
          mask="#.##"
          fill-mask="#"
          reverse-fill-mask
          input-class="text-right"
          prefix="$"
        />
        <q-btn @click="agregarFase" color="primary" label="Agregar" />
        <q-list bordered>
          <q-expansion-item
            v-for="(fase, index) in fases"
            :key="index"
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
                />
                <q-input
                  v-model="fase.fechaFin"
                  filled
                  type="date"
                  label="Fecha de Fin"
                />
                <q-input
                  v-model="fase.fechaFinReal"
                  filled
                  type="date"
                  label="Fecha de Fin Real"
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
                />
                <q-item-section side>
                  <q-btn
                    flat
                    round
                    color="primary"
                    icon="delete"
                    @click="quitarFase(index)"
                  />
                </q-item-section>
              </q-card-section>
            </q-card>
          </q-expansion-item>
        </q-list>
        <q-stepper-navigation>
          <q-btn color="primary" @click="done4 = true" label="Guardar" />
          <q-btn
            flat
            @click="step = 3"
            color="primary"
            label="Atrás"
            class="q-ml-sm"
          />
        </q-stepper-navigation>
      </q-step>
    </q-stepper>
    <q-btn color="primary" @click="updateProyecto()" label="Guardar" />
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
    lineaEspecifica: "",
    lineasEspecificas: [],
    lineasEspecificasFilt: [],
    unidadBeneficiaria: "",
    unidadesBeneficiarias: [],
    tipoProyecto: { idDetalle: 41, nombreDetalle: "Concurso de Ingenios" },
    tiposProyectos: [],
    nuevoDesarrollador: [],
    personal: [],
    desarrolladores: [],
    desarrolladoresOriginal: [],
    fases: [],
    nuevaFase: {
      tituloFase: null,
      fechaFin: null,
      fechaFinReal: null,
      fechaInicio: null,
      presupuesto: null,
    },
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
    this.getLineasEspecificas();
    this.getPersonal();
  },

  methods: {
    agregarDesarrollador() {
      const val = this.desarrolladores.some(
        (des) => des.Personal.idPersonal === this.nuevoDesarrollador.idPersonal
      );

      if (val === true) {
        alert("Esta persona ya es parte del proyecto");
        this.nuevoDesarrollador = null;
      } else {
        this.desarrolladores.splice(0, 0, {
          idDesarrollador: null,
          Personal: this.nuevoDesarrollador,
        });
        this.nuevoDesarrollador = null;
      }
    },
    quitarDesarrollador(index) {
      this.desarrolladores.splice(index, 1);
    },
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
      this.lineaEspecifica = Proyecto[0].LineaEspecificaInvestigacion;
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
    async getLineasEspecificas() {
      const {
        data: {
          data: { Detalle },
        },
      } = await axios.post(apiUrl, { query: queries.getLineasEspecificas });
      this.lineasEspecificas = Detalle;
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
      this.desarrolladores = JSON.parse(JSON.stringify(Desarrollador));
      this.desarrolladoresOriginal = JSON.parse(JSON.stringify(Desarrollador));
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
    async getPersonal() {
      const {
        data: {
          data: { Personal },
        },
      } = await axios.post(apiUrl, { query: queries.getPersonalDesarrollador });
      this.personal = Personal;
    },
    async updateProyecto() {
      const py = {
        idProyecto: Number(this.idPr),
        _set: {
          nombreProyecto: this.nombre,
          descripcionProyecto: this.descripcion,
          criteriosPrioridad: this.criterioPrioridad.idCriterioPrioridad,
          aplicacion:
            this.aplicacion === undefined ? null : this.aplicacion.idDetalle,
          capacidadesGenericas: this.capacidadGenerica.idDetalle,
          jefeProyecto: this.jefeProyecto.idPersonal,
          lineasInvestigacion: this.lineaInvestigacion.idDetalle,
          lineaEspecificaInvestigacion: this.lineaEspecifica.idDetalle,
          tipoProyecto: this.tipoProyecto.idDetalle,
          unidadBeneficiaria: this.unidadBeneficiaria.idDetalle,
        },
      };

      let r = await axios.post(apiUrl, {
        query: mutations.updateProyecyoByPk,
        variables: { idProyecto: py.idProyecto, _set: py._set },
      });

      this.updateCriterioPrioridad();
      this.updateDesarrolladores();
      this.updateFases();
      this.$router.push({ path: `/proyecto` });
    },
    async updateCriterioPrioridad() {
      const cp = {
        idCriterioPrioridad: this.criterioPrioridad.idCriterioPrioridad,
        _set: this.criterioPrioridad,
      };

      let r = await axios.post(apiUrl, {
        query: mutations.updateCriterioPrioridadByPk,
        variables: {
          idCriterioPrioridad: cp.idCriterioPrioridad,
          _set: cp._set,
        },
      });
    },
    async updateDesarrolladores() {
      let del = await axios.post(apiUrl, {
        query: mutations.deleteDesarrolladoresByProyecto,
        variables: {
          _eq: this.idPr,
        },
      });

      let des = [];
      this.desarrolladores.forEach((desarrollador) => {
        des.push({
          idPersonal: desarrollador.Personal.idPersonal,
          idProyecto: this.idPr,
        });
      });

      const ad = await axios.post(apiUrl, {
        query: mutations.insertDesarrollador,
        variables: { objects: des },
      });
    },
    async updateFases() {
      /* this.fases.forEach(async (fase) => {
        let fs = {
          idFase: fase.idFase,
          _set: {
            tituloFase: fase.tituloFase,
            fechaInicio: fase.fechaInicio,
            fechaFin: fase.fechaFin,
            fechaFinReal: fase.fechaFinReal,
            presupuesto: fase.presupuesto,
          },
        };
        let r = await axios.post(apiUrl, {
          query: mutations.updateFaseByPk,
          variables: { idFase: fs.idFase, _set: fs._set },
        });
      }); */

      let del = await axios.post(apiUrl, {
        query: mutations.deleteFasesByProyecto,
        variables: {
          _eq: this.idPr,
        },
      });

      let fas = [];

      this.fases.forEach((fase) => {
        fas.push({
          idProyecto: this.idPr,
          tituloFase: fase.tituloFase,
          fechaInicio: fase.fechaInicio,
          fechaFin: fase.fechaFin,
          fechaFinReal: fase.fechaFinReal,
          presupuesto: fase.presupuesto,
        });
      });

      const {
        data: {
          data: { insert_Fase },
        },
      } = await axios.post(apiUrl, {
        query: mutations.insertFase,
        variables: { objects: fas },
      });
    },
    agregarFase() {
      this.fases.push(this.nuevaFase);
      this.nuevaFase = {
        tituloFase: null,
        fechaFin: null,
        fechaFinReal: null,
        fechaInicio: null,
        presupuesto: null,
      };
    },
    quitarFase(ide) {
      this.fases.splice(ide, 1);
    },
    filtrarLineas() {
      this.lineaEspecifica = null;
      this.lineasEspecificasFilt = this.lineasEspecificas.filter(
        (a) => a.relacionDetalle === this.lineaInvestigacion.idDetalle
      );
    },
  },
});
</script>
