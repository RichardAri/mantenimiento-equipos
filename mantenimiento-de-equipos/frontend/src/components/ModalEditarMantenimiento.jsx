import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import './Modal.css';

Modal.setAppElement('#root');

const ModalEditarMantenimiento = ({ isOpen, onRequestClose, mantenimientoId }) => {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [personal, setPersonal] = useState('');
  const db = getFirestore();

  useEffect(() => {
    if (mantenimientoId) {
      const fetchMantenimiento = async () => {
        const docSnap = await getDoc(doc(db, 'mantenimientos', mantenimientoId));
        if (docSnap.exists()) {
          const mantenimiento = docSnap.data();
          setNombre(mantenimiento.nombre);
          setDescripcion(mantenimiento.descripcion);
          setPersonal(mantenimiento.personal);
        }
      };
      fetchMantenimiento();
    }
  }, [mantenimientoId, db]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateDoc(doc(db, 'mantenimientos', mantenimientoId), {
      nombre,
      descripcion,
      personal
    });
    onRequestClose();
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} className="modal">
      <h2>Editar: {nombre}</h2>
      <form onSubmit={handleSubmit}>
        <label>Nombre:</label>
        <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
        <label>Descripción:</label>
        <textarea value={descripcion} onChange={(e) => setDescripcion(e.target.value)} required></textarea>
        <label>Personal:</label>
        <input type="text" value={personal} onChange={(e) => setPersonal(e.target.value)} required />
        <button type="submit">Guardar</button>
      </form>
    </Modal>
  );
};

export default ModalEditarMantenimiento;
