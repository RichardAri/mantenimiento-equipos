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

const App = () => {
  return (
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
  );
};

export default App;
