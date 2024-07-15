// src/components/ListaMantenimientos.jsx
import React, { useState } from 'react';
import './ListaMantenimientos.css';
import ModalMantenimiento from './ModalMantenimiento';

const ListaMantenimientos = () => {
    const [mantenimientos, setMantenimientos] = useState([
        { id: 1, codigo: 'CH0001', nombre: 'Cambio de RAM', descripcion: 'Se cambió la RAM de 4GB a 8GB', fecha: '04/07/2024 1:12 PM', personal: 'Richard' },
        // Se añaden más mantenimientos aquí...
    ]);

    const [modalMantenimientoData, setModalMantenimientoData] = useState(null);

    const handleEditMantenimiento = (mantenimiento) => {
        setModalMantenimientoData(mantenimiento);
    };

    const handleAddMantenimiento = () => {
        setModalMantenimientoData({ id: null, codigo: '', nombre: '', descripcion: '', fecha: '', personal: '' });
    };

    const handleSaveMantenimiento = (data) => {
        if (data.id) {
            setMantenimientos(mantenimientos.map(mantenimiento => mantenimiento.id === data.id ? data : mantenimiento));
        } else {
            data.id = mantenimientos.length + 1;
            setMantenimientos([...mantenimientos, data]);
        }
        setModalMantenimientoData(null);
    };

    return (
        <div className="lista-mantenimientos">
            <h1>Lista de Mantenimientos</h1>
            <button onClick={handleAddMantenimiento} className="add-button">Añadir Mantenimiento</button>
            <div className="mantenimientos-container">
                {mantenimientos.map(mantenimiento => (
                    <div key={mantenimiento.id} className="mantenimiento-card">
                        <h2>{mantenimiento.nombre}</h2>
                        <p>Código: {mantenimiento.codigo}</p>
                        <p>Descripción: {mantenimiento.descripcion}</p>
                        <p>Fecha: {mantenimiento.fecha}</p>
                        <p>Personal: {mantenimiento.personal}</p>
                        <button onClick={() => handleEditMantenimiento(mantenimiento)} className="edit-button">Editar</button>
                    </div>
                ))}
            </div>
            {modalMantenimientoData && <ModalMantenimiento data={modalMantenimientoData} onSave={handleSaveMantenimiento} onClose={() => setModalMantenimientoData(null)} />}
        </div>
    );
};

export default ListaMantenimientos;
