import React, { useState, useEffect } from 'react';
import {
    addRevisionToConsulta,
    listRevisionesByConsulta,
    addRecetaToConsulta,
    listRecetasByConsulta,
    addDocumentoToConsulta,
    listDocumentosByConsulta,
    updateRevision, deleteRevision,
    updateReceta, deleteReceta,
    updateDocumento, deleteDocumento
} from '../apiCrud';
import './ManejoConsulta.css';

const ManejoConsulta = ({ consultaID }) => {
    const [revisiones, setRevisiones] = useState([]);
    const [recetas, setRecetas] = useState([]);
    const [documentos, setDocumentos] = useState([]);
    const [loading, setLoading] = useState(false);

    // Form states
    const [revision, setRevision] = useState({ parte: '', descripcion: '' });
    const [receta, setReceta] = useState({ indicaciones: '', s3key: '' });
    const [documento, setDocumento] = useState({ tipo: '', titulo: '', s3key: '', notas: '' });

    // Control de popups
    const [showRevisionForm, setShowRevisionForm] = useState(false);
    const [showRecetaForm, setShowRecetaForm] = useState(false);
    const [showDocumentoForm, setShowDocumentoForm] = useState(false);

    // Estados para edición
    const [editRevisionIdx, setEditRevisionIdx] = useState(null);
    const [editRevisionData, setEditRevisionData] = useState({ parte: '', descripcion: '' });

    const [editRecetaIdx, setEditRecetaIdx] = useState(null);
    const [editRecetaData, setEditRecetaData] = useState({ indicaciones: '', s3key: '' });

    const [editDocumentoIdx, setEditDocumentoIdx] = useState(null);
    const [editDocumentoData, setEditDocumentoData] = useState({ tipo: '', titulo: '', s3key: '', notas: '' });

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const revs = await listRevisionesByConsulta(consultaID);
            const recs = await listRecetasByConsulta(consultaID);
            const docs = await listDocumentosByConsulta(consultaID);
            setRevisiones(revs.items || []);
            setRecetas(recs.items || []);
            setDocumentos(docs.items || []);
            setLoading(false);
        };
        if (consultaID) fetchData();
    }, [consultaID]);

    const handleAddRevision = async (e) => {
        e.preventDefault();
        setLoading(true);
        await addRevisionToConsulta(consultaID, revision);
        const revs = await listRevisionesByConsulta(consultaID);
        setRevisiones(revs.items || []);
        setRevision({ parte: '', descripcion: '' });
        setShowRevisionForm(false);
        setLoading(false);
    };

    const handleAddReceta = async (e) => {
        e.preventDefault();
        setLoading(true);
        await addRecetaToConsulta(consultaID, receta);
        const recs = await listRecetasByConsulta(consultaID);
        setRecetas(recs.items || []);
        setReceta({ indicaciones: '', s3key: '' });
        setShowRecetaForm(false);
        setLoading(false);
    };

    const handleAddDocumento = async (e) => {
        e.preventDefault();
        setLoading(true);
        await addDocumentoToConsulta(consultaID, documento);
        const docs = await listDocumentosByConsulta(consultaID);
        setDocumentos(docs.items || []);
        setDocumento({ tipo: '', titulo: '', s3key: '', notas: '' });
        setShowDocumentoForm(false);
        setLoading(false);
    };

    // Eliminar revisión
    const handleDeleteRevision = async (idx) => {
        const rev = revisiones[idx];
        if (!rev) return;
        setLoading(true);
        await deleteRevision({ id: rev.id, _version: rev._version });
        const revs = await listRevisionesByConsulta(consultaID);
        setRevisiones(revs.items || []);
        setLoading(false);
    };

    // Editar revisión
    const handleEditRevision = (idx) => {
        setEditRevisionIdx(idx);
        setEditRevisionData({ parte: revisiones[idx].parte, descripcion: revisiones[idx].descripcion });
    };

    const handleSaveEditRevision = async (idx) => {
        const rev = revisiones[idx];
        setLoading(true);
        await updateRevision({ id: rev.id, parte: editRevisionData.parte, descripcion: editRevisionData.descripcion, _version: rev._version });
        const revs = await listRevisionesByConsulta(consultaID);
        setRevisiones(revs.items || []);
        setEditRevisionIdx(null);
        setLoading(false);
    };

    // Eliminar receta
    const handleDeleteReceta = async (idx) => {
        const rec = recetas[idx];
        if (!rec) return;
        setLoading(true);
        await deleteReceta({ id: rec.id, _version: rec._version });
        const recs = await listRecetasByConsulta(consultaID);
        setRecetas(recs.items || []);
        setLoading(false);
    };

    // Editar receta
    const handleEditReceta = (idx) => {
        setEditRecetaIdx(idx);
        setEditRecetaData({ indicaciones: recetas[idx].indicaciones, s3key: recetas[idx].s3key });
    };

    const handleSaveEditReceta = async (idx) => {
        const rec = recetas[idx];
        setLoading(true);
        await updateReceta({ id: rec.id, indicaciones: editRecetaData.indicaciones, s3key: editRecetaData.s3key, _version: rec._version });
        const recs = await listRecetasByConsulta(consultaID);
        setRecetas(recs.items || []);
        setEditRecetaIdx(null);
        setLoading(false);
    };

    // Eliminar documento
    const handleDeleteDocumento = async (idx) => {
        const doc = documentos[idx];
        if (!doc) return;
        setLoading(true);
        await deleteDocumento({ id: doc.id, _version: doc._version });
        const docs = await listDocumentosByConsulta(consultaID);
        setDocumentos(docs.items || []);
        setLoading(false);
    };

    // Editar documento
    const handleEditDocumento = (idx) => {
        setEditDocumentoIdx(idx);
        setEditDocumentoData({ tipo: documentos[idx].tipo, titulo: documentos[idx].titulo, s3key: documentos[idx].s3key, notas: documentos[idx].notas });
    };

    const handleSaveEditDocumento = async (idx) => {
        const doc = documentos[idx];
        setLoading(true);
        await updateDocumento({ id: doc.id, tipo: editDocumentoData.tipo, titulo: editDocumentoData.titulo, s3key: editDocumentoData.s3key, notas: editDocumentoData.notas, _version: doc._version });
        const docs = await listDocumentosByConsulta(consultaID);
        setDocumentos(docs.items || []);
        setEditDocumentoIdx(null);
        setLoading(false);
    };

    return (
        <div className="manejo-consulta-container">
            <h3 className="manejo-consulta-titulo">Manejo de Consulta</h3>
            {/* Listados */}
            <div className="manejo-consulta-section">
                <h4 className="manejo-consulta-subtitulo">Revisiones</h4>
                <ul className="manejo-consulta-list">
                    {revisiones.map((r, idx) => (
                        <li key={r.id} className="manejo-consulta-listitem">
                            {/* Iconos editar/eliminar */}
                            <span style={{ marginRight: 8, cursor: 'pointer' }} title="Editar" onClick={() => handleEditRevision(idx)}>✏️</span>
                            <span style={{ marginRight: 8, cursor: 'pointer', color: 'red' }} title="Eliminar" onClick={() => handleDeleteRevision(idx)}>❌</span>
                            {editRevisionIdx === idx ? (
                                <span>
                                    <input
                                        type="text"
                                        value={editRevisionData.parte}
                                        onChange={e => setEditRevisionData(d => ({ ...d, parte: e.target.value }))}
                                        className="manejo-consulta-input"
                                    />
                                    <input
                                        type="text"
                                        value={editRevisionData.descripcion}
                                        onChange={e => setEditRevisionData(d => ({ ...d, descripcion: e.target.value }))}
                                        className="manejo-consulta-input"
                                    />
                                    <button className="manejo-consulta-btn" onClick={() => handleSaveEditRevision(idx)} disabled={loading}>Guardar</button>
                                    <button className="manejo-consulta-btn manejo-consulta-btn-cancel" onClick={() => setEditRevisionIdx(null)}>Cancelar</button>
                                </span>
                            ) : (
                                <span>
                                    <strong>{r.parte}:</strong> {r.descripcion}
                                </span>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="manejo-consulta-section">
                <h4 className="manejo-consulta-subtitulo">Recetas</h4>
                <ul className="manejo-consulta-list">
                    {recetas.map((r, idx) => (
                        <li key={r.id} className="manejo-consulta-listitem">
                            <span style={{ marginRight: 8, cursor: 'pointer' }} title="Editar" onClick={() => handleEditReceta(idx)}>✏️</span>
                            <span style={{ marginRight: 8, cursor: 'pointer', color: 'red' }} title="Eliminar" onClick={() => handleDeleteReceta(idx)}>❌</span>
                            {editRecetaIdx === idx ? (
                                <span>
                                    <input
                                        type="text"
                                        value={editRecetaData.indicaciones}
                                        onChange={e => setEditRecetaData(d => ({ ...d, indicaciones: e.target.value }))}
                                        className="manejo-consulta-input"
                                    />
                                    <input
                                        type="text"
                                        value={editRecetaData.s3key}
                                        onChange={e => setEditRecetaData(d => ({ ...d, s3key: e.target.value }))}
                                        className="manejo-consulta-input"
                                    />
                                    <button className="manejo-consulta-btn" onClick={() => handleSaveEditReceta(idx)} disabled={loading}>Guardar</button>
                                    <button className="manejo-consulta-btn manejo-consulta-btn-cancel" onClick={() => setEditRecetaIdx(null)}>Cancelar</button>
                                </span>
                            ) : (
                                <span>
                                    <strong>Indicaciones:</strong> {r.indicaciones}
                                </span>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="manejo-consulta-section">
                <h4 className="manejo-consulta-subtitulo">Documentos</h4>
                <ul className="manejo-consulta-list">
                    {documentos.map((d, idx) => (
                        <li key={d.id} className="manejo-consulta-listitem">
                            <span style={{ marginRight: 8, cursor: 'pointer' }} title="Editar" onClick={() => handleEditDocumento(idx)}>✏️</span>
                            <span style={{ marginRight: 8, cursor: 'pointer', color: 'red' }} title="Eliminar" onClick={() => handleDeleteDocumento(idx)}>❌</span>
                            {editDocumentoIdx === idx ? (
                                <span>
                                    <input
                                        type="text"
                                        value={editDocumentoData.tipo}
                                        onChange={e => setEditDocumentoData(d2 => ({ ...d2, tipo: e.target.value }))}
                                        className="manejo-consulta-input"
                                    />
                                    <input
                                        type="text"
                                        value={editDocumentoData.titulo}
                                        onChange={e => setEditDocumentoData(d2 => ({ ...d2, titulo: e.target.value }))}
                                        className="manejo-consulta-input"
                                    />
                                    <input
                                        type="text"
                                        value={editDocumentoData.s3key}
                                        onChange={e => setEditDocumentoData(d2 => ({ ...d2, s3key: e.target.value }))}
                                        className="manejo-consulta-input"
                                    />
                                    <input
                                        type="text"
                                        value={editDocumentoData.notas}
                                        onChange={e => setEditDocumentoData(d2 => ({ ...d2, notas: e.target.value }))}
                                        className="manejo-consulta-input"
                                    />
                                    <button className="manejo-consulta-btn" onClick={() => handleSaveEditDocumento(idx)} disabled={loading}>Guardar</button>
                                    <button className="manejo-consulta-btn manejo-consulta-btn-cancel" onClick={() => setEditDocumentoIdx(null)}>Cancelar</button>
                                </span>
                            ) : (
                                <span>
                                    <strong>{d.tipo}:</strong> {d.titulo} {d.notas && <span>- {d.notas}</span>}
                                </span>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
            {/* Botones para agregar */}
            <div className="manejo-consulta-agregar-btns" style={{ display: 'flex', gap: 12, marginTop: 24 }}>
                <button className="manejo-consulta-btn" onClick={() => setShowRevisionForm(true)}>Agregar Revisión</button>
                <button className="manejo-consulta-btn" onClick={() => setShowRecetaForm(true)}>Agregar Receta</button>
                <button className="manejo-consulta-btn" onClick={() => setShowDocumentoForm(true)}>Agregar Documento</button>
            </div>
            {/* Popups para formularios */}
            {
                showRevisionForm && (
                    <div className="manejo-consulta-popup-overlay">
                        <div className="manejo-consulta-popup-content">
                            <h4>Agregar Revisión</h4>
                            <form className="manejo-consulta-form" onSubmit={handleAddRevision}>
                                <input
                                    type="text"
                                    placeholder="Parte"
                                    value={revision.parte}
                                    onChange={e => setRevision(r => ({ ...r, parte: e.target.value }))}
                                    required
                                    className="manejo-consulta-input"
                                />
                                <textarea
                                    placeholder="Descripción"
                                    value={revision.descripcion}
                                    onChange={e => setRevision(r => ({ ...r, descripcion: e.target.value }))}
                                    required
                                    className="manejo-consulta-textarea"
                                />
                                <div style={{ display: 'flex', gap: 8 }}>
                                    <button type="submit" disabled={loading} className="manejo-consulta-btn">Guardar</button>
                                    <button type="button" className="manejo-consulta-btn manejo-consulta-btn-cancel" onClick={() => setShowRevisionForm(false)}>Cancelar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )
            }
            {
                showRecetaForm && (
                    <div className="manejo-consulta-popup-overlay">
                        <div className="manejo-consulta-popup-content">
                            <h4>Agregar Receta</h4>
                            <form className="manejo-consulta-form" onSubmit={handleAddReceta}>
                                <input
                                    type="text"
                                    placeholder="Indicaciones"
                                    value={receta.indicaciones}
                                    onChange={e => setReceta(r => ({ ...r, indicaciones: e.target.value }))}
                                    required
                                    className="manejo-consulta-input"
                                />
                                <input
                                    type="text"
                                    placeholder="S3 Key (opcional)"
                                    value={receta.s3key}
                                    onChange={e => setReceta(r => ({ ...r, s3key: e.target.value }))}
                                    className="manejo-consulta-input"
                                />
                                <div style={{ display: 'flex', gap: 8 }}>
                                    <button type="submit" disabled={loading} className="manejo-consulta-btn">Guardar</button>
                                    <button type="button" className="manejo-consulta-btn manejo-consulta-btn-cancel" onClick={() => setShowRecetaForm(false)}>Cancelar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )
            }
            {
                showDocumentoForm && (
                    <div className="manejo-consulta-popup-overlay">
                        <div className="manejo-consulta-popup-content">
                            <h4>Agregar Documento</h4>
                            <form className="manejo-consulta-form" onSubmit={handleAddDocumento}>
                                <input
                                    type="text"
                                    placeholder="Tipo"
                                    value={documento.tipo}
                                    onChange={e => setDocumento(d => ({ ...d, tipo: e.target.value }))}
                                    required
                                    className="manejo-consulta-input"
                                />
                                <input
                                    type="text"
                                    placeholder="Título"
                                    value={documento.titulo}
                                    onChange={e => setDocumento(d => ({ ...d, titulo: e.target.value }))}
                                    required
                                    className="manejo-consulta-input"
                                />
                                <input
                                    type="text"
                                    placeholder="S3 Key (opcional)"
                                    value={documento.s3key}
                                    onChange={e => setDocumento(d => ({ ...d, s3key: e.target.value }))}
                                    className="manejo-consulta-input"
                                />
                                <textarea
                                    placeholder="Notas"
                                    value={documento.notas}
                                    onChange={e => setDocumento(d => ({ ...d, notas: e.target.value }))}
                                    className="manejo-consulta-textarea"
                                />
                                <div style={{ display: 'flex', gap: 8 }}>
                                    <button type="submit" disabled={loading} className="manejo-consulta-btn">Guardar</button>
                                    <button type="button" className="manejo-consulta-btn manejo-consulta-btn-cancel" onClick={() => setShowDocumentoForm(false)}>Cancelar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )
            }
        </div >
    );
};

export default ManejoConsulta;
