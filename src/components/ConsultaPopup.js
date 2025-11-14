import React from 'react';

const ConsultaPopup = ({
    mode = 'edit', // 'edit' | 'create'
    consultaData = {},
    setConsultaData = () => { },
    onSave = () => { },
    onCancel = () => { },
    recetas = [],
    recetasLoading = false,
    adjuntos = [],
    onAddDocumentoClick = () => { },
    fileInputRef = null,
    onSingleFileChange = () => { },
    onRemoveAdjunto = () => { },
    uploadingAdjuntos = false,
    loadingButtonState = false
}) => {
    const title = mode === 'create' ? 'Agregar Consulta' : 'Editar Consulta';
    return (
        <div className="revisar-historias-popup-overlay" style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 1200, background: 'rgba(0,0,0,0.3)' }}>
            <div className="revisar-historias-popup-content" style={{ maxHeight: '90vh', width: '90vw', maxWidth: 1000, margin: '5vh auto', background: '#fff', borderRadius: 12, boxShadow: '0 2px 16px rgba(0,0,0,0.15)', padding: 24, position: 'relative', display: 'flex', flexDirection: 'column' }}>
                <div style={{ overflowY: 'auto', paddingRight: 8 }}>
                    <h4 style={{ textAlign: 'center', margin: '0 0 16px 0', fontWeight: 'bold' }}>{title}</h4>
                    <form id="consultaForm" onSubmit={e => { e.preventDefault(); onSave(); }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                            <h4 style={{ color: '#222', fontWeight: 'bold', margin: 8 }}>Inicio de Atención y Motivo</h4>
                            <label>Hora:</label>
                            <input type="text" value={consultaData.hora || ''} onChange={e => setConsultaData(d => ({ ...d, hora: e.target.value }))} readOnly={mode === 'create' && !!consultaData.hora} />
                            <label>Motivo de Consulta:</label>
                            <input type="text" value={consultaData.motivoDeConsulta || ''} onChange={e => setConsultaData(d => ({ ...d, motivoDeConsulta: e.target.value }))} />
                            <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '16px 0' }} />

                            <h4 style={{ color: '#222', fontWeight: 'bold', margin: 8 }}>Enfermedad Actual</h4>
                            <label>Enfermedad Actual:</label>
                            <textarea value={consultaData.enfermedadActual || ''} onChange={e => setConsultaData(d => ({ ...d, enfermedadActual: e.target.value }))} rows={3} />

                            <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '16px 0' }} />
                            <h4 style={{ color: '#222', fontWeight: 'bold', margin: 8 }}>Signos Vitales</h4>
                            <label>Presión Arterial:</label>
                            <input type="text" value={consultaData.presionArterial || ''} onChange={e => setConsultaData(d => ({ ...d, presionArterial: e.target.value }))} />
                            <label>Frecuencia Cardíaca:</label>
                            <input type="text" value={consultaData.frecuenciaCardiaca || ''} onChange={e => setConsultaData(d => ({ ...d, frecuenciaCardiaca: e.target.value }))} />
                            <label>Frecuencia Respiratoria:</label>
                            <input type="text" value={consultaData.frecuenciaRespiratoria || ''} onChange={e => setConsultaData(d => ({ ...d, frecuenciaRespiratoria: e.target.value }))} />

                            <div style={{ display: 'flex', gap: 12, alignItems: 'flex-end' }}>
                                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                                    <label>Temperatura Bucal:</label>
                                    <input type="text" value={consultaData.temperaturaBucal || ''} onChange={e => setConsultaData(d => ({ ...d, temperaturaBucal: e.target.value }))} />
                                </div>
                                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                                    <label>Temperatura Axilar:</label>
                                    <input type="text" value={consultaData.temperaturaAxilar || ''} onChange={e => setConsultaData(d => ({ ...d, temperaturaAxilar: e.target.value }))} />
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: 12, alignItems: 'flex-end' }}>
                                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                                    <label>Peso:</label>
                                    <input type="text" value={consultaData.peso || ''} onChange={e => setConsultaData(d => ({ ...d, peso: e.target.value }))} />
                                </div>
                                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                                    <label>Talla:</label>
                                    <input type="text" value={consultaData.talla || ''} onChange={e => setConsultaData(d => ({ ...d, talla: e.target.value }))} />
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: 12, alignItems: 'flex-end' }}>
                                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                                    <label style={{ marginBottom: 6 }}>Glasgow Ocular</label>
                                    <input type="number" value={consultaData.gaslowOcular || ''} onChange={e => setConsultaData(d => ({ ...d, gaslowOcular: e.target.value }))} />
                                </div>
                                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                                    <label style={{ marginBottom: 6 }}>Glasgow Verbal</label>
                                    <input type="number" value={consultaData.gaslowVerbal || ''} onChange={e => setConsultaData(d => ({ ...d, gaslowVerbal: e.target.value }))} />
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: 12, alignItems: 'flex-end' }}>

                                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                                    <label style={{ marginBottom: 6 }}>Glasgow Motora</label>
                                    <input type="number" value={consultaData.gaslowMotora || ''} onChange={e => setConsultaData(d => ({ ...d, gaslowMotora: e.target.value }))} />
                                </div>
                                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                                    <label style={{ marginBottom: 6 }}>Total</label>
                                    <input type="number" value={consultaData.gaslowTotal || ''} readOnly />
                                </div>
                            </div>
                            <label>Reacción Pupila Izquierda:</label>
                            <input type="text" value={consultaData.reaccionPupilaIzq || ''} onChange={e => setConsultaData(d => ({ ...d, reaccionPupilaIzq: e.target.value }))} />
                            <label>Reacción Pupila Derecha:</label>
                            <input type="text" value={consultaData.reaccionPupilaDer || ''} onChange={e => setConsultaData(d => ({ ...d, reaccionPupilaDer: e.target.value }))} />
                            <label>Tiempo Llenado Capilar:</label>
                            <input type="text" value={consultaData.tiempoLlenadoCapilar || ''} onChange={e => setConsultaData(d => ({ ...d, tiempoLlenadoCapilar: e.target.value }))} />
                            <label>Saturación Oxígeno:</label>
                            <input type="text" value={consultaData.saturacionOxigeno || ''} onChange={e => setConsultaData(d => ({ ...d, saturacionOxigeno: e.target.value }))} />

                            <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '16px 0 24px 0' }} />
                            <h4 style={{ color: '#222', fontWeight: 'bold', margin: 8 }}>Examen Físico y Diagnóstico</h4>
                            <label>Vía Aérea Obstruida:</label>
                            <input type="text" value={consultaData.viaAereaObstruida || ''} onChange={e => setConsultaData(d => ({ ...d, viaAereaObstruida: e.target.value }))} />

                            {/* NUEVOS CAMPOS - Examen Físico */}
                            <label>Cabeza:</label>
                            <input value={consultaData.cabeza || ''} onChange={e => setConsultaData(d => ({ ...d, cabeza: e.target.value }))} />
                            <label>Cuello:</label>
                            <input value={consultaData.cuello || ''} onChange={e => setConsultaData(d => ({ ...d, cuello: e.target.value }))} />
                            <label>Tórax:</label>
                            <input value={consultaData.torax || ''} onChange={e => setConsultaData(d => ({ ...d, torax: e.target.value }))} />
                            <label>Abdomen:</label>
                            <input value={consultaData.abdomen || ''} onChange={e => setConsultaData(d => ({ ...d, abdomen: e.target.value }))} />
                            <label>Columna:</label>
                            <input value={consultaData.columna || ''} onChange={e => setConsultaData(d => ({ ...d, columna: e.target.value }))} />
                            <label>Pelvis:</label>
                            <input value={consultaData.pelvis || ''} onChange={e => setConsultaData(d => ({ ...d, pelvis: e.target.value }))} />
                            <label>Extremidades:</label>
                            <input value={consultaData.extremidades || ''} onChange={e => setConsultaData(d => ({ ...d, extremidades: e.target.value }))} />

                            <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '24px 0 8px 0' }} />
                            <h4 style={{ color: '#222', fontWeight: 'bold', margin: 8 }}>Lesiones / Traumatismos</h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                <label>Herida Penetrante:</label>
                                <input value={consultaData.heridaPenetrante || ''} onChange={e => setConsultaData(d => ({ ...d, heridaPenetrante: e.target.value }))} />
                                <label>Herida Cortante:</label>
                                <input value={consultaData.heridaCortante || ''} onChange={e => setConsultaData(d => ({ ...d, heridaCortante: e.target.value }))} />
                                <label>Fractura Expuesta:</label>
                                <input value={consultaData.fracturaExpuesta || ''} onChange={e => setConsultaData(d => ({ ...d, fracturaExpuesta: e.target.value }))} />
                                <label>Fractura Cerrada:</label>
                                <input value={consultaData.fracturaCerrada || ''} onChange={e => setConsultaData(d => ({ ...d, fracturaCerrada: e.target.value }))} />
                                <label>Cuerpo Extraño:</label>
                                <input value={consultaData.cuerpoExtrano || ''} onChange={e => setConsultaData(d => ({ ...d, cuerpoExtrano: e.target.value }))} />
                                <label>Hemorragia:</label>
                                <input value={consultaData.hemorragia || ''} onChange={e => setConsultaData(d => ({ ...d, hemorragia: e.target.value }))} />
                                <label>Mordedura:</label>
                                <input value={consultaData.mordedura || ''} onChange={e => setConsultaData(d => ({ ...d, mordedura: e.target.value }))} />
                                <label>Picadura:</label>
                                <input value={consultaData.picadura || ''} onChange={e => setConsultaData(d => ({ ...d, picadura: e.target.value }))} />
                                <label>Excoriación:</label>
                                <input value={consultaData.excoriacion || ''} onChange={e => setConsultaData(d => ({ ...d, excoriacion: e.target.value }))} />
                                <label>Deformidad o Masa:</label>
                                <input value={consultaData.deformidadOMasa || ''} onChange={e => setConsultaData(d => ({ ...d, deformidadOMasa: e.target.value }))} />
                                <label>Hematoma:</label>
                                <input value={consultaData.hematoma || ''} onChange={e => setConsultaData(d => ({ ...d, hematoma: e.target.value }))} />
                                <label>Eritema / Inflamación:</label>
                                <input value={consultaData.eritemaInflamacion || ''} onChange={e => setConsultaData(d => ({ ...d, eritemaInflamacion: e.target.value }))} />
                                <label>Luxación / Esguince:</label>
                                <input value={consultaData.luxacionEsguince || ''} onChange={e => setConsultaData(d => ({ ...d, luxacionEsguince: e.target.value }))} />
                                <label>Quemadura:</label>
                                <input value={consultaData.quemadura || ''} onChange={e => setConsultaData(d => ({ ...d, quemadura: e.target.value }))} />
                            </div>

                            <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '24px 0 8px 0' }} />
                            <h4 style={{ color: '#222', fontWeight: 'bold', margin: 8 }}>Exámenes solicitados</h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <input type="checkbox" checked={!!consultaData.solicitudExamenBiometria} onChange={e => setConsultaData(d => ({ ...d, solicitudExamenBiometria: e.target.checked }))} /> Examen Biometría
                                </label>
                                <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <input type="checkbox" checked={!!consultaData.solicitudExamenUroanalisis} onChange={e => setConsultaData(d => ({ ...d, solicitudExamenUroanalisis: e.target.checked }))} /> Examen Uroanálisis
                                </label>
                                <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <input type="checkbox" checked={!!consultaData.solicitudExamenQuimicaSanguinea} onChange={e => setConsultaData(d => ({ ...d, solicitudExamenQuimicaSanguinea: e.target.checked }))} /> Examen Química Sanguínea
                                </label>
                                <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <input type="checkbox" checked={!!consultaData.solicitudExamenElectrolitos} onChange={e => setConsultaData(d => ({ ...d, solicitudExamenElectrolitos: e.target.checked }))} /> Examen Electrolitos
                                </label>
                                <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <input type="checkbox" checked={!!consultaData.solicitudExamenGasometria} onChange={e => setConsultaData(d => ({ ...d, solicitudExamenGasometria: e.target.checked }))} /> Examen Gasometría
                                </label>
                                <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <input type="checkbox" checked={!!consultaData.solicitudExamenElectrocardiograma} onChange={e => setConsultaData(d => ({ ...d, solicitudExamenElectrocardiograma: e.target.checked }))} /> Examen Electrocardiograma
                                </label>
                                <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <input type="checkbox" checked={!!consultaData.solicitudExamenEndoscopia} onChange={e => setConsultaData(d => ({ ...d, solicitudExamenEndoscopia: e.target.checked }))} /> Examen Endoscopia
                                </label>
                                <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <input type="checkbox" checked={!!consultaData.solicitudExamenRxTorax} onChange={e => setConsultaData(d => ({ ...d, solicitudExamenRxTorax: e.target.checked }))} /> Examen Rx Tórax
                                </label>
                                <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <input type="checkbox" checked={!!consultaData.solicitudExamenRxAbdomen} onChange={e => setConsultaData(d => ({ ...d, solicitudExamenRxAbdomen: e.target.checked }))} /> Examen Rx Abdomen
                                </label>
                                <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <input type="checkbox" checked={!!consultaData.solicitudExamenRxOsea} onChange={e => setConsultaData(d => ({ ...d, solicitudExamenRxOsea: e.target.checked }))} /> Examen Rx Ósea
                                </label>
                                <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <input type="checkbox" checked={!!consultaData.solicitudExamenTomografia} onChange={e => setConsultaData(d => ({ ...d, solicitudExamenTomografia: e.target.checked }))} /> Examen Tomografía
                                </label>
                                <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <input type="checkbox" checked={!!consultaData.solicitudExamenResonancia} onChange={e => setConsultaData(d => ({ ...d, solicitudExamenResonancia: e.target.checked }))} /> Examen Resonancia
                                </label>
                                <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <input type="checkbox" checked={!!consultaData.solicitudExamenEcografiaPelvica} onChange={e => setConsultaData(d => ({ ...d, solicitudExamenEcografiaPelvica: e.target.checked }))} /> Examen Ecografía Pélvica
                                </label>
                                <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <input type="checkbox" checked={!!consultaData.solicitudExamenEcografiaAbdomen} onChange={e => setConsultaData(d => ({ ...d, solicitudExamenEcografiaAbdomen: e.target.checked }))} /> Examen Ecografía Abdomen
                                </label>
                                <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <input type="checkbox" checked={!!consultaData.solicitudExamenInterconsulta} onChange={e => setConsultaData(d => ({ ...d, solicitudExamenInterconsulta: e.target.checked }))} /> Interconsulta
                                </label>
                                <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <input type="checkbox" checked={!!consultaData.solicitudExamenOtros} onChange={e => setConsultaData(d => ({ ...d, solicitudExamenOtros: e.target.checked }))} /> Otros Exámenes
                                </label>
                            </div>

                            <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '16px 0 24px 0' }} />
                            <h4 style={{ color: '#222', fontWeight: 'bold', margin: 8 }}>Diagnósticos</h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                                <label>Diagnóstico de Ingreso:</label>
                                <input value={consultaData.diagnosticodeIngreso || ''} onChange={e => setConsultaData(d => ({ ...d, diagnosticodeIngreso: e.target.value }))} />
                                <label>Diagnóstico de Alta:</label>
                                <input value={consultaData.diagnosticodeAltade || ''} onChange={e => setConsultaData(d => ({ ...d, diagnosticodeAltade: e.target.value }))} />
                                <label>Plan de Tratamiento e Indicaciones:</label>
                                <textarea value={consultaData.planDeTratamientoIndicaciones || ''} onChange={e => setConsultaData(d => ({ ...d, planDeTratamientoIndicaciones: e.target.value }))} rows={3} />
                                <label>Plan de Tratamiento (Medicamentos):</label>
                                <textarea value={consultaData.planDeTratamientoMedicamentos || ''} onChange={e => setConsultaData(d => ({ ...d, planDeTratamientoMedicamentos: e.target.value }))} rows={3} />
                            </div>
                            <div className="crear-consulta-campo" style={{ marginTop: 12 }}>
                                <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginTop: 8, flexDirection: 'column' }}>
                                    <button type="button" className="crear-consulta-btn" onClick={onAddDocumentoClick} style={{ padding: '6px 10px' }}>
                                        Agregar documento
                                    </button>
                                    <div style={{ fontSize: 13, color: '#666' }}>{adjuntos.length} seleccionado(s)</div>
                                </div>

                                <input ref={fileInputRef} type="file" style={{ display: 'none' }} onChange={onSingleFileChange} />

                                {adjuntos && adjuntos.length > 0 && (
                                    <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 8, borderWidth: 1, borderStyle: 'solid', borderColor: '#e0e0e0', padding: 10, borderRadius: 6, backgroundColor: '#fff', flex: 1 }}>
                                        {adjuntos.map((f, i) => (
                                            <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#fafafa', padding: '8px 10px', borderRadius: 6, border: '1px solid #e6e6e6', maxWidth: '100%' }}>
                                                <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginRight: 8, flex: 1, color: '#333', fontSize: 14, minWidth: 0 }}>
                                                    {f.name} <span style={{ color: '#999', fontSize: 12 }}>({Math.round(f.size / 1024)} KB)</span>
                                                </div>
                                                <button type="button" onClick={() => onRemoveAdjunto(i)} style={{ background: '#ff6b6b', color: '#fff', border: 'none', borderRadius: 4, padding: '4px 8px', cursor: 'pointer' }} aria-label={`Eliminar ${f.name}`}>
                                                    ×
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Recetas (solo lectura en este popup) */}
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

                <div style={{ position: 'sticky', background: '#fff', padding: '10px', display: 'flex', justifyContent: 'center', gap: 20, border: '10px solid #fff' }}>
                    <button
                        type="submit"
                        form="consultaForm"
                        className="revisar-historias-btn"
                        disabled={loadingButtonState || uploadingAdjuntos}
                        style={loadingButtonState ? { background: '#f0f0f0', color: '#666', cursor: 'not-allowed', opacity: 0.95 } : undefined}
                    >
                        {loadingButtonState || uploadingAdjuntos ? 'Guardando...' : (mode === 'create' ? 'Crear' : 'Guardar')}
                    </button>
                    <button type="button" className="revisar-historias-btn revisar-historias-btn-cancel" onClick={onCancel}>Cancelar</button>
                </div>
            </div>
        </div>
    );
};

export default ConsultaPopup;
