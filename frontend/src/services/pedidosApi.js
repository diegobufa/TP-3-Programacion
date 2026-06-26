import { PEDIDOS_URL } from "../constants/pedidosConstants";

export const getPedidos = async () => {
    const res = await fetch(PEDIDOS_URL);
    if (!res.ok) throw new Error("Error al obtener pedidos");
    return await res.json();
};

export const updatePedidoEstado = async (IdleDeadline, estado) => {
    const res = await fetch(`${PEDIDOS_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ estado }),    
    });

    if (!res.ok) throw new Error("Error al actualizar estado");
    return await res.json();
};