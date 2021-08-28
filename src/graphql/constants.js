// graphql.config.js
module.exports = {
  apiUrl: "https://proyectos-dirdae.herokuapp.com/v1/graphql",
  queries: {
    getProyectos: `query MyQuery {
      Proyecto(order_by: {CriterioPrioridad: {suma: desc}}, where: {tipoProyecto: {_eq: 40}}) {
        idProyecto
        nombreProyecto
        JefeProyecto {
          idPersonal
          rango
          nombre
        }
        CriterioPrioridad {
          suma
        }
      }
    }`,
    getConcursosIngenio: `query MyQuery {
      Proyecto(order_by: {CriterioPrioridad: {suma: desc}}, where: {tipoProyecto: {_eq: 41}}) {
        idProyecto
        nombreProyecto
        JefeProyecto {
          idPersonal
          rango
          nombre
        }
        CriterioPrioridad {
          suma
        }
      }
    }`,
    getProyectoByNombre: `query MyQuery($texto: String, $tipo: Int) {
      Proyecto(order_by: {CriterioPrioridad: {suma: desc}}, where: {_and: {nombreProyecto: {_ilike: $texto}, tipoProyecto: {_eq: $tipo}}}) {
        idProyecto
        nombreProyecto
        JefeProyecto {
          idPersonal
          rango
          nombre
        }
        CriterioPrioridad {
          suma
        }
      }
    }
    `,
    getTipoProyecto: `query MyQuery {
            Detalle(where: {TipoDetalle: {idTipoDetalle: {_eq: 5}}}) {
              idDetalle
              nombreDetalle
            }
        }`,
    getPersonal: `query MyQuery {
          Personal {
            idPersonal
            rango
            nombre
            correo
            telefono
          }
        }
        `,
    getPersonalById: `query MyQuery($id: Int) {
          Personal(where: {idPersonal: {_eq: $id}}) {
            idPersonal
            nombre
            rango
            telefono
            correo
            es_jefe
          }
        }`,
    getUnidadBeneficiaria: `query MyQuery {
      Detalle(where: {TipoDetalle: {idTipoDetalle: {_eq: 2}}}) {
        idDetalle
        nombreDetalle
      }
    }
    `,
    getCapacidadesGenericas: `query MyQuery {
      Detalle(where: {TipoDetalle: {idTipoDetalle: {_eq: 3}}}) {
        idDetalle
        nombreDetalle
      }
    }
    `,
    getLineasInvestigacion: `query MyQuery {
      Detalle(where: {TipoDetalle: {idTipoDetalle: {_eq: 4}}}) {
        idDetalle
        nombreDetalle
      }
    }
    `,
    getLineasEspecificas: `query MyQuery {
      Detalle(where: {TipoDetalle: {idTipoDetalle: {_eq: 9}}}) {
        idDetalle
        nombreDetalle
        relacionDetalle
      }
    }
    `,
    getAplicaciones: `query MyQuery {
      Detalle(where: {TipoDetalle: {idTipoDetalle: {_eq: 6}}}) {
        idDetalle
        nombreDetalle
      }
    }
    `,
    getProyectoById: `query MyQuery($id: Int) {
      Proyecto(where: {idProyecto: {_eq: $id}}) {
        idProyecto
        descripcionProyecto
        nombreProyecto
        Aplicacion {
          idDetalle
          nombreDetalle
          tipoDetalle
        }
        CapacidadesGenericas {
          idDetalle
          nombreDetalle
          tipoDetalle
        }
        CriterioPrioridad {
          idCriterioPrioridad
          disponedePresupuesto
          criteriodelDirector
          aporteLineasInvestigativo
          requerimientoOperativo
          sostenimientoLogA29
          sostenimientoDA20
          suma
        }
        JefeProyecto {
          idPersonal
          rango
          nombre
          correo
          telefono
        }
        LineasInvestigacion {
          idDetalle
          nombreDetalle
          tipoDetalle
        }
        TipoProyecto {
          idDetalle
          nombreDetalle
          tipoDetalle
        }
        UnidadBeneficiaria {
          idDetalle
          nombreDetalle
          tipoDetalle
        }
        LineaEspecificaInvestigacion {
          idDetalle
          nombreDetalle
          tipoDetalle
        }
      }
    }
    `,
    getJefesProyecto: `query MyQuery {
      Personal(where: {es_jefe: {_eq: true}}) {
        idPersonal
        rango
        nombre
        telefono
        correo
        es_jefe
      }
    }
    `,
    getPersonalDesarrollador: `query MyQuery {
      Personal(where: {es_jefe: {_eq: false}}) {
        idPersonal
        rango
        nombre
        telefono
        correo
        es_jefe
      }
    }
    `,
    getDesarrolladoresByIdProyecto: `query MyQuery($_id: Int) {
      Desarrollador(where: {idProyecto: {_eq: $_id}}) {
        idDesarrollador
        Personal {
          idPersonal
          nombre
          telefono
          rango
          correo
        }
      }
    }
    `,
    getFasesByIdProyecto: `query MyQuery($_id: Int) {
      Fase(where: {idProyecto: {_eq: $_id}}) {
        idFase
        tituloFase
        fechaInicio
        fechaFin
        fechaFinReal
        presupuesto
        CausaRetrasos {
          idRetraso
          descripcion
          TipoCausa {
            idDetalle
            nombreDetalle
          }
        }
      }
    }
    `,
    getRangos: `query MyQuery {
      Detalle(where: {tipoDetalle: {_eq: 7}}) {
        idDetalle
        nombreDetalle
      }
    }
    `,
  },
  mutations: {
    insertProyecto: `mutation MyMutation($object: Proyecto_insert_input! = {}) {
      insert_Proyecto_one(object: $object) {
        idProyecto
      }
    }
    `,
    insertDesarrollador: `mutation MyMutation($objects: [Desarrollador_insert_input!]!) {
      insert_Desarrollador(objects: $objects) {
        returning {
          idDesarrollador
        }
      }
    }
    `,
    insertFase: `mutation MyMutation($objects: [Fase_insert_input!]!) {
      insert_Fase(objects: $objects) {
        returning {
          idFase
        }
      }
    }`,
    insertPersonal: `mutation MyMutation($object: Personal_insert_input!) {
      insert_Personal_one(object: $object) {
        idPersonal
      }
    }
    `,
    insertDetalleByTipo: `mutation MyMutation($object: Detalle_insert_input!) {
      insert_Detalle_one(object: $object) {
        idDetalle
      }
    }
    `,
    updatePersonalByPk: `mutation MyMutation($idPersonal: Int!, $_set: Personal_set_input) {
      update_Personal_by_pk(pk_columns: {idPersonal: $idPersonal}, _set: $_set) {
        idPersonal
        nombre
      }
    }`,
    updateProyecyoByPk: `mutation MyMutation($idProyecto: Int!, $_set: Proyecto_set_input) {
      update_Proyecto_by_pk(pk_columns: {idProyecto: $idProyecto}, _set: $_set) {
        idProyecto
      }
    }
    `,
    updateCriterioPrioridadByPk: `mutation MyMutation($idCriterioPrioridad: Int!, $_set: CriterioPrioridad_set_input = {}) {
      update_CriterioPrioridad_by_pk(pk_columns: {idCriterioPrioridad: $idCriterioPrioridad}, _set: $_set) {
        idCriterioPrioridad
        suma
      }
    }
    `,
    updateFaseByPk: `mutation MyMutation($idFase: Int!, $_set: Fase_set_input, $_set1: Fase_set_input = {}) {
      update_Fase_by_pk(pk_columns: {idFase: $idFase}, _set: $_set) {
        idFase
        idProyecto
      }
    }
    `,
    deleteDesarrolladoresByProyecto: `mutation MyMutation($_eq: Int) {
      delete_Desarrollador(where: {idProyecto: {_eq: $_eq}}) {
        affected_rows
      }
    }`,
    deleteFasesByProyecto: `mutation MyMutation($_eq: Int) {
      delete_Fase(where: {idProyecto: {_eq: $_eq}}) {
        affected_rows
      }
    }`,
  },
};
