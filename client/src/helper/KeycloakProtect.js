import { useKeycloak } from "@react-keycloak/web";

const KeycloakProtect = ({ children }) => {
 const { keycloak } = useKeycloak();

 const isLoggedIn = keycloak.authenticated;

 return isLoggedIn ? children : null;
};

export default KeycloakProtect;