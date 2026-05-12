import { DataTypes } from "sequelize";
import { sequelize } from "../src/db.js";
import { Pedido } from "./Pedido.js";
import { Producto } from "./Producto.js";

export const DetallePedido = sequelize.define("detalle_pedido", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  precio_uni: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },

  precio_subtotal: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },

  fk_pedido: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Pedido,
      key: "id",
    },
  },

  fk_producto: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Producto,
      key: "id",
    },
  },
}, {
  timestamps: false,
});