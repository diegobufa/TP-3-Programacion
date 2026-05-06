import { User } from "../../models/Users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  const {nombre, apellido, direccion, usuario, telefono, email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  if (user) return res.status(400).send({ message: "Usuario existente" });
  const saltRounds = 10;

  const hashedPassword = await bcrypt.hash(password, saltRounds);
  const newUser = await User.create({ nombre, apellido, direccion, usuario, telefono, email, password: hashedPassword });

  res.json(newUser.id);
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email } });

  if (!user) return res.status(400).send({ message: "Usuario no existente" });

  const comparison = await bcrypt.compare(password, user.password);

  if (!comparison)
    return res.status(401).send({ message: "Email y/o contraseña incorrecta" });

  const secretKey = "programacion3-2026";

  const token = jwt.sign({ email }, secretKey, { expiresIn: "1h" });

  return res.json(token);
};
