import React, { useState } from 'react';
import './RevisionesForm.css';

const RevisionesForm = ({ nombrePaciente }) => {
    const [revisiones, setRevisiones] = useState([{ parte: '', descripcion: '' }]);

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

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Revisiones guardadas');
    };

    return (
        <form className="revisiones-form" onSubmit={handleSubmit}>
            <h3 className="revisiones-titulo">Revisiones para {nombrePaciente}</h3>
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
            >
                Agregar revisión
            </button>
            <button
                type="submit"
                className="revisiones-guardar-btn"
            >
                Guardar revisiones
            </button>
        </form>
    );
};

export default RevisionesForm;
