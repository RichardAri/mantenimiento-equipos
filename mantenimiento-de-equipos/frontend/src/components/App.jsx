import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext"; // Supongamos que usas un contexto de autenticación
import Login from "./Auth/Login";
import ListaTiendas from "./Stores/ListaTiendas";
// ...

const App = () => {
  const { user } = useAuth(); // Verificas si el usuario está autenticado

  return (
    <div className="app-container">
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<Login />} />

        {/* Rutas privadas */}
        {user ? (
          <>
            <Route path="/tiendas" element={<ListaTiendas />} />
            <Route path="/tiendas/:tiendaId/equipos" element={<ListaEquipos />} />
            <Route path="/tiendas/:tiendaId/equipos/nuevo" element={<ModalAñadirEquipo />} />
            <Route path="/tiendas/:tiendaId/equipos/:equipoId/editar" element={<ModalEditarEquipo />} />
            <Route path="/tiendas/:tiendaId/equipos/:equipoId/mantenimientos" element={<ListaMantenimientos />} />
            <Route path="/tiendas/:tiendaId/equipos/:equipoId/mantenimientos/nuevo" element={<ModalAñadirMantenimiento />} />
            <Route path="/tiendas/:tiendaId/equipos/:equipoId/mantenimientos/:mantenimientoId/editar" element={<ModalEditarMantenimiento />} />
          </>
        ) : (
          // Si no está autenticado, redirige a la página de login
          <Route path="*" element={<Navigate to="/" />} />
        )}
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
