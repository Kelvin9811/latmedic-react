import React, { useEffect, useState } from 'react';
import { getClienteFullByCedula, upsertClienteByCedula, listRevisiones, deleteHistoriaClinicaByCedula } from '../apiCrud';
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

  const handleBuscar = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const resultado = await getClienteFullByCedula(cedulaBusqueda);
      setHistorias(resultado ? [resultado] : []);
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
        <table className="revisar-historias-tabla">
          <thead>
            <tr>
              <th>Cédula</th>
              <th>Nombre</th>
              <th>Antecedentes</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {historias.map((h, idx) => (
              <tr key={idx}>
                <td>
                  {editIdx === idx ? (
                    <input
                      value={editData.cedula}
                      onChange={e => handleEditChange('cedula', e.target.value)}
                      disabled
                    />
                  ) : h.cedula}
                </td>
                <td>
                  {editIdx === idx ? (
                    <input
                      value={editData.nombre}
                      onChange={e => handleEditChange('nombre', e.target.value)}
                    />
                  ) : h.nombre}
                </td>
                <td>
                  {editIdx === idx ? (
                    <textarea
                      value={editData.antecedentes}
                      onChange={e => handleEditChange('antecedentes', e.target.value)}
                      rows={2}
                    />
                  ) : <span style={{ whiteSpace: 'pre-line' }}>{h.antecedentes}</span>}
                </td>
                <td>
                  {editIdx === idx ? (
                    <>
                      <button onClick={handleEditSave} className="revisar-historias-btn">Guardar</button>
                      <button onClick={handleEditCancel} className="revisar-historias-btn revisar-historias-btn-cancel">Cancelar</button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => handleEdit(idx)} className="revisar-historias-btn">Editar</button>
                      <button onClick={() => handleVerRevisiones(h.cedula)} className="revisar-historias-btn revisar-historias-btn-revisiones">Revisiones</button>
                      <button onClick={() => handleEliminarClick(idx)} className="revisar-historias-btn revisar-historias-btn-eliminar">Eliminar</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {showRevisiones && (
        <div className="revisar-historias-popup-overlay">
          <div className="revisar-historias-popup-content">
            <h4>Revisiones de la cédula {revisionesCedula}</h4>
            {Array.isArray(revisiones) && revisiones.length === 0 ? (
              <p>No hay revisiones para este paciente.</p>
            ) : (
              <ul>
                {Array.isArray(revisiones) && revisiones.map((rev, i) => (
                  <li key={i} style={{ marginBottom: 12, color: '#000' }}>
                    <strong style={{ color: '#000' }}>Área:</strong> {rev.parte}<br />
                    <strong style={{ color: '#000' }}>Descripción:</strong> <span style={{ whiteSpace: 'pre-line', color: '#000' }}>{rev.descripcion}</span><br />
                    <strong style={{ color: '#000' }}>Fecha de revisión:</strong> {rev.fechaRegistro
                      ? new Date(rev.fechaRegistro).toLocaleString()
                      : rev.createdAt
                        ? new Date(rev.createdAt).toLocaleString()
                        : 'Sin fecha'}
                  </li>
                ))}
              </ul>
            )}
            <button className="revisar-historias-btn" onClick={handleCerrarRevisiones}>Cerrar</button>
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
