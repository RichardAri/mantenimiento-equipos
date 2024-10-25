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
  const [caja, setCaja] = useState(""); // Nueva información de la caja
  const [area, setArea] = useState(""); // Nueva información del área
  const [modelo, setModelo] = useState(""); // Nueva información del modelo
  const [so, setSo] = useState(""); // Nueva información del sistema operativo
  const [procesador, setProcesador] = useState(""); // Nueva información del procesador
  const [ram, setRam] = useState(""); // Nueva información de la RAM
  const [almacenamiento, setAlmacenamiento] = useState(""); // Nueva información de almacenamiento
  const [ip, setIp] = useState(""); // Nueva información de IP

  const db = getFirestore();

  useEffect(() => {
    const fetchEquipoData = async () => {
      const docRef = doc(db, `tiendas/${tiendaId}/equipos`, equipoId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const equipoData = docSnap.data();
        setCaja(equipoData.caja || "");
        setArea(equipoData.area || "");
        setModelo(equipoData.modelo || "");
        setSo(equipoData.so || "");
        setProcesador(equipoData.procesador || "");
        setRam(equipoData.ram || "");
        setAlmacenamiento(equipoData.almacenamiento || "");
        setIp(equipoData.ip || "");
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
      personal,
      caja,
      area,
      modelo,
      so,
      procesador,
      ram,
      almacenamiento,
      ip,
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
        <div className="form-group">
          <label className="form-lbl-text">Nombre del Mantenimiento:</label>
          <select value={nombre} onChange={(e) => setNombre(e.target.value)}>
            <option value="Cambio de Disco">Cambio de Disco</option>
            <option value="Cambio de S.O.">Cambio de S.O.</option>
            <option value="Cambio de Ram">Cambio de Ram</option>
            <option value="Mantenimiento General">Mantenimiento General</option>
          </select>
        </div>

        <label className="form-lbl-text">Descripción:</label>
        <textarea
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          required
        />

        <label className="form-lbl-text">Personal Responsable:</label>
        <input
          type="text"
          value={personal}
          onChange={(e) => setPersonal(e.target.value)}
          required
        />

        <h3>Datos del Equipo</h3>
        <label className="readonly-label">Caja:</label>
        <input type="text" value={caja} readOnly className="readonly-input" />

        <label className="readonly-label">Área:</label>
        <input type="text" value={area} readOnly className="readonly-input" />

        <label className="readonly-label">Modelo:</label>
        <input type="text" value={modelo} readOnly className="readonly-input" />

        <label className="readonly-label">Sistema Operativo:</label>
        <input type="text" value={so} readOnly className="readonly-input" />

        <label className="readonly-label">Procesador:</label>
        <input
          type="text"
          value={procesador}
          readOnly
          className="readonly-input"
        />

        <label className="readonly-label">Memoria RAM:</label>
        <input type="text" value={ram} readOnly className="readonly-input" />

        <label className="readonly-label">Almacenamiento:</label>
        <input
          type="text"
          value={almacenamiento}
          readOnly
          className="readonly-input"
        />

        <label className="readonly-label">IP:</label>
        <input type="text" value={ip} readOnly className="readonly-input" />

        <button type="submit" className="save-button">
          Añadir Mantenimiento
        </button>
      </form>
    </Modal>
  );
};

export default ModalAñadirMantenimiento;
