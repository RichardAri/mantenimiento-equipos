import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import Clock from "./Clock";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/tiendas");
    } catch (error) {
      alert("Error al iniciar sesión");
    }
  };

  return (
    <div className="login-background">
      <div className="login-wrapper">
        <div className="clock-container">
          <Clock />
        </div>
        <div className="login-container">
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
