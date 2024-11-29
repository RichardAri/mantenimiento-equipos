import React, { useState, useEffect } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import Clock from "../Clock/Clock";
import "./Login.css";
import { useAuth } from "../../context/AuthContext"; // Usamos el hook para acceder a 'user' y 'loading'

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { user, loading } = useAuth(); // Accedemos al estado de autenticación y cargando

  useEffect(() => {
    console.log("User state:", user); // Verifica si el estado de 'user' cambia

    // Evitamos redirigir si el usuario está en proceso de carga
    if (user && !loading) {
      navigate("/tiendas"); // Redirige a '/tiendas' si el usuario está autenticado
    }
  }, [user, loading, navigate]); // Dependemos de 'user', 'loading' y 'navigate'

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      alert("Error al iniciar sesión");
    }
  };

  // Si está cargando, mostramos un mensaje o spinner (evitamos mostrar el login)
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
