import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import './Modal.css';

Modal.setAppElement('#root');

const ModalEditarEquipo = ({ isOpen, onRequestClose, equipoId }) => {
  const [codigo, setCodigo] = useState('');
  const [nombre, setNombre] = useState('');
  const [ip, setIp] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const db = getFirestore();

  useEffect(() => {
    if (equipoId) {
      const fetchEquipo = async () => {
        const docSnap = await getDoc(doc(db, 'equipos', equipoId));
        if (docSnap.exists()) {
          const equipo = docSnap.data();
          setCodigo(equipo.codigo);
          setNombre(equipo.nombre);
          setIp(equipo.ip);
          setDescripcion(equipo.descripcion);
        }
      };
      fetchEquipo();
    }
  }, [equipoId, db]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateDoc(doc(db, 'equipos', equipoId), {
      codigo,
      nombre,
      ip,
      descripcion
    });
    onRequestClose();
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} className="modal">
      <h2>Editar: {codigo}</h2>
      <form onSubmit={handleSubmit}>
        <label>Nombre:</label>
        <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
        <label>IP:</label>
        <input type="text" value={ip} onChange={(e) => setIp(e.target.value)} required />
        <label>Descripción:</label>
        <textarea value={descripcion} onChange={(e) => setDescripcion(e.target.value)} required></textarea>
        <button type="submit">Guardar</button>
      </form>
    </Modal>
  );
};

export default ModalEditarEquipo;
