<template>
  <router-view />
</template>
<script>
import { defineComponent } from "vue";
import env from "../config/env";

export default defineComponent({
  name: "App",
  data: () => ({
    clientId: env.VUE_APP_AUTH0_CONFIG_CLIENTID,
  }),
});
</script>
