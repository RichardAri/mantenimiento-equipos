import React, { useState } from 'react';
import Modal from 'react-modal';
import './Modal.css';

Modal.setAppElement('#root');

const ModalAñadirEquipo = ({ isOpen, onRequestClose, onSave }) => {
  const [codigo, setCodigo] = useState('');
  const [nombre, setNombre] = useState('');
  const [ip, setIp] = useState('');
  const [ram, setRam] = useState('');
  const [procesador, setProcesador] = useState('');
  const [sistemaOperativo, setSistemaOperativo] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevoEquipo = { codigo, nombre, ip, ram, procesador, sistemaOperativo };
    onSave(nuevoEquipo);
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} className="modal">
      <h2>Añadir Equipo</h2>
      <form onSubmit={handleSubmit}>
        <label>Código:</label>
        <input type="text" value={codigo} onChange={(e) => setCodigo(e.target.value)} required />
        <label>Nombre:</label>
        <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
        <label>IP:</label>
        <input type="text" value={ip} onChange={(e) => setIp(e.target.value)} required />
        <label>RAM:</label>
        <input type="text" value={ram} onChange={(e) => setRam(e.target.value)} required />
        <label>Procesador:</label>
        <input type="text" value={procesador} onChange={(e) => setProcesador(e.target.value)} required />
        <label>Sistema Operativo:</label>
        <input type="text" value={sistemaOperativo} onChange={(e) => setSistemaOperativo(e.target.value)} required />
        <button type="submit">Añadir</button>
      </form>
    </Modal>
  );
};

export default ModalAñadirEquipo;
