import "./reportes.css";
import React, { useState } from "react";
import Modal from "react-modal";
import { jsPDF } from "jspdf";
import { Chart } from "chart.js/auto";

Modal.setAppElement("#root");

const ModalInformes = ({ isOpen, onRequestClose, tiendas = [], equipos = [], mantenimientos = [] }) => {
  const [nombreInforme, setNombreInforme] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [mesSeleccionado, setMesSeleccionado] = useState("");
  const [tipoFecha, setTipoFecha] = useState(""); // Estado para seleccionar el tipo de fecha (rango o mes)
  const [tipoReporte, setTipoReporte] = useState(""); // Estado para seleccionar el tipo de reporte

  const handleSubmit = (e) => {
    e.preventDefault();
    generarInforme();
    onRequestClose();
  };

  const generarInforme = () => {
    let tiendasFiltradas = [];
    let equiposFiltrados = [];
    let mantenimientosFiltrados = [];
    let tituloInforme = "";
    let descripcionInforme = "";

    // Filtrar por tipo de fecha (rango o mes)
    if (tipoFecha === "rango") {
      // Filtrado por rango de fechas
      tiendasFiltradas = tiendas.filter((tienda) => {
        const fechaTienda = new Date(tienda.fechaCreacion);
        const fechaInicioObj = new Date(fechaInicio);
        const fechaFinObj = new Date(fechaFin);
        return fechaTienda >= fechaInicioObj && fechaTienda <= fechaFinObj;
      });

      // Filtrar mantenimientos y equipos en el mismo rango
      mantenimientosFiltrados = mantenimientos.filter((mantenimiento) => {
        const fechaMantenimiento = new Date(mantenimiento.fecha);
        const fechaInicioObj = new Date(fechaInicio);
        const fechaFinObj = new Date(fechaFin);
        return fechaMantenimiento >= fechaInicioObj && fechaMantenimiento <= fechaFinObj;
      });

      tituloInforme = `Informe de ${fechaInicio} a ${fechaFin}`;
      descripcionInforme = `Generado para el rango de fechas de ${fechaInicio} a ${fechaFin}`;
    } else if (tipoFecha === "mes") {
      // Filtrado por mes
      tiendasFiltradas = tiendas.filter((tienda) => {
        const fechaTienda = new Date(tienda.fechaCreacion);
        const mesTienda = fechaTienda.getMonth() + 1;
        const añoTienda = fechaTienda.getFullYear();
        const [año, mes] = mesSeleccionado.split("-");
        return mesTienda === parseInt(mes) && añoTienda === parseInt(año);
      });

      // Filtrar mantenimientos y equipos para ese mes
      mantenimientosFiltrados = mantenimientos.filter((mantenimiento) => {
        const fechaMantenimiento = new Date(mantenimiento.fecha);
        const mesMantenimiento = fechaMantenimiento.getMonth() + 1;
        const añoMantenimiento = fechaMantenimiento.getFullYear();
        const [año, mes] = mesSeleccionado.split("-");
        return mesMantenimiento === parseInt(mes) && añoMantenimiento === parseInt(año);
      });

      const nombreMes = new Date(`${mesSeleccionado}-01`).toLocaleString("default", { month: "long" });
      tituloInforme = `Informe del mes de ${nombreMes}`;
      descripcionInforme = `Generado para el mes de ${nombreMes} ${mesSeleccionado}`;
    }

    // Generar el reporte basado en el tipo de informe seleccionado
    if (tipoReporte === "tiendas") {
      // Reporte de tiendas creadas y su número de equipos
      generarReporteTiendas(tiendasFiltradas, tituloInforme, descripcionInforme);
    } else if (tipoReporte === "mantenimientos") {
      // Reporte de mantenimientos realizados
      generarReporteMantenimientos(mantenimientosFiltrados, tituloInforme, descripcionInforme);
    } else if (tipoReporte === "equipos") {
      // Reporte de equipos creados
      generarReporteEquipos(equiposFiltrados, tituloInforme, descripcionInforme);
    }

    console.log("Informe generado y descargado con éxito");
  };

  const generarReporteTiendas = (tiendasFiltradas, tituloInforme, descripcionInforme) => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text(tituloInforme, 10, 10);
    doc.setFontSize(12);
    doc.text(descripcionInforme, 10, 20);

    // Graficar el número de equipos por tienda
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      console.log("No se pudo crear el contexto para el gráfico");
      return;
    }

    new Chart(ctx, {
      type: "bar",
      data: {
        labels: tiendasFiltradas.map((tienda) => tienda.nombre || "Sin nombre"),
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

    const chartImage = canvas.toDataURL("image/png");
    doc.addImage(chartImage, "PNG", 10, 60, 180, 80);
    doc.save(`${tituloInforme}.pdf`);
  };

  const generarReporteMantenimientos = (mantenimientosFiltrados, tituloInforme, descripcionInforme) => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text(tituloInforme, 10, 10);
    doc.setFontSize(12);
    doc.text(descripcionInforme, 10, 20);

    // Graficar los mantenimientos por tienda
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      console.log("No se pudo crear el contexto para el gráfico");
      return;
    }

    const mantenimientosPorTienda = mantenimientosFiltrados.reduce((acc, mantenimiento) => {
      const tiendaId = mantenimiento.tiendaId;
      if (!acc[tiendaId]) acc[tiendaId] = 0;
      acc[tiendaId]++;
      return acc;
    }, {});

    new Chart(ctx, {
      type: "bar",
      data: {
        labels: Object.keys(mantenimientosPorTienda),
        datasets: [
          {
            label: "N° de Mantenimientos",
            data: Object.values(mantenimientosPorTienda),
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgba(255, 99, 132, 1)",
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

    const chartImage = canvas.toDataURL("image/png");
    doc.addImage(chartImage, "PNG", 10, 60, 180, 80);
    doc.save(`${tituloInforme}.pdf`);
  };

  const generarReporteEquipos = (equiposFiltrados, tituloInforme, descripcionInforme) => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text(tituloInforme, 10, 10);
    doc.setFontSize(12);
    doc.text(descripcionInforme, 10, 20);

    // Graficar los equipos creados
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      console.log("No se pudo crear el contexto para el gráfico");
      return;
    }

    const equiposPorMes = equiposFiltrados.reduce((acc, equipo) => {
      const mesCreacion = equipo.mesCreacion;
      if (!acc[mesCreacion]) acc[mesCreacion] = 0;
      acc[mesCreacion]++;
      return acc;
    }, {});

    new Chart(ctx, {
      type: "bar",
      data: {
        labels: Object.keys(equiposPorMes),
        datasets: [
          {
            label: "N° de Equipos Creados",
            data: Object.values(equiposPorMes),
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            borderColor: "rgba(54, 162, 235, 1)",
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

    const chartImage = canvas.toDataURL("image/png");
    doc.addImage(chartImage, "PNG", 10, 60, 180, 80);
    doc.save(`${tituloInforme}.pdf`);
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} className="modal" overlayClassName="modal-overlay">
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

        <label className="form-lbl-text">Tipo de Reporte:</label>
        <div>
          <input
            type="radio"
            id="tiendas"
            name="tipoReporte"
            value="tiendas"
            checked={tipoReporte === "tiendas"}
            onChange={(e) => setTipoReporte(e.target.value)}
          />
          <label htmlFor="tiendas">Tiendas</label>

          <input
            type="radio"
            id="mantenimientos"
            name="tipoReporte"
            value="mantenimientos"
            checked={tipoReporte === "mantenimientos"}
            onChange={(e) => setTipoReporte(e.target.value)}
          />
          <label htmlFor="mantenimientos">Mantenimientos</label>

          <input
            type="radio"
            id="equipos"
            name="tipoReporte"
            value="equipos"
            checked={tipoReporte === "equipos"}
            onChange={(e) => setTipoReporte(e.target.value)}
          />
          <label htmlFor="equipos">Equipos</label>
        </div>

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
