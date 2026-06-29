import {
  FaBox,
  FaDollarSign,
  FaUsers,
  FaClock,
  FaCheckCircle,
  FaTag,
  FaTruck,
  FaTimesCircle,
} from "react-icons/fa";

const ESTADOS_PEDIDO = ["pendiente", "confirmado", "enviado", "entregado", "cancelado"];

const calcularTotalPedido = (pedido) =>
  (pedido.detalles ?? []).reduce(
    (total, detalle) => total + Number(detalle.precio_subtotal ?? 0),
    0
  );

const contarPorEstado = (pedidos) =>
  ESTADOS_PEDIDO.reduce((acumulador, estado) => {
    acumulador[estado] = pedidos.filter((pedido) => pedido.estado === estado).length;
    return acumulador;
  }, {});

const MetricasGrid = ({ pedidos = [], productos = [], usuarios = 0 }) => {
  const estados = contarPorEstado(pedidos);

  const stockTotal = productos.reduce(
    (total, producto) => total + Number(producto.stock ?? 0),
    0
  );

  const productosSinStock = productos.filter(
    (producto) => Number(producto.stock ?? 0) <= 0
  ).length;

  const totalIngresos = pedidos
    .filter((pedido) => pedido.estado === "entregado")
    .reduce((total, pedido) => total + calcularTotalPedido(pedido), 0);

  const metricas = [
    {
      label: "Pedidos Totales",
      value: pedidos.length,
      color: "#00a8d8",
      icon: <FaBox />,
    },
    {
      label: "Pendientes",
      value: estados.pendiente,
      color: "#f59e0b",
      icon: <FaClock />,
    },
    {
      label: "Confirmados",
      value: estados.confirmado,
      color: "#2563eb",
      icon: <FaCheckCircle />,
    },
    {
      label: "Enviados",
      value: estados.enviado,
      color: "#7c3aed",
      icon: <FaTruck />,
    },
    {
      label: "Entregados",
      value: estados.entregado,
      color: "#16a34a",
      icon: <FaCheckCircle />,
    },
    {
      label: "Cancelados",
      value: estados.cancelado,
      color: "#dc2626",
      icon: <FaTimesCircle />,
    },
    {
      label: "Ingresos entregados",
      value: `$${totalIngresos.toLocaleString("es-AR")}`,
      color: "#16a34a",
      icon: <FaDollarSign />,
    },
    {
      label: "Stock total",
      value: stockTotal,
      color: "#0f766e",
      icon: <FaBox />,
    },
    {
      label: "Sin stock",
      value: productosSinStock,
      color: "#dc2626",
      icon: <FaTimesCircle />,
    },
    {
      label: "Usuarios totales",
      value: usuarios,
      color: "#7c3aed",
      icon: <FaUsers />,
    },
    {
      label: "Ofertas",
      value: productos.filter((producto) => producto.oferta).length,
      color: "#e11d48",
      icon: <FaTag />,
    },
  ];

  return (
    <div className="metricas-grid">
      {metricas.map(({ label, value, color, icon }) => (
        <div key={label} className="admin-table-card" style={{ borderLeft: `4px solid ${color}` }}>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <p style={{ color: "#6b7280", fontSize: 13, margin: 0 }}>{label}</p>
              <h4 style={{ fontWeight: 900, margin: "4px 0 0", color: "#1f2933" }}>
                {value}
              </h4>
            </div>
            <span style={{ fontSize: 32, color }}>{icon}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MetricasGrid;
