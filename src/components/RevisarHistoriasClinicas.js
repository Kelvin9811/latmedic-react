import React, { useEffect, useState } from 'react';
import { getClienteByCedula, upsertClienteByCedula, createConsultaForCedula, listConsultasByCedula, deleteHistoriaClinicaByCedula, updateConsulta } from '../apiCrud';
import ManejoConsulta from './ManejoConsulta';
import './RevisarHistoriasClinicas.css';

const RevisarHistoriasClinicas = () => {
  const [cedulaBusqueda, setCedulaBusqueda] = useState('');
  const [historias, setHistorias] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showPlaceholders, setShowPlaceholders] = useState(false);
  const [editIdx, setEditIdx] = useState(null);
  const [editData, setEditData] = useState({
    nombre: '',
    cedula: '',
    direccionResidenciaHabitual: '',
    barrio: '',
    parroquia: '',
    canton: '',
    provincia: '',
    telefono: '',
    grupoSanguineoYFactorRh: '',
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
    telefonoEmergencia: '',
    antecedenteAlergico: '',
    antecedenteClinico: '',
    antecedenteGinecologico: '',
    antecedenteTraumatologico: '',
    antecedenteQuirurgico: '',
    antecedenteFarmacoLogico: '',
    antecedentePsiquiatrico: '',
    antecedenteOtro: ''
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
    motivoDeConsulta: '',
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
  const [nuevaConsultaData, setNuevaConsultaData] = useState({
    hora: '',
    motivoDeConsulta: '',
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


  React.useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const currentTime = now.toLocaleString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      }).replace(',', ' -');
       handleNuevaConsultaChange('hora', currentTime)
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);
  

    React.useEffect(() => {
      // Actualiza automáticamente gaslowTotal a partir de los tres componentes.
      const ocular = parseInt(nuevaConsultaData.gaslowOcular, 10) || 0;
      const verbal = parseInt(nuevaConsultaData.gaslowVerbal, 10) || 0;
      const motora = parseInt(nuevaConsultaData.gaslowMotora, 10) || 0;
      const total = ocular + verbal + motora;
      // Usamos el handler existente para mantener la consistencia del estado
      handleNuevaConsultaChange('gaslowTotal', total);
    }, [nuevaConsultaData.gaslowOcular, nuevaConsultaData.gaslowVerbal, nuevaConsultaData.gaslowMotora]);
  
  const [showAgregarConsultaDetalle, setShowAgregarConsultaDetalle] = useState(false);

  // Función para mostrar el formulario de agregar consulta
  const handleAgregarConsultaClick = (cedula) => {
    // abrir popup detallado vacío
    setConsultasCedula(cedula || consultasCedula);
    setShowConsultas(true);
    setShowAgregarConsultaDetalle(true);
    setNuevaConsultaData({
      hora: '',
      motivoDeConsulta: '',
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
  };

  // Función para cancelar agregar consulta
  const handleAgregarConsultaCancel = () => {
    setShowConsultas(false);
    setShowAgregarConsultaDetalle(false);
  };

  // Función para cambiar los campos del formulario de nueva consulta
  const handleNuevaConsultaChange = (field, value) => {
    setNuevaConsultaData(prev => ({ ...prev, [field]: value }));
  };

  // Función para guardar la nueva consulta
  const handleAgregarConsultaSave = async () => {
    setLoadingConsulta(true);
    try {
      const nueva = await createConsultaForCedula(consultasCedula, { ...nuevaConsultaData });
      setConsultas(con => [{ ...nueva }, ...con]);
      setShowConsultas(false);
      setShowAgregarConsultaDetalle(false);
    } catch {
      // error opcional
    }
    setLoadingConsulta(false);
  };

  const handleBuscar = async (e) => {
    e.preventDefault();
    setShowPlaceholders(true);
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
    } finally {
      setLoading(false);
      setShowPlaceholders(false);
    }
  };

  // Render de placeholders que imitan la forma de una consulta (vacíos)
  const renderPlaceholders = () => {
    const phStyle = {
      marginBottom: 32,
      border: '1px solid #e0e0e0',
      borderRadius: 8,
      padding: 16,
      background: '#fff',
      opacity: 0.9
    };
    const greyBar = { height: 14, background: '#e8e8e8', borderRadius: 4, marginBottom: 8 };
    const greyBox = { height: 60, background: '#f0f0f0', borderRadius: 6, marginBottom: 8 };

    return (
      <div className="revisar-historias-placeholder-lista" style={{ marginTop: 12 }}>
        {[0].map(i => (
          <div key={i} style={phStyle}>
            <div style={{ marginBottom: 12 }}>
              <div style={{ ...greyBar, width: '35%' }} />
              <div style={{ ...greyBar, width: '60%' }} />
              <div style={{ ...greyBar, width: '45%' }} />
              <div style={{ ...greyBar, width: '30%' }} />
            </div>
            <div style={{ marginTop: 8, background: '#f5f5f5', padding: 12, borderRadius: 8 }}>
              <div style={{ ...greyBox, width: '100%' }} />
              <div style={{ ...greyBar, width: '50%' }} />
            </div>
          </div>
        ))}
      </div>
    );
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
    try {
      const updated = await updateConsulta(editConsultaData);
      // Actualiza la lista de consultas mostrada en el popup (si existe)
      setConsultas(prev => prev.map(c => (c.id === updated.id ? updated : c)));
      // También actualizar dentro de historias (si la consulta aparece allí)
      setHistorias(prev => prev.map(h => ({
        ...h,
        consultas: Array.isArray(h.consultas) ? h.consultas.map(c => (c.id === updated.id ? updated : c)) : h.consultas
      })));
      setEditConsultaIdx(null);
    } catch (e) {
      // error opcional: puedes agregar notificación
      console.error('Error actualizando consulta', e);
    } finally {
      setLoading(false);
    }
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
      {showPlaceholders ? renderPlaceholders() : (loading && <p className="revisar-historias-loading">Cargando...</p>)}
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
              <div className="revisar-historias-consultas" style={{ marginTop: 16, background: '#f5f5f5', padding: 16, borderRadius: 8, border: '1px solid #c5c5c5ff' }}>
                <h4 style={{ color: '#222', margin: '8px 0' }}>Consultas</h4>
                {Array.isArray(h.consultas) && h.consultas.length === 0 ? (
                  <p style={{ color: '#000' }}>No hay consultas para este paciente.</p>
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
                <button className="revisar-historias-btn revisar-historias-btn-agregar" onClick={() => handleAgregarConsultaClick(h.cedula)}>Agregar consulta</button>
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
          <div
            className="revisar-historias-popup-content"
            style={{
              maxHeight: '90vh',
              width: '90vw',
              maxWidth: 1000,
              margin: '5vh auto',
              background: '#fff',
              borderRadius: 12,
              boxShadow: '0 2px 16px rgba(0,0,0,0.15)',
              padding: 24,
              position: 'relative',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <div style={{ overflowY: 'auto', paddingRight: 8 , paddingLeft: 8}}>
              <h4 style={{ textAlign: 'center', margin: '0 0 16px 0', fontWeight: 'bold' }}>Editar Historia Clínica</h4>
              <form id="editHistoriaForm" onSubmit={e => { e.preventDefault(); handleEditSave(); }}>
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
                  <label>Grupo Sanguíneo y Factor RH:</label>
                  <input value={editData.grupoSanguineoYFactorRh || ''} onChange={e => handleEditChange('grupoSanguineoYFactorRh', e.target.value)} />
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
                  <label>Teléfono de emergencia:</label>
                  <input value={editData.telefonoEmergencia || ''} onChange={e => handleEditChange('telefonoEmergencia', e.target.value)} />
                  <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '24px 0 8px 0' }} />
                  <h4 style={{ color: '#222', fontWeight: 'bold', margin: 8 }}>Antecedentes personales y familiares</h4>
                  <label>Antecedente Alérgico:</label>
                  <input value={editData.antecedenteAlergico || ''} onChange={e => handleEditChange('antecedenteAlergico', e.target.value)} />
                  <label>Antecedente Clínico:</label>
                  <input value={editData.antecedenteClinico || ''} onChange={e => handleEditChange('antecedenteClinico', e.target.value)} />
                  <label>Antecedente Ginecológico:</label>
                  <input value={editData.antecedenteGinecologico || ''} onChange={e => handleEditChange('antecedenteGinecologico', e.target.value)} />
                  <label>Antecedente Traumatológico:</label>
                  <input value={editData.antecedenteTraumatologico || ''} onChange={e => handleEditChange('antecedenteTraumatologico', e.target.value)} />
                  <label>Antecedente Quirúrgico:</label>
                  <input value={editData.antecedenteQuirurgico || ''} onChange={e => handleEditChange('antecedenteQuirurgico', e.target.value)} />
                  <label>Antecedente Farmacológico:</label>
                  <input value={editData.antecedenteFarmacoLogico || ''} onChange={e => handleEditChange('antecedenteFarmacoLogico', e.target.value)} />
                  <label>Antecedente Psiquiátrico:</label>
                  <input value={editData.antecedentePsiquiatrico || ''} onChange={e => handleEditChange('antecedentePsiquiatrico', e.target.value)} />
                  <label>Antecedente Otro:</label>
                  <input value={editData.antecedenteOtro || ''} onChange={e => handleEditChange('antecedenteOtro', e.target.value)} />
                </div>
              </form>
            </div>

            <div style={{ position: 'sticky', background: '#fff', padding: '10px', display: 'flex', justifyContent: 'center', gap: 20, border: '10px solid #fff'}}>
              <button type="submit" form="editHistoriaForm" className="revisar-historias-btn">Guardar</button>
              <button type="button" className="revisar-historias-btn revisar-historias-btn-cancel" onClick={() => setEditIdx(null)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
      {editConsultaIdx && (
        <div className="revisar-historias-popup-overlay" style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 1000, background: 'rgba(0,0,0,0.3)' }}>
          <div className="revisar-historias-popup-content" style={{ maxHeight: '90vh', width: '90vw', maxWidth: 1000, margin: '5vh auto', background: '#fff', borderRadius: 12, boxShadow: '0 2px 16px rgba(0,0,0,0.15)', padding: 24, position: 'relative', display: 'flex', flexDirection: 'column' }}>
            <div style={{ overflowY: 'auto', paddingRight: 8 }}>
              <h4 style={{ textAlign: 'center', margin: '0 0 16px 0', fontWeight: 'bold'}}>Editar Consulta</h4>
              <form id="editConsultaForm" onSubmit={e => { e.preventDefault(); handleSaveEditConsulta(); }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <h4 style={{ color: '#222', fontWeight: 'bold', margin: 8 }}>Inicio de Atención y Motivo</h4>
                  <label>Hora:</label>
                  <input type="text" value={editConsultaData.hora || ''} disabled style={{ color: '#222' }} />
                  <label>Motivo de Consulta:</label>
                  <input type="text" value={editConsultaData.motivoDeConsulta || ''} onChange={e => setEditConsultaData(d => ({ ...d, motivoDeConsulta: e.target.value }))} />
                  <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '16px 0 24px 0' }} />
                  <h4 style={{ color: '#222', fontWeight: 'bold', margin: 8 }}>Enfermedad Actual y Revisión de Sistemas</h4>
                  <label>Enfermedad Actual:</label>
                  <textarea value={editConsultaData.enfermedadActual || ''} onChange={e => setEditConsultaData(d => ({ ...d, enfermedadActual: e.target.value }))} rows={3} />
                  <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '16px 0 24px 0' }} />
                  <h4 style={{ color: '#222', fontWeight: 'bold', margin: 8 }}>Signos Vitales, Mediciones y Valores</h4>
                  <div style={{ display: 'flex', gap: 12, alignItems: 'flex-end' }}>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <label>Presión Arterial:</label>
                      <input type="text" value={editConsultaData.presionArterial || ''} onChange={e => setEditConsultaData(d => ({ ...d, presionArterial: e.target.value }))} />
                    </div>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <label>Frecuencia Cardíaca:</label>
                      <input type="text" value={editConsultaData.frecuenciaCardiaca || ''} onChange={e => setEditConsultaData(d => ({ ...d, frecuenciaCardiaca: e.target.value }))} />
                    </div>
                  </div>
                  <label>Frecuencia Respiratoria:</label>
                  <input type="text" value={editConsultaData.frecuenciaRespiratoria || ''} onChange={e => setEditConsultaData(d => ({ ...d, frecuenciaRespiratoria: e.target.value }))} />
                  <div style={{ display: 'flex', gap: 12, alignItems: 'flex-end' }}>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <label>Temperatura Bucal:</label>
                      <input type="text" value={editConsultaData.temperaturaBucal || ''} onChange={e => setEditConsultaData(d => ({ ...d, temperaturaBucal: e.target.value }))} />
                    </div>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <label>Temperatura Axilar:</label>
                      <input type="text" value={editConsultaData.temperaturaAxilar || ''} onChange={e => setEditConsultaData(d => ({ ...d, temperaturaAxilar: e.target.value }))} />
                    </div>
                  </div>   
                  <div style={{ display: 'flex', gap: 12, alignItems: 'flex-end' }}>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <label>Peso:</label>
                      <input type="text" value={editConsultaData.peso || ''} onChange={e => setEditConsultaData(d => ({ ...d, peso: e.target.value }))} />
                    </div>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <label>Talla:</label>
                      <input type="text" value={editConsultaData.talla || ''} onChange={e => setEditConsultaData(d => ({ ...d, talla: e.target.value }))} />
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 12, alignItems: 'flex-end' }}>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <label style={{ marginBottom: 6 }}>Glasgow Ocular</label>
                      <input type="number" value={editConsultaData.gaslowOcular || ''} onChange={e => setEditConsultaData(d => ({ ...d, gaslowOcular: e.target.value }))} />
                    </div>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <label style={{ marginBottom: 6 }}>Glasgow Verbal</label>
                      <input type="number" value={editConsultaData.gaslowVerbal || ''} onChange={e => setEditConsultaData(d => ({ ...d, gaslowVerbal: e.target.value }))} />
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 12, alignItems: 'flex-end' }}>

                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <label style={{ marginBottom: 6 }}>Glasgow Motora</label>
                      <input type="number" value={editConsultaData.gaslowMotora || ''} onChange={e => setEditConsultaData(d => ({ ...d, gaslowMotora: e.target.value }))} />
                    </div>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <label style={{ marginBottom: 6 }}>Total</label>
                      <input type="number" value={editConsultaData.gaslowTotal || ''} readOnly />
                    </div>
                  </div>
                  <label>Reacción Pupila Izquierda:</label>
                  <input type="text" value={editConsultaData.reaccionPupilaIzq || ''} onChange={e => setEditConsultaData(d => ({ ...d, reaccionPupilaIzq: e.target.value }))} />
                  <label>Reacción Pupila Derecha:</label>
                  <input type="text" value={editConsultaData.reaccionPupilaDer || ''} onChange={e => setEditConsultaData(d => ({ ...d, reaccionPupilaDer: e.target.value }))} />
                  <label>Tiempo Llenado Capilar:</label>
                  <input type="text" value={editConsultaData.tiempoLlenadoCapilar || ''} onChange={e => setEditConsultaData(d => ({ ...d, tiempoLlenadoCapilar: e.target.value }))} />
                  <label>Saturación Oxígeno:</label>
                  <input type="text" value={editConsultaData.saturacionOxigeno || ''} onChange={e => setEditConsultaData(d => ({ ...d, saturacionOxigeno: e.target.value }))} />

                  <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '16px 0 24px 0' }} />
                  <h4 style={{ color: '#222', fontWeight: 'bold', margin: 8 }}>Examen Físico y Diagnóstico</h4>
                  <label>Vía Aérea Obstruida:</label>
                  <input type="text" value={editConsultaData.viaAereaObstruida || ''} onChange={e => setEditConsultaData(d => ({ ...d, viaAereaObstruida: e.target.value }))} />

                  {/* NUEVOS CAMPOS - Examen Físico */}
                  <label>Cabeza:</label>
                  <input value={editConsultaData.cabeza || ''} onChange={e => setEditConsultaData(d => ({ ...d, cabeza: e.target.value }))} />
                  <label>Cuello:</label>
                  <input value={editConsultaData.cuello || ''} onChange={e => setEditConsultaData(d => ({ ...d, cuello: e.target.value }))} />
                  <label>Tórax:</label>
                  <input value={editConsultaData.torax || ''} onChange={e => setEditConsultaData(d => ({ ...d, torax: e.target.value }))} />
                  <label>Abdomen:</label>
                  <input value={editConsultaData.abdomen || ''} onChange={e => setEditConsultaData(d => ({ ...d, abdomen: e.target.value }))} />
                  <label>Columna:</label>
                  <input value={editConsultaData.columna || ''} onChange={e => setEditConsultaData(d => ({ ...d, columna: e.target.value }))} />
                  <label>Pelvis:</label>
                  <input value={editConsultaData.pelvis || ''} onChange={e => setEditConsultaData(d => ({ ...d, pelvis: e.target.value }))} />
                  <label>Extremidades:</label>
                  <input value={editConsultaData.extremidades || ''} onChange={e => setEditConsultaData(d => ({ ...d, extremidades: e.target.value }))} />

                  <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '24px 0 8px 0' }} />
                  <h4 style={{ color: '#222', fontWeight: 'bold', margin: 8 }}>Lesiones / Traumatismos</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <label>Herida Penetrante:</label>
                    <input value={editConsultaData.heridaPenetrante || ''} onChange={e => setEditConsultaData(d => ({ ...d, heridaPenetrante: e.target.value }))} />
                    <label>Herida Cortante:</label>
                    <input value={editConsultaData.heridaCortante || ''} onChange={e => setEditConsultaData(d => ({ ...d, heridaCortante: e.target.value }))} />
                    <label>Fractura Expuesta:</label>
                    <input value={editConsultaData.fracturaExpuesta || ''} onChange={e => setEditConsultaData(d => ({ ...d, fracturaExpuesta: e.target.value }))} />
                    <label>Fractura Cerrada:</label>
                    <input value={editConsultaData.fracturaCerrada || ''} onChange={e => setEditConsultaData(d => ({ ...d, fracturaCerrada: e.target.value }))} />
                    <label>Cuerpo Extraño:</label>
                    <input value={editConsultaData.cuerpoExtrano || ''} onChange={e => setEditConsultaData(d => ({ ...d, cuerpoExtrano: e.target.value }))} />
                    <label>Hemorragia:</label>
                    <input value={editConsultaData.hemorragia || ''} onChange={e => setEditConsultaData(d => ({ ...d, hemorragia: e.target.value }))} />
                    <label>Mordedura:</label>
                    <input value={editConsultaData.mordedura || ''} onChange={e => setEditConsultaData(d => ({ ...d, mordedura: e.target.value }))} />
                    <label>Picadura:</label>
                    <input value={editConsultaData.picadura || ''} onChange={e => setEditConsultaData(d => ({ ...d, picadura: e.target.value }))} />
                    <label>Excoriación:</label>
                    <input value={editConsultaData.excoriacion || ''} onChange={e => setEditConsultaData(d => ({ ...d, excoriacion: e.target.value }))} />
                    <label>Deformidad o Masa:</label>
                    <input value={editConsultaData.deformidadOMasa || ''} onChange={e => setEditConsultaData(d => ({ ...d, deformidadOMasa: e.target.value }))} />
                    <label>Hematoma:</label>
                    <input value={editConsultaData.hematoma || ''} onChange={e => setEditConsultaData(d => ({ ...d, hematoma: e.target.value }))} />
                    <label>Eritema / Inflamación:</label>
                    <input value={editConsultaData.eritemaInflamacion || ''} onChange={e => setEditConsultaData(d => ({ ...d, eritemaInflamacion: e.target.value }))} />
                    <label>Luxación / Esguince:</label>
                    <input value={editConsultaData.luxacionEsguince || ''} onChange={e => setEditConsultaData(d => ({ ...d, luxacionEsguince: e.target.value }))} />
                    <label>Quemadura:</label>
                    <input value={editConsultaData.quemadura || ''} onChange={e => setEditConsultaData(d => ({ ...d, quemadura: e.target.value }))} />
                  </div>

                  <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '24px 0 8px 0' }} />
                  <h4 style={{ color: '#222', fontWeight: 'bold', margin: 8 }}>Exámenes solicitados</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <input type="checkbox" checked={!!editConsultaData.solicitudExamenBiometria} onChange={e => setEditConsultaData(d => ({ ...d, solicitudExamenBiometria: e.target.checked }))} /> Examen Biometría
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <input type="checkbox" checked={!!editConsultaData.solicitudExamenUroanalisis} onChange={e => setEditConsultaData(d => ({ ...d, solicitudExamenUroanalisis: e.target.checked }))} /> Examen Uroanálisis
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <input type="checkbox" checked={!!editConsultaData.solicitudExamenQuimicaSanguinea} onChange={e => setEditConsultaData(d => ({ ...d, solicitudExamenQuimicaSanguinea: e.target.checked }))} /> Examen Química Sanguínea
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <input type="checkbox" checked={!!editConsultaData.solicitudExamenElectrolitos} onChange={e => setEditConsultaData(d => ({ ...d, solicitudExamenElectrolitos: e.target.checked }))} /> Examen Electrolitos
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <input type="checkbox" checked={!!editConsultaData.solicitudExamenGasometria} onChange={e => setEditConsultaData(d => ({ ...d, solicitudExamenGasometria: e.target.checked }))} /> Examen Gasometría
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <input type="checkbox" checked={!!editConsultaData.solicitudExamenElectrocardiograma} onChange={e => setEditConsultaData(d => ({ ...d, solicitudExamenElectrocardiograma: e.target.checked }))} /> Examen Electrocardiograma
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <input type="checkbox" checked={!!editConsultaData.solicitudExamenEndoscopia} onChange={e => setEditConsultaData(d => ({ ...d, solicitudExamenEndoscopia: e.target.checked }))} /> Examen Endoscopia
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <input type="checkbox" checked={!!editConsultaData.solicitudExamenRxTorax} onChange={e => setEditConsultaData(d => ({ ...d, solicitudExamenRxTorax: e.target.checked }))} /> Examen Rx Tórax
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <input type="checkbox" checked={!!editConsultaData.solicitudExamenRxAbdomen} onChange={e => setEditConsultaData(d => ({ ...d, solicitudExamenRxAbdomen: e.target.checked }))} /> Examen Rx Abdomen
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <input type="checkbox" checked={!!editConsultaData.solicitudExamenRxOsea} onChange={e => setEditConsultaData(d => ({ ...d, solicitudExamenRxOsea: e.target.checked }))} /> Examen Rx Ósea
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <input type="checkbox" checked={!!editConsultaData.solicitudExamenTomografia} onChange={e => setEditConsultaData(d => ({ ...d, solicitudExamenTomografia: e.target.checked }))} /> Examen Tomografía
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <input type="checkbox" checked={!!editConsultaData.solicitudExamenResonancia} onChange={e => setEditConsultaData(d => ({ ...d, solicitudExamenResonancia: e.target.checked }))} /> Examen Resonancia
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <input type="checkbox" checked={!!editConsultaData.solicitudExamenEcografiaPelvica} onChange={e => setEditConsultaData(d => ({ ...d, solicitudExamenEcografiaPelvica: e.target.checked }))} /> Examen Ecografía Pélvica
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <input type="checkbox" checked={!!editConsultaData.solicitudExamenEcografiaAbdomen} onChange={e => setEditConsultaData(d => ({ ...d, solicitudExamenEcografiaAbdomen: e.target.checked }))} /> Examen Ecografía Abdomen
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <input type="checkbox" checked={!!editConsultaData.solicitudExamenInterconsulta} onChange={e => setEditConsultaData(d => ({ ...d, solicitudExamenInterconsulta: e.target.checked }))} /> Interconsulta
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <input type="checkbox" checked={!!editConsultaData.solicitudExamenOtros} onChange={e => setEditConsultaData(d => ({ ...d, solicitudExamenOtros: e.target.checked }))} /> Otros Exámenes
                    </label>
                  </div>

                  <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '16px 0 24px 0' }} />
                  <h4 style={{ color: '#222', fontWeight: 'bold', margin: 8 }}>Diagnósticos</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <label>Diagnóstico de Ingreso:</label>
                    <input value={editConsultaData.diagnosticodeIngreso || ''} onChange={e => setEditConsultaData(d => ({ ...d, diagnosticodeIngreso: e.target.value }))} />
                    <label>Diagnóstico de Alta:</label>
                    <input value={editConsultaData.diagnosticodeAltade || ''} onChange={e => setEditConsultaData(d => ({ ...d, diagnosticodeAltade: e.target.value }))} />
                    <label>Plan de Tratamiento e Indicaciones:</label>
                    <textarea value={editConsultaData.planDeTratamientoIndicaciones || ''} onChange={e => setEditConsultaData(d => ({ ...d, planDeTratamientoIndicaciones: e.target.value }))} rows={3} />
                    <label>Plan de Tratamiento (Medicamentos):</label>
                    <textarea value={editConsultaData.planDeTratamientoMedicamentos || ''} onChange={e => setEditConsultaData(d => ({ ...d, planDeTratamientoMedicamentos: e.target.value }))} rows={3} />
                  </div>
                </div>
              </form>
            </div>

            <div style={{ position: 'sticky', bottom: 0, background: '#fff', padding: '12px 0', display: 'flex', justifyContent: 'center', gap: 8, borderTop: '1px solid #e0e0e0' }}>
              <button type="submit" form="editConsultaForm" className="revisar-historias-btn">Guardar</button>
              <button type="button" className="revisar-historias-btn revisar-historias-btn-cancel" onClick={() => setEditConsultaIdx(null)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
      {showAgregarConsultaDetalle && (
        <div className="revisar-historias-popup-overlay" style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 1100, background: 'rgba(0,0,0,0.3)' }}>
          <div
            className="revisar-historias-popup-content"
            style={{
              maxHeight: '90vh',
              overflowY: 'auto',
              width: '90vw',
              maxWidth: 1000,
              margin: '5vh auto',
              background: '#fff',
              borderRadius: 12,
              boxShadow: '0 2px 16px rgba(0,0,0,0.15)',
              padding: 24,
              position: 'relative',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <div style={{ overflowY: 'auto', paddingRight: 8 }}>
              <h4 style={{ textAlign: 'center', margin: '0 0 16px 0', fontWeight: 'bold' }}>Agregar Consulta</h4>
              <form id="addConsultaForm" onSubmit={e => { e.preventDefault(); handleAgregarConsultaSave(); }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <h4 style={{ color: '#222', fontWeight: 'bold', margin: 8 }}>Inicio de Atención y Motivo</h4>
                  <label>Hora:</label>
                  <input type="text" value={nuevaConsultaData.hora || ''} onChange={e => handleNuevaConsultaChange('hora', e.target.value)} readOnly={true}/>
                  <label>Motivo de Consulta:</label>
                  <input type="text" value={nuevaConsultaData.motivoDeConsulta || ''} onChange={e => handleNuevaConsultaChange('motivoDeConsulta', e.target.value)} />
                  <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '16px 0 24px 0' }} />
                  <h4 style={{ color: '#222', fontWeight: 'bold', margin: 8 }}>Enfermedad Actual y Revisión de Sistemas</h4>
                  <label>Enfermedad Actual:</label>
                  <textarea value={nuevaConsultaData.enfermedadActual || ''} onChange={e => handleNuevaConsultaChange('enfermedadActual', e.target.value)} rows={3} />
                  <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '16px 0 24px 0' }} />
                  <h4 style={{ color: '#222', fontWeight: 'bold', margin: 8 }}>Signos Vitales, Mediciones y Valores</h4>
                  <div style={{ display: 'flex', gap: 12, alignItems: 'flex-end' }}>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <label>Presión Arterial:</label>
                      <input type="text" value={nuevaConsultaData.presionArterial || ''} onChange={e => handleNuevaConsultaChange('presionArterial', e.target.value)} />
                    </div>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <label>Frecuencia Cardíaca:</label>
                      <input type="text" value={nuevaConsultaData.frecuenciaCardiaca || ''} onChange={e => handleNuevaConsultaChange('frecuenciaCardiaca', e.target.value)} />
                    </div>
                  </div>
                  <label>Frecuencia Respiratoria:</label>
                  <input type="text" value={nuevaConsultaData.frecuenciaRespiratoria || ''} onChange={e => handleNuevaConsultaChange('frecuenciaRespiratoria', e.target.value)} />
                  <div style={{ display: 'flex', gap: 12, alignItems: 'flex-end' }}>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <label>Temperatura Bucal:</label>
                      <input type="text" value={nuevaConsultaData.temperaturaBucal || ''} onChange={e => handleNuevaConsultaChange('temperaturaBucal', e.target.value)} />
                    </div>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <label>Temperatura Axilar:</label>
                      <input type="text" value={nuevaConsultaData.temperaturaAxilar || ''} onChange={e => handleNuevaConsultaChange('temperaturaAxilar', e.target.value)} />
                    </div>
                  </div>   
                  <div style={{ display: 'flex', gap: 12, alignItems: 'flex-end' }}>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <label>Peso:</label>
                      <input type="text" value={nuevaConsultaData.peso || ''} onChange={e => handleNuevaConsultaChange('peso', e.target.value)} />
                    </div>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <label>Talla:</label>
                      <input type="text" value={nuevaConsultaData.talla || ''} onChange={e => handleNuevaConsultaChange('talla', e.target.value)} />
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 12, alignItems: 'flex-end' }}>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <label style={{ marginBottom: 6 }}>Glasgow Ocular</label>
                      <input type="number" value={nuevaConsultaData.gaslowOcular || ''} onChange={e => handleNuevaConsultaChange('gaslowOcular', e.target.value)} />
                    </div>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <label style={{ marginBottom: 6 }}>Glasgow Verbal</label>
                      <input type="number" value={nuevaConsultaData.gaslowVerbal || ''} onChange={e => handleNuevaConsultaChange('gaslowVerbal', e.target.value)} />
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 12, alignItems: 'flex-end' }}>

                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <label style={{ marginBottom: 6 }}>Glasgow Motora</label>
                      <input type="number" value={nuevaConsultaData.gaslowMotora || ''} onChange={e => handleNuevaConsultaChange('gaslowMotora', e.target.value)} />
                    </div>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <label style={{ marginBottom: 6 }}>Total</label>
                      <input type="number" value={nuevaConsultaData.gaslowTotal || ''} readOnly />                      
                    </div>
                  </div>
                  <label>Reacción Pupila Izquierda:</label>
                  <input type="text" value={nuevaConsultaData.reaccionPupilaIzq || ''} onChange={e => handleNuevaConsultaChange('reaccionPupilaIzq', e.target.value)} />
                  <label>Reacción Pupila Derecha:</label>
                  <input type="text" value={nuevaConsultaData.reaccionPupilaDer || ''} onChange={e => handleNuevaConsultaChange('reaccionPupilaDer', e.target.value)} />
                  <label>Tiempo Llenado Capilar:</label>
                  <input type="text" value={nuevaConsultaData.tiempoLlenadoCapilar || ''} onChange={e => handleNuevaConsultaChange('tiempoLlenadoCapilar', e.target.value)} />
                  <label>Saturación Oxígeno:</label>
                  <input type="text" value={nuevaConsultaData.saturacionOxigeno || ''} onChange={e => handleNuevaConsultaChange('saturacionOxigeno', e.target.value)} />
                  <label>Vía Aérea Obstruida:</label>
                  <input type="text" value={nuevaConsultaData.viaAereaObstruida || ''} onChange={e => handleNuevaConsultaChange('viaAereaObstruida', e.target.value)} />

                  {/* NUEVOS CAMPOS - Examen Físico */}
                  <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '16px 0 24px 0' }} />
                  <h4 style={{ color: '#222', fontWeight: 'bold', margin: 8 }}>Examen Físico</h4>
                  <label>Cabeza:</label>
                  <input value={nuevaConsultaData.cabeza || ''} onChange={e => handleNuevaConsultaChange('cabeza', e.target.value)} />
                  <label>Cuello:</label>
                  <input value={nuevaConsultaData.cuello || ''} onChange={e => handleNuevaConsultaChange('cuello', e.target.value)} />
                  <label>Tórax:</label>
                  <input value={nuevaConsultaData.torax || ''} onChange={e => handleNuevaConsultaChange('torax', e.target.value)} />
                  <label>Abdomen:</label>
                  <input value={nuevaConsultaData.abdomen || ''} onChange={e => handleNuevaConsultaChange('abdomen', e.target.value)} />
                  <label>Columna:</label>
                  <input value={nuevaConsultaData.columna || ''} onChange={e => handleNuevaConsultaChange('columna', e.target.value)} />
                  <label>Pelvis:</label>
                  <input value={nuevaConsultaData.pelvis || ''} onChange={e => handleNuevaConsultaChange('pelvis', e.target.value)} />
                  <label>Extremidades:</label>
                  <input value={nuevaConsultaData.extremidades || ''} onChange={e => handleNuevaConsultaChange('extremidades', e.target.value)} />

                  <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '24px 0 8px 0' }} />
                  <h4 style={{ color: '#222', fontWeight: 'bold', margin: 8 }}>Lesiones / Traumatismos</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <label>Herida Penetrante:</label>
                    <input value={nuevaConsultaData.heridaPenetrante || ''} onChange={e => handleNuevaConsultaChange('heridaPenetrante', e.target.value)} />
                    <label>Herida Cortante:</label>
                    <input value={nuevaConsultaData.heridaCortante || ''} onChange={e => handleNuevaConsultaChange('heridaCortante', e.target.value)} />
                    <label>Fractura Expuesta:</label>
                    <input value={nuevaConsultaData.fracturaExpuesta || ''} onChange={e => handleNuevaConsultaChange('fracturaExpuesta', e.target.value)} />
                    <label>Fractura Cerrada:</label>
                    <input value={nuevaConsultaData.fracturaCerrada || ''} onChange={e => handleNuevaConsultaChange('fracturaCerrada', e.target.value)} />
                    <label>Cuerpo Extraño:</label>
                    <input value={nuevaConsultaData.cuerpoExtrano || ''} onChange={e => handleNuevaConsultaChange('cuerpoExtrano', e.target.value)} />
                    <label>Hemorragia:</label>
                    <input value={nuevaConsultaData.hemorragia || ''} onChange={e => handleNuevaConsultaChange('hemorragia', e.target.value)} />
                    <label>Mordedura:</label>
                    <input value={nuevaConsultaData.mordedura || ''} onChange={e => handleNuevaConsultaChange('mordedura', e.target.value)} />
                    <label>Picadura:</label>
                    <input value={nuevaConsultaData.picadura || ''} onChange={e => handleNuevaConsultaChange('picadura', e.target.value)} />
                    <label>Excoriación:</label>
                    <input value={nuevaConsultaData.excoriacion || ''} onChange={e => handleNuevaConsultaChange('excoriacion', e.target.value)} />
                    <label>Deformidad o Masa:</label>
                    <input value={nuevaConsultaData.deformidadOMasa || ''} onChange={e => handleNuevaConsultaChange('deformidadOMasa', e.target.value)} />
                    <label>Hematoma:</label>
                    <input value={nuevaConsultaData.hematoma || ''} onChange={e => handleNuevaConsultaChange('hematoma', e.target.value)} />
                    <label>Eritema / Inflamación:</label>
                    <input value={nuevaConsultaData.eritemaInflamacion || ''} onChange={e => handleNuevaConsultaChange('eritemaInflamacion', e.target.value)} />
                    <label>Luxación / Esguince:</label>
                    <input value={nuevaConsultaData.luxacionEsguince || ''} onChange={e => handleNuevaConsultaChange('luxacionEsguince', e.target.value)} />
                    <label>Quemadura:</label>
                    <input value={nuevaConsultaData.quemadura || ''} onChange={e => handleNuevaConsultaChange('quemadura', e.target.value)} />
                  </div>

                  <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '24px 0 8px 0' }} />
                  <h4 style={{ color: '#222', fontWeight: 'bold', margin: 8 }}>Exámenes solicitados</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <input type="checkbox" checked={!!nuevaConsultaData.solicitudExamenBiometria} onChange={e => setNuevaConsultaData(d => ({ ...d, solicitudExamenBiometria: e.target.checked }))} /> Examen Biometría
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <input type="checkbox" checked={!!nuevaConsultaData.solicitudExamenUroanalisis} onChange={e => setNuevaConsultaData(d => ({ ...d, solicitudExamenUroanalisis: e.target.checked }))} /> Examen Uroanálisis
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <input type="checkbox" checked={!!nuevaConsultaData.solicitudExamenQuimicaSanguinea} onChange={e => setNuevaConsultaData(d => ({ ...d, solicitudExamenQuimicaSanguinea: e.target.checked }))} /> Examen Química Sanguínea
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <input type="checkbox" checked={!!nuevaConsultaData.solicitudExamenElectrolitos} onChange={e => setNuevaConsultaData(d => ({ ...d, solicitudExamenElectrolitos: e.target.checked }))} /> Examen Electrolitos
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <input type="checkbox" checked={!!nuevaConsultaData.solicitudExamenGasometria} onChange={e => setNuevaConsultaData(d => ({ ...d, solicitudExamenGasometria: e.target.checked }))} /> Examen Gasometría
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <input type="checkbox" checked={!!nuevaConsultaData.solicitudExamenElectrocardiograma} onChange={e => setNuevaConsultaData(d => ({ ...d, solicitudExamenElectrocardiograma: e.target.checked }))} /> Examen Electrocardiograma
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <input type="checkbox" checked={!!nuevaConsultaData.solicitudExamenEndoscopia} onChange={e => setNuevaConsultaData(d => ({ ...d, solicitudExamenEndoscopia: e.target.checked }))} /> Examen Endoscopia
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <input type="checkbox" checked={!!nuevaConsultaData.solicitudExamenRxTorax} onChange={e => setNuevaConsultaData(d => ({ ...d, solicitudExamenRxTorax: e.target.checked }))} /> Examen Rx Tórax
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <input type="checkbox" checked={!!nuevaConsultaData.solicitudExamenRxAbdomen} onChange={e => setNuevaConsultaData(d => ({ ...d, solicitudExamenRxAbdomen: e.target.checked }))} /> Examen Rx Abdomen
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <input type="checkbox" checked={!!nuevaConsultaData.solicitudExamenRxOsea} onChange={e => setNuevaConsultaData(d => ({ ...d, solicitudExamenRxOsea: e.target.checked }))} /> Examen Rx Ósea
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <input type="checkbox" checked={!!nuevaConsultaData.solicitudExamenTomografia} onChange={e => setNuevaConsultaData(d => ({ ...d, solicitudExamenTomografia: e.target.checked }))} /> Examen Tomografía
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <input type="checkbox" checked={!!nuevaConsultaData.solicitudExamenResonancia} onChange={e => setNuevaConsultaData(d => ({ ...d, solicitudExamenResonancia: e.target.checked }))} /> Examen Resonancia
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <input type="checkbox" checked={!!nuevaConsultaData.solicitudExamenEcografiaPelvica} onChange={e => setNuevaConsultaData(d => ({ ...d, solicitudExamenEcografiaPelvica: e.target.checked }))} /> Examen Ecografía Pélvica
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <input type="checkbox" checked={!!nuevaConsultaData.solicitudExamenEcografiaAbdomen} onChange={e => setNuevaConsultaData(d => ({ ...d, solicitudExamenEcografiaAbdomen: e.target.checked }))} /> Examen Ecografía Abdomen
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <input type="checkbox" checked={!!nuevaConsultaData.solicitudExamenInterconsulta} onChange={e => setNuevaConsultaData(d => ({ ...d, solicitudExamenInterconsulta: e.target.checked }))} /> Interconsulta
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <input type="checkbox" checked={!!nuevaConsultaData.solicitudExamenOtros} onChange={e => setNuevaConsultaData(d => ({ ...d, solicitudExamenOtros: e.target.checked }))} /> Otros Exámenes
                    </label>
                  </div>

                  <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '16px 0 24px 0' }} />
                  <h4 style={{ color: '#222', fontWeight: 'bold', margin: 8 }}>Diagnósticos</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <label>Diagnóstico de Ingreso:</label>
                    <input value={nuevaConsultaData.diagnosticodeIngreso || ''} onChange={e => setNuevaConsultaData(d => ({ ...d, diagnosticodeIngreso: e.target.value }))} />
                    <label>Diagnóstico de Alta:</label>
                    <input value={nuevaConsultaData.diagnosticodeAltade || ''} onChange={e => setNuevaConsultaData(d => ({ ...d, diagnosticodeAltade: e.target.value }))} />
                    <label>Plan de Tratamiento e Indicaciones:</label>
                    <textarea value={nuevaConsultaData.planDeTratamientoIndicaciones || ''} onChange={e => setNuevaConsultaData(d => ({ ...d, planDeTratamientoIndicaciones: e.target.value }))} rows={3} />
                    <label>Plan de Tratamiento (Medicamentos):</label>
                    <textarea value={nuevaConsultaData.planDeTratamientoMedicamentos || ''} onChange={e => setNuevaConsultaData(d => ({ ...d, planDeTratamientoMedicamentos: e.target.value }))} rows={3} />
                  </div>
                </div>
              </form>
            </div>

            <div style={{ position: 'sticky', bottom: 0, background: '#fff', padding: '12px 0', display: 'flex', justifyContent: 'center', gap: 8, borderTop: '1px solid #e0e0e0' }}>
              <button type="submit" form="addConsultaForm" className="revisar-historias-btn" disabled={loadingConsulta}>Guardar</button>
              <button type="button" className="revisar-historias-btn revisar-historias-btn-cancel" onClick={handleAgregarConsultaCancel} disabled={loadingConsulta}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RevisarHistoriasClinicas;
