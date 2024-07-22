import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './Login';
import ListaTiendas from './ListaTiendas';
import ListaEquipos from './ListaEquipos';
import ListaMantenimientos from './ListaMantenimientos';
import ModalAñadirTienda from './ModalAñadirTienda';
import ModalEditarTienda from './ModalEditarTienda';
import ModalAñadirEquipo from './ModalAñadirEquipo';
import ModalEditarEquipo from './ModalEditarEquipo';
import ModalAñadirMantenimiento from './ModalAñadirMantenimiento';
import ModalEditarMantenimiento from './ModalEditarMantenimiento';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/tiendas" element={<ListaTiendas />} />
      <Route path="/tiendas/:tiendaId/equipos" element={<ListaEquipos />} />
      <Route path="/tiendas/:tiendaId/equipos/nuevo" element={<ModalAñadirEquipo />} />
      <Route path="/tiendas/:tiendaId/equipos/:equipoId/editar" element={<ModalEditarEquipo />} />
      <Route path="/tiendas/:tiendaId/equipos/:equipoId/mantenimientos" element={<ListaMantenimientos />} />
      <Route path="/tiendas/:tiendaId/equipos/:equipoId/mantenimientos/nuevo" element={<ModalAñadirMantenimiento />} />
      <Route path="/tiendas/:tiendaId/equipos/:equipoId/mantenimientos/:mantenimientoId/editar" element={<ModalEditarMantenimiento />} />
    </Routes>
  );
};

export default App;
