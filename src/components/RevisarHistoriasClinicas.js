import React, { useEffect, useState } from 'react';
import { getClienteFullByCedula, upsertClienteByCedula, createConsultaForCedula, listConsultasByCedula, deleteHistoriaClinicaByCedula } from '../apiCrud';
import ManejoConsulta from './ManejoConsulta';
import './RevisarHistoriasClinicas.css';

const RevisarHistoriasClinicas = () => {
  const [cedulaBusqueda, setCedulaBusqueda] = useState('');
  const [historias, setHistorias] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editIdx, setEditIdx] = useState(null);
  const [editData, setEditData] = useState({ nombre: '', cedula: '', antecedentes: '' });
  const [showConsultas, setShowConsultas] = useState(false);
  const [consultas, setConsultas] = useState([]);
  const [consultasCedula, setConsultasCedula] = useState('');
  const [showEliminar, setShowEliminar] = useState(false);
  const [eliminarIdx, setEliminarIdx] = useState(null);
  const [eliminarTimer, setEliminarTimer] = useState(10);
  const [eliminarHabilitado, setEliminarHabilitado] = useState(false);
  const [nuevaConsulta, setNuevaConsulta] = useState({ motivo: '', diagnostico: '' });
  const [loadingConsulta, setLoadingConsulta] = useState(false);
  const [consultaSeleccionada, setConsultaSeleccionada] = useState(null);
  // Función para mostrar el formulario de agregar consulta
  const handleAgregarConsultaClick = () => {
    setShowConsultas(true);
    setNuevaConsulta({ motivo: '', diagnostico: '' });
  };

  // Función para cancelar agregar consulta
  const handleAgregarConsultaCancel = () => {
    setShowConsultas(false);
    setNuevaConsulta({ motivo: '', diagnostico: '' });
  };

  // Función para cambiar los campos del formulario de nueva consulta
  const handleNuevaConsultaChange = (field, value) => {
    setNuevaConsulta(prev => ({ ...prev, [field]: value }));
  };

  // Función para guardar la nueva consulta
  const handleAgregarConsultaSave = async () => {
    setLoadingConsulta(true);
    try {
      const nueva = await createConsultaForCedula(
        consultasCedula,
        {
          motivo: nuevaConsulta.motivo,
          diagnostico: nuevaConsulta.diagnostico
        }
      );
      setConsultas(con => [{ ...nueva }, ...con]);
      setShowConsultas(false);
      setNuevaConsulta({ motivo: '', diagnostico: '' });
    } catch {
      // Puedes mostrar un mensaje de error si lo deseas
    }
    setLoadingConsulta(false);
  };

  const handleBuscar = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const resultado = await getClienteFullByCedula(cedulaBusqueda);
      if (resultado) {
        // Cargar consultas para la historia encontrada
        const consultasData = await listConsultasByCedula(
          resultado.cedula,
          { limit: 20, sortDirection: 'DESC' }
        );
        setHistorias([{ ...resultado, consultas: Array.isArray(consultasData.items) ? consultasData.items : [] }]);
      } else {
        setHistorias([]);
      }
    } catch {
      setHistorias([]);
    }
    setLoading(false);
  };

  const handleEdit = (idx) => {
    setEditIdx(idx);
    setEditData({ ...historias[idx] });
  };

  const handleEditChange = (field, value) => {
    setEditData(prev => ({ ...prev, [field]: value }));
  };

  const handleEditSave = async () => {
    setLoading(true);
    await upsertClienteByCedula(editData);
    setHistorias(hist => hist.map((h, idx) => idx === editIdx ? editData : h));
    setEditIdx(null);
    setLoading(false);
    // Mostrar pantalla de agregar consulta
    setConsultasCedula(editData.cedula);
    setShowConsultas(true);
    setShowConsultas(true);
  };

  const handleEliminarClick = (idx) => {
    setEliminarIdx(idx);
    setShowEliminar(true);
    setEliminarTimer(10);
    setEliminarHabilitado(false);
  };

  useEffect(() => {
    let timer;
    if (showEliminar && eliminarTimer > 0) {
      timer = setTimeout(() => setEliminarTimer(t => t - 1), 1000);
    } else if (showEliminar && eliminarTimer === 0) {
      setEliminarHabilitado(true);
    }
    return () => clearTimeout(timer);
  }, [showEliminar, eliminarTimer]);

  const handleEliminarConfirm = async () => {
    setLoading(true);
    const cedula = historias[eliminarIdx]?.cedula;
    try {
      await deleteHistoriaClinicaByCedula(cedula);
      setHistorias(hist => hist.filter((_, idx) => idx !== eliminarIdx));
    } catch {
      // Puedes mostrar un mensaje de error si lo deseas
    }
    setShowEliminar(false);
    setEliminarIdx(null);
    setEliminarTimer(10);
    setEliminarHabilitado(false);
    setLoading(false);
  };

  const handleEliminarCancel = () => {
    setShowEliminar(false);
    setEliminarIdx(null);
    setEliminarTimer(10);
    setEliminarHabilitado(false);
  };

  const handleVerConsultas = async (cedula) => {
    setLoading(true);
    setConsultasCedula(cedula);
    try {
      const consultasData = await listConsultasByCedula(
        cedula,
        { limit: 20, sortDirection: 'DESC' }
      );
      setConsultas(Array.isArray(consultasData.items) ? consultasData.items : []);
    } catch {
      setConsultas([]);
    }
    setShowConsultas(true);
    setLoading(false);
  };

  const handleCerrarConsultas = () => {
    setShowConsultas(false);
    setConsultas([]);
    setConsultasCedula('');
  };

  return (
    <div className="revisar-historias-container">
      <h3 className="revisar-historias-titulo">Revisar Historias Clínicas</h3>
      <form className="revisar-historias-form" onSubmit={handleBuscar}>
        <input
          type="text"
          placeholder="Buscar por cédula"
          value={cedulaBusqueda}
          onChange={e => setCedulaBusqueda(e.target.value)}
        />
        <button type="submit">
          Buscar
        </button>
      </form>
      {loading && <p className="revisar-historias-loading">Cargando...</p>}
      {historias.length === 0 && !loading && <p className="revisar-historias-vacio">No se encontraron historias clínicas.</p>}
      {historias.length > 0 && !consultaSeleccionada && (
        <div className="revisar-historias-lista">
          {historias.map((h, idx) => (
            <div key={idx} className="revisar-historias-item" style={{ marginBottom: 32, border: '1px solid #e0e0e0', borderRadius: 8, padding: 16, background: '#fff' }}>
              <div style={{ marginBottom: 12 }}>
                <strong style={{ color: '#000' }}>Cédula:</strong> <span style={{ color: '#000' }}>{editIdx === idx ? (
                  <input value={editData.cedula} onChange={e => handleEditChange('cedula', e.target.value)} disabled style={{ color: '#000' }} />
                ) : h.cedula}</span>
                <br />
                <strong style={{ color: '#000' }}>Nombre:</strong> <span style={{ color: '#000' }}>{editIdx === idx ? (
                  <input value={editData.nombre} onChange={e => handleEditChange('nombre', e.target.value)} style={{ color: '#000' }} />
                ) : h.nombre}</span>
                <br />
                <strong style={{ color: '#000' }}>Antecedentes:</strong> <span style={{ color: '#000' }}>{editIdx === idx ? (
                  <textarea value={editData.antecedentes} onChange={e => handleEditChange('antecedentes', e.target.value)} rows={2} style={{ color: '#000' }} />
                ) : <span style={{ whiteSpace: 'pre-line', color: '#000' }}>{h.antecedentes}</span>}</span>
              </div>
              <div style={{ marginBottom: 12 }}>
                {editIdx === idx ? (
                  <>
                    <button onClick={handleEditSave} className="revisar-historias-btn">Guardar</button>
                    <button onClick={() => setEditIdx(null)} className="revisar-historias-btn revisar-historias-btn-cancel">Cancelar</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleEdit(idx)} className="revisar-historias-btn">Editar</button>
                    <button onClick={() => handleEliminarClick(idx)} className="revisar-historias-btn revisar-historias-btn-eliminar">Eliminar</button>
                  </>
                )}
              </div>
              <div className="revisar-historias-consultas" style={{ marginTop: 16 }}>
                <h4 style={{ marginBottom: 8 , color: '#000' }}>Consultas</h4>
                {Array.isArray(h.consultas) && h.consultas.length === 0 ? (
                  <p>No hay consultas para este paciente.</p>
                ) : (
                  <ul style={{
                    marginBottom: 12,
                    color: '#000',
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                    padding: '12px',
                    display: 'flex',
                    flexDirection: 'column',
                    background: '#fafafa',
                  }}>
                    {h.consultas.map((con, i) => (
                      <li
                        key={i}
                        style={{
                          marginBottom: 12,
                          color: '#000',
                          border: '1px solid #e0e0e0',
                          borderRadius: '8px',
                          padding: '12px',
                          display: 'flex',
                          flexDirection: 'column',
                          cursor: 'pointer'
                        }}
                        onClick={() => setConsultaSeleccionada(con)}
                        title="Ver manejo de consulta"
                      >
                        <div>
                          <strong>Motivo:</strong> {con.motivo}
                        </div>
                        <div>
                          <strong>Diagnóstico:</strong> <span style={{ whiteSpace: 'pre-line', color: '#000' }}>{con.diagnostico}</span>
                        </div>
                        <div>
                          <strong>Fecha de consulta:</strong> {con.createdAt ? new Date(con.createdAt).toLocaleString() : 'Sin fecha'}
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
                <button className="revisar-historias-btn revisar-historias-btn-agregar" onClick={() => { setShowConsultas(true); setConsultasCedula(h.cedula); }}>Agregar consulta</button>
              </div>
            </div>
          ))}
        </div>
      )}
      {showConsultas && (
        <div className="revisar-historias-popup-overlay" style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 1000, background: 'rgba(0,0,0,0.3)' }}>
          <div
            className="revisar-historias-popup-content"
            style={{
              maxHeight: '90vh',
              overflowY: 'auto',
              width: '90vw',
              maxWidth: 600,
              margin: '5vh auto',
              background: '#fff',
              borderRadius: 12,
              boxShadow: '0 2px 16px rgba(0,0,0,0.15)',
              padding: 24,
              position: 'relative',
            }}
          >
            <h4>Consultas de la cédula {consultasCedula}</h4>
            {Array.isArray(consultas) && consultas.length === 0 ? (
              <p>No hay consultas para este paciente.</p>
            ) : (
              <ul style={{
                marginBottom: 12,
                color: '#000',
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                padding: '12px',
                display: 'flex',
                flexDirection: 'column'
              }}>
                {consultas.map((con, i) => (
                  <li
                    key={i}
                    style={{
                      marginBottom: 12,
                      color: '#000',
                      border: '1px solid #e0e0e0',
                      borderRadius: '8px',
                      padding: '12px',
                      display: 'flex',
                      flexDirection: 'column'
                    }}
                  >
                    <div>
                      <strong style={{ color: '#000' }}>Motivo:</strong> {con.motivo}
                    </div>
                    <div>
                      <strong style={{ color: '#000' }}>Diagnóstico:</strong> <span style={{ whiteSpace: 'pre-line', color: '#000' }}>{con.diagnostico}</span>
                    </div>
                    <div>
                      <strong style={{ color: '#000' }}>Fecha de consulta:</strong> {con.createdAt
                        ? new Date(con.createdAt).toLocaleString()
                        : 'Sin fecha'}
                    </div>
                  </li>
                ))}
              </ul>
            )}
            <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
              <button className="revisar-historias-btn" onClick={handleCerrarConsultas}>Cerrar</button>
              <button className="revisar-historias-btn revisar-historias-btn-agregar" onClick={handleAgregarConsultaClick}>Agregar consulta</button>
            </div>
            {showConsultas && (
              <div className="revisar-historias-popup-overlay">
                <div className="revisar-historias-popup-content">
                  <h4>Agregar nueva consulta</h4>
                  <div>
                    <strong>Motivo:</strong>
                    <input
                      value={nuevaConsulta.motivo}
                      onChange={e => handleNuevaConsultaChange('motivo', e.target.value)}
                      style={{ marginLeft: 8 }}
                    />
                  </div>
                  <div>
                    <strong>Diagnóstico:</strong>
                    <textarea
                      value={nuevaConsulta.diagnostico}
                      onChange={e => handleNuevaConsultaChange('diagnostico', e.target.value)}
                      rows={2}
                      style={{ marginLeft: 8, width: '100%' }}
                    />
                  </div>
                  <div style={{ marginTop: 8, display: 'flex', gap: 8 }}>
                    <button className="revisar-historias-btn revisar-historias-btn-agregar" onClick={handleAgregarConsultaSave} disabled={loadingConsulta}>Guardar</button>
                    <button className="revisar-historias-btn revisar-historias-btn-cancel" onClick={handleAgregarConsultaCancel} disabled={loadingConsulta}>Cancelar</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      {consultaSeleccionada && (
        <div className="revisar-historias-popup-overlay" style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 1000, background: 'rgba(0,0,0,0.3)' }}>
          <div
            className="revisar-historias-popup-content"
            style={{
              height: '90vh',
              width: '90vw',
              maxWidth: '90vw',
              maxHeight: '90vh',
              margin: '5vh auto',
              background: '#fff',
              borderRadius: 12,
              boxShadow: '0 2px 16px rgba(0,0,0,0.15)',
              padding: 24,
              position: 'relative',
              overflowY: 'auto'
            }}
          >
            <button className="revisar-historias-btn revisar-historias-btn-cancel" style={{ position: 'absolute', top: 12, right: 12 }} onClick={() => setConsultaSeleccionada(null)}>Cerrar</button>
            <ManejoConsulta consultaID={consultaSeleccionada.id} />
          </div>
        </div>
      )}
      {showEliminar && (
        <div className="revisar-historias-popup-overlay">
          <div className="revisar-historias-popup-content">
            <h4>Advertencia</h4>
            <p>
              ¿Está seguro que desea eliminar la historia clínica de <strong>{historias[eliminarIdx]?.nombre}</strong> (cédula: <strong>{historias[eliminarIdx]?.cedula}</strong>)?<br />
              Esta acción no se puede deshacer.<br />
              Espere <strong>{eliminarTimer}</strong> segundos para habilitar el botón de eliminar.
            </p>
            <button
              className="revisar-historias-btn revisar-historias-btn-eliminar"
              onClick={handleEliminarConfirm}
              disabled={!eliminarHabilitado || loading}
            >
              Eliminar definitivamente
            </button>
            <button
              className="revisar-historias-btn revisar-historias-btn-cancel"
              onClick={handleEliminarCancel}
              disabled={loading}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RevisarHistoriasClinicas;
