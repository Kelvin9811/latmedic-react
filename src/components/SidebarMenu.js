import React, { useState } from 'react';
import './SidebarMenu.css';

const SidebarMenu = ({ onSelect, signOut }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="hamburger" onClick={() => setOpen(!open)}>
        <div />
        <div />
        <div />
      </div>
      <div className={`sidebar-menu ${open ? 'open' : ''}`}>
        <div className="sidebar-menu-content">
          <ul className="sidebar-menu-list">
            <li onClick={() => { onSelect('crear'); setOpen(false); }}>Crear Historia Clínica</li>
            <li onClick={() => { onSelect('revisar'); setOpen(false); }}>Revisar Historias</li>
          </ul>
          <button className="sidebar-logout-btn" onClick={() => { signOut(); setOpen(false); }}>
            Cerrar Sesión
          </button>
        </div>
      </div>
    </>
  );
};

export default SidebarMenu;
