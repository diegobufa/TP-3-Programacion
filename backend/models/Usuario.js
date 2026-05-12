import { DataTypes } from "sequelize";
import { sequelize } from "../src/db.js";
import { Rol } from "./Rol.js";

export const Usuario = sequelize.define(
  "usuario",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },

    apellido: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },

    usuario: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },

    email: {
      type: DataTypes.STRING(150),
      allowNull: false,
      unique: true,
    },

    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    telefono: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },

    provincia: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },

    localidad: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },

    calle: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },

    altura: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },

    piso: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },

    departamento: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },

    fk_rol: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Rol,
        key: "id",
      },
    },
  },
  {
    timestamps: false,
  },
);
