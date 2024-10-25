import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import "../Modal.css";

Modal.setAppElement("#root");

const ModalAñadirMantenimiento = ({
  isOpen,
  onRequestClose,
  onSave,
  equipoId,
  tiendaId,
  mantenimiento, // Nueva propiedad para datos de mantenimiento
}) => {
  const [nombre, setNombre] = useState("Cambio de Disco");
  const [descripcion, setDescripcion] = useState("");
  const [personal, setPersonal] = useState("");
  const [caja, setCaja] = useState("");
  const [area, setArea] = useState("");
  const [modelo, setModelo] = useState("");
  const [so, setSo] = useState("");
  const [procesador, setProcesador] = useState("");
  const [ram, setRam] = useState("");
  const [almacenamiento, setAlmacenamiento] = useState("");
  const [ip, setIp] = useState("");

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
      if (mantenimiento) {
        // Si se está editando, setear el estado con los datos de mantenimiento
        setNombre(mantenimiento.nombre);
        setDescripcion(mantenimiento.descripcion);
        setPersonal(mantenimiento.personal);
        setCaja(mantenimiento.caja || "");
        setArea(mantenimiento.area || "");
        setModelo(mantenimiento.modelo || "");
        setSo(mantenimiento.so || "");
        setProcesador(mantenimiento.procesador || "");
        setRam(mantenimiento.ram || "");
        setAlmacenamiento(mantenimiento.almacenamiento || "");
        setIp(mantenimiento.ip || "");
      } else {
        // Si se está añadiendo, obtener datos del equipo
        fetchEquipoData();
      }
    }
  }, [db, tiendaId, equipoId, isOpen, mantenimiento]);

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

    if (mantenimiento) {
      // Actualizar mantenimiento existente
      const docRef = doc(
        db,
        `tiendas/${tiendaId}/mantenimientos`,
        mantenimiento.id
      );
      await updateDoc(docRef, nuevoMantenimiento);
    } else {
      // Añadir nuevo mantenimiento
      await onSave(nuevoMantenimiento);
    }

    onRequestClose(); // Cerrar el modal después de guardar
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="modal"
      overlayClassName="modal-overlay"
    >
      <h2 className="add-subtitle">
        {mantenimiento ? "Editar Mantenimiento" : "Añadir Mantenimiento"}
      </h2>
      <form onSubmit={handleSubmit} className="form-modal">
        <div className="form-group">
          <label className="form-lbl-text">Nombre del Mantenimiento:</label>
          <select value={nombre} onChange={(e) => setNombre(e.target.value)}>
            <option value="Cambio de Disco">Cambio de Disco</option>
            <option value="Cambio de S.O.">Cambio de S.O.</option>
            <option value="Cambio de Ram">Cambio de Ram</option>
            <option value="Mantenimiento General">Mantenimiento General</option>
          </select>
        </div>
        <div className="form-group">
          <label className="form-lbl-text">Descripción:</label>
          <textarea
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            required
            className="auto-textarea"
          />
        </div>
        <div className="form-group">
          <label className="form-lbl-text">Personal Responsable:</label>
          <input
            type="text"
            value={personal}
            onChange={(e) => setPersonal(e.target.value)}
            required
            className="modal-input"
          />
        </div>
        <h3 className="add-subtitle">Datos del Equipo</h3>

        <div className="form-group">
          <label>Usuario:</label>
          <input
            type="text"
            value={caja}
            onChange={(e) => setCaja(e.target.value)}
            className="modal-input"
          />
        </div>
        <div className="form-group">
          <label>Área:</label>
          <input
            type="text"
            value={area}
            onChange={(e) => setArea(e.target.value)}
            className="modal-input"
          />
        </div>
        <div className="form-group">
          <label>Modelo:</label>
          <input
            type="text"
            value={modelo}
            onChange={(e) => setModelo(e.target.value)}
            className="modal-input"
          />
        </div>
        <div className="form-group">
          <label>Sistema Operativo:</label>
          <input
            type="text"
            value={so}
            onChange={(e) => setSo(e.target.value)}
            className="modal-input"
          />
        </div>
        <div className="form-group">
          <label>Procesador:</label>
          <input
            type="text"
            value={procesador}
            onChange={(e) => setProcesador(e.target.value)}
            className="modal-input"
          />
        </div>
        <div className="form-group">
          <label>Memoria RAM:</label>
          <input
            type="text"
            value={ram}
            onChange={(e) => setRam(e.target.value)}
            className="modal-input"
          />
        </div>
        <div className="form-group">
          <label>Almacenamiento:</label>
          <input
            type="text"
            value={almacenamiento}
            onChange={(e) => setAlmacenamiento(e.target.value)}
            className="modal-input"
          />
        </div>
        <div className="form-group">
          <label>IP:</label>
          <input
            type="text"
            value={ip}
            onChange={(e) => setIp(e.target.value)}
            className="modal-input"
          />
        </div>

        <div className="button-group">
          <button type="submit" className="save-button">
            {mantenimiento
              ? "Actualizar Mantenimiento"
              : "Añadir Mantenimiento"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default ModalAñadirMantenimiento;
