import React, { useState } from 'react';

const RevisionesForm = ({ nombrePaciente }) => {
  const [revisiones, setRevisiones] = useState([{ parte: '', descripcion: '' }]);

  const handleChange = (idx, field, value) => {
    const nuevas = revisiones.map((rev, i) =>
      i === idx ? { ...rev, [field]: value } : rev
    );
    setRevisiones(nuevas);
  };

  const agregarRevision = () => {
    setRevisiones([...revisiones, { parte: '', descripcion: '' }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes manejar el envío de las revisiones
    // Por ejemplo: guardar en base de datos, mostrar mensaje, etc.
    alert('Revisiones guardadas');
  };

  return (
    <form onSubmit={handleSubmit} style={{ width: '80vw', maxWidth: 1200, margin: '40px auto', background: '#fff', padding: 24, borderRadius: 12 }}>
      <h3 style={{ textAlign: 'center', marginBottom: 16 }}>Revisiones para {nombrePaciente}</h3>
      {revisiones.map((rev, idx) => (
        <div key={idx} style={{ marginBottom: 16, display: 'flex', gap: 12 }}>
          <div style={{ flex: 1 }}>
            <label style={{ color: '#000' }}>Parte del cuerpo:</label>
            <input
              type="text"
              value={rev.parte}
              onChange={e => handleChange(idx, 'parte', e.target.value)}
              required
              style={{ width: '100%', padding: 8, marginTop: 4 }}
            />
          </div>
          <div style={{ flex: 2 }}>
            <label style={{ color: '#000' }}>Descripción:</label>
            <input
              type="text"
              value={rev.descripcion}
              onChange={e => handleChange(idx, 'descripcion', e.target.value)}
              required
              style={{ width: '100%', padding: 8, marginTop: 4 }}
            />
          </div>
        </div>
      ))}
      <button type="button" onClick={agregarRevision} style={{ marginBottom: 16, padding: '8px 16px', borderRadius: 6, border: 'none', background: '#61dafb', color: '#000', fontWeight: 'bold', cursor: 'pointer' }}>
        Agregar revisión
      </button>
      <button type="submit" style={{ width: '100%', padding: 10, background: '#282c34', color: '#fff', border: 'none', borderRadius: 6 }}>
        Guardar revisiones
      </button>
    </form>
  );
};

export default RevisionesForm;
