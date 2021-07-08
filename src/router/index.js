import { route } from "quasar/wrappers";
import { setUserIsAuthenticated } from "src/store/auth/mutations";
import {
  createRouter,
  createMemoryHistory,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";
import routes from "./routes";

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function ({ store /*, ssrContext*/ }) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === "history"
    ? createWebHistory
    : createWebHashHistory;

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(
      process.env.MODE === "ssr" ? void 0 : process.env.VUE_ROUTER_BASE
    ),
  });

  /* Router.beforeEach((to, from, next) => {
    if (to.matched.some((record) => record.path == "/auth0callback")) {
      console.log("router.beforeEach encontró /auth0callback url");
      store.dispatch("auth/auth0HandleAuthentication");
      next(false);
    }
    // comprueba si el usuario ha iniciado sesión (comienza asumiendo que el usuario no ha iniciado sesión = falso)

    let routerAuthCheck = false;
    // Verificamos que todas las variables de acceso adecuadas estén presentes para una autorización adecuada
    if (
      localStorage.getItem("access_token") &&
      localStorage.getItem("id_token") &&
      localStorage.getItem("expires_at")
    ) {
      console.log("found local storage tokens");
      // Verifique si la hora actual ha pasado la fecha de vencimiento del token de acceso
      let expiresAt = JSON.parse(localStorage.getItem("expires_at"));
      // establezca localAuthTokenCheck verdadero si no ha expirado / falso si ha expirado
      routerAuthCheck = new Date().getTime() < expiresAt;
    }

    // establecer la comprensión global de la interfaz de usuario de la autenticación
    store.commit("auth/setUserIsAuthenticated", routerAuthCheck);

    // comprobar si la ruta a la que se accede requiere autorización

    if (to.matched.some((record) => record.meta.requiresAuth)) {
      // Comprueba si el usuario está autenticado
      if (routerAuthCheck) {
        // el usuario está autenticado: permitir el acceso
        next();
      } else {
        //el usuario no está autenticado - redirigir al inicio de sesión
        Router.replace("/");
      }
    }
    // Permitir que se cargue la página
    else {
      store.commit("auth/setUserIsAuthenticated", false);
      next();
    }
  }); */

  Router.beforeEach((to, from, next) => {
    // Allow finishing callback url for logging in
    if (to.matched.some((record) => record.path == "/auth0callback")) {
      console.log("router.beforeEach found /auth0callback url");
      store.dispatch("auth/auth0HandleAuthentication");
      next(false);
    }

    // check if user is logged in (start assuming the user is not logged in = false)
    let routerAuthCheck = false;
    // Verify all the proper access variables are present for proper authorization
    if (
      localStorage.getItem("access_token") &&
      localStorage.getItem("id_token") &&
      localStorage.getItem("expires_at")
    ) {
      console.log("found local storage tokens");
      // Check whether the current time is past the Access Token's expiry time
      let expiresAt = JSON.parse(localStorage.getItem("expires_at"));
      // set localAuthTokenCheck true if unexpired / false if expired
      routerAuthCheck = new Date().getTime() < expiresAt;
    }

    // set global ui understanding of authentication
    store.commit("auth/setUserIsAuthenticated", routerAuthCheck);

    // check if the route to be accessed requires authorizaton
    if (to.matched.some((record) => record.meta.requiresAuth)) {
      // Check if user is Authenticated
      if (routerAuthCheck) {
        // user is Authenticated - allow access
        next();
      } else {
        // user is not authenticated - redirect to login
        router.replace("/login");
      }
    }
    // Allow page to load
    else {
      next();
    }
  });

  return Router;
});
