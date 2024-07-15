import React, { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import './ListaTiendas.css';

const ListaTiendas = () => {
  const [tiendas, setTiendas] = useState([]);
  const db = getFirestore();

  useEffect(() => {
    const fetchTiendas = async () => {
      const querySnapshot = await getDocs(collection(db, 'tiendas'));
      setTiendas(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchTiendas();
  }, [db]);

  return (
    <div className="tiendas-container">
      <header>
        <h1>Capriccio</h1>
        <button>Añadir Tienda</button>
      </header>
      <div className="card-container">
        {tiendas.map((tienda) => (
          <div className="card" key={tienda.id}>
            <h2>{tienda.nombre}</h2>
            <p>Ubicación: {tienda.ubicacion}</p>
            <p>Nro de Equipos: {tienda.nroEquipos}</p>
            <p>Encargado: {tienda.encargado}</p>
            <button className="edit-button">✎</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListaTiendas;
