import express from "express";
import { PORT } from "./config.js";
import { sequelize } from "./db.js";

import "../models/Rol.js";
import "../models/Usuario.js";
import "../models/Pedido.js";
import "../models/Producto.js";
import "../models/DetallePedido.js";
import "../models/relations.js";

const app = express();
app.use(router)
app.use(express.json());

try {
  await sequelize.sync();

  app.listen(PORT, () => {
    console.log(`Servidor escuchando en puerto ${PORT}`);
  });
} catch (error) {
  console.log("Error al conectar con la base de datos:", error);
}