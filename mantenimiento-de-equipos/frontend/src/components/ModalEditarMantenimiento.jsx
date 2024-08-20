import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import './Modal.css';

Modal.setAppElement('#root');

const ModalEditarMantenimiento = ({ isOpen, onRequestClose, mantenimiento, onSave, onDelete }) => {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [codigoEquipo, setCodigoEquipo] = useState('');
  const [nombreEquipo, setNombreEquipo] = useState('');
  const [ipEquipo, setIpEquipo] = useState('');
  const [descripcionEquipo, setDescripcionEquipo] = useState('');

  useEffect(() => {
    if (mantenimiento) {
      setNombre(mantenimiento.nombre || '');
      setDescripcion(mantenimiento.descripcion || '');
      setCodigoEquipo(mantenimiento.codigoEquipo || '');
      setNombreEquipo(mantenimiento.nombreEquipo || '');
      setIpEquipo(mantenimiento.ipEquipo || '');
      setDescripcionEquipo(mantenimiento.descripcionEquipo || '');
    }
  }, [mantenimiento]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const mantenimientoActualizado = {
      fecha: mantenimiento.fecha,
      nombre,
      descripcion,
      codigoEquipo,
      nombreEquipo,
      ipEquipo,
      descripcionEquipo,
      personal: mantenimiento.personal
    };
    onSave(mantenimiento.id, mantenimientoActualizado);
  };

  const handleDelete = () => {
    onDelete(mantenimiento.id);
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} className="modal" overlayClassName="modal-overlay">
      <h2 className='add-subtitle'>Editar Mantenimiento</h2>
      <form onSubmit={handleSubmit}>
        <label className="readonly-label">Código del Equipo:</label>
        <input type="text" value={codigoEquipo} readOnly className="readonly-input"/>
        <div className="form-group">
          <label className='form-lbl-text'> Nombre:</label>
        </div>
        <select className='form-lbl-text ' value={nombre} onChange={(e) => setNombre(e.target.value)}>
          <option value="Cambio de Disco">Cambio de Disco</option>
          <option value="Cambio de S.O.">Cambio de S.O.</option>
          <option value="Cambio de Ram">Cambio de Ram</option>
          <option value="Mantenimiento General">Mantenimiento General</option>
        </select>
        <label className='container-txta'>Descripción:
          <textarea value={descripcion} onChange={(e) => setDescripcion(e.target.value)} required className='auto-textarea'/>
        </label>
        <h3 >Cambios</h3>
        <label className='form-lbl-text'>Nombre del Equipo:</label>
        <input type="text" value={nombreEquipo} onChange={(e) => setNombreEquipo(e.target.value)} required />
        <label className='form-lbl-text'>IP del Equipo:</label>
        <input type="text" value={ipEquipo} onChange={(e) => setIpEquipo(e.target.value)} required />
        <label className='form-lbl-text'>Descripción del Equipo:</label>
        <textarea value={descripcionEquipo} onChange={(e) => setDescripcionEquipo(e.target.value)} required />
        <div className="button-group">
          <button type="submit" className="save-button">Guardar</button>
          <button type="button" className="delete-button" onClick={handleDelete}>Eliminar</button>
        </div>
      </form>
    </Modal>
  );
};

export default ModalEditarMantenimiento;
