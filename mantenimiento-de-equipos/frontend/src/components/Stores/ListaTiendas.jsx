import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  limit,
  startAfter,
} from "firebase/firestore"; // Asegúrate de tener las funciones necesarias

import ModalAñadirTienda from "./ModalAñadirTienda";
import ModalEditarTienda from "./ModalEditarTienda";
import "./ListaTiendas.css";

const ListaTiendas = () => {
  const [tiendas, setTiendas] = useState([]);
  const [modalAñadirAbierto, setModalAñadirAbierto] = useState(false);
  const [modalEditarAbierto, setModalEditarAbierto] = useState(false);
  const [tiendaSeleccionada, setTiendaSeleccionada] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [notification, setNotification] = useState("");
  const [lastVisible, setLastVisible] = useState(null); // Controla la paginación
  const [loading, setLoading] = useState(false); // Estado de carga

  const db = getFirestore();
  const navigate = useNavigate();

  // Función para obtener tiendas con paginación
  const fetchTiendas = async () => {
    setLoading(true); // Muestra un indicador de carga

    const tiendaRef = collection(db, "tiendas");
    const tiendaQuery = lastVisible
      ? query(tiendaRef, limit(10), startAfter(lastVisible)) // Si hay un `lastVisible`, usa paginación
      : query(tiendaRef, limit(10)); // Primera carga con límite de 10

    const querySnapshot = await getDocs(tiendaQuery);

    const tiendasData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setTiendas((prevTiendas) => [...prevTiendas, ...tiendasData]); // Añade las tiendas nuevas

    const lastVisibleDoc = querySnapshot.docs[querySnapshot.docs.length - 1];
    setLastVisible(lastVisibleDoc); // Guarda el último documento para cargar más en la siguiente solicitud

    setLoading(false); // Oculta el indicador de carga
  };

  useEffect(() => {
    fetchTiendas();
  }, [db]);

  // Filtrar las tiendas en base al término de búsqueda
  const filteredTiendas = useMemo(
    () =>
      tiendas.filter((tienda) =>
        tienda.nombre.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [tiendas, searchTerm]
  );

  const abrirModalAñadir = () => setModalAñadirAbierto(true);
  const cerrarModalAñadir = () => setModalAñadirAbierto(false);
  const abrirModalEditar = (tienda) => {
    setTiendaSeleccionada(tienda);
    setModalEditarAbierto(true);
  };
  const cerrarModalEditar = () => setModalEditarAbierto(false);

  const navegarAEquipos = (tiendaId) => {
    navigate(`/tiendas/${tiendaId}/equipos`);
  };

  const handleSaveTienda = (nuevaTienda) => {
    setTiendas((prevTiendas) => [...prevTiendas, nuevaTienda]);
    setNotification("Tienda añadida exitosamente!");
    setTimeout(() => setNotification(""), 3000);
  };

  const handleSaveTiendaEditada = (tiendaActualizada) => {
    setTiendas((prevTiendas) =>
      prevTiendas.map((tienda) =>
        tienda.id === tiendaActualizada.id ? tiendaActualizada : tienda
      )
    );
    setNotification("Tienda actualizada exitosamente!");
    setTimeout(() => setNotification(""), 3000);
  };

  const handleDeleteTienda = (tiendaId) => {
    setTiendas((prevTiendas) =>
      prevTiendas.filter((tienda) => tienda.id !== tiendaId)
    );
    setNotification("Tienda eliminada exitosamente!");
    setTimeout(() => setNotification(""), 3000);
  };

  return (
    <div className="tiendas-container">
      <header>
        <h1 className="title-page">Capriccio</h1>
        <button className="add-button" onClick={abrirModalAñadir}>
          Añadir Tienda
        </button>
      </header>
      <input
        type="text"
        placeholder="Buscar tienda..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      <div className="card-container">
        {filteredTiendas.map((tienda) => (
          <div
            className="card"
            key={tienda.id}
            onClick={() => navegarAEquipos(tienda.id)}
            style={{ cursor: "pointer" }}
          >
            <h2>{tienda.nombre}</h2>
            <p>Ubicación: {tienda.ubicacion}</p>
            <p>Nro de Equipos: {tienda.nroEquipos}</p>
            <p>Encargado: {tienda.encargado}</p>
            <div>
              <button
                className="edit-button"
                onClick={(e) => {
                  e.stopPropagation();
                  abrirModalEditar(tienda);
                }}
              >
                ✎
              </button>
            </div>
          </div>
        ))}
      </div>
      {loading && <div>Cargando más tiendas...</div>} {/* Indicador de carga */}
      {notification && (
        <div className="notification">
          <p>{notification}</p>
        </div>
      )}
      <ModalAñadirTienda
        isOpen={modalAñadirAbierto}
        onRequestClose={cerrarModalAñadir}
        onSave={handleSaveTienda}
      />
      <ModalEditarTienda
        isOpen={modalEditarAbierto}
        onRequestClose={cerrarModalEditar}
        tienda={tiendaSeleccionada}
        onSave={handleSaveTiendaEditada}
        onDelete={handleDeleteTienda}
      />
    </div>
  );
};

export default ListaTiendas;
