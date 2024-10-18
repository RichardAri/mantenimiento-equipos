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
      <h2>Generar Informe</h2>
      <form onSubmit={handleSubmit}>
        <label className="form-lbl-text">Nombre del Informe:</label>
        <input
          type="text"
          value={nombreInforme}
          onChange={(e) => setNombreInforme(e.target.value)}
          required
        />
        <button type="submit" className="save-button">
          Generar
        </button>
      </form>
    </Modal>
  );
};

export default ModalInformes;
