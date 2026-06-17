import express from "express";
import cors from "cors";
import { PORT } from "./config.js";
import { sequelize } from "./db.js";

import authRoutes from "../routes/auth.routes.js";
import productRoutes from "../routes/product.routes.js";

import "../models/Rol.js";
import "../models/Usuario.js";
import "../models/Pedido.js";
import "../models/Producto.js";
import "../models/DetallePedido.js";
import "../models/relations.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(authRoutes);
app.use(productRoutes);

try {
  await sequelize.sync();

  app.listen(PORT, () => {
    console.log(`Servidor escuchando en puerto ${PORT}`);
  });
} catch (error) {
  console.log("Error al conectar con la base de datos:", error);
}