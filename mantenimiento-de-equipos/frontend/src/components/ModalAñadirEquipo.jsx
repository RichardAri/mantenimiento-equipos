import React, { useState } from 'react';
import Modal from 'react-modal';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import './Modal.css';

Modal.setAppElement('#root');

const ModalAñadirEquipo = ({ isOpen, onRequestClose, tiendaId }) => {
  const [codigo, setCodigo] = useState('');
  const [nombre, setNombre] = useState('');
  const [ip, setIp] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const db = getFirestore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, 'equipos'), {
      codigo,
      nombre,
      ip,
      descripcion,
      tiendaId
    });
    onRequestClose();
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
        <label>Descripción:</label>
        <textarea value={descripcion} onChange={(e) => setDescripcion(e.target.value)} required></textarea>
        <button type="submit">Añadir</button>
      </form>
    </Modal>
  );
};

export default ModalAñadirEquipo;
