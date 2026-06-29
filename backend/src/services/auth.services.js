import { Usuario } from "../../models/Usuario.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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

export const registerUser = async (req, res) => {
  const {
    nombre,
    apellido,
    usuario,
    telefono,
    email,
    password,
    provincia,
    localidad,
    calle,
    altura,
    piso,
    departamento,
    fk_rol,
  } = req.body;

  const user = await Usuario.findOne({ where: { email } });
  if (user) return res.status(400).send({ message: "Usuario existente" });

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
    fk_rol: fk_rol || 1,
  });

  res.status(201).json(buildUserData(newUser));
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await Usuario.findOne({ where: { email } });

  if (!user) return res.status(400).send({ message: "Usuario no existente" });

  const comparison = await bcrypt.compare(password, user.password);

  if (!comparison) {
    return res.status(401).send({ message: "Email y/o contraseña incorrecta" });
  }

  const secretKey = "programacion3-2026";

  const token = jwt.sign(buildUserData(user), secretKey, { expiresIn: "1h" });

  return res.json(token);
};

export const getUserById = async (req, res) => {
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
};
