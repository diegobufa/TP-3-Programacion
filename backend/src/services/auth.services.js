import { Usuario } from "../../models/Usuario.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
      fk_rol
  });

  res.json(newUser.id);
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await Usuario.findOne({ where: { email } });

  if (!user) return res.status(400).send({ message: "Usuario no existente" });

  const comparison = await bcrypt.compare(password, user.password);

  if (!comparison)
    return res.status(401).send({ message: "Email y/o contraseña incorrecta" });

  const secretKey = "programacion3-2026";

  const token = jwt.sign(
  {
    id: user.id,
    email: user.email,
    fk_rol: user.fk_rol,
    usuario: user.usuario
  },
  secretKey,
  { expiresIn: "1h" }
);

  return res.json(token);
};
