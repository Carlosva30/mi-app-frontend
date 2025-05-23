import React, { useState } from 'react';

import Login from './componentes/auth/Login';
import PantallaRegistro from './componentes/auth/PantallaRegistro';
import PantallaPerfilExperto from './componentes/perfiles/PantallaPerfilExperto';
import PantallaRecuperarContraseña from './componentes/auth/PantallaRecuperarContraseña';

import PantallaInicio from './componentes/inicio/PantallaInicio';
import PantallaFinal from './componentes/inicio/PantallaFinal';

import PantallaCotizar from './componentes/servicios/PantallaCotizar';
import PantallaServicios from './componentes/servicios/PantallaServicios';
import PantallaSolicitud from './componentes/servicios/PantallaSolicitud';
import PantallaSolicitudesGuardadas from './componentes/servicios/PantallaSolicitudesGuardadas';
import PantallaSeguimiento from './componentes/servicios/PantallaSeguimiento';
import PantallaSolicitudesRecibidas from './componentes/servicios/PantallaSolicitudesRecibidas';

import PantallaPago from './componentes/pagos/PantallaPago';

import './App.css';

function App() {
  const [pantalla, setPantalla] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [servicio, setServicio] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [expertoSeleccionado, setExpertoSeleccionado] = useState(null);

  const getClase = (nombrePantalla) => {
    return pantalla === nombrePantalla ? 'pantalla activa' : 'pantalla';
  };

  return (
    <div className="App">

     {pantalla === 'login' && (
       <Login
         onRegistro={(tipo) => {
          if (tipo === 'recuperar') {
           setPantalla('recuperar');
      } else {
         setPantalla('registro');
      }
    }}
     onLoginExitoso={() => {
      const tipoUsuario = localStorage.getItem('tipoUsuario');
      if (tipoUsuario === 'experto') {
        setPantalla('perfilExperto');
      } else {
        setPantalla('inicio');
      }
    }}
  />
)}

      {/* PANTALLA DE INICIO */}
      {pantalla === 'inicio' && (
        <PantallaInicio
          onCotizar={(experto) => {
            setExpertoSeleccionado(experto);
            setPantalla('cotizar');
          }}
          onVerSolicitudes={() => setPantalla('verSolicitudes')}
          onLogout={() => setPantalla('login')}
        />
      )}

      {/* PANTALLA RECUPERAR CONTRASEÑA */}
      {pantalla === 'recuperar' && (
        <PantallaRecuperarContraseña onVolver={() => setPantalla('login')} />
      )}

      {/* COTIZAR */}
      {pantalla === 'cotizar' && expertoSeleccionado && (
        <PantallaCotizar
          experto={expertoSeleccionado}
          onEnviarCotizacion={(datos) => {
            console.log('Cotización enviada:', datos);
            setPantalla('inicio');
          }}
          onVolver={() => setPantalla('inicio')}
        />
      )}

      {/* REGISTRO */}
      {pantalla === 'registro' && (
        <PantallaRegistro
          onRegistro={(tipoUsuario) => {
            if (tipoUsuario === 'cliente') {
              setPantalla('inicio');
            } else if (tipoUsuario === 'experto') {
              setPantalla('perfilExperto');
            }
          }}
        />
      )}

      {/* PERFIL DEL EXPERTO */}
      {pantalla === 'perfilExperto' && (
        <PantallaPerfilExperto
          onVerSolicitudes={() => setPantalla('solicitudesRecibidas')}
          onLogout={() => setPantalla('login')}
        />
      )}

      {/* SELECCIÓN DE SERVICIOS */}
      {pantalla === 'servicios' && (
        <PantallaServicios
          onSeleccionar={(serv) => {
            setServicio(serv);
            setPantalla('solicitud');
          }}
        />
      )}

      {/* DESCRIPCIÓN DE LA SOLICITUD */}
      {pantalla === 'solicitud' && (
        <PantallaSolicitud
          email={email}
          servicio={servicio}
          setDescripcion={setDescripcion}
          onConfirmar={() => setPantalla('pago')}
        />
      )}

      {/* SOLICITUDES GUARDADAS */}
      {pantalla === 'verSolicitudes' && (
        <PantallaSolicitudesGuardadas onVolver={() => setPantalla('inicio')} />
      )}

      {/* PAGO */}
      {pantalla === 'pago' && (
        <PantallaPago onPagar={() => setPantalla('seguimiento')} />
      )}

      {/* SEGUIMIENTO */}
      {pantalla === 'seguimiento' && (
        <PantallaSeguimiento onFinalizar={() => setPantalla('final')} />
      )}

      {/* FINAL */}
      {pantalla === 'final' && (
        <PantallaFinal onLogout={() => setPantalla('login')} />
      )}

      {/* SOLICITUDES RECIBIDAS DEL EXPERTO */}
      {pantalla === 'solicitudesRecibidas' && (
        <PantallaSolicitudesRecibidas onVolver={() => setPantalla('perfilExperto')} />
      )}
    </div>
  );
}

export default App;
