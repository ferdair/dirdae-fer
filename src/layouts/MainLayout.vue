<template>
  <q-layout view="hHh lpR fFf">
    <q-header reveal elevated class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
          </q-avatar>
          Gestión de proyectos
        </q-toolbar-title>
        <q-space />
        <q-separator dark vertical />
        <q-btn
          stretch
          flat
          label="Cerrar Sesión"
          @click="logout()"
          v-if="this.userIsAuthorized"
        />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import env from "app/config/env";
import { computed } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "MainLayout",
  setup() {
    const $store = useStore();

    const userIsAuthorized = computed({
      get: () => $store.state.auth.userIsAuthorized,
      /* set: val => {
        $store.commit('showcase/updateDrawerState', val)
      } */
    });

    return {
      userIsAuthorized,
    };
  },
  data: () => ({
    clientId: env.VUE_APP_AUTH0_CONFIG_CLIENTID,
  }),
  methods: {
    logout() {
      console.log("cerrando");
      this.$store.dispatch("auth/auth0Logout");
    },
  },
});
</script>
