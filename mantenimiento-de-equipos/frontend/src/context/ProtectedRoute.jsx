import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth(); // Obtenemos el estado de autenticación

  // Si está cargando, no redirigimos aún
  if (loading) {
    return <div className="notificacion">Cargando...</div>; // O podrías poner un spinner de carga aquí
  }

  // Si no hay usuario, redirigir a login
  if (!user) {
    return <Navigate to="/" />;
  }

  return children; // Si el usuario está autenticado, mostrar la ruta protegida
};

export default ProtectedRoute;
