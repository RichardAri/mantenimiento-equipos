import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import "../Modal.css";

Modal.setAppElement("#root");

const ModalAñadirMantenimiento = ({
  isOpen,
  onRequestClose,
  onSave,
  equipoId,
  tiendaId,
}) => {
  const [nombre, setNombre] = useState("Cambio de Disco");
  const [descripcion, setDescripcion] = useState("");
  const [personal, setPersonal] = useState("");
  const [codigoEquipo, setCodigoEquipo] = useState("");
  const [nombreEquipo, setNombreEquipo] = useState("");
  const [ipEquipo, setIpEquipo] = useState("");
  const [descripcionEquipo, setDescripcionEquipo] = useState("");
  const db = getFirestore();

  useEffect(() => {
    const fetchEquipoData = async () => {
      const docRef = doc(db, `tiendas/${tiendaId}/equipos`, equipoId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const equipoData = docSnap.data();
        setCodigoEquipo(equipoData.codigo);
        setNombreEquipo(equipoData.nombre);
        setIpEquipo(equipoData.ip);
        setDescripcionEquipo(equipoData.descripcion);
      }
    };
    if (isOpen) {
      fetchEquipoData();
    }
  }, [db, tiendaId, equipoId, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nuevoMantenimiento = {
      fecha: new Date().toISOString(),
      nombre,
      descripcion,
      codigoEquipo,
      nombreEquipo,
      ipEquipo,
      descripcionEquipo,
      personal,
    };
    await onSave(nuevoMantenimiento);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="modal"
      overlayClassName="modal-overlay"
    >
      <h2 className="add-subtitle">Añadir Mantenimiento</h2>
      <form onSubmit={handleSubmit}>
        <label className="readonly-label">Código del Equipo:</label>
        <input
          type="text"
          value={codigoEquipo}
          readOnly
          className="readonly-input"
        />
        <div className="form-group">
          <label className="form-lbl-text">Nombre: </label>
          <select value={nombre} onChange={(e) => setNombre(e.target.value)}>
            <option className="form-lbl-text" value="Cambio de Disco">
              Cambio de Disco
            </option>
            <option value="Cambio de S.O.">Cambio de S.O.</option>
            <option value="Cambio de Ram">Cambio de Ram</option>
            <option value="Mantenimiento General">Mantenimiento General</option>
          </select>
        </div>
        <label className="form-lbl-text"> Descripción: </label>
        <textarea
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          required
        />
        <label className="form-lbl-text">Personal:</label>
        <input
          type="text"
          value={personal}
          onChange={(e) => setPersonal(e.target.value)}
          required
        />
        <h3>Cambios</h3>
        <label className="form-lbl-text">Nombre del Equipo:</label>
        <input
          type="text"
          value={nombreEquipo}
          onChange={(e) => setNombreEquipo(e.target.value)}
        />
        <label>IP del Equipo:</label>
        <input
          type="text"
          value={ipEquipo}
          onChange={(e) => setIpEquipo(e.target.value)}
        />
        <label>Descripción del Equipo:</label>
        <textarea
          value={descripcionEquipo}
          onChange={(e) => setDescripcionEquipo(e.target.value)}
        />
        <button type="submit" className="save-button">
          Añadir
        </button>
      </form>
    </Modal>
  );
};

export default ModalAñadirMantenimiento;
