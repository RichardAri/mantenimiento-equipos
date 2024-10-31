import React, { useState } from "react";
import ModalInformes from "./ModalInformes";
import "./BotonFlotante.css";

const BotonFlotante = () => {
  const [modalAbierto, setModalAbierto] = useState(false);

  const abrirModal = () => setModalAbierto(true);
  const cerrarModal = () => setModalAbierto(false);

  return (
    <>
      <button className="boton-flotante" onClick={abrirModal}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="white"
          viewBox="0 0 24 24"
        >
          <path d="M3 13h2v8H3v-8zm4-6h2v14H7V7zm4 4h2v10h-2V11zm4-2h2v12h-2V9zm4-6h2v18h-2V3z" />
        </svg>
      </button>

      <ModalInformes isOpen={modalAbierto} onRequestClose={cerrarModal} />
    </>
  );
};

export default BotonFlotante;
