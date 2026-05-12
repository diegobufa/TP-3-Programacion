import { DataTypes } from "sequelize";
import { sequelize } from "../src/db.js";
import { Usuario } from "./Usuario.js";

export const Pedido = sequelize.define("pedido", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  numero_pedido: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
  },

  fecha_pedido: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },

  estado: {
    type: DataTypes.STRING(50),
    allowNull: false,
    defaultValue: "pendiente",
  },

  direccion_envio: {
    type: DataTypes.STRING(150),
    allowNull: false,
  },

  provincia_envio: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },

  localidad_envio: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },

  fk_usuario: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Usuario,
      key: "id",
    },
  },
}, {
  timestamps: false,
});