import React, { useState, useEffect } from 'react';
import {
  addRevisionToConsulta,
  listRevisionesByConsulta,
  addRecetaToConsulta,
  listRecetasByConsulta,
  addDocumentoToConsulta,
  listDocumentosByConsulta
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
    setLoading(false);
  };

  const handleAddReceta = async (e) => {
    e.preventDefault();
    setLoading(true);
    await addRecetaToConsulta(consultaID, receta);
    const recs = await listRecetasByConsulta(consultaID);
    setRecetas(recs.items || []);
    setReceta({ indicaciones: '', s3key: '' });
    setLoading(false);
  };

  const handleAddDocumento = async (e) => {
    e.preventDefault();
    setLoading(true);
    await addDocumentoToConsulta(consultaID, documento);
    const docs = await listDocumentosByConsulta(consultaID);
    setDocumentos(docs.items || []);
    setDocumento({ tipo: '', titulo: '', s3key: '', notas: '' });
    setLoading(false);
  };

  return (
    <div className="manejo-consulta-container">
      <h3 className="manejo-consulta-titulo">Manejo de Consulta</h3>
      <div className="manejo-consulta-section">
        <h4 className="manejo-consulta-subtitulo">Agregar Revisión</h4>
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
          <button type="submit" disabled={loading} className="manejo-consulta-btn">Agregar Revisión</button>
        </form>
        <ul className="manejo-consulta-list">
          {revisiones.map(r => (
            <li key={r.id} className="manejo-consulta-listitem">
              <strong>{r.parte}:</strong> {r.descripcion}
            </li>
          ))}
        </ul>
      </div>
      <div className="manejo-consulta-section">
        <h4 className="manejo-consulta-subtitulo">Agregar Receta</h4>
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
          <button type="submit" disabled={loading} className="manejo-consulta-btn">Agregar Receta</button>
        </form>
        <ul className="manejo-consulta-list">
          {recetas.map(r => (
            <li key={r.id} className="manejo-consulta-listitem">
              <strong>Indicaciones:</strong> {r.indicaciones}
            </li>
          ))}
        </ul>
      </div>
      <div className="manejo-consulta-section">
        <h4 className="manejo-consulta-subtitulo">Agregar Documento</h4>
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
          <button type="submit" disabled={loading} className="manejo-consulta-btn">Agregar Documento</button>
        </form>
        <ul className="manejo-consulta-list">
          {documentos.map(d => (
            <li key={d.id} className="manejo-consulta-listitem">
              <strong>{d.tipo}:</strong> {d.titulo} {d.notas && <span>- {d.notas}</span>}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ManejoConsulta;
