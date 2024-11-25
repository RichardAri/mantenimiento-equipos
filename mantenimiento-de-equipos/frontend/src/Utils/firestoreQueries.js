import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export const fetchTiendas = async () => {
  const tiendasSnapshot = await getDocs(collection(db, "tiendas"));
  return tiendasSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const fetchEquipos = async (tiendaId) => {
  const equiposSnapshot = await getDocs(
    collection(db, `tiendas/${tiendaId}/equipos`)
  );
  return equiposSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const fetchMantenimientos = async (tiendaId, equipoId) => {
  const mantenimientosSnapshot = await getDocs(
    collection(db, `tiendas/${tiendaId}/equipos/${equipoId}/mantenimientos`)
  );
  return mantenimientosSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};
