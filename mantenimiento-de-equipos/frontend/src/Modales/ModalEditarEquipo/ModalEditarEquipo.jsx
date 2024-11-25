import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { doc, updateDoc, increment } from "firebase/firestore";
import { db } from "../../firebase";
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

  const handleSave = () => {
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
    onSave(equipo.id, equipoActualizado);
  };

  const handleDelete = async () => {
    try {
      // Llamar a la función onDelete proporcionada por el padre
      await onDelete(equipo.id);

      // Decrementar el contador de equipos en Firestore
      const tiendaRef = doc(db, "tiendas", tiendaId);
      await updateDoc(tiendaRef, {
        nroEquipos: increment(-1),
      });

      onRequestClose();
    } catch (error) {
      console.error("Error al eliminar el equipo:", error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="modal"
      overlayClassName="modal-overlay"
    >
      <h2>Editar Equipo</h2>
      <form onSubmit={handleSave}>
        <label className="form-lbl-text">
          Usuario
          <input
            type="text"
            placeholder="Usuario"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
          />
        </label>
        <label className="form-lbl-text">
          Área
          <input
            type="text"
            value={area}
            onChange={(e) => setArea(e.target.value)}
          />
        </label>
        <label className="form-lbl-text">
          Modelo
          <input
            type="text"
            value={modelo}
            onChange={(e) => setModelo(e.target.value)}
          />
        </label>
        <label className="form-lbl-text">
          SO
          <input
            type="text"
            value={so}
            onChange={(e) => setSo(e.target.value)}
          />
        </label>
        <label className="form-lbl-text">
          Procesador
          <input
            type="text"
            value={procesador}
            onChange={(e) => setProcesador(e.target.value)}
          />
        </label>
        <label className="form-lbl-text">
          RAM
          <input
            type="text"
            value={ram}
            onChange={(e) => setRam(e.target.value)}
          />
        </label>
        <label className="form-lbl-text">
          Almacenamiento
          <input
            type="text"
            value={almacenamiento}
            onChange={(e) => setAlmacenamiento(e.target.value)}
          />
        </label>
        <label className="form-lbl-text">
          IP
          <input
            type="text"
            value={ip}
            onChange={(e) => setIp(e.target.value)}
          />
        </label>

        {/* Botón Guardar */}
        <div className="button-group">
          <button
            type="submit"
            className="save-button"
            onClick={(e) => {
              e.preventDefault();
              handleSave();
            }}
          >
            Guardar
          </button>
          {/* Botón Eliminar */}
          <button
            type="button"
            className="delete-button"
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(); // Llamar a la función de eliminación
            }}
          >
            Eliminar
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default ModalEditarEquipo;
