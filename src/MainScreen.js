import React, { useState } from 'react';
import SidebarMenu from './components/SidebarMenu';
import CrearHistoriaClinica from './components/CrearHistoriaClinica';
import RevisionesForm from './components/RevisionesForm';
import logo from './logo.svg';

const MainScreen = ({ user, signOut }) => {
  const [selected, setSelected] = useState(null);
  const [cliente, setCliente] = useState(null);

  const handleGuardado = () => {
    setCliente(null);
    setSelected(null);
  };

  return (
    <div>
      <SidebarMenu onSelect={setSelected} signOut={signOut} />
      <div style={{ }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
          <span>Hola <strong>{user?.username}</strong></span>
        </div>
        {selected === 'crear' && (
          <div>
            <h2>Crear Historia Clínica</h2>
            {!cliente ? (
              <CrearHistoriaClinica onHistoriaCreada={data => setCliente(data)} />
            ) : (
              <RevisionesForm
                cliente={cliente}
                usuario={user?.username}
                onGuardado={handleGuardado}
              />
            )}
          </div>
        )}
        {selected === 'revisar' && (
          <div>
            <h2>Revisar Historias Clínicas</h2>
            {/* ...tabla/lista... */}
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
