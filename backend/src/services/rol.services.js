import { Rol } from "../../models/Rol.js";
import { Usuario } from "../../models/Usuario.js";

export const findRoles = async (req, res) => {
    const roles = await Rol.findAll();
    res.json(roles);
};

export const findRol = async (req, res) => {
    const { id } = req.params;
    const rol = await Rol.findByPk(id);

    if(!rol){
        return res.status(404).json({message: "Rol no encontrado."})
    }

    res.json(rol);
};

export const createRol = async (req, res) => {
    const {nombre, descripcion } = req.body;

    const rol = await Rol.create({
        nombre,
        descripcion,
    });
    res.json(rol);
}

export const getUsuarios = async (req, res) => {
  try {

    const usuarios = await Usuario.findAll({
      attributes: {
        exclude: ["password"]
      }
    });

    res.json(usuarios);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Error al obtener los usuarios"
    });

  }
};

export const updateUsuario = async (req, res) => {

    try {

        const { id } = req.params;
        const { fk_rol } = req.body;

        const usuario = await Usuario.findByPk(id);

        if (!usuario) {
            return res.status(404).json({
                message: "Usuario no encontrado"
            });
        }

        await usuario.update({ fk_rol });

        res.json({
            message: "Rol actualizado correctamente",
            usuario
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Error al actualizar el rol"
        });
    }
};

export const deleteUsuario = async (req, res) => {

  try {

    const { id } = req.params;

    const usuario = await Usuario.findByPk(id);

    if (!usuario) {
      return res.status(404).json({
        message: "Usuario no encontrado"
      });
    }

    await usuario.destroy();

    res.json({
      message: "Usuario eliminado correctamente"
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Error al eliminar el usuario"
    });

  }
};