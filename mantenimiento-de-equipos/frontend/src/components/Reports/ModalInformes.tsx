import React, { useState } from "react";
import Modal from "react-modal";
import "../Modal.css";

Modal.setAppElement("#root");

const ModalInformes = ({ isOpen, onRequestClose }) => {
  const [nombreInforme, setNombreInforme] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica para generar el informe
    console.log("Generar informe:", nombreInforme);
    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="modal"
      overlayClassName="modal-overlay"
    >
      <button className="close-button" onClick={onRequestClose}>
        &times;
      </button>
      <div className="form-group">
        <h2 className="add-subtitle">Generar Informe</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <label className="form-lbl-text">Nombre del Informe:</label>
        <input
          type="text"
          value={nombreInforme}
          onChange={(e) => setNombreInforme(e.target.value)}
          required
        />
        <div className="form-group">
          <button type="submit" className="save-button">
            Generar
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default ModalInformes;
