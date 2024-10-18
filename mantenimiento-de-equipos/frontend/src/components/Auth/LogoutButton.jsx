import React from "react";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import "./LogoutButton.css";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/"); // Redirige al login
    } catch (error) {
      console.log("Error al cerrar sesión:", error);
    }
  };

  return (
    <div className="logout-button" onClick={handleLogout}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="logout-icon"
      >
        {/* SVG del icono de logout */}
        <path d="M10 17l5-5-5-5" />
        <path d="M19 12H4" />
        <path d="M14 2H8a2 2 0 00-2 2v16a2 2 0 002 2h6a2 2 0 002-2V2z" />
      </svg>
    </div>
  );
};

export default LogoutButton;
