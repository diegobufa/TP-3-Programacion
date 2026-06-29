import { Usuario } from "../../models/Usuario.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Op } from "sequelize";

const secretKey = "programacion3-2026";

const buildUserData = (user) => ({
  id: user.id,
  email: user.email,
  fk_rol: user.fk_rol,
  usuario: user.usuario,
  nombre: user.nombre,
  apellido: user.apellido,
  telefono: user.telefono,
  provincia: user.provincia,
  localidad: user.localidad,
  calle: user.calle,
  altura: user.altura,
  piso: user.piso,
  departamento: user.departamento,
});

const limpiarTexto = (valor) => (typeof valor === "string" ? valor.trim() : valor);

export const registerUser = async (req, res) => {
  try {
    const nombre = limpiarTexto(req.body.nombre);
    const apellido = limpiarTexto(req.body.apellido);
    const usuario = limpiarTexto(req.body.usuario);
    const telefono = limpiarTexto(req.body.telefono);
    const email = limpiarTexto(req.body.email)?.toLowerCase();
    const password = req.body.password;
    const provincia = limpiarTexto(req.body.provincia);
    const localidad = limpiarTexto(req.body.localidad);
    const calle = limpiarTexto(req.body.calle);
    const altura = limpiarTexto(req.body.altura);
    const piso = limpiarTexto(req.body.piso);
    const departamento = limpiarTexto(req.body.departamento);

    if (!nombre || !apellido || !usuario || !email || !password) {
      return res.status(400).json({
        message: "Nombre, apellido, usuario, email y contraseña son obligatorios",
      });
    }

    const existingUser = await Usuario.findOne({
      where: {
        [Op.or]: [{ email }, { usuario }],
      },
    });

    if (existingUser) {
      const campoDuplicado = existingUser.email === email ? "email" : "usuario";
      return res.status(400).json({
        message: `Ya existe un usuario registrado con ese ${campoDuplicado}`,
      });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await Usuario.create({
      nombre,
      apellido,
      usuario,
      telefono,
      email,
      password: hashedPassword,
      provincia,
      localidad,
      calle,
      altura,
      piso,
      departamento,
      fk_rol: 1,
    });

    return res.status(201).json(buildUserData(newUser));
  } catch (error) {
    console.log("Error al registrar usuario:", error);
    return res.status(500).json({ message: "No se pudo registrar el usuario" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const email = limpiarTexto(req.body.email)?.toLowerCase();
    const password = req.body.password;

    if (!email || !password) {
      return res.status(400).json({ message: "Email y contraseña son obligatorios" });
    }

    const user = await Usuario.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({ message: "Usuario no existente" });
    }

    const comparison = await bcrypt.compare(password, user.password);

    if (!comparison) {
      return res.status(401).json({ message: "Email y/o contraseña incorrecta" });
    }

    const token = jwt.sign(buildUserData(user), secretKey, { expiresIn: "1h" });

    return res.json(token);
  } catch (error) {
    console.log("Error al iniciar sesión:", error);
    return res.status(500).json({ message: "No se pudo iniciar sesión" });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await Usuario.findByPk(id, {
      attributes: {
        exclude: ["password"],
      },
    });

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    return res.json(user);
  } catch (error) {
    console.log("Error al obtener usuario:", error);
    return res.status(500).json({ message: "No se pudo obtener el usuario" });
  }
};
