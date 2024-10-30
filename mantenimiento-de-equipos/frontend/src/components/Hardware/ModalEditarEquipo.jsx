import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import "../Modal.css";

Modal.setAppElement("#root");

const ModalEditarEquipo = ({
  isOpen,
  onRequestClose,
  equipo,
  onSave,
  onDelete,
}) => {
  const [usuario, setUsuario] = useState("");
  const [area, setArea] = useState("");
  const [modelo, setModelo] = useState("");
  const [so, setSo] = useState("");
  const [procesador, setProcesador] = useState("");
  const [ram, setRam] = useState("");
  const [almacenamiento, setAlmacenamiento] = useState("");
  const [ip, setIp] = useState("");

  useEffect(() => {
    if (equipo) {
      setUsuario(equipo.usuario || "");
      setArea(equipo.area || "");
      setModelo(equipo.modelo || "");
      setSo(equipo.so || "");
      setProcesador(equipo.procesador || "");
      setRam(equipo.ram || "");
      setAlmacenamiento(equipo.almacenamiento || "");
      setIp(equipo.ip || "");
    }
  }, [equipo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const equipoActualizado = {
      usuario,
      area,
      modelo,
      so,
      procesador,
      ram,
      almacenamiento,
      ip,
    };
    onSave(equipo.id, equipoActualizado); // Enviar equipo actualizado
    onRequestClose(); // Cerrar modal
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
      <h2 className="">Editar Equipo</h2>
      <form onSubmit={handleSubmit}>
        <label className="form-lbl-text">Usuario:</label>
        <input
          type="text"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          required
        />
        <label className="form-lbl-text">Área:</label>
        <input
          type="text"
          value={area}
          onChange={(e) => setArea(e.target.value)}
          required
        />
        <label className="form-lbl-text">Modelo:</label>
        <input
          type="text"
          value={modelo}
          onChange={(e) => setModelo(e.target.value)}
          required
        />
        <label className="form-lbl-text">SO:</label>
        <input type="text" value={so} onChange={(e) => setSo(e.target.value)} />
        <label className="form-lbl-text">Procesador:</label>
        <input
          type="text"
          value={procesador}
          onChange={(e) => setProcesador(e.target.value)}
        />
        <label className="form-lbl-text">RAM:</label>
        <input
          type="text"
          value={ram}
          onChange={(e) => setRam(e.target.value)}
        />
        <label className="form-lbl-text">Almacenamiento:</label>
        <input
          type="text"
          value={almacenamiento}
          onChange={(e) => setAlmacenamiento(e.target.value)}
        />
        <label className="form-lbl-text">IP:</label>
        <input type="text" value={ip} onChange={(e) => setIp(e.target.value)} />
        <div className="button-group">
          <button type="submit" className="save-button">
            Guardar
          </button>
          <button
            type="button"
            className="delete-button"
            onClick={() => onDelete(equipo.id)}
          >
            Eliminar
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default ModalEditarEquipo;
