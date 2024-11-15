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
      nroEquipos: 0, // numero de equipos asociados a la tienda
      fechaCreacion: new Date().toISOString(), // Fecha completa
      mesCreacion: new Date().getMonth() + 1, // Mes de creacion (1-12)
      añoCreacion: new Date().getFullYear(), // Año de creacion
      mantenimientos: 0, // Contador de mantenimientos
    };

    // Primero añadir la tienda y mostrar la notificacion
    onSave(nuevaTienda);

    // Despues cerrar el modal
    onRequestClose();

    try {
      // Guardar en Firebase
      await addDoc(collection(db, "tiendas"), nuevaTienda);

      // Limpiar campos
      setNombre("");
      setUbicacion("");
      setEncargado("");
      setFechaDeCreacion("");
    } catch (error) {
      console.error("Error al añadir la tienda: ", error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="modal-tienda"
      overlayClassName="modal-overlay-tienda"
    >
      <button className="close-button" onClick={onRequestClose}>
        &times;
      </button>
      <h2 className="add-subtitle">Añadir Tienda</h2>
      <form onSubmit={handleSubmit} className="form-tienda">
        <div className="form-group">
          <label className="form-lbl-text">Tienda:</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
            className="input-txt"
          />
        </div>
        <div className="form-group">
          <label className="form-lbl-text">Ubicación:</label>
          <input
            type="text"
            value={ubicacion}
            onChange={(e) => setUbicacion(e.target.value)}
            required
            className="input-txt"
          />
        </div>
        <div className="form-group">
          <label className="form-lbl-text">Encargado:</label>
          <input
            type="text"
            value={encargado}
            onChange={(e) => setEncargado(e.target.value)}
            required
            className="input-txt"
          />
        </div>
        <div className="form-group">
          <button type="submit" className="save-button">
            Añadir
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default ModalAñadirTienda;
