import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { doc, updateDoc, increment } from "firebase/firestore";
import { db } from "../../firebase";

Modal.setAppElement("#root");

const ModalAñadirEquipo = ({ isOpen, onRequestClose, onSave, tiendaId }) => {
  const [usuario, setUsuario] = useState("");
  const [area, setArea] = useState("");
  const [modelo, setModelo] = useState("");
  const [so, setSo] = useState("");
  const [procesador, setProcesador] = useState("");
  const [ram, setRam] = useState("");
  const [almacenamiento, setAlmacenamiento] = useState("");
  const [ip, setIp] = useState("");

  useEffect(() => {
    if (!isOpen) resetForm();
  }, [isOpen]);

  const resetForm = () => {
    setUsuario("");
    setArea("");
    setModelo("");
    setSo("");
    setProcesador("");
    setRam("");
    setAlmacenamiento("");
    setIp("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nuevoEquipo = {
      usuario,
      area,
      modelo,
      so,
      procesador,
      ram,
      almacenamiento,
      ip,
      tiendaId, // ID de la tienda a la que pertenece este equipo
      fechaCreacion: `${new Date().getFullYear()}-${
        new Date().getMonth() + 1
      }-${new Date().getDate()}`, // Fecha completa
      mesCreacion: new Date().getMonth() + 1, // Mes de creacion (1-12)
      añoCreacion: new Date().getFullYear(), // Año de creacion
    };
    try {
      // Guardar el equipo usando el callback onSave
      await onSave(nuevoEquipo);
      // Incrementar el numero de equipos en Firestore
      const tiendaRef = doc(db, "tiendas", tiendaId);
      await updateDoc(tiendaRef, {
        nroEquipos: increment(1),
      });

      onRequestClose();
    } catch (error) {
      console.error("Error al añadir equipo:", error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => {
        onRequestClose();
      }}
      className="modal"
      overlayClassName="modal-overlay"
    >
      <button className="close-button" onClick={onRequestClose}>
        &times;
      </button>
      <h2 className="add-subtitle">Añadir Equipo</h2>
      <form className="form-modal" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-lbl-text">Usuario:</label>
          <input
            type="text"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label className="form-lbl-text">Área:</label>
          <input
            type="text"
            value={area}
            onChange={(e) => setArea(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label className="form-lbl-text">Modelo:</label>
          <input
            type="text"
            value={modelo}
            onChange={(e) => setModelo(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label className="form-lbl-text">Sistema Operativo:</label>
          <input
            type="text"
            value={so}
            onChange={(e) => setSo(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label className="form-lbl-text">Procesador:</label>
          <input
            type="text"
            value={procesador}
            onChange={(e) => setProcesador(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label className="form-lbl-text">RAM:</label>
          <input
            type="text"
            value={ram}
            onChange={(e) => setRam(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label className="form-lbl-text">Almacenamiento:</label>
          <input
            type="text"
            value={almacenamiento}
            onChange={(e) => setAlmacenamiento(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label className="form-lbl-text">IP:</label>
          <input
            type="text"
            value={ip}
            onChange={(e) => setIp(e.target.value)}
          />
        </div>
        <div className="button-group">
          <button type="submit" className="save-button">
            Añadir Equipo
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default ModalAñadirEquipo;
