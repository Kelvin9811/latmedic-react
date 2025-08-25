import React, { useState } from 'react';
import SidebarMenu from './components/SidebarMenu';
import logo from './logo.svg';

const MainScreen = ({ user, signOut }) => {
  const [selected, setSelected] = useState(null);

  return (
    <div>
      <SidebarMenu onSelect={setSelected} signOut={signOut} />
      <div style={{ marginLeft: '240px', padding: '40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 24 }}>
          <img src={logo} alt="logo" style={{ width: 60, marginRight: 16 }} />
          <span>Hola <strong>{user?.username}</strong> 👋</span>
        </div>
        {selected === 'crear' && (
          <div>
            <h2>Crear Historia Clínica</h2>
            {/* ...formulario... */}
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
