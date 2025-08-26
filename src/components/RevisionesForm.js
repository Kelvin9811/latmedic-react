import React, { useState } from 'react';
import './RevisionesForm.css';

const RevisionesForm = ({ cliente, usuario, onGuardado }) => {
    const [revisiones, setRevisiones] = useState([{ parte: '', descripcion: '' }]);
    const [loading, setLoading] = useState(false);
    const [showPopup, setShowPopup] = useState(false);

    const handleChange = (idx, field, value) => {
        const nuevas = revisiones.map((rev, i) =>
            i === idx ? { ...rev, [field]: value } : rev
        );
        setRevisiones(nuevas);
    };

    const agregarRevision = () => {
        setRevisiones([...revisiones, { parte: '', descripcion: '' }]);
    };

    const eliminarRevision = (idx) => {
        setRevisiones(revisiones.filter((_, i) => i !== idx));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const body = JSON.stringify({
                usuario,
                cliente,
                revisiones
            });
            const response = await fetch('http://creacion-api/v1/api-creacion-historia-clinica', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body
            });
            if (response.ok) {
                setRevisiones([{ parte: '', descripcion: '' }]);
                setShowPopup(true);
            } else {
                setShowPopup(true); // También muestra el popup en error, puedes personalizar el mensaje si quieres
            }
        } catch (err) {
            setShowPopup(true);
        }
        setLoading(false);
    };

    const handlePopupClose = () => {
        setShowPopup(false);
        if (onGuardado) onGuardado();
    };

    return (
        <>
            <form className="revisiones-form" onSubmit={handleSubmit}>
                <h3 className="revisiones-titulo">Revisiones para {cliente?.nombre}</h3>
                {revisiones.map((rev, idx) => (
                    <div key={idx} className="revisiones-row">
                        <div className="revisiones-seccion-x">
                            <div className="revisiones-campo revisiones-campo-seccion">
                                <label>Area de revision:</label>
                                <div className="revisiones-campo revisiones-campo-input">
                                    <input
                                        type="text"
                                        value={rev.parte}
                                        onChange={e => handleChange(idx, 'parte', e.target.value)}
                                        required
                                    />
                                    <button
                                        type="button"
                                        className="revisiones-eliminar-btn"
                                        onClick={() => eliminarRevision(idx)}
                                        title="Eliminar"
                                    >
                                        ×
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="revisiones-campo revisiones-campo-descripcion">
                            <label>Descripción:</label>
                            <textarea
                                value={rev.descripcion}
                                onChange={e => handleChange(idx, 'descripcion', e.target.value)}
                                required
                                rows={3}
                                className="revisiones-descripcion-textarea"
                            />
                        </div>
                    </div>
                ))}
                <button
                    type="button"
                    className="revisiones-agregar-btn"
                    onClick={agregarRevision}
                    disabled={loading}
                >
                    Agregar revisión
                </button>
                <button
                    type="submit"
                    className="revisiones-guardar-btn"
                    disabled={loading}
                >
                    {loading ? 'Guardando...' : 'Guardar revisiones'}
                </button>
            </form>
            {showPopup && (
                <div className="popup-overlay">
                    <div className="popup-content">
                        <h4>Historia clínica guardada</h4>
                        <p>
                            La historia clínica del paciente <strong>{cliente?.nombre}</strong> ha sido guardada con éxito.
                        </p>
                        <button className="popup-btn" onClick={handlePopupClose}>Aceptar</button>
                    </div>
                </div>
            )}
        </>
    );
};

export default RevisionesForm;
