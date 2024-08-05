// ModalEditarEquipo.jsx
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import './Modal.css';

Modal.setAppElement('#root');

const ModalEditarEquipo = ({ isOpen, onRequestClose, equipo, onSave, onDelete }) => {
  const [codigo, setCodigo] = useState('');
  const [nombre, setNombre] = useState('');
  const [ip, setIp] = useState('');
  const [descripcion, setDescripcion] = useState('');

  useEffect(() => {
    if (equipo) {
      setCodigo(equipo.codigo || '');
      setNombre(equipo.nombre || '');
      setIp(equipo.ip || '');
      setDescripcion(equipo.descripcion || '');
    }
  }, [equipo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const equipoActualizado = { codigo, nombre, ip, descripcion };
    onSave(equipo.id, equipoActualizado);
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} className="modal">
      <h2 className=''>Editar Equipo</h2>
      <form onSubmit={handleSubmit}>
        <label className='.form-lbl-text' >Código:</label>
        <input type="text" className='readonly-input' value={codigo} onChange={(e) => setCodigo(e.target.value)} readOnly />
        <label className='.form-lbl-text'>Nombre:</label>
        <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
        <label className='.form-lbl-text' >IP:</label>
        <input type="text" value={ip} onChange={(e) => setIp(e.target.value)} required />
        <label className='.form-lbl-text' >Descripción:</label>
        <textarea value={descripcion} onChange={(e) => setDescripcion(e.target.value)} required />
        <div className="button-group">
          <button type="submit" className="save-button">Guardar</button>
          <button type="button" className="delete-button" onClick={() => onDelete(equipo.id)}>Eliminar</button>
        </div>
      </form>
    </Modal>
  );
};

export default ModalEditarEquipo;
