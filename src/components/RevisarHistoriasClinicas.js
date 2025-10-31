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
  const [editConsultaIdx, setEditConsultaIdx] = useState(null);
  const [editConsultaData, setEditConsultaData] = useState({
    hora: '',
    grupoSanguineoYFactorRh: '',
    motivoDeConsulta: '',
    alientoEtilico: '',
    valorAlcoCheck: '',
    antecedenteAlergico: '',
    antecedenteClinico: '',
    antecedenteGinecologico: '',
    antecedenteTraumatologico: '',
    antecedenteQuirurgico: '',
    antecedenteFarmacoLogico: '',
    antecedentePsiquiatrico: '',
    antecedenteOtro: '',
    enfermedadActual: '',
    presionArterial: '',
    frecuenciaCardiaca: '',
    frecuenciaRespiratoria: '',
    temperaturaBucal: '',
    temperaturaAxilar: '',
    peso: '',
    talla: '',
    gaslowOcular: '',
    gaslowVerbal: '',
    gaslowMotora: '',
    gaslowTotal: '',
    reaccionPupilaIzq: '',
    reaccionPupilaDer: '',
    tiempoLlenadoCapilar: '',
    saturacionOxigeno: '',
    viaAereaObstruida: '',
    cabeza: '',
    cuello: '',
    torax: '',
    abdomen: '',
    columna: '',
    pelvis: '',
    extremidades: '',
    heridaPenetrante: '',
    heridaCortante: '',
    fracturaExpuesta: '',
    fracturaCerrada: '',
    cuerpoExtrano: '',
    hemorragia: '',
    mordedura: '',
    picadura: '',
    excoriacion: '',
    deformidadOMasa: '',
    hematoma: '',
    eritemaInflamacion: '',
    luxacionEsguince: '',
    quemadura: '',
    solicitudExamenBiometria: false,
    solicitudExamenUroanalisis: false,
    solicitudExamenQuimicaSanguinea: false,
    solicitudExamenElectrolitos: false,
    solicitudExamenGasometria: false,
    solicitudExamenElectrocardiograma: false,
    solicitudExamenEndoscopia: false,
    solicitudExamenRxTorax: false,
    solicitudExamenRxAbdomen: false,
    solicitudExamenRxOsea: false,
    solicitudExamenTomografia: false,
    solicitudExamenResonancia: false,
    solicitudExamenEcografiaPelvica: false,
    solicitudExamenEcografiaAbdomen: false,
    solicitudExamenInterconsulta: false,
    solicitudExamenOtros: false,
    diagnosticodeIngreso: '',
    diagnosticodeAltade: '',
    planDeTratamientoIndicaciones: '',
    planDeTratamientoMedicamentos: ''
  });

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

  const handleEditConsulta = (consulta) => {
    setEditConsultaData({ ...consulta });
    setEditConsultaIdx(consulta.id);
  };

  const handleSaveEditConsulta = async () => {
    setLoading(true);
    // Aquí deberías llamar a tu función de actualización, por ejemplo updateConsulta(editConsultaData)
    // await updateConsulta(editConsultaData);
    setEditConsultaIdx(null);
    setLoading(false);
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
                        onClick={() => handleEditConsulta(con)}
                        title="Editar consulta"
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
      {consultaSeleccionada && false && (
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
                <label>Dirección:</label>
                <input value={editData.direccionResidenciaHabitual || ''} onChange={e => handleEditChange('direccionResidenciaHabitual', e.target.value)} />
                <label>Barrio:</label>
                <input value={editData.barrio || ''} onChange={e => handleEditChange('barrio', e.target.value)} />
                <label>Parroquia:</label>
                <input value={editData.parroquia || ''} onChange={e => handleEditChange('parroquia', e.target.value)} />
                <label>Cantón:</label>
                <input value={editData.canton || ''} onChange={e => handleEditChange('canton', e.target.value)} />
                <label>Provincia:</label>
                <input value={editData.provincia || ''} onChange={e => handleEditChange('provincia', e.target.value)} />
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
                <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '24px 0 8px 0' }} />
                <h4 style={{ color: '#222', fontWeight: 'bold', margin: 8 }}>En caso de emergencia</h4>
                <label>Notificar a:</label>
                <input value={editData.enCasoDeAvisarA || ''} onChange={e => handleEditChange('enCasoDeAvisarA', e.target.value)} />
                <label>Parentesco/afinidad:</label>
                <input value={editData.parentescoAfinidad || ''} onChange={e => handleEditChange('parentescoAfinidad', e.target.value)} />
                <label>Telefono:</label>
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
      {editConsultaIdx && (
        <div className="revisar-historias-popup-overlay" style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 1000, background: 'rgba(0,0,0,0.3)' }}>
          <div className="revisar-historias-popup-content" style={{ maxHeight: '90vh', overflowY: 'auto', width: '90vw', maxWidth: 600, margin: '5vh auto', background: '#fff', borderRadius: 12, boxShadow: '0 2px 16px rgba(0,0,0,0.15)', padding: 24, position: 'relative' }}>
            <h4>Editar Consulta</h4>
            <form onSubmit={e => { e.preventDefault(); handleSaveEditConsulta(); }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <label>Hora:</label>
                <input value={editConsultaData.hora || ''} disabled style={{ color: '#222' }} />
                <label>Grupo Sanguíneo y Factor RH:</label>
                <input value={editConsultaData.grupoSanguineoYFactorRh || ''} onChange={e => setEditConsultaData(d => ({ ...d, grupoSanguineoYFactorRh: e.target.value }))} />
                <label>Motivo de Consulta:</label>
                <input value={editConsultaData.motivoDeConsulta || ''} onChange={e => setEditConsultaData(d => ({ ...d, motivoDeConsulta: e.target.value }))} />
                <label>Aliento Etílico:</label>
                <input value={editConsultaData.alientoEtilico || ''} onChange={e => setEditConsultaData(d => ({ ...d, alientoEtilico: e.target.value }))} />
                <label>Valor AlcoCheck:</label>
                <input value={editConsultaData.valorAlcoCheck || ''} onChange={e => setEditConsultaData(d => ({ ...d, valorAlcoCheck: e.target.value }))} />
                <label>Antecedente Alérgico:</label>
                <input value={editConsultaData.antecedenteAlergico || ''} onChange={e => setEditConsultaData(d => ({ ...d, antecedenteAlergico: e.target.value }))} />
                <label>Antecedente Clínico:</label>
                <input value={editConsultaData.antecedenteClinico || ''} onChange={e => setEditConsultaData(d => ({ ...d, antecedenteClinico: e.target.value }))} />
                <label>Antecedente Ginecológico:</label>
                <input value={editConsultaData.antecedenteGinecologico || ''} onChange={e => setEditConsultaData(d => ({ ...d, antecedenteGinecologico: e.target.value }))} />
                <label>Antecedente Traumatológico:</label>
                <input value={editConsultaData.antecedenteTraumatologico || ''} onChange={e => setEditConsultaData(d => ({ ...d, antecedenteTraumatologico: e.target.value }))} />
                <label>Antecedente Quirúrgico:</label>
                <input value={editConsultaData.antecedenteQuirurgico || ''} onChange={e => setEditConsultaData(d => ({ ...d, antecedenteQuirurgico: e.target.value }))} />
                <label>Antecedente Farmacológico:</label>
                <input value={editConsultaData.antecedenteFarmacoLogico || ''} onChange={e => setEditConsultaData(d => ({ ...d, antecedenteFarmacoLogico: e.target.value }))} />
                <label>Antecedente Psiquiátrico:</label>
                <input value={editConsultaData.antecedentePsiquiatrico || ''} onChange={e => setEditConsultaData(d => ({ ...d, antecedentePsiquiatrico: e.target.value }))} />
                <label>Antecedente Otro:</label>
                <input value={editConsultaData.antecedenteOtro || ''} onChange={e => setEditConsultaData(d => ({ ...d, antecedenteOtro: e.target.value }))} />
                <label>Enfermedad Actual:</label>
                <textarea value={editConsultaData.enfermedadActual || ''} onChange={e => setEditConsultaData(d => ({ ...d, enfermedadActual: e.target.value }))} rows={3} />
                <label>Presión Arterial:</label>
                <input value={editConsultaData.presionArterial || ''} onChange={e => setEditConsultaData(d => ({ ...d, presionArterial: e.target.value }))} />
                <label>Frecuencia Cardíaca:</label>
                <input value={editConsultaData.frecuenciaCardiaca || ''} onChange={e => setEditConsultaData(d => ({ ...d, frecuenciaCardiaca: e.target.value }))} />
                <label>Frecuencia Respiratoria:</label>
                <input value={editConsultaData.frecuenciaRespiratoria || ''} onChange={e => setEditConsultaData(d => ({ ...d, frecuenciaRespiratoria: e.target.value }))} />
                <label>Temperatura Bucal:</label>
                <input value={editConsultaData.temperaturaBucal || ''} onChange={e => setEditConsultaData(d => ({ ...d, temperaturaBucal: e.target.value }))} />
                <label>Temperatura Axilar:</label>
                <input value={editConsultaData.temperaturaAxilar || ''} onChange={e => setEditConsultaData(d => ({ ...d, temperaturaAxilar: e.target.value }))} />
                <label>Peso:</label>
                <input value={editConsultaData.peso || ''} onChange={e => setEditConsultaData(d => ({ ...d, peso: e.target.value }))} />
                <label>Talla:</label>
                <input value={editConsultaData.talla || ''} onChange={e => setEditConsultaData(d => ({ ...d, talla: e.target.value }))} />
                <label>Gaslow Ocular:</label>
                <input value={editConsultaData.gaslowOcular || ''} onChange={e => setEditConsultaData(d => ({ ...d, gaslowOcular: e.target.value }))} />
                <label>Gaslow Verbal:</label>
                <input value={editConsultaData.gaslowVerbal || ''} onChange={e => setEditConsultaData(d => ({ ...d, gaslowVerbal: e.target.value }))} />
                <label>Gaslow Motora:</label>
                <input value={editConsultaData.gaslowMotora || ''} onChange={e => setEditConsultaData(d => ({ ...d, gaslowMotora: e.target.value }))} />
                <label>Gaslow Total:</label>
                <input value={editConsultaData.gaslowTotal || ''} onChange={e => setEditConsultaData(d => ({ ...d, gaslowTotal: e.target.value }))} />
                <label>Reacción Pupila Izquierda:</label>
                <input value={editConsultaData.reaccionPupilaIzq || ''} onChange={e => setEditConsultaData(d => ({ ...d, reaccionPupilaIzq: e.target.value }))} />
                <label>Reacción Pupila Derecha:</label>
                <input value={editConsultaData.reaccionPupilaDer || ''} onChange={e => setEditConsultaData(d => ({ ...d, reaccionPupilaDer: e.target.value }))} />
                <label>Tiempo Llenado Capilar:</label>
                <input value={editConsultaData.tiempoLlenadoCapilar || ''} onChange={e => setEditConsultaData(d => ({ ...d, tiempoLlenadoCapilar: e.target.value }))} />
                <label>Saturación Oxígeno:</label>
                <input value={editConsultaData.saturacionOxigeno || ''} onChange={e => setEditConsultaData(d => ({ ...d, saturacionOxigeno: e.target.value }))} />
                <label>Vía Aérea Obstruida:</label>
                <input value={editConsultaData.viaAereaObstruida || ''} onChange={e => setEditConsultaData(d => ({ ...d, viaAereaObstruida: e.target.value }))} />
                {/* Agrega los checkboxes y demás campos de la misma forma */}
              </div>
              <div style={{ marginTop: 16, display: 'flex', gap: 8 }}>
                <button type="submit" className="revisar-historias-btn">Guardar</button>
                <button type="button" className="revisar-historias-btn revisar-historias-btn-cancel" onClick={() => setEditConsultaIdx(null)}>Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default RevisarHistoriasClinicas;
