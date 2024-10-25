import React, { useState } from "react";
import Modal from "react-modal";
import "../Modal.css";

Modal.setAppElement("#root");

const ModalAñadirEquipo = ({ isOpen, onRequestClose, onSave }) => {
  const [usuario, setUsuario] = useState("");
  const [area, setArea] = useState("");
  const [modelo, setModelo] = useState("");
  const [so, setSo] = useState("");
  const [procesador, setProcesador] = useState("");
  const [ram, setRam] = useState("");
  const [almacenamiento, setAlmacenamiento] = useState("");
  const [ip, setIp] = useState("");

  const handleSubmit = (e) => {
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
    };
    onSave(nuevoEquipo); // Envía los datos del nuevo equipo al padre (ListaEquipos)
    onRequestClose(); // Cierra el modal después de guardar
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="modal"
      overlayClassName="modal-overlay"
    >
      <h2>Añadir Equipo</h2>
      <form onSubmit={handleSubmit}>
        <label>Usuario:</label>
        <input
          type="text"
          value={usuario}
          className="user"
          onChange={(e) => setUsuario(e.target.value)}
          required
        />
        <label>Área:</label>
        <input
          type="text"
          value={area}
          onChange={(e) => setArea(e.target.value)}
          required
        />
        <label>Modelo:</label>
        <input
          type="text"
          value={modelo}
          onChange={(e) => setModelo(e.target.value)}
          required
        />
        <label>SO:</label>
        <input type="text" value={so} onChange={(e) => setSo(e.target.value)} />
        <label>Procesador:</label>
        <input
          type="text"
          value={procesador}
          onChange={(e) => setProcesador(e.target.value)}
        />
        <label>RAM:</label>
        <input
          type="text"
          value={ram}
          onChange={(e) => setRam(e.target.value)}
        />
        <label>Almacenamiento:</label>
        <input
          type="text"
          value={almacenamiento}
          onChange={(e) => setAlmacenamiento(e.target.value)}
        />
        <label>IP:</label>
        <input type="text" value={ip} onChange={(e) => setIp(e.target.value)} />
        <button type="submit" className="save-button">
          Añadir
        </button>
      </form>
    </Modal>
  );
};

export default ModalAñadirEquipo;

