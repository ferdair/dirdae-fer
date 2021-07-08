<template>
  <q-layout view="hhh lpr lFf">
    <q-header reveal elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

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

    <q-drawer v-model="leftDrawerOpen" side="left" overlay bordered>
      <q-scroll-area class="fit">
        <q-list>
          <template v-for="(menuItem, index) in menuList" :key="index">
            <q-item
              :to="menuItem.redirectTo"
              clickable
              :active="menuItem.label === 'Outbox'"
              v-ripple
            >
              <q-item-section avatar>
                <q-icon :name="menuItem.icon" />
              </q-item-section>
              <q-item-section>
                {{ menuItem.label }}
              </q-item-section>
            </q-item>
            <q-separator :key="'sep' + index" v-if="menuItem.separator" />
          </template>
        </q-list>
      </q-scroll-area>
    </q-drawer>

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

const menuList = [
  {
    icon: "home",
    label: "Inicio",
    separator: true,
    redirectTo: "/admin",
  },
  {
    icon: "engineering",
    label: "Personal",
    separator: true,
    redirectTo: "/personal",
  },
];

export default defineComponent({
  name: "AdminLayout",
  setup() {
    const $store = useStore();
    const userIsAuthorized = computed({
      get: () => $store.state.auth.userIsAuthorized,
      /* set: val => {
        $store.commit('showcase/updateDrawerState', val)
      } */
    });
    const leftDrawerOpen = ref(false);

    return {
      userIsAuthorized,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      menuList,
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
