import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { getFirestore, doc, updateDoc, deleteDoc } from "firebase/firestore";
import "../Modal.css";

Modal.setAppElement("#root");

const ModalEditarTienda = ({ isOpen, onRequestClose, tienda }) => {
  const [nombre, setNombre] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  const [encargado, setEncargado] = useState("");
  const db = getFirestore();

  useEffect(() => {
    if (tienda) {
      setNombre(tienda.nombre);
      setUbicacion(tienda.ubicacion);
      setEncargado(tienda.encargado);
    }
  }, [tienda]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const tiendaRef = doc(db, "tiendas", tienda.id);
    await updateDoc(tiendaRef, {
      nombre,
      ubicacion,
      encargado,
    });
    onRequestClose();
  };

  const handleDelete = async () => {
    const tiendaRef = doc(db, "tiendas", tienda.id);
    await deleteDoc(tiendaRef);
    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="modal"
      overlayClassName="modal-overlay"
    >
      <h2>Editar Tienda</h2>
      <form onSubmit={handleSubmit}>
        <label>Tienda:</label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
        <label>Ubicación:</label>
        <input
          type="text"
          value={ubicacion}
          onChange={(e) => setUbicacion(e.target.value)}
          required
        />
        <label>Encargado:</label>
        <input
          type="text"
          value={encargado}
          onChange={(e) => setEncargado(e.target.value)}
          required
        />
        <div className="button-group">
          <button type="submit" className="save-button">
            Guardar
          </button>
          <button
            type="button"
            className="delete-button"
            onClick={handleDelete}
          >
            Eliminar
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default ModalEditarTienda;
