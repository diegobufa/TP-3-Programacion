import express from "express";
import cors from "cors";
import { PORT } from "./config.js";
import { sequelize } from "./db.js";
import bcrypt from "bcrypt";

import authRoutes from "../routes/auth.routes.js";
import productRoutes from "../routes/product.routes.js";
import orderRoutes from "../routes/order.routes.js";

import { Rol } from "../models/Rol.js";
import { Usuario } from "../models/Usuario.js";
import "../models/Pedido.js";
import "../models/Producto.js";
import "../models/DetallePedido.js";
import "../models/relations.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);
app.use(productRoutes);
app.use(orderRoutes);

const passwordAdmin = await bcrypt.hash("admin123", 10);


try {
  await sequelize.sync();

  await Rol.findOrCreate({
            where: { id: 1 },
            defaults: { nombre: "Cliente" }
        });

        await Rol.findOrCreate({
            where: { id: 2 },
            defaults: { nombre: "Administrador" }
        });

        await Rol.findOrCreate({
            where: { id: 3 },
            defaults: { nombre: "SuperAdmin" }
        });

  await Usuario.findOrCreate({
        where: { email: "admin@admin.com" },
        defaults: {
        nombre: "Admin",
        apellido: "Administrador",
        usuario: "Admin",
        telefono: "3465000000",
        email: "admin@admin.com",
        password: passwordAdmin,
        provincia: "Santa Fe",
        localidad: "Firmat",
        calle: "San Martin",
        altura: 123,
        fk_rol: 2
      }
    });

await Usuario.findOrCreate({
  where: { email: "superadmin@admin.com" },
  defaults: {
    nombre: "SuperAdmin",
    apellido: "SuperAdmin",
    usuario: "superadmin",
    telefono: "3465000001",
    email: "superadmin@admin.com",
    password: passwordAdmin,
    provincia: "Santa Fe",
    localidad: "Firmat",
    calle: "Belgrano",
    altura: 456,
    fk_rol: 3
  }
});
  app.listen(PORT, () => {
    console.log(`Servidor escuchando en puerto ${PORT}`);
  });
} catch (error) {
  console.log("Error al conectar con la base de datos:", error);
}