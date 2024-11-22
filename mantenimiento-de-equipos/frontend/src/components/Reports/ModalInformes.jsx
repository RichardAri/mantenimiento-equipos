/* eslint-disable no-unused-vars */
import "./reportes.css";
import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { jsPDF } from "jspdf";
import { Chart } from "chart.js/auto";
import {
  fetchTiendas,
  fetchMantenimientos,
  fetchEquipos,
} from "../../firestoreQueries";

Modal.setAppElement("#root");

// eslint-disable-next-line react/prop-types
const ModalInformes = ({ isOpen, onRequestClose }) => {
  const [nombreInforme, setNombreInforme] = useState("");
  const [selectedTienda, setSelectedTienda] = useState("");
  const [tiendas, setTiendas] = useState([]);
  const [equipos, setEquipos] = useState([]);
  const [mantenimientos, setMantenimientos] = useState([]);
  const [reportData, setReportData] = useState(null);

  // Cargar datos iniciales
  useEffect(() => {
    const fetchData = async () => {
      const tiendasData = await fetchTiendas();
      setTiendas(tiendasData);

      let equiposData = [];
      let mantenimientosData = [];
      for (const tienda of tiendasData) {
        const equipos = await fetchEquipos(tienda.id);
        equiposData = [...equiposData, ...equipos];
        for (const equipo of equipos) {
          const mantenimientos = await fetchMantenimientos(
            tienda.id,
            equipo.id
          );
          mantenimientosData = [...mantenimientosData, ...mantenimientos];
        }
      }

      setEquipos(equiposData);
      setMantenimientos(mantenimientosData);
    };

    fetchData();
  }, []);

  // Actualizamos datos del reporte al seleccionar una tienda
  useEffect(() => {
    if (selectedTienda) {
      const tiendaData = tiendas.find((tienda) => tienda.id === selectedTienda);
      if (tiendaData) {
        const mantenimientosPorMes = Array(12).fill(0);

        // Contamos mantenimientos por mes
        mantenimientos.forEach((mantenimiento) => {
          if (mantenimiento.tiendaId === selectedTienda) {
            const mes = mantenimiento.mesCreacion - 1; // Convertir a índice (0-11)
            mantenimientosPorMes[mes]++;
          }
        });

        setReportData({
          ...tiendaData,
          mantenimientosTotales: mantenimientosPorMes.reduce(
            (acc, val) => acc + val,
            0
          ),
          mantenimientosPorMes,
        });
      }
    }
  }, [selectedTienda, tiendas, mantenimientos]);

  const generatePDF = () => {
    if (!reportData) return;

    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text(`Reporte de Tienda: ${reportData.nombre}`, 10, 10);
    doc.setFontSize(12);
    doc.text(`Ubicación: ${reportData.ubicacion}`, 10, 20);
    doc.text(`Encargado: ${reportData.encargado}`, 10, 30);
    doc.text(`Número de Equipos: ${reportData.nroEquipos}`, 10, 40);
    doc.text(
      `Mantenimientos Totales: ${reportData.mantenimientosTotales}`,
      10,
      50
    );
    doc.text(`Fecha de Creación: ${reportData.fechaCreacion}`, 10, 60);

    const canvas = document.getElementById("grafico-mantenimientos");
    if (canvas) {
      const imageData = canvas.toDataURL("image/png");
      doc.addImage(imageData, "PNG", 10, 70, 180, 90);
    }

    doc.save(`${nombreInforme || "Reporte_Tienda"}.pdf`);
  };

  const renderChart = () => {
    if (!reportData) return;

    const ctx = document
      .getElementById("grafico-mantenimientos")
      .getContext("2d");
    new Chart(ctx, {
      type: "bar",
      data: {
        labels: [
          "Enero",
          "Febrero",
          "Marzo",
          "Abril",
          "Mayo",
          "Junio",
          "Julio",
          "Agosto",
          "Septiembre",
          "Octubre",
          "Noviembre",
          "Diciembre",
        ],
        datasets: [
          {
            label: "Mantenimientos por Mes",
            data: reportData.mantenimientosPorMes,
            backgroundColor: "rgba(75, 192, 192, 0.6)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: true },
        },
        scales: {
          x: { title: { display: true, text: "Meses" } },
          y: { title: { display: true, text: "Cantidad" }, beginAtZero: true },
        },
      },
    });
  };

  useEffect(() => {
    if (reportData) renderChart();
  }, [reportData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    generatePDF();
    onRequestClose();
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
      <form onSubmit={handleSubmit}>
        <label className="add-subtitle" >Nombre del Informe:</label>
        <input
          type="text"
          value={nombreInforme}
          onChange={(e) => setNombreInforme(e.target.value)}
          required
        />

        <label className="form-lbl-text">Seleccionar Tienda:</label>
        <select
          onChange={(e) => setSelectedTienda(e.target.value)}
          value={selectedTienda}
          required
        >
          <option value="">-- Seleccionar Tienda --</option>
          {tiendas.map((tienda) => (
            <option key={tienda.id} value={tienda.id}>
              {tienda.nombre}
            </option>
          ))}
        </select>

        {reportData && (
          <>
            <h3>Resumen de Tienda</h3>
            <p>Nombre: {reportData.nombre}</p>
            <p>Ubicación: {reportData.ubicacion}</p>
            <p>Encargado: {reportData.encargado}</p>
            <p>Número de Equipos: {reportData.nroEquipos}</p>
            <p>Mantenimientos Totales: {reportData.mantenimientosTotales}</p>
            <canvas
              id="grafico-mantenimientos"
              width="400"
              height="200"
            ></canvas>
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
