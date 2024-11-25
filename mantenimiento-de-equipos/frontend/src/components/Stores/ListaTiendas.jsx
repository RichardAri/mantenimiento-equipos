import React, { useState, useEffect, useMemo, lazy, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  limit,
  startAfter,
} from "firebase/firestore";
import "./ListaTiendas.css";

const ModalAñadirTienda = lazy(() => import("../ModalAñadirTienda/ModalAñadirTienda"));
const ModalEditarTienda = lazy(() => import("../ModalEditarTienda/ModalEditarTienda"));

const ListaTiendas = () => {
  const [tiendas, setTiendas] = useState([]);
  const [modalAñadirAbierto, setModalAñadirAbierto] = useState(false);
  const [modalEditarAbierto, setModalEditarAbierto] = useState(false);
  const [tiendaSeleccionada, setTiendaSeleccionada] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [notification, setNotification] = useState("");
  const [lastVisible, setLastVisible] = useState(null);
  const [loading, setLoading] = useState(false);

  const db = getFirestore();
  const navigate = useNavigate();

  const fetchTiendas = async () => {
    setLoading(true);
    const tiendaRef = collection(db, "tiendas");
    const tiendaQuery = lastVisible
      ? query(tiendaRef, limit(10), startAfter(lastVisible))
      : query(tiendaRef, limit(10));
    const querySnapshot = await getDocs(tiendaQuery);
    const tiendasData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setTiendas((prevTiendas) => [...prevTiendas, ...tiendasData]);
    setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);
    setLoading(false);
  };

  useEffect(() => {
    fetchTiendas();
  }, [db]);

  const filteredTiendas = useMemo(
    () =>
      tiendas.filter((tienda) =>
        tienda.nombre.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [tiendas, searchTerm]
  );

  return (
    <div className="tiendas-container">
      <header>
        <h1 className="title-page">Capriccio</h1>
        <button className="add-button" onClick={() => setModalAñadirAbierto(true)}>
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
            onClick={() => navigate(`/tiendas/${tienda.id}/equipos`)}
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
                  setTiendaSeleccionada(tienda);
                  setModalEditarAbierto(true);
                }}
              >
                ✎
              </button>
            </div>
          </div>
        ))}
      </div>
      {loading && <div className="notification">Cargando más tiendas...</div>}
      {notification && (
        <div className="notification">
          <p>{notification}</p>
        </div>
      )}
      <Suspense fallback={<div>Cargando...</div>}>
        {modalAñadirAbierto && (
          <ModalAñadirTienda
            isOpen={modalAñadirAbierto}
            onRequestClose={() => setModalAñadirAbierto(false)}
            onSave={(nuevaTienda) => {
              setTiendas((prevTiendas) => [...prevTiendas, nuevaTienda]);
              setNotification("Tienda añadida exitosamente!");
              setTimeout(() => setNotification(""), 3000);
            }}
          />
        )}
        {modalEditarAbierto && (
          <ModalEditarTienda
            isOpen={modalEditarAbierto}
            onRequestClose={() => setModalEditarAbierto(false)}
            tienda={tiendaSeleccionada}
            onSave={(tiendaActualizada) => {
              setTiendas((prevTiendas) =>
                prevTiendas.map((tienda) =>
                  tienda.id === tiendaActualizada.id ? tiendaActualizada : tienda
                )
              );
              setNotification("Tienda actualizada exitosamente!");
              setTimeout(() => setNotification(""), 3000);
            }}
            onDelete={(tiendaId) => {
              setTiendas((prevTiendas) =>
                prevTiendas.filter((tienda) => tienda.id !== tiendaId)
              );
              setNotification("Tienda eliminada exitosamente!");
              setTimeout(() => setNotification(""), 3000);
            }}
          />
        )}
      </Suspense>
    </div>
  );
};

export default ListaTiendas;
