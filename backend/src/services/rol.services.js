import { Rol } from "../../models/Rol.js";

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