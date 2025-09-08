import React, { useState } from 'react';
import './CrearHistoriaClinica.css';
import { upsertClienteByCedula } from '../apiCrud';

const CrearHistoriaClinica = ({ onHistoriaCreada }) => {
  const [nombre, setNombre] = useState('');
  const [cedula, setCedula] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await upsertClienteByCedula({
      cedula,
      nombre
    });
    if (onHistoriaCreada) {
      onHistoriaCreada({ nombre, cedula });
    }
    setNombre('');
    setCedula('');
    setLoading(false);
  };

  return (
    <form className="crear-historia-form" onSubmit={handleSubmit}>
      <h3 className="crear-historia-titulo">Nueva Historia Clínica</h3>
      <div className="crear-historia-campo">
        <label>Nombre:</label>
        <input
          type="text"
          value={nombre}
          onChange={e => {
            const val = e.target.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]/g, '');
            setNombre(val);
          }}
          required
          maxLength={60}
        />
        <label>Cédula:</label>
        <input
          type="text"
          value={cedula}
          onChange={e => {
            const val = e.target.value.replace(/\D/g, '');
            setCedula(val);
          }}
          required
          maxLength={10}
          pattern="[0-9]*"
          inputMode="numeric"
        />
      </div>
      
      <button className="crear-historia-btn" type="submit" disabled={loading}>
        {loading ? 'Guardando...' : 'Guardar'}
      </button>
    </form>
  );
};

export default CrearHistoriaClinica;
