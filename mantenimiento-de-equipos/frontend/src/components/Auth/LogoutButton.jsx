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
        <path d="M10 17l5-5-5-5" />
        <path d="M19 12H4" />
      </svg>
    </div>
  );
};

export default LogoutButton;
