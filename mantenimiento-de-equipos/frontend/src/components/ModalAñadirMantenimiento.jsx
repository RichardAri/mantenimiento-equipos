import React, { useState } from 'react';
import Modal from 'react-modal';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import './Modal.css';

Modal.setAppElement('#root');

const ModalAñadirMantenimiento = ({ isOpen, onRequestClose, equipoId }) => {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [personal, setPersonal] = useState('');
  const db = getFirestore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, 'mantenimientos'), {
      nombre,
      descripcion,
      personal,
      fecha: new Date().toLocaleString(),
      equipoId
    });
    onRequestClose();
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} className="modal">
      <h2>Añadir Mantenimiento</h2>
      <form onSubmit={handleSubmit}>
        <label>Nombre:</label>
        <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
        <label>Descripción:</label>
        <textarea value={descripcion} onChange={(e) => setDescripcion(e.target.value)} required></textarea>
        <label>Personal:</label>
        <input type="text" value={personal} onChange={(e) => setPersonal(e.target.value)} required />
        <button type="submit">Añadir</button>
      </form>
    </Modal>
  );
};

export default ModalAñadirMantenimiento;
