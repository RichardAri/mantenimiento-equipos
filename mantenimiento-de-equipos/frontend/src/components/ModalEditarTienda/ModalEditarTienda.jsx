import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { getFirestore, doc, updateDoc, deleteDoc, collection, getDocs } from "firebase/firestore";
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

  // Actualizar tienda
  const handleSubmit = async (e) => {
    e.preventDefault();
    const tiendaRef = doc(db, "tiendas", tienda.id);

    await updateDoc(tiendaRef, {
      nombre,
      ubicacion,
      encargado,
    });

    onSave({ ...tienda, nombre, ubicacion, encargado });
    onRequestClose();
  };

  // Eliminar tienda en cascada
  const handleDelete = async () => {
    if (!tienda) return;

    const tiendaRef = doc(db, "tiendas", tienda.id);

    try {

      // Obtener equipos asociados a la tienda
      const equiposSnapshot = await getDocs(collection(db, "tiendas", tienda.id, "equipos"));

      for (let equipoDoc of equiposSnapshot.docs) {
        const equipoId = equipoDoc.id;

        // Obtener mantenimientos asociados al equipo
        const mantenimientosSnapshot = await getDocs(
          collection(db, "tiendas", tienda.id, "equipos", equipoId, "mantenimientos")
        );

        // Eliminar mantenimientos del equipo
        for (let mantenimientoDoc of mantenimientosSnapshot.docs) {
          await deleteDoc(
            doc(db, "tiendas", tienda.id, "equipos", equipoId, "mantenimientos", mantenimientoDoc.id)
          );
        }

        // Eliminar equipo
        await deleteDoc(doc(db, "tiendas", tienda.id, "equipos", equipoId));
      }

      // Finalmente, eliminar la tienda
      await deleteDoc(tiendaRef);

      // Cerrar el modal una vez eliminada la tienda
      onRequestClose();
      // Notificar al componente principal
      onDelete(tienda.id);
    } catch (error) {
      console.error("Error al eliminar la tienda y su contenido:", error);
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
