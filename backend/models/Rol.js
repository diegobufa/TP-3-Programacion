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

export const updateRol = async (req, res) => {
  const {id} = req.params;
  const rol =await Rol.findByPk(id);

  if(!rol){
    return res.status(404).json({message: "Rol no encontrado."});
  };
  await rol.update(req.body);
  res.json(rol);

}