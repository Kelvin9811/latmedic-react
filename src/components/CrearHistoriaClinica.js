import React, { useState } from 'react';

const CrearHistoriaClinica = ({ onSubmit }) => {
  const [nombre, setNombre] = useState('');
  const [cedula, setCedula] = useState('');
  const [antecedentes, setAntecedentes] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit({ nombre, cedula, antecedentes });
    }
    setNombre('');
    setCedula('');
    setAntecedentes('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: '0 auto', background: '#fff', padding: 24, borderRadius: 12 }}>
      <h3 style={{ textAlign: 'center', marginBottom: 16 }}>Nueva Historia Clínica</h3>
      <div style={{ marginBottom: 12 }}>
        <label>Nombre:</label>
        <input
          type="text"
          value={nombre}
          onChange={e => setNombre(e.target.value)}
          required
          style={{ width: '100%', padding: 8, marginTop: 4 }}
        />
      </div>
      <div style={{ marginBottom: 12 }}>
        <label>Cédula:</label>
        <input
          type="text"
          value={cedula}
          onChange={e => setCedula(e.target.value)}
          required
          style={{ width: '100%', padding: 8, marginTop: 4 }}
        />
      </div>
      <div style={{ marginBottom: 12 }}>
        <label>Antecedentes:</label>
        <textarea
          value={antecedentes}
          onChange={e => setAntecedentes(e.target.value)}
          rows={3}
          style={{ width: '100%', padding: 8, marginTop: 4 }}
        />
      </div>
      <button type="submit" style={{ width: '100%', padding: 10, background: '#282c34', color: '#fff', border: 'none', borderRadius: 6 }}>
        Guardar
      </button>
    </form>
  );
};

export default CrearHistoriaClinica;
