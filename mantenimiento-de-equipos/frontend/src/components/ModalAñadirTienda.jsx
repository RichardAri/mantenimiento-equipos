import React, { useState } from 'react';
import Modal from 'react-modal';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import './ModalAñadirTienda.css';

Modal.setAppElement('#root');

const ModalAñadirTienda = ({ isOpen, onRequestClose }) => {
  const [nombre, setNombre] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const [encargado, setEncargado] = useState('');
  const db = getFirestore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, 'tiendas'), {
      nombre,
      ubicacion,
      encargado,
      nroEquipos: 0
    });
    onRequestClose();
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} className="modal">
      <h2>Añadir Tienda</h2>
      <form onSubmit={handleSubmit}>
        <label>Tienda:</label>
        <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
        <label>Ubicación:</label>
        <input type="text" value={ubicacion} onChange={(e) => setUbicacion(e.target.value)} required />
        <label>Encargado:</label>
        <input type="text" value={encargado} onChange={(e) => setEncargado(e.target.value)} required />
        <button type="submit">Añadir</button>
      </form>
    </Modal>
  );
};

export default ModalAñadirTienda;
