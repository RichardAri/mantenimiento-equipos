// src/components/ListaEquipos.jsx
import React, { useState } from 'react';
import './ListaEquipos.css';
import ModalEquipo from './ModalEquipo';

const ListaEquipos = () => {
    const [equipos, setEquipos] = useState([
        { id: 1, nombre: 'Equipo 1', ip: '192.168.1.1', descripcion: 'Procesador: i7, RAM: 16GB, S.O.: Windows 10', ultimoMantenimiento: '04/07/2024', encargado: 'Alonso' },
        // Añade más equipos aquí...
    ]);

    const [modalEquipoData, setModalEquipoData] = useState(null);

    const handleEditEquipo = (equipo) => {
        setModalEquipoData(equipo);
    };

    const handleAddEquipo = () => {
        setModalEquipoData({ id: null, nombre: '', ip: '', descripcion: '', ultimoMantenimiento: '', encargado: '' });
    };

    const handleSaveEquipo = (data) => {
        if (data.id) {
            setEquipos(equipos.map(equipo => equipo.id === data.id ? data : equipo));
        } else {
            data.id = equipos.length + 1;
            setEquipos([...equipos, data]);
        }
        setModalEquipoData(null);
    };

    return (
        <div className="page">
            <h1>Lista de Equipos</h1>
            <button onClick={handleAddEquipo} className="add-button">Añadir Equipo</button>
            <div className="equipos-container">
                {equipos.map(equipo => (
                    <div key={equipo.id} className="equipo-card">
                        <h2>{equipo.nombre}</h2>
                        <p>IP: {equipo.ip}</p>
                        <p>Descripción: {equipo.descripcion}</p>
                        <p>Último Mantenimiento: {equipo.ultimoMantenimiento}</p>
                        <p>Encargado: {equipo.encargado}</p>
                        <button onClick={() => handleEditEquipo(equipo)} className="edit-button">Editar</button>
                    </div>
                ))}
            </div>
            {modalEquipoData && <ModalEquipo data={modalEquipoData} onSave={handleSaveEquipo} onClose={() => setModalEquipoData(null)} />}
        </div>
    );
};

export default ListaEquipos;
