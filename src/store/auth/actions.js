import env from "app/config/env";

export function auth0Login(context) {
  context.state.auth0.authorize();
}

export function auth0HandleAuthentication(context) {
  context.state.auth0.parseHash((err, authResult) => {
    if (authResult && authResult.accessToken && authResult.idToken) {
      let expiresAt = JSON.stringify(
        authResult.expiresIn * 1000 + new Date().getTime()
      );
      // save the tokens locally
      localStorage.setItem("access_token", authResult.accessToken);
      localStorage.setItem("id_token", authResult.idToken);
      localStorage.setItem("expires_at", expiresAt);

      this.$router.replace("/admin");
    } else if (err) {
      alert("login failed. Error #KJN838");
      this.$router.replace("/");
      console.log(err);
    }
  });
}

export function auth0Logout(context) {
  // No need to update the bearer in global axiosConfig to null because we are redirecting out of the application
  // Clear Access Token and ID Token from local storage
  localStorage.removeItem("access_token");
  localStorage.removeItem("id_token");
  localStorage.removeItem("expires_at");

  // redirect to auth0 logout to completely log the user out
  window.location.href =
    env.VUE_APP_AUTH0_CONFIG_DOMAINURL +
    "/v2/logout?returnTo=" +
    env.VUE_APP_DOMAINURL +
    "&client_id=" +
    env.VUE_APP_AUTH0_CONFIG_CLIENTID;
}
