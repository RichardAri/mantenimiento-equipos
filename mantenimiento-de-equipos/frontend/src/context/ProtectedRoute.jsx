import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  // Mostrar algo mientras cargamos el estado de autenticación
  if (loading) {
    return <p>Cargando...</p>;
  }

  // Si no hay usuario autenticado, redirigir al login
  if (!user) {
    return <Navigate to="/" />;
  }

  // Si está autenticado, renderiza los hijos (las rutas protegidas)
  return children;
};

export default ProtectedRoute;
