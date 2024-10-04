import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Auth/Login";
import ListaTiendas from "./Stores/ListaTiendas";
import ListaEquipos from "./Hardware/ListaEquipos";
import ListaMantenimientos from "./Maintenance/ListaMantenimientos";
import ModalAñadirEquipo from "./Hardware/ModalAñadirEquipo";
import ModalEditarEquipo from "./Hardware/ModalEditarEquipo";
import ModalAñadirMantenimiento from "./Maintenance/ModalAñadirMantenimiento";
import ModalEditarMantenimiento from "./Maintenance/ModalEditarMantenimiento";
import Footer from "./Footer"; // Asegúrate de importar el Footer

const App = () => {
  return (
    <div className="app-container"> {/* Envolvemos todo en un div */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/tiendas" element={<ListaTiendas />} />
        <Route path="/tiendas/:tiendaId/equipos" element={<ListaEquipos />} />
        <Route
          path="/tiendas/:tiendaId/equipos/nuevo"
          element={<ModalAñadirEquipo />}
        />
        <Route
          path="/tiendas/:tiendaId/equipos/:equipoId/editar"
          element={<ModalEditarEquipo />}
        />
        <Route
          path="/tiendas/:tiendaId/equipos/:equipoId/mantenimientos"
          element={<ListaMantenimientos />}
        />
        <Route
          path="/tiendas/:tiendaId/equipos/:equipoId/mantenimientos/nuevo"
          element={<ModalAñadirMantenimiento />}
        />
        <Route
          path="/tiendas/:tiendaId/equipos/:equipoId/mantenimientos/:mantenimientoId/editar"
          element={<ModalEditarMantenimiento />}
        />
      </Routes>
      <Footer /> {/* El footer siempre se mostrará aquí */}
    </div>
  );
};

export default App;
