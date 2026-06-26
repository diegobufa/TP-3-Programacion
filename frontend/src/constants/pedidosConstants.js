export const PEDIDOS_URL = `${import.meta.env.VITE_API_URL}/pedidos`;

export const ESTADO_PEDIDO = ["pendiente", "confirmado", "enviado", "entregado", "cancelado"];

export const BADGE_COLOR_PEDIDO = {
  pendiente: "status-pendiente",
  confirmado: "status-confirmado",
  enviado: "status-enviado",
  entregado: "status-entregado",
  cancelado: "status-cancelado",
};