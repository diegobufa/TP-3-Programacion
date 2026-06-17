import { API_URL } from "../constants/productConstants";

export const getProducts = async () => {
  const res = await fetch(API_URL);

  if (!res.ok) {
    throw new Error("No se pudieron obtener los productos");
  }

  return await res.json();
};

export const createProduct = async (producto) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(producto),
  });

  if (!res.ok) {
    throw new Error("No se pudo crear el producto");
  }

  return await res.json();
};

export const updateProduct = async (id, producto) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(producto),
  });

  if (!res.ok) {
    throw new Error("No se pudo actualizar el producto");
  }

  return await res.json();
};

export const deleteProduct = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("No se pudo eliminar el producto");
  }

  return await res.json();
};