import Login from "app/src/pages/Login.vue";
const routes = [
  {
    path: "/admin",
    component: () => import("layouts/AdminLayout.vue"),
    children: [{ path: "", component: () => import("pages/Index.vue") }],
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
    children: [{ path: "", component: () => import("pages/Auth0Callback.vue") }],

  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/Error404.vue"),
  },
];

export default routes;
