// ListaEquipos.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getFirestore, collection, getDocs, doc, setDoc } from 'firebase/firestore';
import ModalAñadirEquipo from './ModalAñadirEquipo';
import ModalEditarEquipo from './ModalEditarEquipo';
import './ListaEquipos.css';

const ListaEquipos = () => {
  const { tiendaId } = useParams();
  const [equipos, setEquipos] = useState([]);
  const [modalAñadirAbierto, setModalAñadirAbierto] = useState(false);
  const [modalEditarAbierto, setModalEditarAbierto] = useState(false);
  const [equipoSeleccionado, setEquipoSeleccionado] = useState(null);
  const db = getFirestore();

  useEffect(() => {
    const fetchEquipos = async () => {
      const querySnapshot = await getDocs(collection(db, `tiendas/${tiendaId}/equipos`));
      setEquipos(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchEquipos();
  }, [db, tiendaId]);

  const abrirModalAñadir = () => setModalAñadirAbierto(true);
  const cerrarModalAñadir = () => setModalAñadirAbierto(false);

  const abrirModalEditar = (equipo) => {
    setEquipoSeleccionado(equipo);
    setModalEditarAbierto(true);
  };
  const cerrarModalEditar = () => setModalEditarAbierto(false);

  const añadirEquipo = async (nuevoEquipo) => {
    const docRef = await setDoc(doc(collection(db, `tiendas/${tiendaId}/equipos`)), nuevoEquipo);
    setEquipos([...equipos, { id: docRef.id, ...nuevoEquipo }]);
    cerrarModalAñadir();
  };

  const editarEquipo = async (equipoId, equipoActualizado) => {
    await setDoc(doc(db, `tiendas/${tiendaId}/equipos`, equipoId), equipoActualizado);
    setEquipos(equipos.map(equipo => (equipo.id === equipoId ? { id: equipoId, ...equipoActualizado } : equipo)));
    cerrarModalEditar();
  };

  return (
    <div className="equipos-container">
      <header>
        <button onClick={() => window.history.back()}>Atrás</button>
        <h1>Lista de Equipos: {tiendaId}</h1>
        <button onClick={abrirModalAñadir}>Añadir Equipo</button>
      </header>
      <div className="card-container">
        {equipos.map((equipo) => (
          <div className="card" key={equipo.id}>
            <h2>{equipo.codigo}</h2>
            <p>Nombre: {equipo.nombre}</p>
            <p>IP: {equipo.ip}</p>
            <p>Descripción: {equipo.descripcion}</p>
            <button className="edit-button" onClick={() => abrirModalEditar(equipo)}>✎</button>
          </div>
        ))}
      </div>
      <ModalAñadirEquipo isOpen={modalAñadirAbierto} onRequestClose={cerrarModalAñadir} onSave={añadirEquipo} />
      <ModalEditarEquipo isOpen={modalEditarAbierto} onRequestClose={cerrarModalEditar} equipo={equipoSeleccionado} onSave={editarEquipo} />
    </div>
  );
};

export default ListaEquipos;
