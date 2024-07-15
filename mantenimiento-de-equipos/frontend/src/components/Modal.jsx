// src/components/Modal.jsx
import React, { useState, useEffect } from 'react';
import './Modal.css';

const Modal = ({ data, onSave, onClose }) => {
    const [formData, setFormData] = useState({ ...data });

    useEffect(() => {
        setFormData({ ...data });
    }, [data]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>{formData.id ? 'EDITAR: ' + formData.nombre : 'AÑADIR TIENDA'}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Tienda:</label>
                        <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Ubicación:</label>
                        <input type="text" name="ubicacion" value={formData.ubicacion} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Nro de Equipos:</label>
                        <input type="number" name="equipos" value={formData.equipos} onChange={handleChange} required readOnly={!!formData.id} />
                    </div>
                    <div className="form-group">
                        <label>Encargado:</label>
                        <input type="text" name="encargado" value={formData.encargado} onChange={handleChange} required />
                    </div>
                    <button type="submit" className="save-button">Guardar</button>
                    <button type="button" onClick={onClose} className="close-button">Cerrar</button>
                </form>
            </div>
        </div>
    );
};

export default Modal;
