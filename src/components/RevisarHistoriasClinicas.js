import React, { useEffect, useState,useRef } from 'react';
import { getClienteByCedula, upsertClienteByCedula, createConsultaForCedula, listConsultasByCedula, deleteHistoriaClinicaByCedula, updateConsulta, listRecetasByConsulta, listDocumentosByConsulta, addDocumentoToConsulta, deleteDocumento } from '../apiCrud';
import ManejoConsulta from './ManejoConsulta';
import ConsultaPopup from './ConsultaPopup';
import EditHistoriaPopup from './EditHistoriaPopup';
import { uploadData,getUrl, remove } from '@aws-amplify/storage';
import './RevisarHistoriasClinicas.css';

const RevisarHistoriasClinicas = () => {
  const [cedulaBusqueda, setCedulaBusqueda] = useState('');
  const [historias, setHistorias] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showPlaceholders, setShowPlaceholders] = useState(false);
  const [editIdx, setEditIdx] = useState(null);
  const [recetas, setRecetas] = useState([]);
  const [recetasLoading, setRecetasLoading] = useState(false);
  const [documentos, setDocumentos] = useState([]); // documentos metadata desde API
  const [documentosLoading, setDocumentosLoading] = useState(false);
  const [adjuntos, setAdjuntos] = useState([]); // array<File>
  const [uploadingAdjuntos, setUploadingAdjuntos] = useState(false);
  const fileInputRef = useRef(null);
  

  const uploadFiles = async (files) => {
      if (!files || files.length === 0) return [];

      const uploads = await Promise.all(
        Array.from(files).map(async (file) => {
          
          console.log('Preparing to upload file:', file.name);
          const path = `documentos/${Date.now()}_${Math.random()
            .toString(36)
            .slice(2, 8)}_${file.name.replace(/\s+/g, '_')}`;

          console.log('Uploading file to S3 at path:', path);

          try {
          await uploadData({
            path,           // ruta dentro del bucket (v6 usa "path" en vez de "key")
            data: file,
            options: {
              contentType: file.type || 'application/octet-stream',
            },
          }).result;
          } catch (error) {
            console.error('Error uploading file:', error);
          }
          console.log('File uploaded. Getting URL for path:', path);
          const { url } = await getUrl({ path });

          return {
            key: path,              // lo puedes guardar en tu modelo Documento.s3key
            url: url.toString(),    // URL lista para usar en <a> o <img>
            name: file.name,
          }


        })
      );

    return uploads;
  };

  const handleSingleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setAdjuntos(prev => [...prev, file]);
    }
    // limpiar el input para permitir re-elegir el mismo archivo si se desea
    e.target.value = null;
  };
  
  const handleRemoveAdjunto = (index) => {
    setAdjuntos(prev => prev.filter((_, i) => i !== index));
  };
  const handleAddDocumentoClick = () => {
    fileInputRef.current?.click();
  };

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
    let uploadResults = [];
    try {
      // subir adjuntos primero (si hay)
      if (adjuntos && adjuntos.length > 0) {
        setUploadingAdjuntos(true);
        try {
          uploadResults = await uploadFiles(adjuntos);
        } finally {
          setUploadingAdjuntos(false);
        }
      }

      // crear consulta
      const nueva = await createConsultaForCedula(consultasCedula, { ...nuevaConsultaData });

      // crear registros Documento asociados a la nueva consulta
      if (uploadResults && uploadResults.length > 0) {
        for (const u of uploadResults) {
          try {
            await addDocumentoToConsulta(nueva.id, {
              tipo: 'OTRO',
              titulo: u.name,
              s3key: u.key,
              notas: u.url, // guardamos la URL en notas para referencia
            });
          } catch (err) {
            console.error('Error creando documento para nueva consulta:', err);
          }
        }
      }

      setConsultas(con => [{ ...nueva }, ...con]);
      setShowConsultas(false);
      setShowAgregarConsultaDetalle(false);
      setAdjuntos([]); // limpiar adjuntos del UI
    } catch (err) {
      console.error('Error creando consulta:', err);
    } finally {
      setUploadingAdjuntos(false);
      setLoadingConsulta(false);
    }
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

  const [loadingButtonState, setLoadingButtonState] = useState(false);
  const setLoadingButton = (val) => setLoadingButtonState(!!val);

  const handleEditSave = async () => {
    // Usamos el nuevo control del botón para bloquear la acción y mostrar spinner
    setLoadingButton(true);
    setLoading(true);
    try {
      await upsertClienteByCedula(editData);
      setHistorias(hist => hist.map((h, idx) => idx === editIdx ? editData : h));
      setEditIdx(null);
    } catch {
      // manejo opcional de error
    } finally {
      setLoading(false);
      setLoadingButton(false);
    }
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

  const handleEditConsulta = async (consulta) => {
    setEditConsultaData({ ...consulta });
    setEditConsultaIdx(consulta.id);
    // cargar recetas asociadas a la consulta
    setRecetas([]);
    setRecetasLoading(true);
    // cargar documentos asociados a la consulta
    setDocumentos([]);
    setDocumentosLoading(true);
    try {
      const resp = await listRecetasByConsulta(consulta.id);
      setRecetas(Array.isArray(resp.items) ? resp.items : []);
    } catch (e) {
      console.error('Error cargando recetas', e);
      setRecetas([]);
    } finally {
      setRecetasLoading(false);
      // cargar documentos en bloque separado (si el servicio falla no bloquea recetas)
    }
    try {
      const docsResp = await listDocumentosByConsulta(consulta.id);
      setDocumentos(Array.isArray(docsResp.items) ? docsResp.items : []);
    } catch (e) {
      console.error('Error cargando documentos', e);
      setDocumentos([]);
    } finally {
      setDocumentosLoading(false);
    }
  };

  // Elimina un documento y actualiza el estado local de documentos
  const handleDeleteDocumento = async (id, _version) => {
    if (!id) return;
    if (!window.confirm?.('¿Eliminar documento? Esta acción no se puede deshacer.')) return;

    // Buscar info del documento localmente para obtener s3key si existe
    const doc = documentos.find(d => d.id === id);

    try {
      // Intentar borrar el archivo del bucket (si tiene s3key)
      if (doc?.s3key) {
        try {
          // Preferimos remove({ path }) de @aws-amplify/storage (v6)
          if (typeof remove === 'function') {
            await remove({ path: doc.s3key });
          } else if (Storage && typeof Storage.remove === 'function') {
            // Fallback a Storage.remove(key) si está disponible
            await Storage.remove(doc.s3key);
          } else {
            console.warn('No se encontró método para eliminar en storage (remove/Storage.remove).');
          }
        } catch (err) {
          console.error('Error eliminando archivo en S3, continuando con borrado de metadata:', err);
          // No abortamos: intentamos borrar la metadata aunque la eliminación en S3 falle.
        }
      }

      // Borrar metadata del documento en la API (GraphQL)
      await deleteDocumento({ id, _version });
      // Actualizar estado local
      setDocumentos(prev => prev.filter(d => d.id !== id));
    } catch (err) {
      console.error('Error eliminando documento (metadata o storage):', err);
      try { alert('No se pudo eliminar el documento.'); } catch (_) {}
    }
  };
 
   const handleSaveEditConsulta = async () => {
     setLoading(true);
     try {
      // si hay archivos, subirlos primero y obtener resultados (key + url + name)
      let uploadResults = [];
      if (adjuntos && adjuntos.length > 0) {
        setUploadingAdjuntos(true);
        try {
          uploadResults = await uploadFiles(adjuntos);
        } finally {
          setUploadingAdjuntos(false);
        }
      }

      console.log('Guardando consulta editada:', editConsultaData);
      const updated = await updateConsulta(editConsultaData);

      // crear registros Documento asociados a la consulta actualizada
      if (uploadResults && uploadResults.length > 0) {
        for (const u of uploadResults) {
          try {
            await addDocumentoToConsulta(updated.id, {
              tipo: 'OTRO',
              titulo: u.name,
              s3key: u.key,
              notas: u.url,
            });
          } catch (err) {
            console.error('Error creando documento para consulta editada:', err);
          }
        }
        // recargar lista de documentos para la consulta (si quieres mantener documentos actualizados)
        // try {
        //   const docsResp = await listDocumentosByConsulta(updated.id);
        //   setDocumentos(Array.isArray(docsResp.items) ? docsResp.items : []);
        // } catch (e) {
        //   console.error('Error recargando documentos después de guardar:', e);
        // }
      }

      // Actualiza la lista de consultas mostrada en el popup (si existe)
      setConsultas(prev => prev.map(c => (c.id === updated.id ? updated : c)));
      // También actualizar dentro de historias (si la consulta aparece allí)
      setHistorias(prev => prev.map(h => ({
        ...h,
        consultas: Array.isArray(h.consultas) ? h.consultas.map(c => (c.id === updated.id ? updated : c)) : h.consultas
      })));
      setEditConsultaIdx(null);
      setAdjuntos([]); // limpiar adjuntos después de asociarlos
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
                    <button
                      onClick={handleEditSave}
                      className="revisar-historias-btn"
                      disabled={loadingButtonState}
                      style={loadingButtonState ? { background: '#f0f0f0', color: '#666', cursor: 'not-allowed', opacity: 0.95 } : undefined}
                    >
                      {loadingButtonState ? (
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <g>
                              <circle cx="12" cy="12" r="10" stroke="#666" strokeWidth="2" strokeOpacity="0.25" />
                              <path d="M22 12a10 10 0 00-10-10" stroke="#666" strokeWidth="2" strokeLinecap="round">
                                <animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="1s" repeatCount="indefinite" />
                              </path>
                            </g>
                          </svg>
                          <span>Guardando...</span>
                        </span>
                      ) : (
                        'Guardar'
                      )}
                    </button>
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
        <EditHistoriaPopup
          visible={true}
          data={editData}
          onChange={handleEditChange}
          onSave={handleEditSave}
          onCancel={() => setEditIdx(null)}
          loadingButtonState={loadingButtonState}
        />
      )}
      {(showAgregarConsultaDetalle) && (
        <ConsultaPopup
          mode="create"
          consultaData={nuevaConsultaData}
          setConsultaData={setNuevaConsultaData}
          onSave={handleAgregarConsultaSave}
          onCancel={handleAgregarConsultaCancel}
          recetas={recetas}
          recetasLoading={recetasLoading}
          adjuntos={adjuntos}
          onAddDocumentoClick={handleAddDocumentoClick}
          fileInputRef={fileInputRef}
          onSingleFileChange={handleSingleFileChange}
          onRemoveAdjunto={handleRemoveAdjunto}
          uploadingAdjuntos={uploadingAdjuntos}
          loadingButtonState={loadingButtonState}
          onDeleteDocumento={handleDeleteDocumento}
        />
      )}
      {editConsultaIdx && (
        <ConsultaPopup
          mode="edit"
          consultaData={editConsultaData}
          setConsultaData={setEditConsultaData}
          onSave={handleSaveEditConsulta}
          onCancel={() => setEditConsultaIdx(null)}
          recetas={recetas}
          recetasLoading={recetasLoading}
          documentos={documentos}
          documentosLoading={documentosLoading}
          adjuntos={adjuntos}
          onAddDocumentoClick={handleAddDocumentoClick}
          fileInputRef={fileInputRef}
          onSingleFileChange={handleSingleFileChange}
          onRemoveAdjunto={handleRemoveAdjunto}
          uploadingAdjuntos={uploadingAdjuntos}
          loadingButtonState={loadingButtonState}
          onDeleteDocumento={handleDeleteDocumento}
        />
      )}
    </div>
  );
};

export default RevisarHistoriasClinicas;