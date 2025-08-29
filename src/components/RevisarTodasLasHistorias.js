import React, { useEffect, useState } from 'react';
import { listClientes } from '../apiCrud';
import './RevisarHistoriasClinicas.css';

const RevisarTodasLasHistorias = () => {
  const [historias, setHistorias] = useState([]);
  const [loading, setLoading] = useState(false);
  const [nextToken, setNextToken] = useState(null);
  const [prevTokens, setPrevTokens] = useState([]);

  const fetchHistorias = async (token = null) => {
    setLoading(true);
    try {
      const res = await listClientes({ limit: 10, nextToken: token });
      setHistorias(Array.isArray(res.items) ? res.items : []);
      setNextToken(res.nextToken || null);
    } catch {
      setHistorias([]);
      setNextToken(null);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchHistorias();
  }, []);

  const handleNext = () => {
    if (nextToken) {
      setPrevTokens(tokens => [...tokens, nextToken]);
      fetchHistorias(nextToken);
    }
  };

  const handlePrev = () => {
    if (prevTokens.length > 1) {
      const tokens = [...prevTokens];
      tokens.pop();
      const prevToken = tokens[tokens.length - 1];
      setPrevTokens(tokens);
      fetchHistorias(prevToken);
    } else {
      setPrevTokens([]);
      fetchHistorias(null);
    }
  };

  return (
    <div className="revisar-historias-container">
      <h3 className="revisar-historias-titulo">Todas las historias clínicas</h3>
      {loading && <p className="revisar-historias-loading">Cargando...</p>}
      {historias.length === 0 && !loading && <p className="revisar-historias-vacio">No se encontraron historias clínicas.</p>}
      {historias.length > 0 && (
        <ul style={{ marginTop: 24, padding: 0 }}>
          {historias.map((h, idx) => (
            <li key={h.id || idx} style={{ marginBottom: 16, border: '1px solid #e0e0e0', borderRadius: 8, padding: 16, background: '#fff', listStyle: 'none' }}>
              <div style={{ color: '#000' }}>
                <strong>Cédula:</strong> <span>{h.cedula}</span><br />
                <strong>Nombre:</strong> <span>{h.nombre}</span><br />
                <strong>Antecedentes:</strong> <span>{h.antecedentes || 'Sin antecedentes'}</span><br />
                <strong>Fecha de creación:</strong> <span>{h.createdAt ? new Date(h.createdAt).toLocaleString() : 'Sin fecha'}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
      <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
        <button className="revisar-historias-btn" onClick={handlePrev} disabled={loading || prevTokens.length === 0}>Anterior</button>
        <button className="revisar-historias-btn" onClick={handleNext} disabled={loading || !nextToken}>Siguiente</button>
      </div>
    </div>
  );
};

export default RevisarTodasLasHistorias;
