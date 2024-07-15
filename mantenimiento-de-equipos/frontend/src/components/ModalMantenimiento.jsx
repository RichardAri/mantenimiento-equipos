// src/components/ModalMantenimiento.jsx
import React, { useState, useEffect } from 'react';
import './Modal.css';

const ModalMantenimiento = ({ data, onSave, onClose }) => {
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
                <h2>{formData.id ? 'EDITAR: ' + formData.nombre : 'AÑADIR MANTENIMIENTO'}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Código:</label>
                        <input type="text" name="codigo" value={formData.codigo} onChange={handleChange} required readOnly={!!formData.id} />
                    </div>
                    <div className="form-group">
                        <label>Nombre:</label>
                        <select name="nombre" value={formData.nombre} onChange={handleChange} required>
                            <option value="Cambio de Disco">Cambio de Disco</option>
                            <option value="Cambio de S.O.">Cambio de S.O.</option>
                            <option value="Cambio de RAM">Cambio de RAM</option>
                            <option value="Mantenimiento General">Mantenimiento General</option>
                            <option value="Formateo de Equipo">Formateo de Equipo</option>
                            <option value="Instalacion de Software">Instalación de Software</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Descripción:</label>
                        <textarea name="descripcion" value={formData.descripcion} onChange={handleChange} required></textarea>
                    </div>
                    <div className="form-group">
                        <label>Fecha:</label>
                        <input type="datetime-local" name="fecha" value={formData.fecha} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Personal:</label>
                        <input type="text" name="personal" value={formData.personal} onChange={handleChange} required />
                    </div>
                    <button type="submit" className="save-button">Guardar</button>
                    <button type="button" onClick={onClose} className="close-button">Cerrar</button>
                </form>
            </div>
        </div>
    );
};

export default ModalMantenimiento;
