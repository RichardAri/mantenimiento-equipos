import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { getFirestore, doc, deleteDoc, collection, getDocs, query, where } from "firebase/firestore";
import "../Modal.css";

Modal.setAppElement("#root");

const ModalEditarTienda = ({
  isOpen,
  onRequestClose,
  tienda,
  onSave,
  onDelete,
}) => {
  const [nombre, setNombre] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  const [encargado, setEncargado] = useState("");
  const db = getFirestore();

  useEffect(() => {
    if (tienda) {
      setNombre(tienda.nombre);
      setUbicacion(tienda.ubicacion);
      setEncargado(tienda.encargado);
    }
  }, [tienda]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const tiendaRef = doc(db, "tiendas", tienda.id);

    // Primero cerrar el modal
    onRequestClose();

    // Luego actualizar la tienda en Firebase
    await updateDoc(tiendaRef, {
      nombre,
      ubicacion,
      encargado,
    });

    // Llamar a onSave para actualizar la tienda en la lista y mostrar la notificación
    onSave({ ...tienda, nombre, ubicacion, encargado });
  };

  const handleDelete = async () => {
    const db = getFirestore();
    const tiendaRef = doc(db, "tiendas", tienda.id);
  
    try {
      // Primero cerrar el modal
      onRequestClose();
  
      // Eliminar los equipos asociados a la tienda
      const equiposRef = collection(db, "equipos");
      const equiposSnapshot = await getDocs(query(equiposRef, where("tiendaId", "==", tienda.id)));
      
      for (const equipoDoc of equiposSnapshot.docs) {
        const equipoId = equipoDoc.id;
        const mantenimientosRef = collection(db, "equipos", equipoId, "mantenimientos");
  
        // Eliminar los mantenimientos de cada equipo
        const mantenimientosSnapshot = await getDocs(mantenimientosRef);
        for (const mantenimientoDoc of mantenimientosSnapshot.docs) {
          await deleteDoc(mantenimientoDoc.ref);
        }
  
        // Luego, eliminar el equipo
        await deleteDoc(equipoDoc.ref);
      }
  
      // Finalmente, eliminar la tienda
      await deleteDoc(tiendaRef);
  
      // Actualizar la lista y mostrar la notificación
      onDelete(tienda.id);
    } catch (error) {
      console.error("Error al eliminar la tienda y sus datos relacionados: ", error);
    }
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
      <h2>Editar Tienda</h2>
      <form onSubmit={handleSubmit}>
        <label>Tienda:</label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
        <label>Ubicación:</label>
        <input
          type="text"
          value={ubicacion}
          onChange={(e) => setUbicacion(e.target.value)}
          required
        />
        <label>Encargado:</label>
        <input
          type="text"
          value={encargado}
          onChange={(e) => setEncargado(e.target.value)}
          required
        />
        <div className="button-group">
          <button type="submit" className="save-button">
            Guardar
          </button>
          <button
            type="button"
            className="delete-button"
            onClick={handleDelete}
          >
            Eliminar
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default ModalEditarTienda;
