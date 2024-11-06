import './App.css';
import Login from './components/Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ReactKeycloakProvider } from "@react-keycloak/web";
import Register from './components/Register';
import { Chat } from './components/Chat';
import keycloak from './helper/keycloak';
import KeycloakProtect from './helper/KeycloakProtect';

function App() {
  return (
    <ReactKeycloakProvider authClient={keycloak}>

      <Router>
        <Routes>
          <Route path='/' element={<Chat />} />
          <Route path='login' element={<Login />} />
          <Route
             path="/register"
             element={
               <KeycloakProtect>
                 <Register />
               </KeycloakProtect>
             }
           />
          {/* <Route path='register' element={<Register />} /> */}
        </Routes>
      </Router>
    </ReactKeycloakProvider>

  );
}

export default App;
