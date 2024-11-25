import React, { useState, useEffect, lazy, Suspense } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  getDoc,
  addDoc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import "./ListaMantenimientos.css";

// Importación diferida (lazy loading) de los modales
const ModalAñadirMantenimiento = lazy(() =>
  import("../../Modales/ModalAñadirMantenimiento/ModalAñadirMantenimiento")
);
const ModalEditarMantenimiento = lazy(() =>
  import("../../Modales/ModalEditarMantenimiento/ModalEditarMantenimiento")
);

const ListaMantenimientos = () => {
  const { tiendaId, equipoId } = useParams();
  const navigate = useNavigate();
  const [mantenimientos, setMantenimientos] = useState([]);
  const [equipoNombre, setEquipoNombre] = useState("");
  const [modalAñadirAbierto, setModalAñadirAbierto] = useState(false);
  const [modalEditarAbierto, setModalEditarAbierto] = useState(false);
  const [mantenimientoSeleccionado, setMantenimientoSeleccionado] =
    useState(null);
  const db = getFirestore();

  useEffect(() => {
    const fetchMantenimientos = async () => {
      const querySnapshot = await getDocs(
        collection(db, `tiendas/${tiendaId}/equipos/${equipoId}/mantenimientos`)
      );
      setMantenimientos(
        querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );
    };

    const fetchEquipoNombre = async () => {
      const docRef = doc(db, `tiendas/${tiendaId}/equipos`, equipoId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setEquipoNombre(docSnap.data().usuario);
      }
    };

    fetchMantenimientos();
    fetchEquipoNombre();
  }, [db, tiendaId, equipoId]);

  const abrirModalAñadir = () => setModalAñadirAbierto(true);
  const cerrarModalAñadir = () => setModalAñadirAbierto(false);

  const abrirModalEditar = (mantenimiento) => {
    setMantenimientoSeleccionado(mantenimiento);
    setModalEditarAbierto(true);
  };
  const cerrarModalEditar = () => setModalEditarAbierto(false);

  const añadirMantenimiento = async (nuevoMantenimiento) => {
    const docRef = await addDoc(
      collection(db, `tiendas/${tiendaId}/equipos/${equipoId}/mantenimientos`),
      nuevoMantenimiento
    );
    setMantenimientos([
      ...mantenimientos,
      { id: docRef.id, ...nuevoMantenimiento },
    ]);
    cerrarModalAñadir();
  };

  const editarMantenimiento = async (
    mantenimientoId,
    mantenimientoActualizado
  ) => {
    await updateDoc(
      doc(
        db,
        `tiendas/${tiendaId}/equipos/${equipoId}/mantenimientos`,
        mantenimientoId
      ),
      mantenimientoActualizado
    );
    setMantenimientos(
      mantenimientos.map((mantenimiento) =>
        mantenimiento.id === mantenimientoId
          ? { id: mantenimientoId, ...mantenimientoActualizado }
          : mantenimiento
      )
    );
    cerrarModalEditar();
  };

  const eliminarMantenimiento = async (mantenimientoId) => {
    await deleteDoc(
      doc(
        db,
        `tiendas/${tiendaId}/equipos/${equipoId}/mantenimientos`,
        mantenimientoId
      )
    );
    setMantenimientos(
      mantenimientos.filter(
        (mantenimiento) => mantenimiento.id !== mantenimientoId
      )
    );
    cerrarModalEditar();
  };

  return (
    <div className="mantenimientos-container">
      <header>
        <button className="back-button" onClick={() => navigate(-1)}>
          Atrás
        </button>
        <h1>Lista de Mantenimientos: {equipoNombre}</h1>
        <button className="add-button" onClick={abrirModalAñadir}>
          Añadir Mantenimiento
        </button>
      </header>
      <div className="card-container">
        {mantenimientos
          .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
          .map((mantenimiento) => (
            <div
              className="card"
              key={mantenimiento.id}
              onClick={() => abrirModalEditar(mantenimiento)}
            >
              <h2>{new Date(mantenimiento.fecha).toLocaleString()}</h2>
              <p>Usuario: {mantenimiento.usuario}</p>
              <p>Caja: {mantenimiento.caja}</p>
              <p>Área: {mantenimiento.area}</p>
              <p>Modelo: {mantenimiento.modelo}</p>
              <p>SO: {mantenimiento.so}</p>
              <p>Procesador: {mantenimiento.procesador}</p>
              <p>RAM: {mantenimiento.ram}</p>
              <p>Almacenamiento: {mantenimiento.almacenamiento}</p>
              <p>IP: {mantenimiento.ip}</p>
            </div>
          ))}
      </div>
      <Suspense fallback={<div>Cargando...</div>}>
        {modalAñadirAbierto && (
          <ModalAñadirMantenimiento
            isOpen={modalAñadirAbierto}
            onRequestClose={cerrarModalAñadir}
            onSave={añadirMantenimiento}
            equipoId={equipoId}
            tiendaId={tiendaId}
          />
        )}
        {modalEditarAbierto && (
          <ModalEditarMantenimiento
            isOpen={modalEditarAbierto}
            onRequestClose={cerrarModalEditar}
            mantenimiento={mantenimientoSeleccionado}
            onSave={editarMantenimiento}
            onDelete={eliminarMantenimiento}
          />
        )}
      </Suspense>
    </div>
  );
};

export default ListaMantenimientos;
