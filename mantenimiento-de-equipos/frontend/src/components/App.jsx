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
import BotonFlotante from "./BotonFlotante/BotonFlotante"; // Boton de informes
import LogoutButton from "./LogoutButton/LogoutButton"; // Botón de logout
import { useAuth } from "../context/AuthContext";
import { TiendasProvider } from "../context/TiendasContext";

const App = () => {
  const { user } = useAuth();

  // Definimos las rutas protegidas de forma centralizada
  const protectedRoutes = [
    { path: "/tiendas", component: <ListaTiendas /> },
    { path: "/tiendas/:tiendaId/equipos", component: <ListaEquipos /> },
    { path: "/tiendas/:tiendaId/equipos/nuevo", component: <ModalAñadirEquipo /> },
    { path: "/tiendas/:tiendaId/equipos/:equipoId/editar", component: <ModalEditarEquipo /> },
    { path: "/tiendas/:tiendaId/equipos/:equipoId/mantenimientos", component: <ListaMantenimientos /> },
    { path: "/tiendas/:tiendaId/equipos/:equipoId/mantenimientos/nuevo", component: <ModalAñadirMantenimiento /> },
    { path: "/tiendas/:tiendaId/equipos/:equipoId/mantenimientos/:mantenimientoId/editar", component: <ModalEditarMantenimiento /> },
  ];

  return (
    <TiendasProvider>
      <div className="app-container">
        <Routes>
          {/* Ruta pública */}
          <Route path="/" element={<Login />} />

          {/* Rutas protegidas agrupadas */}
          {protectedRoutes.map(({ path, component }) => (
            <Route
              key={path}
              path={path}
              element={<ProtectedRoute>{component}</ProtectedRoute>}
            />
          ))}
        </Routes>

        {/* Solo muestra los botones si el usuario está autenticado */}
        {user && (
          <>
            <Footer />
            <BotonFlotante /> {/* Botón de informes */}
            <LogoutButton /> {/* Botón de logout */}
          </>
        )}
      </div>
    </TiendasProvider>
  );
};

export default App;
