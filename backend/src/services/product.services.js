import { Producto } from "../../models/Producto.js";

export const findProducts = async (req, res) => {
  const products = await Producto.findAll();
  res.json(products);
};

export const findProduct = async (req, res) => {
  const { id } = req.params;

  const product = await Producto.findByPk(id);

  if (!product) {
    return res.status(404).json({ message: "Producto no encontrado" });
  }

  res.json(product);
};

export const createProduct = async (req, res) => {
  const {
    nombre,
    descripcion,
    precio,
    stock,
    categoria,
    imageUrl,
    disponibilidad,
    oferta,
  } = req.body;
  if (
    !nombre ||
    !descripcion ||
    precio === undefined ||
    precio === "" ||
    stock === undefined ||
    stock === "" ||
    !categoria ||
    !imageUrl
  ) {
    return res.status(400).json({
      message: "Faltan campos obligatorios",
    });
  }

  const product = await Producto.create({
    nombre,
    descripcion,
    precio,
    stock,
    categoria,
    imageUrl,
    disponibilidad,
    oferta,
  });

  res.json(product);
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;

  const product = await Producto.findByPk(id);

  if (!product) {
    return res.status(404).json({ message: "Producto no encontrado" });
  }

  await product.update(req.body);

  res.json(product);
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  const product = await Producto.findByPk(id);

  if (!product) {
    return res.status(404).json({ message: "Producto no encontrado" });
  }

  await product.destroy();

  res.json({ message: `Producto con id ${id} eliminado correctamente` });
};
