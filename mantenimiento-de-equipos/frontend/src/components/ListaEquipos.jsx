import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { db } from '../firebase';
import './ListaEquipos.css';

const ListaEquipos = () => {
  const { tiendaId } = useParams();
  const [equipos, setEquipos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Suponiendo que estás obteniendo los equipos desde Firestore o alguna otra fuente de datos
    const fetchEquipos = async () => {
      const equiposSnapshot = await db.collection('tiendas').doc(tiendaId).collection('equipos').get();
      const equiposList = equiposSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setEquipos(equiposList);
    };

    fetchEquipos();
  }, [tiendaId]);

  const filteredEquipos = equipos.filter(equipo =>
    equipo.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    equipo.codigo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="lista-equipos-container">
      <header>
        <Link to="/tiendas">Atrás</Link>
        <h1>Lista de Equipos: {tiendaId}</h1>
        <Link to={`/tiendas/${tiendaId}/equipos/nuevo`} className="add-button">+ Añadir</Link>
      </header>
      <input
        type="text"
        placeholder="Buscar..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      <div className="equipos-grid">
        {filteredEquipos.map(equipo => (
          <div key={equipo.id} className="equipo-card">
            <h2>Equipo: {equipo.codigo}</h2>
            <p>Nombre: {equipo.nombre}</p>
            <p>IP: {equipo.ip}</p>
            <p>Descripción:</p>
            <ul>
              {equipo.descripcion.split('\n').map((line, index) => (
                <li key={index}>{line}</li>
              ))}
            </ul>
            <p>Último Mantenimiento</p>
            <p>{equipo.ultimoMantenimiento.nombre}</p>
            <p>{equipo.ultimoMantenimiento.fecha}</p>
            <Link to={`/equipos/editar/${equipo.id}`} className="edit-button">✏️ Editar</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListaEquipos;
