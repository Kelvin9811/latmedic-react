import React, { useState } from 'react';
import { createConsultaForCedula } from '../apiCrud';
import './CrearConsulta.css';

const CrearConsulta = ({ cedula, onConsultaCreada, nombreCliente }) => {
  const [motivo, setMotivo] = useState('');
  const [diagnostico, setDiagnostico] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const consulta = await createConsultaForCedula(cedula, { motivo, diagnostico });
      if (onConsultaCreada) onConsultaCreada(consulta);
      setMotivo('');
      setDiagnostico('');
    } catch (err) {
      // Manejo de error si lo deseas
    }
    setLoading(false);
  };

  return (
    <form className="crear-consulta-form" onSubmit={handleSubmit}>
      <h3 className="crear-consulta-titulo">
        Nueva Consulta{nombreCliente ? ` para ${nombreCliente}` : ''}
      </h3>
      <div className="crear-consulta-campo">
        <label>Motivo:</label>
        <input
          type="text"
          value={motivo}
          onChange={e => setMotivo(e.target.value)}
          required
          className="crear-consulta-input"
        />
      </div>
      <div className="crear-consulta-campo">
        <label>Enfermedad actual:</label>
        <textarea
          value={diagnostico}
          onChange={e => setDiagnostico(e.target.value)}
          rows={3}
          required
          className="crear-consulta-textarea"
        />
      </div>
      <button className="crear-consulta-btn" type="submit" disabled={loading}>
        Guardar
      </button>
    </form>
  );
};

export default CrearConsulta;
