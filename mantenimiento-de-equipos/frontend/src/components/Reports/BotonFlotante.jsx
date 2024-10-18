import React, { useState } from "react";
import ModalInformes from "./ModalInformes";
import './BotonFlotante.css';

const BotonFlotante = () => {
  const [modalAbierto, setModalAbierto] = useState(false);

  const abrirModal = () => setModalAbierto(true);
  const cerrarModal = () => setModalAbierto(false);

  return (
    <>
      <button className="boton-flotante" onClick={abrirModal}>
        📊
      </button>
      <ModalInformes isOpen={modalAbierto} onRequestClose={cerrarModal} />
    </>
  );
};

export default BotonFlotante;
