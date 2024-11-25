import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Auth/Login";
import ListaTiendas from "./Stores/ListaTiendas";
import ListaEquipos from "./Hardware/ListaEquipos";
import ListaMantenimientos from "./Maintenance/ListaMantenimientos";
import ModalAñadirEquipo from "../Modales/ModalAñadirEquipo/ModalAñadirEquipo";
import ModalEditarEquipo from "../Modales/ModalEditarEquipo/ModalEditarEquipo";
import ModalAñadirMantenimiento from "../Modales/ModalAñadirMantenimiento/ModalAñadirMantenimiento";
import ModalEditarMantenimiento from "../Modales/ModalEditarMantenimiento/ModalEditarMantenimiento";
import Footer from "./Footer/Footer";
import ProtectedRoute from "../context/ProtectedRoute"; // Ruta protegida
import BotonFlotante from "./Reports/BotonFlotante"; // Boton de informes
import LogoutButton from "./Auth/LogoutButton"; // Botón de logout
import { useAuth } from "../context/AuthContext";
import { TiendasProvider } from "../context/TiendasContext";

const App = () => {
  const { user } = useAuth();

  return (
    <TiendasProvider>
      <div className="app-container">
        <Routes>
          {/* Ruta publica */}
          <Route path="/" element={<Login />} />
          {/* Rutas protegidas */}
          <Route
            path="/tiendas"
            element={
              <ProtectedRoute>
                <ListaTiendas />
              </ProtectedRoute>
            }
          />
          <Route
            path="/tiendas/:tiendaId/equipos"
            element={
              <ProtectedRoute>
                <ListaEquipos />
              </ProtectedRoute>
            }
          />
          <Route
            path="/tiendas/:tiendaId/equipos/nuevo"
            element={
              <ProtectedRoute>
                <ModalAñadirEquipo />
              </ProtectedRoute>
            }
          />
          <Route
            path="/tiendas/:tiendaId/equipos/:equipoId/editar"
            element={
              <ProtectedRoute>
                <ModalEditarEquipo />
              </ProtectedRoute>
            }
          />
          <Route
            path="/tiendas/:tiendaId/equipos/:equipoId/mantenimientos"
            element={
              <ProtectedRoute>
                <ListaMantenimientos />
              </ProtectedRoute>
            }
          />
          <Route
            path="/tiendas/:tiendaId/equipos/:equipoId/mantenimientos/nuevo"
            element={
              <ProtectedRoute>
                <ModalAñadirMantenimiento />
              </ProtectedRoute>
            }
          />
          <Route
            path="/tiendas/:tiendaId/equipos/:equipoId/mantenimientos/:mantenimientoId/editar"
            element={
              <ProtectedRoute>
                <ModalEditarMantenimiento />
              </ProtectedRoute>
            }
          />
        </Routes>

        {/* Solo muestra los botones si el usuario está autenticado */}
        {user && (
          <>
            <Footer />
            <BotonFlotante /> {/* Boton de informes */}
            <LogoutButton /> {/* Boton de logout */}
          </>
        )}
      </div>
    </TiendasProvider>
  );
};

export default App;
