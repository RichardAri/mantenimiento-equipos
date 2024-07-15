import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import './Modal.css';

Modal.setAppElement('#root');

const ModalEditarTienda = ({ isOpen, onRequestClose, tiendaId }) => {
  const [nombre, setNombre] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const [encargado, setEncargado] = useState('');
  const db = getFirestore();

  useEffect(() => {
    if (tiendaId) {
      const fetchTienda = async () => {
        const docSnap = await getDoc(doc(db, 'tiendas', tiendaId));
        if (docSnap.exists()) {
          const tienda = docSnap.data();
          setNombre(tienda.nombre);
          setUbicacion(tienda.ubicacion);
          setEncargado(tienda.encargado);
        }
      };
      fetchTienda();
    }
  }, [tiendaId, db]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateDoc(doc(db, 'tiendas', tiendaId), {
      nombre,
      ubicacion,
      encargado
    });
    onRequestClose();
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} className="modal">
      <h2>Editar: {nombre}</h2>
      <form onSubmit={handleSubmit}>
        <label>Ubicación:</label>
        <input type="text" value={ubicacion} onChange={(e) => setUbicacion(e.target.value)} required />
        <label>Encargado:</label>
        <input type="text" value={encargado} onChange={(e) => setEncargado(e.target.value)} required />
        <button type="submit">Guardar</button>
      </form>
    </Modal>
  );
};

export default ModalEditarTienda;
