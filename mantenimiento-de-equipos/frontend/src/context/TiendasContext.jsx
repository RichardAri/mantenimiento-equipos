import React, { createContext, useState } from 'react';
import { db } from '../firebase';
import { doc, updateDoc } from 'firebase/firestore';

const TiendasContext = createContext();

const TiendasProvider = ({ children }) => {
  const [tiendas, setTiendas] = useState([]);

  const actualizarNumeroEquipos = async (tiendaId, nuevoNumero) => {
    try {
      const tiendaRef = doc(db, `tiendas/${tiendaId}`);
      await updateDoc(tiendaRef, { numeroEquipos: nuevoNumero });

      setTiendas((prevTiendas) =>
        prevTiendas.map((tienda) =>
          tienda.id === tiendaId ? { ...tienda, numeroEquipos: nuevoNumero } : tienda
        )
      );
    } catch (error) {
      console.error("Error al actualizar el número de equipos:", error);
    }
  };

  return (
    <TiendasContext.Provider value={{ tiendas, setTiendas, actualizarNumeroEquipos }}>
      {children}
    </TiendasContext.Provider>
  );
};

export { TiendasProvider, TiendasContext };
