// src/components/ListaTiendas.jsx
import React, { useState } from 'react';
import './ListaTiendas.css';
import Modal from './Modal';

const ListaTiendas = () => {
    const [tiendas, setTiendas] = useState([
        { id: 1, nombre: 'AQP SOLO TORTAS', ubicacion: 'Cayma SN', equipos: 20, encargado: 'Alonso' },
        // Añade más tiendas aquí...
    ]);

    const [modalData, setModalData] = useState(null);

    const handleEdit = (tienda) => {
        setModalData(tienda);
    };

    const handleAdd = () => {
        setModalData({ id: null, nombre: '', ubicacion: '', equipos: 0, encargado: '' });
    };

    const handleSave = (data) => {
        if (data.id) {
            setTiendas(tiendas.map(tienda => tienda.id === data.id ? data : tienda));
        } else {
            data.id = tiendas.length + 1;
            setTiendas([...tiendas, data]);
        }
        setModalData(null);
    };

    return (
        <div className="lista-tiendas">
            <h1>Capriccio</h1>
            <button onClick={handleAdd} className="add-button">Añadir</button>
            <div className="tiendas-container">
                {tiendas.map(tienda => (
                    <div key={tienda.id} className="tienda-card">
                        <h2>{tienda.nombre}</h2>
                        <p>Ubicación: {tienda.ubicacion}</p>
                        <p>Nro de Equipos: {tienda.equipos}</p>
                        <p>Encargado: {tienda.encargado}</p>
                        <button onClick={() => handleEdit(tienda)} className="edit-button">Editar</button>
                    </div>
                ))}
            </div>
            {modalData && <Modal data={modalData} onSave={handleSave} onClose={() => setModalData(null)} />}
        </div>
    );
};

export default ListaTiendas;
