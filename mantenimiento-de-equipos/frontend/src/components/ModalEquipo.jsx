// src/components/ModalEquipo.jsx
import React, { useState, useEffect } from 'react';
import './Modal.css';

const ModalEquipo = ({ data, onSave, onClose }) => {
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
                <h2>{formData.id ? 'EDITAR: ' + formData.nombre : 'AÑADIR EQUIPO'}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Nombre:</label>
                        <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>IP:</label>
                        <input type="text" name="ip" value={formData.ip} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Descripción:</label>
                        <textarea name="descripcion" value={formData.descripcion} onChange={handleChange} required></textarea>
                    </div>
                    <div className="form-group">
                        <label>Último Mantenimiento:</label>
                        <input type="date" name="ultimoMantenimiento" value={formData.ultimoMantenimiento} onChange={handleChange} required />
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

export default ModalEquipo;
