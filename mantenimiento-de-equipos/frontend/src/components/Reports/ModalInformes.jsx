import React, { useState } from "react";
import Modal from "react-modal";
import "../Modal.css";
import { jsPDF } from "jspdf";
import { Chart } from "chart.js/auto";

Modal.setAppElement("#root");

const ModalInformes = ({ isOpen, onRequestClose, tiendas = [] }) => {
  const [nombreInforme, setNombreInforme] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [mesSeleccionado, setMesSeleccionado] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    generarInforme();
    onRequestClose();
  };

  const generarInforme = () => {
    if (!Array.isArray(tiendas) || tiendas.length === 0) {
      alert("No hay tiendas disponibles para generar el informe.");
      return;
    }

    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text(`Informe de ${nombreInforme}`, 10, 10);
    doc.setFontSize(12);
    doc.text(`Fecha de Creación: ${new Date().toLocaleDateString()}`, 10, 20);
    doc.text(`Fecha Inicio: ${fechaInicio || "No especificada"}`, 10, 30);
    doc.text(`Fecha Fin: ${fechaFin || "No especificada"}`, 10, 40);
    doc.text(
      `Mes Seleccionado: ${mesSeleccionado || "No especificado"}`,
      10,
      50
    );

    // Crear un canvas y obtener el contexto
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      alert("No se pudo crear el contexto para el gráfico");
      return;
    }

    new Chart(ctx, {
      type: "bar",
      data: {
        labels: tiendas.map((tienda) => tienda.nombre || "Sin nombre"),
        datasets: [
          {
            label: "N° de Equipos",
            data: tiendas.map((tienda) => tienda.nroEquipos || 0),
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: false,
        plugins: {
          legend: {
            display: true,
          },
        },
      },
    });

    // Renderizamos el gráfico en el PDF
    const chartImage = canvas.toDataURL("image/png");
    doc.addImage(chartImage, "PNG", 10, 60, 180, 80);
    doc.save(`${nombreInforme}.pdf`);
    alert("Informe generado y descargado con éxito");
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="modal"
      overlayClassName="modal-overlay"
    >
      <button className="close-button" onClick={onRequestClose}>
        &times;
      </button>
      <div className="form-group">
        <h2 className="add-subtitle">Generar Informe</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <label className="form-lbl-text">Nombre del Informe:</label>
        <input
          type="text"
          value={nombreInforme}
          onChange={(e) => setNombreInforme(e.target.value)}
          required
        />

        <label className="form-lbl-text">Fecha Inicio:</label>
        <input
          type="date"
          value={fechaInicio}
          onChange={(e) => setFechaInicio(e.target.value)}
        />

        <label className="form-lbl-text">Fecha Fin:</label>
        <input
          type="date"
          value={fechaFin}
          onChange={(e) => setFechaFin(e.target.value)}
        />

        <label className="form-lbl-text">Seleccionar Mes:</label>
        <input
          type="month"
          value={mesSeleccionado}
          onChange={(e) => setMesSeleccionado(e.target.value)}
        />

        <div className="form-group">
          <button type="submit" className="save-button">
            Generar Informe
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default ModalInformes;
