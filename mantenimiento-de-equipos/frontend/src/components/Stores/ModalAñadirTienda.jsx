import React, { useState } from "react";
import Modal from "react-modal";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import "../Modal.css";

Modal.setAppElement("#root");

const ModalAñadirTienda = ({ isOpen, onRequestClose, onSave }) => {
  const [nombre, setNombre] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  const [encargado, setEncargado] = useState("");
  const db = getFirestore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nuevaTienda = {
      nombre,
      ubicacion,
      encargado,
      nroEquipos: 0,
    };

    try {
      // Guardar en Firebase
      await addDoc(collection(db, "tiendas"), nuevaTienda);

      // Limpiar campos
      setNombre("");
      setUbicacion("");
      setEncargado("");
  
      onSave(nuevaTienda); 
      // Primero cerrar el modal
      onRequestClose();
    } catch (error) {
      console.error("Error al añadir la tienda: ", error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="modal"
      overlayClassName="modal-overlay"
    >
      <h2>Añadir Tienda</h2>
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
        <button type="submit" className="add-button">
          Añadir
        </button>
      </form>
    </Modal>
  );
};

export default ModalAñadirTienda;
