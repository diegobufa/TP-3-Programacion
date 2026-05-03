import { DataTypes } from "sequelize";
import { sequelize } from "../src/db.js";

export const Product = sequelize.define(
    "product", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  precio: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0,
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  categoria: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  disponibilidad: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  oferta: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
},
{
    timestamps: false,
    tableName: "products"
});
