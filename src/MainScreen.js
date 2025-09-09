import React, { useState } from 'react';
import SidebarMenu from './components/SidebarMenu';
import CrearHistoriaClinica from './components/CrearHistoriaClinica';
import CrearConsulta from './components/CrearConsulta';
import ManejoConsulta from './components/ManejoConsulta';
import RevisarHistoriasClinicas from './components/RevisarHistoriasClinicas';
import RevisarTodasLasHistorias from './components/RevisarTodasLasHistorias';
import logo from './logo.svg';

const MainScreen = ({ user, signOut }) => {
  const [selected, setSelected] = useState(null);
  const [cliente, setCliente] = useState(null);
  const [consulta, setConsulta] = useState(null);

  const handleGuardado = () => {
    setCliente(null);
    setConsulta(null);
    setSelected(null);
  };

  return (
    <div>
      <SidebarMenu onSelect={setSelected} signOut={signOut} />
      <div style={{ }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: 24 }}>
          <span>Hola <strong>{user?.username}</strong></span>
        </div>
        {selected === 'crear' && (
          <div>
            {!cliente ? (
              <CrearHistoriaClinica onHistoriaCreada={data => setCliente(data)} />
            ) : !consulta ? (
              <CrearConsulta
                cedula={cliente.cedula}
                onConsultaCreada={data => setConsulta(data)}
                nombreCliente={cliente.nombre}
              />
            ) : (
              <ManejoConsulta
                consultaID={consulta.id}
              />
            )}
          </div>
        )}
        {selected === 'revisar' && (
          <div>
            <RevisarHistoriasClinicas />
          </div>
        )}
        {selected === 'recetas' && (
          <div>
            <RevisarTodasLasHistorias />
          </div>
        )}
        {!selected && (
          <div>
            <h2>Bienvenido al Control de Historias Clínicas</h2>
            <p>Seleccione una opción en el menú.</p>
          </div>
        )}
      </div>
    </div>
  );
};


export default MainScreen;
