// src/components/ListaTiendas.jsx
import React, { useState } from "react";
import "./ListaTiendas.css";
import ModalTienda from "./ModalTienda";

const ListaTiendas = () => {
  const [tiendas, setTiendas] = useState([
    {
      id: 1,
      nombre: "AQP SOLO TORTAS",
      ubicacion: "Cayma SN",
      equipos: 20,
      encargado: "Alonso",
    },
    {
      id: 2,
      nombre: "AQP SOLO TORTAS",
      ubicacion: "Cayma SN",
      equipos: 20,
      encargado: "Alonso",
    },
    {
      id: 3,
      nombre: "AQP SOLO TORTAS",
      ubicacion: "Cayma SN",
      equipos: 20,
      encargado: "Alonso",
    },
    {
      id: 4,
      nombre: "AQP SOLO TORTAS",
      ubicacion: "Cayma SN",
      equipos: 20,
      encargado: "Alonso",
    },
    {
      id: 5,
      nombre: "AQP SOLO TORTAS",
      ubicacion: "Cayma SN",
      equipos: 20,
      encargado: "Alonso",
    },
    {
      id: 6,
      nombre: "AQP SOLO TORTAS",
      ubicacion: "Cayma SN",
      equipos: 20,
      encargado: "Alonso",
    },
    {
      id: 7,
      nombre: "AQP SOLO TORTAS",
      ubicacion: "Cayma SN",
      equipos: 20,
      encargado: "Alonso",
    },
    {
      id: 8,
      nombre: "AQP SOLO TORTAS",
      ubicacion: "Cayma SN",
      equipos: 20,
      encargado: "Alonso",
    },
    {
      id: 9,
      nombre: "AQP SOLO TORTAS",
      ubicacion: "Cayma SN",
      equipos: 20,
      encargado: "Alonso",
    },
    {
      id: 10,
      nombre: "AQP SOLO TORTAS",
      ubicacion: "Cayma SN",
      equipos: 20,
      encargado: "Alonso",
    },
    {
      id: 11,
      nombre: "AQP SOLO TORTAS",
      ubicacion: "Cayma SN",
      equipos: 20,
      encargado: "Alonso",
    },
    {
      id: 12,
      nombre: "AQP SOLO TORTAS",
      ubicacion: "Cayma SN",
      equipos: 20,
      encargado: "Alonso",
    },
    // Añade más tiendas aquí...
  ]);

  const [modalTiendaData, setModalTiendaData] = useState(null);

  const handleEditTienda = (tienda) => {
    setModalTiendaData(tienda);
  };

  const handleAddTienda = () => {
    setModalTiendaData({
      id: null,
      nombre: "",
      ubicacion: "",
      equipos: 0,
      encargado: "",
    });
  };

  const handleSaveTienda = (data) => {
    if (data.id) {
      setTiendas(
        tiendas.map((tienda) => (tienda.id === data.id ? data : tienda))
      );
    } else {
      data.id = tiendas.length + 1;
      setTiendas([...tiendas, data]);
    }
    setModalTiendaData(null);
  };

  const handDeleteTienda = (data) => {
    if (data.id) {
      setTiendas(
        tiendas.map((tienda) => (tienda.id === data.id ? data : tienda))
      );
    } else {
      data.id = tiendas.length + 1;
      setTiendas([...tiendas, data]);
    }
    setModalTiendaData(null);
  };

  return (
    <div className="page">
      <h1 className="lt-title">Capriccio</h1>
      <button onClick={handleAddTienda} className="add-button">
        Añadir Tienda
      </button>
      <div className="tiendas-container">
        {tiendas.map((tienda) => (
          <div key={tienda.id} className="tienda-card">
            <h2 className="lt-title-card">{tienda.nombre}</h2>
            <p className="lt-info-card">Ubicación: {tienda.ubicacion}</p>
            <p className="lt-info-card">Nro de Equipos: {tienda.equipos}</p>
            <p className="lt-info-card">Encargado: {tienda.encargado}</p>
            <button
              onClick={() => handleEditTienda(tienda)}
              className="edit-button"
            >
              Editar
            </button>
            <button
              onClick={() => handleEditTienda(tienda)}
              className="edit-button del-button"
            >
              Borrar
            </button>
          </div>
        ))}
      </div>
      {modalTiendaData && (
        <ModalTienda
          data={modalTiendaData}
          onSave={handleSaveTienda}
          onClose={() => setModalTiendaData(null)}
        />
      )}
    </div>
  );
};

export default ListaTiendas;
