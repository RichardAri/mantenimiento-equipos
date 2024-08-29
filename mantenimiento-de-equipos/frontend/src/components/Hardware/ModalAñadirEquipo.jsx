import React, { useState } from 'react';
import Modal from 'react-modal';
import './Modal.css';

Modal.setAppElement('#root');

const ModalAñadirEquipo = ({ isOpen, onRequestClose, onSave }) => {
  const [codigo, setCodigo] = useState('');
  const [nombre, setNombre] = useState('');
  const [ip, setIp] = useState('');
  const [descripcion, setDescripcion] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevoEquipo = { codigo, nombre, ip, descripcion };
    onSave(nuevoEquipo);
    onRequestClose();  // Cerrar modal
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} className="modal" overlayClassName="modal-overlay">
      <h2>Añadir Equipo</h2>
      <form onSubmit={handleSubmit}>
        <label>Código:</label>
        <input type="text" value={codigo} onChange={(e) => setCodigo(e.target.value)} required />
        <label>Nombre:</label>
        <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
        <label>IP:</label>
        <input type="text" value={ip} onChange={(e) => setIp(e.target.value)} required />
        <label>Descripción:</label>
        <textarea value={descripcion} onChange={(e) => setDescripcion(e.target.value)} required />
        <button type="submit" className="save-button">Añadir</button>
      </form>
    </Modal>
  );
};

export default ModalAñadirEquipo;
