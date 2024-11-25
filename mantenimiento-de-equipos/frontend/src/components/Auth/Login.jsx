import React, { useState, useEffect } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import Clock from "../Clock/Clock";
import "./Login.css";
import useAuth from "./useAuth"; 

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { user, loading } = useAuth(); // Obtén el estado del usuario del contexto

  // Verifica si el usuario ya está autenticado
  useEffect(() => {
    if (!loading && user) { // Solo redirige si 'loading' ha terminado y hay un usuario
      navigate("/");
    }
  }, [user, loading, navigate]); // Ejecuta cada vez que cambien 'user' o 'loading'

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/tiendas");
    } catch (error) {
      alert("Error al iniciar sesión");
    }
  };

  // Si está cargando, podrías mostrar un mensaje o spinner
  if (loading) return <div>Cargando...</div>;

  return (
    <div className="login-background">
      <div className="login-wrapper">
        <div className="login-container">
          <Clock />
          <h1>Control De Mantenimiento</h1>
          <form onSubmit={handleLogin}>
            <label htmlFor="email">Usuario:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label htmlFor="password">Contraseña:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Ingresar</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
