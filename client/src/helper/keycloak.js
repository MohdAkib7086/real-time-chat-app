import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
 url: "http://localhost:8080/auth",
 realm: "self",
 clientId: "react-auth",
});

export default keycloak;