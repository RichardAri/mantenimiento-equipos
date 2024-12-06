import React, { useState, useEffect, lazy, Suspense } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  deleteDoc,
  addDoc,
  getDoc,
  setDoc,
} from "firebase/firestore";
import "./ListaEquipos.css";
import Card from "../../components/Card/Card";

// Lazy loading de los modales
const ModalAñadirEquipo = lazy(() =>
  import("../../Modales/ModalAñadirEquipo/ModalAñadirEquipo")
);
const ModalEditarEquipo = lazy(() =>
  import("../../Modales/ModalEditarEquipo/ModalEditarEquipo")
);

const ListaEquipos = () => {
  const { tiendaId } = useParams(); // Obtenemos el `tiendaId` desde los parámetros de la URL
  const navigate = useNavigate();
  const [equipos, setEquipos] = useState([]);
  const [nombreTienda, setNombreTienda] = useState("");
  const [modalAñadirAbierto, setModalAñadirAbierto] = useState(false);
  const [modalEditarAbierto, setModalEditarAbierto] = useState(false);
  const [equipoSeleccionado, setEquipoSeleccionado] = useState(null);
  const [alertaVisible, setAlertaVisible] = useState(false);
  const [busqueda, setBusqueda] = useState("");
  const db = getFirestore();

  useEffect(() => {
    const fetchTienda = async () => {
      const tiendaDoc = await getDoc(doc(db, "tiendas", tiendaId));
      setNombreTienda(tiendaDoc.data()?.nombre);
    };

    const fetchEquipos = async () => {
      const querySnapshot = await getDocs(
        collection(db, `tiendas/${tiendaId}/equipos`)
      );
      setEquipos(
        querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );
    };

    fetchTienda();
    fetchEquipos();
  }, [db, tiendaId]);

  const abrirModalAñadir = () => setModalAñadirAbierto(true);
  const cerrarModalAñadir = () => setModalAñadirAbierto(false);

  const abrirModalEditar = (equipo) => {
    setEquipoSeleccionado(equipo);
    setModalEditarAbierto(true);
  };

  const cerrarModalEditar = () => setModalEditarAbierto(false);

  const mostrarAlerta = () => {
    setAlertaVisible(true);
    setTimeout(() => {
      setAlertaVisible(false);
    }, 3000);
  };

  const añadirEquipo = async (nuevoEquipo) => {
    try {
      const docRef = await addDoc(
        collection(db, `tiendas/${tiendaId}/equipos`),
        nuevoEquipo
      );
      setEquipos([...equipos, { id: docRef.id, ...nuevoEquipo }]);
      setBusqueda(""); // Limpiar búsqueda después de agregar
      cerrarModalAñadir();
      mostrarAlerta();
    } catch (error) {
      console.error("Error al añadir el equipo: ", error);
    }
  };

  const editarEquipo = async (equipoId, equipoActualizado) => {
    try {
      await setDoc(
        doc(db, `tiendas/${tiendaId}/equipos`, equipoId),
        equipoActualizado
      );
      setEquipos(
        equipos.map((equipo) =>
          equipo.id === equipoId
            ? { id: equipoId, ...equipoActualizado }
            : equipo
        )
      );
      cerrarModalEditar();
    } catch (error) {
      console.error("Error al editar el equipo: ", error);
    }
  };

  const eliminarEquipo = async (equipoId) => {
    try {
      const mantenimientosSnapshot = await getDocs(
        collection(db, `tiendas/${tiendaId}/equipos/${equipoId}/mantenimientos`)
      );

      for (let mantenimientoDoc of mantenimientosSnapshot.docs) {
        await deleteDoc(
          doc(
            db,
            `tiendas/${tiendaId}/equipos/${equipoId}/mantenimientos`,
            mantenimientoDoc.id
          )
        );
      }

      await deleteDoc(doc(db, `tiendas/${tiendaId}/equipos`, equipoId));

      setEquipos(equipos.filter((equipo) => equipo.id !== equipoId));
    } catch (error) {
      console.error("Error al eliminar el equipo y sus mantenimientos:", error);
    }
  };

  const filtrarEquipos = equipos.filter(
    (equipo) =>
      equipo.usuario.toLowerCase().includes(busqueda.toLowerCase()) || false
  );

  return (
    <div className="equipos-container">
      <header>
        <button className="back-button" onClick={() => navigate(-1)}>
          Atrás
        </button>
        <h1>Lista de Equipos: {nombreTienda.toUpperCase()}</h1>
        <button className="add-button" onClick={abrirModalAñadir}>
          Añadir Equipo
        </button>
      </header>
      {alertaVisible && (
        <div className="alerta">Equipo creado exitosamente</div>
      )}
      <input
        className="search-input"
        type="text"
        placeholder="Buscar equipo por usuario"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />
      <div className="card-container">
        {filtrarEquipos.map((equipo) => (
          <Card
            key={equipo.id}
            title={equipo.usuario}
            description={`IP: ${equipo.ip || "No asignada"}`}
            details={[
              `Área: ${equipo.area}`,
              `Modelo: ${equipo.modelo}`,
              `SO: ${equipo.so || "N/A"}`,
              `Procesador: ${equipo.procesador || "N/A"}`,
              `RAM: ${equipo.ram || "N/A"}`,
              `Almacenamiento: ${equipo.almacenamiento || "N/A"}`,
            ]}
            onClick={() =>
              navigate(
                `/tiendas/${tiendaId}/equipos/${equipo.id}/mantenimientos`
              )
            }
            onEditClick={() => abrirModalEditar(equipo)}
          />
        ))}
      </div>
      ;
      <Suspense fallback={<div>Cargando...</div>}>
        {modalAñadirAbierto && (
          <ModalAñadirEquipo
            isOpen={modalAñadirAbierto}
            onRequestClose={cerrarModalAñadir}
            onSave={añadirEquipo}
            tiendaId={tiendaId}
          />
        )}
        {modalEditarAbierto && (
          <ModalEditarEquipo
            isOpen={modalEditarAbierto}
            onRequestClose={cerrarModalEditar}
            equipo={equipoSeleccionado}
            onSave={editarEquipo}
            onDelete={() => eliminarEquipo(equipoSeleccionado.id)}
          />
        )}
      </Suspense>
    </div>
  );
};

export default ListaEquipos;
