import { DataTypes } from "sequelize";
import { sequelize } from "../src/db.js";

export const Rol = sequelize.define("rol", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  nombre: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
  },

  descripcion: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
}, {
  timestamps: false,
});