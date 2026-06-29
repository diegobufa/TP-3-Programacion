import { BASE_URL } from "../constants/productConstants";

export const getOrders = async () => {
  const res = await fetch(`${BASE_URL}/orders`);

  if (!res.ok) {
    throw new Error("No se pudieron obtener los pedidos");
  }

  return res.json();
};

export const getOrderById = async (id) => {
  const res = await fetch(`${BASE_URL}/orders/${id}`);

  if (!res.ok) {
    throw new Error("No se pudo obtener el pedido");
  }

  return res.json();
};

export const getOrdersByUser = async (userId) => {
  const res = await fetch(`${BASE_URL}/orders/user/${userId}`);

  if (!res.ok) {
    throw new Error("No se pudieron obtener tus pedidos");
  }

  return res.json();
};

export const createOrder = async (pedido) => {
  const res = await fetch(`${BASE_URL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(pedido),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "No se pudo crear el pedido");
  }

  return res.json();
};

export const updateOrderStatus = async (id, estado) => {
  const res = await fetch(`${BASE_URL}/orders/${id}/status`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ estado }),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "No se pudo actualizar el estado del pedido");
  }

  return res.json();
};
