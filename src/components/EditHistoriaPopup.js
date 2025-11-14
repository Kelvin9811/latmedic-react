import React from 'react';

const EditHistoriaPopup = ({ visible = true, data = {}, onChange, onSave, onCancel, loadingButtonState }) => {
  if (!visible) return null;

  const handleChange = (field) => (e) => {
    const value = e && e.target ? e.target.value : e;
    onChange(field, value);
  };

  return (
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
          <form id="editHistoriaForm" onSubmit={e => { e.preventDefault(); onSave && onSave(); }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <label>Nombre:</label>
              <input value={data.nombre || ''} disabled style={{ color: '#222' }} />
              <label>Cédula:</label>
              <input value={data.cedula || ''} disabled style={{ color: '#222' }} />
              <label>Dirección:</label>
              <input value={data.direccionResidenciaHabitual || ''} onChange={handleChange('direccionResidenciaHabitual')} />
              <label>Barrio:</label>
              <input value={data.barrio || ''} onChange={handleChange('barrio')} />
              <label>Parroquia:</label>
              <input value={data.parroquia || ''} onChange={handleChange('parroquia')} />
              <label>Cantón:</label>
              <input value={data.canton || ''} onChange={handleChange('canton')} />
              <label>Provincia:</label>
              <input value={data.provincia || ''} onChange={handleChange('provincia')} />
              <label>Teléfono:</label>
              <input value={data.telefono || ''} onChange={handleChange('telefono')} />
              <label>Grupo Sanguíneo y Factor RH:</label>
              <input value={data.grupoSanguineoYFactorRh || ''} onChange={handleChange('grupoSanguineoYFactorRh')} />
              <label>Fecha de nacimiento:</label>
              <input type="date" value={data.fechaNacimiento ? data.fechaNacimiento.substring(0,10) : ''} onChange={handleChange('fechaNacimiento')} />
              <label>Lugar de nacimiento:</label>
              <input value={data.lugarNacimiento || ''} onChange={handleChange('lugarNacimiento')} />
              <label>Nacionalidad:</label>
              <input value={data.nacionalidad || ''} onChange={handleChange('nacionalidad')} />
              <label>Grupo cultural:</label>
              <input value={data.grupoCultural || ''} onChange={handleChange('grupoCultural')} />
              <label>Edad en años cumplidos:</label>
              <input type="number" value={data.edadEnAnosCumplidos || ''} onChange={handleChange('edadEnAnosCumplidos')} min={0} max={120} />
              <label>Sexo:</label>
              <input value={data.sexo || ''} onChange={handleChange('sexo')} />
              <label>Estado civil:</label>
              <input value={data.estadoCivil || ''} onChange={handleChange('estadoCivil')} />
              <label>Nivel educativo:</label>
              <input value={data.nivelEducativo || ''} onChange={handleChange('nivelEducativo')} />
              <label>Fecha de admisión:</label>
              <input type="date" value={data.fechaAdmision ? data.fechaAdmision.substring(0,10) : ''} onChange={handleChange('fechaAdmision')} />
              <label>Ocupación:</label>
              <input value={data.ocupacion || ''} onChange={handleChange('ocupacion')} />
              <label>Empresa donde trabaja:</label>
              <input value={data.empresaDondeTrabaja || ''} onChange={handleChange('empresaDondeTrabaja')} />
              <label>Tipo seguro salud:</label>
              <input value={data.tipoSeguroSalud || ''} onChange={handleChange('tipoSeguroSalud')} />
              <label>Referido de:</label>
              <input value={data.referidoDe || ''} onChange={handleChange('referidoDe')} />
              <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '24px 0 8px 0' }} />
              <h4 style={{ color: '#222', fontWeight: 'bold', margin: 8 }}>En caso de emergencia</h4>
              <label>Notificar a:</label>
              <input value={data.enCasoDeAvisarA || ''} onChange={handleChange('enCasoDeAvisarA')} />
              <label>Parentesco/afinidad:</label>
              <input value={data.parentescoAfinidad || ''} onChange={handleChange('parentescoAfinidad')} />
              <label>Teléfono de emergencia:</label>
              <input value={data.telefonoEmergencia || ''} onChange={handleChange('telefonoEmergencia')} />
              <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '24px 0 8px 0' }} />
              <h4 style={{ color: '#222', fontWeight: 'bold', margin: 8 }}>Antecedentes personales y familiares</h4>
              <label>Antecedente Alérgico:</label>
              <input value={data.antecedenteAlergico || ''} onChange={handleChange('antecedenteAlergico')} />
              <label>Antecedente Clínico:</label>
              <input value={data.antecedenteClinico || ''} onChange={handleChange('antecedenteClinico')} />
              <label>Antecedente Ginecológico:</label>
              <input value={data.antecedenteGinecologico || ''} onChange={handleChange('antecedenteGinecologico')} />
              <label>Antecedente Traumatológico:</label>
              <input value={data.antecedenteTraumatologico || ''} onChange={handleChange('antecedenteTraumatologico')} />
              <label>Antecedente Quirúrgico:</label>
              <input value={data.antecedenteQuirurgico || ''} onChange={handleChange('antecedenteQuirurgico')} />
              <label>Antecedente Farmacológico:</label>
              <input value={data.antecedenteFarmacoLogico || ''} onChange={handleChange('antecedenteFarmacoLogico')} />
              <label>Antecedente Psiquiátrico:</label>
              <input value={data.antecedentePsiquiatrico || ''} onChange={handleChange('antecedentePsiquiatrico')} />
              <label>Antecedente Otro:</label>
              <input value={data.antecedenteOtro || ''} onChange={handleChange('antecedenteOtro')} />
            </div>
          </form>
        </div>

        <div style={{ position: 'sticky', background: '#fff', padding: '10px', display: 'flex', justifyContent: 'center', gap: 20, border: '10px solid #fff'}}>
          <button
            type="submit"
            form="editHistoriaForm"
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

export default EditHistoriaPopup;
