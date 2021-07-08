import env from "app/config/env";
import auth0 from "auth0-js";
var options = {
  language: "es",
};
export default function () {
  return {
    //
    /* userIsAuthorized: false,
    auth0: new auth0.WebAuth({
      domain: env.VUE_APP_AUTH0_CONFIG_DOMAIN,
      clientID: env.VUE_APP_AUTH0_CONFIG_CLIENTID,
      redirectUri: env.VUE_APP_DOMAINURL + "/auth0callback",
      responseType: env.VUE_APP_AUTH0_CONFIG_RESPONSETYPE,
      scope: env.VUE_APP_AUTH0_CONFIG_SCOPE,
    }), */

    userIsAuthorized: false,
    auth0: new auth0.WebAuth({
      domain: env.VUE_APP_AUTH0_CONFIG_DOMAIN,
      clientID: env.VUE_APP_AUTH0_CONFIG_CLIENTID,
      redirectUri: env.VUE_APP_DOMAINURL + "/auth0callback",
      responseType: env.VUE_APP_AUTH0_CONFIG_RESPONSETYPE,
      scope: env.VUE_APP_AUTH0_CONFIG_SCOPE,
      options,
    }),
  };
}
