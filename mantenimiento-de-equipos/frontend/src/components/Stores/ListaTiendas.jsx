import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import ModalAñadirTienda from "./ModalAñadirTienda";
import ModalEditarTienda from "./ModalEditarTienda";
import "./ListaTiendas.css";

const ListaTiendas = () => {
  const [tiendas, setTiendas] = useState([]);
  const [modalAñadirAbierto, setModalAñadirAbierto] = useState(false);
  const [modalEditarAbierto, setModalEditarAbierto] = useState(false);
  const [tiendaSeleccionada, setTiendaSeleccionada] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // Estado para el término de búsqueda
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

  // Filtrar las tiendas en base al termino de búsqueda
  const filteredTiendas = tiendas.filter((tienda) =>
    tienda.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="tiendas-container">
      <header>
        <h1 className="title-page">Capriccio</h1>
        <button onClick={abrirModalAñadir}>Añadir Tienda</button>
      </header>
      <input
        type="text"
        placeholder="Buscar tienda..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)} // Actualiza el término de búsqueda
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
      <ModalAñadirTienda
        isOpen={modalAñadirAbierto}
        onRequestClose={cerrarModalAñadir}
      />
      <ModalEditarTienda
        isOpen={modalEditarAbierto}
        onRequestClose={cerrarModalEditar}
        tienda={tiendaSeleccionada}
      />
    </div>
  );
};

export default ListaTiendas;
