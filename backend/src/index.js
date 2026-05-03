import express from "express";
import { PORT } from "./config.js";
import { sequelize } from "./db.js";
import "../models/Products.js";
import productRoutes from "../routes/product.routes.js";

const app = express();
app.use(express.json());
app.use(productRoutes);
try {
  await sequelize.sync();
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
} catch (error) {
  console.log(`Error en la base de datos.`);
}
