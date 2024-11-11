import "./reportes.css";
import React, { useState } from "react";
import Modal from "react-modal";
import { jsPDF } from "jspdf";
import { Chart } from "chart.js/auto";

Modal.setAppElement("#root");

const ModalInformes = ({ isOpen, onRequestClose, tiendas = [] }) => {
  const [nombreInforme, setNombreInforme] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [mesSeleccionado, setMesSeleccionado] = useState("");
  const [tipoFecha, setTipoFecha] = useState(""); // Estado para seleccionar el tipo de fecha (rango o mes)

  const handleSubmit = (e) => {
    e.preventDefault();
    generarInforme();
    onRequestClose();
  };

  const generarInforme = () => {
    let tiendasFiltradas = [];
    let tituloInforme = "";

    // Verificación si es rango de fechas o mes
    if (tipoFecha === "rango") {
      tiendasFiltradas = tiendas.filter((tienda) => {
        const fechaTienda = new Date(tienda.fecha);
        const fechaInicioObj = new Date(fechaInicio);
        const fechaFinObj = new Date(fechaFin);
        return fechaTienda >= fechaInicioObj && fechaTienda <= fechaFinObj;
      });
      tituloInforme = `Informe de ${fechaInicio} a ${fechaFin}`; // Titulo para rango de fechas
    } else if (tipoFecha === "mes") {
      tiendasFiltradas = tiendas.filter((tienda) => {
        const fechaTienda = new Date(tienda.fecha);
        const mesTienda = fechaTienda.getMonth() + 1; // Mes en formato 1-12
        return mesTienda === parseInt(mesSeleccionado.split("-")[1]);
      });
      const nombreMes = new Date(`${mesSeleccionado}-01`).toLocaleString(
        "default",
        { month: "long" }
      );
      tituloInforme = `Informe del mes de ${nombreMes}`; // Titulo para mes seleccionado
    }

    console.log(
      "Tiendas filtradas para el mes o rango seleccionado:",
      tiendasFiltradas
    );

    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text(tituloInforme, 10, 10); // Titulo dinámico del informe
    doc.setFontSize(12);
    doc.text(`Fecha de Creación: ${new Date().toLocaleDateString()}`, 10, 20);
    if (tipoFecha === "rango") {
      doc.text(`Fecha Inicio: ${fechaInicio || "No especificada"}`, 10, 30);
      doc.text(`Fecha Fin: ${fechaFin || "No especificada"}`, 10, 40);
    }
    const nombreMes = new Date(`${mesSeleccionado}-01`).toLocaleString("default", { month: "long" });
    doc.text(
      `Mes Seleccionado: ${nombreMes || "No especificado"}`,
      10,
      50
    );

    // Si hay tiendas, generamos el gráfico
    if (tiendasFiltradas.length > 0) {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        console.log("No se pudo crear el contexto para el gráfico");
        return;
      }

      new Chart(ctx, {
        type: "bar",
        data: {
          labels: tiendasFiltradas.map(
            (tienda) => tienda.nombre || "Sin nombre"
          ),
          datasets: [
            {
              label: "N° de Equipos",
              data: tiendasFiltradas.map((tienda) => tienda.nroEquipos || 0),
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
    } else {
      console.log("No se encontraron datos para el mes o rango seleccionado");
    }

    // Guardamos el PDF
    doc.save(`${nombreInforme}.pdf`);
    console.log("Informe generado y descargado con éxito");
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

        <label className="form-lbl-text">Seleccionar Tipo de Fecha:</label>
        <div>
          <input
            type="radio"
            id="rango"
            name="tipoFecha"
            value="rango"
            checked={tipoFecha === "rango"}
            onChange={(e) => setTipoFecha(e.target.value)}
          />
          <label htmlFor="rango">Rango de Fechas</label>

          <input
            type="radio"
            id="mes"
            name="tipoFecha"
            value="mes"
            checked={tipoFecha === "mes"}
            onChange={(e) => setTipoFecha(e.target.value)}
          />
          <label htmlFor="mes">Mes</label>
        </div>

        {tipoFecha === "rango" && (
          <>
            <label className="form-lbl-text">Fecha Inicio:</label>
            <input
              type="date"
              value={fechaInicio}
              onChange={(e) => setFechaInicio(e.target.value)}
              required
            />

            <label className="form-lbl-text">Fecha Fin:</label>
            <input
              type="date"
              value={fechaFin}
              onChange={(e) => setFechaFin(e.target.value)}
              required
            />
          </>
        )}

        {tipoFecha === "mes" && (
          <>
            <label className="form-lbl-text">Seleccionar Mes:</label>
            <input
              type="month"
              value={mesSeleccionado}
              onChange={(e) => setMesSeleccionado(e.target.value)}
              required
            />
          </>
        )}

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
