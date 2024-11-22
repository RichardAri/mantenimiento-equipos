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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(""); // Reset error state

    const nuevaTienda = {
      nombre,
      ubicacion,
      encargado,
      nroEquipos: 0, // Número de equipos asociados a la tienda
      fechaCreacion: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`, // Fecha completa
      mesCreacion: new Date().getMonth() + 1, // Mes de creación (1-12)
      añoCreacion: new Date().getFullYear(), // Año de creación
      mantenimientos: 0, // Contador de mantenimientos general por tienda 
    };

    try {
      // Guardar en Firebase
      await addDoc(collection(db, "tiendas"), nuevaTienda);

      // Notificar al componente principal que se ha guardado una nueva tienda (si es necesario)
      if (onSave) {
        onSave(nuevaTienda); // Actualizar el estado del componente principal
      }

      // Limpiar los campos del formulario
      setNombre("");
      setUbicacion("");
      setEncargado("");

      // Cerrar el modal después de guardar
      onRequestClose();
    } catch (error) {
      console.error("Error al añadir la tienda: ", error);
      setError("Hubo un problema al añadir la tienda. Intenta de nuevo.");
    } finally {
      setLoading(false); // Para quitar el estado de carga
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

      {error && <div className="error-message">{error}</div>}

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
          <button type="submit" className="save-button" disabled={loading}>
            {loading ? "Guardando..." : "Añadir"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default ModalAñadirTienda;
