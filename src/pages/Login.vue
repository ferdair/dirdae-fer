<template>
  <div class="q-pa-md">
    <div class="row justify-center">
      <div class="col-md-4 col-xs-12">
        <q-card class="my-card">
          <div class="row justify-center">
            <q-avatar size="xl">
              <img src="https://photo.isu.pub/cidfae/photo_large.jpg" />
            </q-avatar>
          </div>

          <q-card-section>
            <div class="text-h6">Sistema de Gestión de proyectos DIRDAE</div>
            <div class="text-subtitle2">Bienvenido</div>
            <div class="text-subtitle1">Inicia sesión para continuar</div>
          </q-card-section>
          <q-separator />

          <q-card-actions vertical>
            <q-btn @click="authLogin()" color="primary">Inicia Sesión</q-btn>
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "Login",
  methods: {
    authLogin() {
      this.$store.dispatch("auth/auth0Login");
      console.log("estamos en");
    },
  },
});
</script>
