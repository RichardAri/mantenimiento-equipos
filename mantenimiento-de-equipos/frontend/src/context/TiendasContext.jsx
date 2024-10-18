import React, { createContext, useState } from 'react';
import { db } from '../firebase';
import { doc, updateDoc } from 'firebase/firestore';

const TiendasContext = createContext();

const TiendasProvider = ({ children }) => {
  const [tiendas, setTiendas] = useState([]);

  const actualizarNumeroEquipos = async (tiendaId, nuevoNumero) => {
    // Actualiza en Firestore
    const tiendaRef = doc(db, `tiendas/${tiendaId}`);
    await updateDoc(tiendaRef, { numeroEquipos: nuevoNumero });

    // Actualiza el estado local
    setTiendas(prevTiendas =>
      prevTiendas.map(tienda =>
        tienda.id === tiendaId ? { ...tienda, numeroEquipos: nuevoNumero } : tienda
      )
    );
  };

  return (
    <TiendasContext.Provider value={{ tiendas, setTiendas, actualizarNumeroEquipos }}>
      {children}
    </TiendasContext.Provider>
  );
};

export { TiendasProvider, TiendasContext };
