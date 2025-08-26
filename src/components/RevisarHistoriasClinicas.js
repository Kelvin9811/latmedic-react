import React, { useEffect, useState } from 'react';
import { getClienteFullByCedula, upsertClienteByCedula, createRevision, listRevisiones, deleteHistoriaClinicaByCedula, updateRevision, deleteRevision } from '../apiCrud';
import './RevisarHistoriasClinicas.css';

const RevisarHistoriasClinicas = () => {
  const [cedulaBusqueda, setCedulaBusqueda] = useState('');
  const [historias, setHistorias] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editIdx, setEditIdx] = useState(null);
  const [editData, setEditData] = useState({ nombre: '', cedula: '', antecedentes: '' });
  const [showRevisiones, setShowRevisiones] = useState(false);
  const [revisiones, setRevisiones] = useState([]);
  const [revisionesCedula, setRevisionesCedula] = useState('');
  const [showEliminar, setShowEliminar] = useState(false);
  const [eliminarIdx, setEliminarIdx] = useState(null);
  const [eliminarTimer, setEliminarTimer] = useState(10);
  const [eliminarHabilitado, setEliminarHabilitado] = useState(false);
  const [editRevIdx, setEditRevIdx] = useState(null);
  const [editRevData, setEditRevData] = useState({ parte: '', descripcion: '' });
  const [loadingRev, setLoadingRev] = useState(false);
  const [showEliminarRevision, setShowEliminarRevision] = useState(false);
  const [eliminarRevisionIdx, setEliminarRevisionIdx] = useState(null);
  const [showAgregarRevision, setShowAgregarRevision] = useState(false);
  const [nuevaRevision, setNuevaRevision] = useState({ parte: '', descripcion: '' });
  // Función para mostrar el formulario de agregar revisión
  const handleAgregarRevisionClick = () => {
    setShowAgregarRevision(true);
    setNuevaRevision({ parte: '', descripcion: '' });
  };

  // Función para cancelar agregar revisión
  const handleAgregarRevisionCancel = () => {
    setShowAgregarRevision(false);
    setNuevaRevision({ parte: '', descripcion: '' });
  };

  // Función para cambiar los campos del formulario de nueva revisión
  const handleNuevaRevisionChange = (field, value) => {
    setNuevaRevision(prev => ({ ...prev, [field]: value }));
  };

  // Función para guardar la nueva revisión
  const handleAgregarRevisionSave = async () => {
    setLoadingRev(true);
    try {
      // Usar el método importado de apiCrud.js
      const nueva = await createRevision({
        clienteID: revisionesCedula,
        parte: nuevaRevision.parte,
        descripcion: nuevaRevision.descripcion
      });
      setRevisiones(revs => [{ ...nueva }, ...revs]);
      setShowAgregarRevision(false);
      setNuevaRevision({ parte: '', descripcion: '' });
    } catch {
      // Puedes mostrar un mensaje de error si lo deseas
    }
    setLoadingRev(false);
  };

  const handleBuscar = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const resultado = await getClienteFullByCedula(cedulaBusqueda);
      if (resultado) {
        // Cargar revisiones para la historia encontrada
        const revisionesData = await listRevisiones(resultado.cedula, { limit: 20, sortDirection: 'DESC' });
        setHistorias([{ ...resultado, revisiones: Array.isArray(revisionesData.items) ? revisionesData.items : [] }]);
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
  };

  const handleEditCancel = () => {
    setEditIdx(null);
  };

  const handleVerRevisiones = async (cedula) => {
    setLoading(true);
    setRevisionesCedula(cedula);
    try {
      const revisionesData = await listRevisiones(cedula, { limit: 20, sortDirection: 'DESC' });
      console.log('Revisiones obtenidas:', revisionesData.items);
      console.log('Tipo de revisionesData:', typeof revisionesData.items);
      setRevisiones(Array.isArray(revisionesData.items) ? revisionesData.items : []);
    } catch {
      setRevisiones([]);
    }
    setShowRevisiones(true);
    setLoading(false);
  };

  const handleCerrarRevisiones = () => {
    setShowRevisiones(false);
    setRevisiones([]);
    setRevisionesCedula('');
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

  const handleEditRevision = (idx) => {
    setEditRevIdx(idx);
    setEditRevData({ parte: revisiones[idx].parte, descripcion: revisiones[idx].descripcion });
  };

  const handleEditRevChange = (field, value) => {
    setEditRevData(prev => ({ ...prev, [field]: value }));
  };

  const handleEditRevSave = async () => {
    setLoadingRev(true);
    try {
      const revision = revisiones[editRevIdx];
      await updateRevision({
        ...revision,
        parte: editRevData.parte,
        descripcion: editRevData.descripcion
      });
      setRevisiones(revs =>
        revs.map((r, idx) =>
          idx === editRevIdx ? { ...r, parte: editRevData.parte, descripcion: editRevData.descripcion } : r
        )
      );
      setEditRevIdx(null);
    } catch {
      // Puedes mostrar un mensaje de error si lo deseas
    }
    setLoadingRev(false);
  };

  const handleEliminarRevision = (idx) => {
    setEliminarRevisionIdx(idx);
    setShowEliminarRevision(true);
  };

  const handleEliminarRevisionConfirm = async () => {
    setLoadingRev(true);
    try {
      const revision = revisiones[eliminarRevisionIdx];
      await deleteRevision({ id: revision.id, _version: revision._version });
      setRevisiones(revs => revs.filter((_, i) => i !== eliminarRevisionIdx));
    } catch {
      // Puedes mostrar un mensaje de error si lo deseas
    }
    setLoadingRev(false);
    setShowEliminarRevision(false);
    setEliminarRevisionIdx(null);
  };

  const handleEliminarRevisionCancel = () => {
    setShowEliminarRevision(false);
    setEliminarRevisionIdx(null);
  };

  const handleEditRevCancel = () => {
    setEditRevIdx(null);
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
      {historias.length > 0 && (
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
                    <button onClick={handleEditCancel} className="revisar-historias-btn revisar-historias-btn-cancel">Cancelar</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleEdit(idx)} className="revisar-historias-btn">Editar</button>
                    <button onClick={() => handleEliminarClick(idx)} className="revisar-historias-btn revisar-historias-btn-eliminar">Eliminar</button>
                  </>
                )}
              </div>
              <div className="revisar-historias-revisiones" style={{ marginTop: 16 }}>
                <h4 style={{ marginBottom: 8 , color: '#000' }}>Revisiones</h4>
                {Array.isArray(h.revisiones) && h.revisiones.length === 0 ? (
                  <p>No hay revisiones para este paciente.</p>
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
                    {h.revisiones.map((rev, i) => (
                      <li key={i} style={{ marginBottom: 12, color: '#000', border: '1px solid #e0e0e0', borderRadius: '8px', padding: '12px', display: 'flex', flexDirection: 'column' }}>
                        <div>
                          <strong>Área:</strong> {rev.parte}
                        </div>
                        <div>
                          <strong>Descripción:</strong> <span style={{ whiteSpace: 'pre-line', color: '#000' }}>{rev.descripcion}</span>
                        </div>
                        <div>
                          <strong>Fecha de revisión:</strong> {rev.fechaRegistro ? new Date(rev.fechaRegistro).toLocaleString() : rev.createdAt ? new Date(rev.createdAt).toLocaleString() : 'Sin fecha'}
                        </div>
                        <div style={{ marginTop: 8, display: 'flex', gap: 8, justifyContent: 'center' }}>
                          <button className="revisar-historias-btn revisar-historias-btn-editar" onClick={() => { setEditRevIdx(i); setEditRevData({ parte: rev.parte, descripcion: rev.descripcion }); }}>Editar</button>
                          <button className="revisar-historias-btn revisar-historias-btn-eliminar" onClick={() => { setEliminarRevisionIdx(i); setShowEliminarRevision(true); }} disabled={loadingRev}>Eliminar</button>
                        </div>
                        {editRevIdx === i && (
                          <div style={{ marginTop: 8 }}>
                            <div>
                              <strong>Área:</strong>
                              <input value={editRevData.parte} onChange={e => handleEditRevChange('parte', e.target.value)} style={{ marginLeft: 8 }} />
                            </div>
                            <div>
                              <strong>Descripción:</strong>
                              <textarea value={editRevData.descripcion} onChange={e => handleEditRevChange('descripcion', e.target.value)} rows={2} style={{ marginLeft: 8, width: '100%' }} />
                            </div>
                            <div style={{ marginTop: 8, display: 'flex', gap: 8 }}>
                              <button className="revisar-historias-btn revisar-historias-btn-editar" onClick={handleEditRevSave} disabled={loadingRev}>Guardar</button>
                              <button className="revisar-historias-btn revisar-historias-btn-cancel" onClick={handleEditRevCancel} disabled={loadingRev}>Cancelar</button>
                            </div>
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
                <button className="revisar-historias-btn revisar-historias-btn-agregar" onClick={() => { setShowAgregarRevision(true); setNuevaRevision({ parte: '', descripcion: '' }); }}>Agregar revisión</button>
                {showAgregarRevision && (
                  <div className="revisar-historias-popup-overlay" style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 1000, background: 'rgba(0,0,0,0.3)' }}>
                    <div className="revisar-historias-popup-content" style={{ maxHeight: '90vh', overflowY: 'auto', width: '90vw', maxWidth: 600, margin: '5vh auto', background: '#fff', borderRadius: 12, boxShadow: '0 2px 16px rgba(0,0,0,0.15)', padding: 24, position: 'relative' }}>
                      <h4>Agregar nueva revisión</h4>
                      <div>
                        <strong>Área:</strong>
                        <input value={nuevaRevision.parte} onChange={e => handleNuevaRevisionChange('parte', e.target.value)} style={{ marginLeft: 8 }} />
                      </div>
                      <div>
                        <strong>Descripción:</strong>
                        <textarea value={nuevaRevision.descripcion} onChange={e => handleNuevaRevisionChange('descripcion', e.target.value)} rows={2} style={{ marginLeft: 8, width: '100%' }} />
                      </div>
                      <div style={{ marginTop: 8, display: 'flex', gap: 8 }}>
                        <button className="revisar-historias-btn revisar-historias-btn-agregar" onClick={handleAgregarRevisionSave} disabled={loadingRev}>Guardar</button>
                        <button className="revisar-historias-btn revisar-historias-btn-cancel" onClick={handleAgregarRevisionCancel} disabled={loadingRev}>Cancelar</button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
      {showRevisiones && (
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
            <h4>Revisiones de la cédula {revisionesCedula}</h4>
            {Array.isArray(revisiones) && revisiones.length === 0 ? (
              <p>No hay revisiones para este paciente.</p>
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
                {Array.isArray(revisiones) && revisiones.map((rev, i) => (
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
                    {editRevIdx === i ? (
                      <>
                        <div>
                          <strong style={{ color: '#000' }}>Área:</strong>
                          <input
                            value={editRevData.parte}
                            onChange={e => handleEditRevChange('parte', e.target.value)}
                            style={{ marginLeft: 8 }}
                          />
                        </div>
                        <div>
                          <strong style={{ color: '#000' }}>Descripción:</strong>
                          <textarea
                            value={editRevData.descripcion}
                            onChange={e => handleEditRevChange('descripcion', e.target.value)}
                            rows={2}
                            style={{ marginLeft: 8, width: '100%' }}
                          />
                        </div>
                        <div style={{ marginTop: 8, display: 'flex', gap: 8 }}>
                          <button className="revisar-historias-btn revisar-historias-btn-editar" onClick={handleEditRevSave} disabled={loadingRev}>Guardar</button>
                          <button className="revisar-historias-btn revisar-historias-btn-cancel" onClick={handleEditRevCancel} disabled={loadingRev}>Cancelar</button>
                        </div>
                      </>
                    ) : (
                      <>
                        <div>
                          <strong style={{ color: '#000' }}>Área:</strong> {rev.parte}
                        </div>
                        <div>
                          <strong style={{ color: '#000' }}>Descripción:</strong> <span style={{ whiteSpace: 'pre-line', color: '#000' }}>{rev.descripcion}</span>
                        </div>
                        <div>
                          <strong style={{ color: '#000' }}>Fecha de revisión:</strong> {rev.fechaRegistro
                            ? new Date(rev.fechaRegistro).toLocaleString()
                            : rev.createdAt
                              ? new Date(rev.createdAt).toLocaleString()
                              : 'Sin fecha'}
                        </div>
                        <div style={{ marginTop: 8, display: 'flex', gap: 8 }}>
                          <button className="revisar-historias-btn revisar-historias-btn-editar" onClick={() => handleEditRevision(i)}>Editar</button>
                          <button
                            className="revisar-historias-btn revisar-historias-btn-eliminar"
                            style={{}}
                            onClick={() => handleEliminarRevision(i)}
                            disabled={loadingRev}
                            title="Eliminar revisión"
                          >
                            Eliminar
                          </button>
                        </div>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            )}
            <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
              <button className="revisar-historias-btn" onClick={handleCerrarRevisiones}>Cerrar</button>
              <button className="revisar-historias-btn revisar-historias-btn-agregar" onClick={handleAgregarRevisionClick}>Agregar revisión</button>
            </div>
            {showAgregarRevision && (
              <div className="revisar-historias-popup-overlay">
                <div className="revisar-historias-popup-content">
                  <h4>Agregar nueva revisión</h4>
                  <div>
                    <strong>Área:</strong>
                    <input
                      value={nuevaRevision.parte}
                      onChange={e => handleNuevaRevisionChange('parte', e.target.value)}
                      style={{ marginLeft: 8 }}
                    />
                  </div>
                  <div>
                    <strong>Descripción:</strong>
                    <textarea
                      value={nuevaRevision.descripcion}
                      onChange={e => handleNuevaRevisionChange('descripcion', e.target.value)}
                      rows={2}
                      style={{ marginLeft: 8, width: '100%' }}
                    />
                  </div>
                  <div style={{ marginTop: 8, display: 'flex', gap: 8 }}>
                    <button className="revisar-historias-btn revisar-historias-btn-agregar" onClick={handleAgregarRevisionSave} disabled={loadingRev}>Guardar</button>
                    <button className="revisar-historias-btn revisar-historias-btn-cancel" onClick={handleAgregarRevisionCancel} disabled={loadingRev}>Cancelar</button>
                  </div>
                </div>
              </div>
            )}
          </div>
          {showEliminarRevision && (
            <div className="revisar-historias-popup-overlay">
              <div className="revisar-historias-popup-content">
                <h4>Confirmar eliminación</h4>
                <p>
                  ¿Está seguro que desea eliminar esta revisión?<br />
                  Esta acción no se puede deshacer.
                </p>
                <button
                  className="revisar-historias-btn revisar-historias-btn-eliminar"
                  onClick={handleEliminarRevisionConfirm}
                  disabled={loadingRev}
                >
                  Eliminar revisión
                </button>
                <button
                  className="revisar-historias-btn revisar-historias-btn-cancel"
                  onClick={handleEliminarRevisionCancel}
                  disabled={loadingRev}
                >
                  Cancelar
                </button>
              </div>
            </div>
          )}
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
