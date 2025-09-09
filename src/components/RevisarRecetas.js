import React, { useState } from 'react';
import { listRecetas } from '../apiCrud';
import './RevisarHistoriasClinicas.css';

const RevisarRecetas = () => {
  const [cedulaBusqueda, setCedulaBusqueda] = useState('');
  const [recetas, setRecetas] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleBuscar = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const recetasData = await listRecetas(cedulaBusqueda, { limit: 20, sortDirection: 'DESC' });
      setRecetas(Array.isArray(recetasData.items) ? recetasData.items : []);
    } catch {
      setRecetas([]);
    }
    setLoading(false);
  };

  return (
    <div className="revisar-historias-container">
      <h3 className="revisar-historias-titulo">Revisar Recetas</h3>
      <form className="revisar-historias-form" onSubmit={handleBuscar}>
        <input
          type="text"
          placeholder="Buscar por cédula"
          value={cedulaBusqueda}
          onChange={e => setCedulaBusqueda(e.target.value)}
        />
        <button type="submit">Buscar</button>
      </form>
      {loading && <p className="revisar-historias-loading">Cargando...</p>}
      {recetas.length === 0 && !loading && <p className="revisar-historias-vacio">No se encontraron recetas.</p>}
      {recetas.length > 0 && (
        <ul style={{ marginTop: 24, padding: 0 }}>
          {recetas.map((rec, idx) => (
            <li key={idx} style={{ marginBottom: 16, border: '1px solid #e0e0e0', borderRadius: 8, padding: 16, background: '#fff', listStyle: 'none' }}>
              <div style={{ color: '#222' }}>
                <strong>ID:</strong> <span style={{ color: '#222' }}>{rec.id}</span><br />
                <strong>Indicaciones:</strong> <span style={{ color: '#222' }}>{rec.indicaciones}</span><br />
                <strong>Fecha:</strong> <span style={{ color: '#222' }}>{rec.createdAt ? new Date(rec.createdAt).toLocaleString() : 'Sin fecha'}</span><br />
                <strong>S3 Key:</strong> <span style={{ color: '#222' }}>{rec.s3key || 'Sin archivo'}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RevisarRecetas;
