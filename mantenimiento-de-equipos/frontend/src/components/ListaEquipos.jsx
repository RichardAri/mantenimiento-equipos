import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getFirestore, collection, getDocs, doc, deleteDoc, setDoc, getDoc } from 'firebase/firestore';
import ModalAñadirEquipo from './ModalAñadirEquipo';
import ModalEditarEquipo from './ModalEditarEquipo';
import './ListaEquipos.css';

const ListaEquipos = () => {
  const { tiendaId } = useParams();
  const navigate = useNavigate();
  const [equipos, setEquipos] = useState([]);
  const [nombreTienda, setNombreTienda] = useState('');
  const [modalAñadirAbierto, setModalAñadirAbierto] = useState(false);
  const [modalEditarAbierto, setModalEditarAbierto] = useState(false);
  const [equipoSeleccionado, setEquipoSeleccionado] = useState(null);
  const db = getFirestore();

  useEffect(() => {
    const fetchTienda = async () => {
      const tiendaDoc = await getDoc(doc(db, 'tiendas', tiendaId));
      setNombreTienda(tiendaDoc.data().nombre);
    };

    const fetchEquipos = async () => {
      const querySnapshot = await getDocs(collection(db, `tiendas/${tiendaId}/equipos`));
      setEquipos(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };

    fetchTienda();
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

  const eliminarEquipo = async (equipoId) => {
    await deleteDoc(doc(db, `tiendas/${tiendaId}/equipos`, equipoId));
    setEquipos(equipos.filter(equipo => equipo.id !== equipoId));
  };

  return (
    <div className="equipos-container">
      <header>
        <button className="back-button" onClick={() => navigate(-1)}>Atrás</button>
        <h1>Lista de Equipos: {nombreTienda}</h1>
        <button className='add-button' onClick={abrirModalAñadir}>Añadir Equipo</button>
      </header>
      <div className="card-container">
        {equipos.map((equipo) => (
          <div className="card" key={equipo.id} onClick={() => navigate(`/tiendas/${tiendaId}/equipos/${equipo.id}/mantenimientos`)}>
            <h2>{equipo.nombre}</h2>
            <p>IP: {equipo.ip}</p>
            <p>Descripción:</p>
            <ul>
              {equipo.descripcion.split('\n').map((line, index) => (
                <li key={index}>{line}</li>
              ))}
            </ul>
            <button className="edit-button" onClick={(e) => { e.stopPropagation(); abrirModalEditar(equipo); }}>✎</button>
          </div>
        ))}
      </div>
      <ModalAñadirEquipo isOpen={modalAñadirAbierto} onRequestClose={cerrarModalAñadir} onSave={añadirEquipo} />
      <ModalEditarEquipo isOpen={modalEditarAbierto} onRequestClose={cerrarModalEditar} equipo={equipoSeleccionado} onSave={editarEquipo} onDelete={eliminarEquipo} />
    </div>
  );
};

export default ListaEquipos;
