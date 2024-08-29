const express = require("express");
const app = express();
const { db } = require("./firebaseAdmin");

app.use(express.json());

// Ruta para obtener todas las tiendas
app.get("/tiendas", async (req, res) => {
  try {
    const tiendasSnapshot = await db.collection("tiendas").get();
    const tiendas = tiendasSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    res.json(tiendas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Ruta para añadir una tienda
app.post("/tiendas", async (req, res) => {
  try {
    const { razonSocial, ubicacion, encargado } = req.body;
    const nuevaTienda = { razonSocial, ubicacion, encargado, nroEquipos: 0 };
    const tiendaRef = await db.collection("tiendas").add(nuevaTienda);
    res.json({ id: tiendaRef.id, ...nuevaTienda });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log("Servidor escuchando en el puerto 3000");
});
