import { getFirestore, collection, getDocs, doc, getDoc, addDoc, deleteDoc, updateDoc } from "firebase/firestore";

const db = getFirestore();

export const fetchCollectionDocs = async (path) => {
  const querySnapshot = await getDocs(collection(db, path));
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const fetchDocument = async (path) => {
  const docSnap = await getDoc(doc(db, path));
  return docSnap.exists() ? docSnap.data() : null;
};

export const addDocument = async (path, data) => {
  const docRef = await addDoc(collection(db, path), data);
  return { id: docRef.id, ...data };
};

export const updateDocument = async (path, data) => {
  await updateDoc(doc(db, path), data);
};

export const deleteDocument = async (path) => {
  await deleteDoc(doc(db, path));
};
