import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import ModalAñadirTienda from "./ModalAñadirTienda";
import ModalEditarTienda from "./ModalEditarTienda";
import { TiendasContext } from "../../context/TiendasContext";
import "./ListaTiendas.css";

const ListaTiendas = () => {
  const [tiendas, setTiendas] = useState([]);
  const [modalAñadirAbierto, setModalAñadirAbierto] = useState(false);
  const [modalEditarAbierto, setModalEditarAbierto] = useState(false);
  const [tiendaSeleccionada, setTiendaSeleccionada] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [notification, setNotification] = useState(""); // Estado para la notificación
  const db = getFirestore();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTiendas = async () => {
      const querySnapshot = await getDocs(collection(db, "tiendas"));
      setTiendas(
        querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );
    };
    fetchTiendas();
  }, [db]);

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
    setTiendas([...tiendas, nuevaTienda]); // Añade la nueva tienda a la lista existente
    setNotification("Tienda añadida exitosamente!"); // Muestra la notificación
    setTimeout(() => setNotification(""), 3000); // Oculta la notificación después de 3 segundos
  };

  // Maneja la actualización de una tienda editada
  const handleSaveTiendaEditada = (tiendaActualizada) => {
    setTiendas(
      tiendas.map((tienda) =>
        tienda.id === tiendaActualizada.id ? tiendaActualizada : tienda
      )
    );
    setNotification("Tienda actualizada exitosamente!");
    setTimeout(() => setNotification(""), 3000); // Oculta la notificación después de 3 segundos
  };

  // Maneja la eliminación de una tienda
  const handleDeleteTienda = (tiendaId) => {
    setTiendas(tiendas.filter((tienda) => tienda.id !== tiendaId));
    setNotification("Tienda eliminada exitosamente!");
    setTimeout(() => setNotification(""), 3000); // Oculta la notificación después de 3 segundos
  };

  // Filtrar las tiendas en base al término de búsqueda
  const filteredTiendas = tiendas.filter((tienda) =>
    tienda.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        ))}
      </div>

      {/* Notificacion centrada */}
      {notification && (
        <div className="notification">
          <p>{notification}</p>
        </div>
      )}

      <ModalAñadirTienda
        isOpen={modalAñadirAbierto}
        onRequestClose={cerrarModalAñadir}
        onSave={handleSaveTienda} // Pasa la función para manejar el guardado
      />
      <ModalEditarTienda
        isOpen={modalEditarAbierto}
        onRequestClose={cerrarModalEditar}
        tienda={tiendaSeleccionada}
        onSave={handleSaveTiendaEditada} // Pasa la función para manejar la edición
        onDelete={handleDeleteTienda} // Pasa la función para manejar la eliminación
      />
    </div>
  );
};

export default ListaTiendas;
