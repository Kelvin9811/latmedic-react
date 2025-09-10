import React, { useEffect, useState } from 'react';
import { getClienteByCedula, upsertClienteByCedula, createConsultaForCedula, listConsultasByCedula, deleteHistoriaClinicaByCedula } from '../apiCrud';
import ManejoConsulta from './ManejoConsulta';
import './RevisarHistoriasClinicas.css';

const RevisarHistoriasClinicas = () => {
  const [cedulaBusqueda, setCedulaBusqueda] = useState('');
  const [historias, setHistorias] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editIdx, setEditIdx] = useState(null);
  const [editData, setEditData] = useState({
    nombre: '',
    cedula: '',
    direccionResidenciaHabitual: '',
    calleYNumero: '',
    barrio: '',
    parroquia: '',
    canton: '',
    provincia: '',
    zona: '',
    telefono: '',
    fechaNacimiento: '',
    lugarNacimiento: '',
    nacionalidad: '',
    grupoCultural: '',
    edadEnAnosCumplidos: '',
    sexo: '',
    estadoCivil: '',
    nivelEducativo: '',
    fechaAdmision: '',
    ocupacion: '',
    empresaDondeTrabaja: '',
    tipoSeguroSalud: '',
    referidoDe: '',
    enCasoDeAvisarA: '',
    parentescoAfinidad: '',
    direccion: ''
  });
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
      const resultado = await getClienteByCedula(cedulaBusqueda);
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
                <strong style={{ color: '#222' }}>Cédula:</strong> <span style={{ color: '#222' }}>{editIdx === idx ? (
                  <input value={editData.cedula} onChange={e => handleEditChange('cedula', e.target.value)} disabled style={{ color: '#222' }} />
                ) : h.cedula}</span>
                <br />
                <strong style={{ color: '#222' }}>Nombre:</strong> <span style={{ color: '#222' }}>{editIdx === idx ? (
                  <input value={editData.nombre} onChange={e => handleEditChange('nombre', e.target.value)} style={{ color: '#222' }} />
                ) : h.nombre}</span>
                <br />
                <strong style={{ color: '#222' }}>Fecha de nacimiento:</strong> <span style={{ color: '#222' }}>{h.fechaNacimiento ? new Date(h.fechaNacimiento).toLocaleDateString() : 'Sin dato'}</span>
                <br />
                <strong style={{ color: '#222' }}>Teléfono:</strong> <span style={{ color: '#222' }}>{h.telefono || 'Sin dato'}</span>
                <br />
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
                <h4 style={{ marginBottom: 8 , color: '#222' }}>Consultas</h4>
                {Array.isArray(h.consultas) && h.consultas.length === 0 ? (
                  <p>No hay consultas para este paciente.</p>
                ) : (
                  <ul style={{
                    marginBottom: 12,
                    color: '#222',
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
                          color: '#222',
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
                          <strong>Motivo:</strong> {con.motivoDeConsulta}
                        </div>
                        <div>
                          <strong>Diagnóstico:</strong> <span style={{ whiteSpace: 'pre-line', color: '#222' }}>{con.diagnosticodeIngreso}</span>
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
                color: '#222',
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
                      color: '#222',
                      border: '1px solid #e0e0e0',
                      borderRadius: '8px',
                      padding: '12px',
                      display: 'flex',
                      flexDirection: 'column'
                    }}
                  >
                    <div>
                      <strong style={{ color: '#222' }}>Motivo:</strong> {con.motivo}
                    </div>
                    <div>
                      <strong style={{ color: '#222' }}>Diagnóstico:</strong> <span style={{ whiteSpace: 'pre-line', color: '#222' }}>{con.diagnostico}</span>
                    </div>
                    <div>
                      <strong style={{ color: '#222' }}>Fecha de consulta:</strong> {con.createdAt
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
      {editIdx !== null && (
        <div className="revisar-historias-popup-overlay" style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 1000, background: 'rgba(0,0,0,0.3)' }}>
          <div className="revisar-historias-popup-content" style={{ maxHeight: '90vh', overflowY: 'auto', width: '90vw', maxWidth: 600, margin: '5vh auto', background: '#fff', borderRadius: 12, boxShadow: '0 2px 16px rgba(0,0,0,0.15)', padding: 24, position: 'relative' }}>
            <h4>Editar Historia Clínica</h4>
            <form onSubmit={e => { e.preventDefault(); handleEditSave(); }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <label>Nombre:</label>
                <input value={editData.nombre} disabled style={{ color: '#222' }} />
                <label>Cédula:</label>
                <input value={editData.cedula} disabled style={{ color: '#222' }} />
                <label>Dirección residencia habitual:</label>
                <input value={editData.direccionResidenciaHabitual || ''} onChange={e => handleEditChange('direccionResidenciaHabitual', e.target.value)} />
                <label>Calle y número:</label>
                <input value={editData.calleYNumero || ''} onChange={e => handleEditChange('calleYNumero', e.target.value)} />
                <label>Barrio:</label>
                <input value={editData.barrio || ''} onChange={e => handleEditChange('barrio', e.target.value)} />
                <label>Parroquia:</label>
                <input value={editData.parroquia || ''} onChange={e => handleEditChange('parroquia', e.target.value)} />
                <label>Cantón:</label>
                <input value={editData.canton || ''} onChange={e => handleEditChange('canton', e.target.value)} />
                <label>Provincia:</label>
                <input value={editData.provincia || ''} onChange={e => handleEditChange('provincia', e.target.value)} />
                <label>Zona:</label>
                <input value={editData.zona || ''} onChange={e => handleEditChange('zona', e.target.value)} />
                <label>Teléfono:</label>
                <input value={editData.telefono || ''} onChange={e => handleEditChange('telefono', e.target.value)} />
                <label>Fecha de nacimiento:</label>
                <input type="date" value={editData.fechaNacimiento ? editData.fechaNacimiento.substring(0,10) : ''} onChange={e => handleEditChange('fechaNacimiento', e.target.value)} />
                <label>Lugar de nacimiento:</label>
                <input value={editData.lugarNacimiento || ''} onChange={e => handleEditChange('lugarNacimiento', e.target.value)} />
                <label>Nacionalidad:</label>
                <input value={editData.nacionalidad || ''} onChange={e => handleEditChange('nacionalidad', e.target.value)} />
                <label>Grupo cultural:</label>
                <input value={editData.grupoCultural || ''} onChange={e => handleEditChange('grupoCultural', e.target.value)} />
                <label>Edad en años cumplidos:</label>
                <input type="number" value={editData.edadEnAnosCumplidos || ''} onChange={e => handleEditChange('edadEnAnosCumplidos', e.target.value)} min={0} max={120} />
                <label>Sexo:</label>
                <input value={editData.sexo || ''} onChange={e => handleEditChange('sexo', e.target.value)} />
                <label>Estado civil:</label>
                <input value={editData.estadoCivil || ''} onChange={e => handleEditChange('estadoCivil', e.target.value)} />
                <label>Nivel educativo:</label>
                <input value={editData.nivelEducativo || ''} onChange={e => handleEditChange('nivelEducativo', e.target.value)} />
                <label>Fecha de admisión:</label>
                <input type="date" value={editData.fechaAdmision ? editData.fechaAdmision.substring(0,10) : ''} onChange={e => handleEditChange('fechaAdmision', e.target.value)} />
                <label>Ocupación:</label>
                <input value={editData.ocupacion || ''} onChange={e => handleEditChange('ocupacion', e.target.value)} />
                <label>Empresa donde trabaja:</label>
                <input value={editData.empresaDondeTrabaja || ''} onChange={e => handleEditChange('empresaDondeTrabaja', e.target.value)} />
                <label>Tipo seguro salud:</label>
                <input value={editData.tipoSeguroSalud || ''} onChange={e => handleEditChange('tipoSeguroSalud', e.target.value)} />
                <label>Referido de:</label>
                <input value={editData.referidoDe || ''} onChange={e => handleEditChange('referidoDe', e.target.value)} />
                <label>En caso de avisar a:</label>
                <input value={editData.enCasoDeAvisarA || ''} onChange={e => handleEditChange('enCasoDeAvisarA', e.target.value)} />
                <label>Parentesco/afinidad:</label>
                <input value={editData.parentescoAfinidad || ''} onChange={e => handleEditChange('parentescoAfinidad', e.target.value)} />
                <label>Dirección:</label>
                <input value={editData.direccion || ''} onChange={e => handleEditChange('direccion', e.target.value)} />
              </div>
              <div style={{ marginTop: 16, display: 'flex', gap: 8 }}>
                <button type="submit" className="revisar-historias-btn">Guardar</button>
                <button type="button" className="revisar-historias-btn revisar-historias-btn-cancel" onClick={() => setEditIdx(null)}>Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default RevisarHistoriasClinicas;
