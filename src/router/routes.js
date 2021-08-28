import Login from "app/src/pages/Login.vue";
const routes = [
  {
    path: "/proyecto",
    component: () => import("layouts/AdminLayout.vue"),
    children: [{ path: "", component: () => import("pages/Index.vue") }],
    meta: { requiresAuth: true },
  },
  {
    path: "/proyecto/:id",
    component: () => import("layouts/AdminLayout.vue"),
    children: [
      { path: "", component: () => import("pages/EditarProyecto.vue") },
    ],
    meta: { requiresAuth: true },
  },
  {
    path: "/proyecto/create",
    component: () => import("layouts/AdminLayout.vue"),
    children: [
      { path: "", component: () => import("pages/NuevoProyecto.vue") },
    ],
    meta: { requiresAuth: true },
  },
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/Login.vue") }],
  },
  {
    path: "/auth0callback",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/Auth0Callback.vue") },
    ],
  },
  {
    path: "/personal",
    component: () => import("layouts/AdminLayout.vue"),
    children: [{ path: "", component: () => import("pages/Personal.vue") }],
    meta: { requiresAuth: true },
  },
  {
    path: "/personal/:id",
    component: () => import("layouts/AdminLayout.vue"),
    children: [
      { path: "", component: () => import("pages/EditarPersonal.vue") },
    ],
    meta: { requiresAuth: true },
  },
  {
    path: "/personal/create",
    component: () => import("layouts/AdminLayout.vue"),
    children: [
      { path: "", component: () => import("pages/NuevoPersonal.vue") },
    ],
    meta: { requiresAuth: true },
  },
  {
    path: "/unidadbeneficiaria",
    component: () => import("layouts/AdminLayout.vue"),
    children: [
      { path: "", component: () => import("pages/UnidadBeneficiaria.vue") },
    ],
    meta: { requiresAuth: true },
  },
  {
    path: "/unidadbeneficiaria/create",
    component: () => import("layouts/AdminLayout.vue"),
    children: [{ path: "", component: () => import("pages/NuevoDetalle.vue") }],
    meta: { requiresAuth: true, tipo: 2 },
  },
  {
    path: "/capacidadesgenericas",
    component: () => import("layouts/AdminLayout.vue"),
    children: [
      { path: "", component: () => import("pages/CapacidadesGenericas.vue") },
    ],
    meta: { requiresAuth: true },
  },
  {
    path: "/capacidadesgenericas/create",
    component: () => import("layouts/AdminLayout.vue"),
    children: [{ path: "", component: () => import("pages/NuevoDetalle.vue") }],
    meta: { requiresAuth: true, tipo: 3 },
  },
  {
    path: "/lineasinvestigacion",
    component: () => import("layouts/AdminLayout.vue"),
    children: [
      { path: "", component: () => import("pages/LineasInvestigacion.vue") },
    ],
    meta: { requiresAuth: true },
  },
  {
    path: "/lineasinvestigacion/create",
    component: () => import("layouts/AdminLayout.vue"),
    children: [{ path: "", component: () => import("pages/NuevoDetalle.vue") }],
    meta: { requiresAuth: true, tipo: 4 },
  },
  {
    path: "/aplicacion",
    component: () => import("layouts/AdminLayout.vue"),
    children: [{ path: "", component: () => import("pages/Aplicacion.vue") }],
    meta: { requiresAuth: true },
  },
  {
    path: "/aplicacion/create",
    component: () => import("layouts/AdminLayout.vue"),
    children: [{ path: "", component: () => import("pages/NuevoDetalle.vue") }],
    meta: { requiresAuth: true, tipo: 6 },
  },
  {
    path: "/reporte/:id",
    component: () => import("layouts/AdminLayout.vue"),
    children: [{ path: "", component: () => import("pages/Reporte.vue") }],
    meta: { requiresAuth: true },
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/Error404.vue"),
  },
];

export default routes;
