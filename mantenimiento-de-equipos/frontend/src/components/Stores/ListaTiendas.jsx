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

  return (
    <div className="tiendas-container">
      <header>
        <h1 className="title-page">Capriccio</h1>
        <button onClick={abrirModalAñadir}>Añadir Tienda</button>
      </header>
      <div className="card-container">
        {tiendas.map((tienda) => (
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
