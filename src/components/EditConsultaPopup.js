import React from 'react';

const EditConsultaPopup = ({
  editConsultaData,
  setEditConsultaData,
  onSave,
  onCancel,
  recetas = [],
  recetasLoading = false,
  adjuntos = [],
  onAddDocumentoClick,
  fileInputRef,
  onSingleFileChange,
  onRemoveAdjunto,
  uploadingAdjuntos = false,
  loadingButtonState = false
}) => {
  return (
    <div className="revisar-historias-popup-overlay" style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 1000, background: 'rgba(0,0,0,0.3)' }}>
      <div className="revisar-historias-popup-content" style={{ maxHeight: '90vh', width: '90vw', maxWidth: 1000, margin: '5vh auto', background: '#fff', borderRadius: 12, boxShadow: '0 2px 16px rgba(0,0,0,0.15)', padding: 24, position: 'relative', display: 'flex', flexDirection: 'column' }}>
        <div style={{ overflowY: 'auto', paddingRight: 8 }}>
          <h4 style={{ textAlign: 'center', margin: '0 0 16px 0', fontWeight: 'bold'}}>Editar Consulta</h4>
          <form id="editConsultaForm" onSubmit={e => { e.preventDefault(); onSave(); }}>
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
              {/* Campos abreviados: los mismos que usas en el padre */}
              <label>Presión Arterial:</label>
              <input type="text" value={editConsultaData.presionArterial || ''} onChange={e => setEditConsultaData(d => ({ ...d, presionArterial: e.target.value }))} />
              <label>Frecuencia Cardíaca:</label>
              <input type="text" value={editConsultaData.frecuenciaCardiaca || ''} onChange={e => setEditConsultaData(d => ({ ...d, frecuenciaCardiaca: e.target.value }))} />
              {/* ...continúa con los demás campos según necesidad... */}
              
              {/* Documentos / adjuntos (controls delegados al padre) */}
              <div className="crear-consulta-campo" style={{ marginTop: 12 }}>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginTop: 8, flexDirection: 'column' }}>
                  <button type="button" className="crear-consulta-btn" onClick={onAddDocumentoClick} style={{ padding: '6px 10px' }}>
                    Agregar documento
                  </button>
                  <div style={{ fontSize: 13, color: '#666' }}>{adjuntos.length} seleccionado(s)</div>
                </div>

                <input ref={fileInputRef} type="file" style={{ display: 'none' }} onChange={onSingleFileChange} />

                {adjuntos && adjuntos.length > 0 && (
                  <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 8 ,borderWidth: 1,borderStyle: 'solid',borderColor: '#e0e0e0',padding: 10,borderRadius: 6,backgroundColor: '#fff',flex: 1}}>
                    {adjuntos.map((f, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#fafafa', padding: '8px 10px', borderRadius: 6, border: '1px solid #e6e6e6', maxWidth: '100%' }}>
                        <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginRight: 8, flex: 1 ,color: '#333',fontSize: 14, minWidth: 0 }}>
                          {f.name} <span style={{ color: '#999', fontSize: 12 }}>({Math.round(f.size/1024)} KB)</span>
                        </div>
                        <button type="button" onClick={() => onRemoveAdjunto(i)} style={{ background: '#ff6b6b', color: '#fff', border: 'none', borderRadius: 4, padding: '4px 8px', cursor: 'pointer' }} aria-label={`Eliminar ${f.name}`}>
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '16px 0' }} />
              <h4 style={{ color: '#222', fontWeight: 'bold', margin: 8 }}>Recetas</h4>
              <div style={{ padding: 8, background: '#fafafa', borderRadius: 6, border: '1px solid #e6e6e6' }}>
                {recetasLoading ? (
                  <div style={{ color: '#666' }}>Cargando recetas...</div>
                ) : recetas.length === 0 ? (
                  <div style={{ color: '#666' }}>No hay recetas para esta consulta.</div>
                ) : (
                  <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {recetas.map((r) => (
                      <li key={r.id} style={{ padding: 8, borderRadius: 6, background: '#fff', border: '1px solid #eaeaea' }}>
                        <div style={{ fontWeight: 600, color: '#222' }}>{r.indicaciones || 'Sin indicaciones'}</div>
                        <div style={{ fontSize: 12, color: '#666', marginTop: 4 }}>
                          {r.s3key ? <span>S3key: {r.s3key}</span> : <span>No hay archivo adjunto</span>}
                          {' '}•{' '}
                          {r.createdAt ? new Date(r.createdAt).toLocaleString() : 'Sin fecha'}
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

            </div>
          </form>
        </div>

        <div style={{ position: 'sticky', background: '#fff', padding: '10px', display: 'flex', justifyContent: 'center', gap: 20, border: '10px solid #fff'}}>
          <button
            type="submit"
            form="editConsultaForm"
            className="revisar-historias-btn"
            disabled={loadingButtonState}
            style={loadingButtonState ? { background: '#f0f0f0', color: '#666', cursor: 'not-allowed', opacity: 0.95 } : undefined}
          >
             {loadingButtonState ? (
               <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                 <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                   <g>
                     <circle cx="12" cy="12" r="10" stroke="#444" strokeWidth="3" strokeOpacity="0.25" />
                     <path d="M22 12a10 10 0 00-10-10" stroke="#444" strokeWidth="3" strokeLinecap="round">
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
           <button type="button" className="revisar-historias-btn revisar-historias-btn-cancel" onClick={onCancel}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default EditConsultaPopup;
