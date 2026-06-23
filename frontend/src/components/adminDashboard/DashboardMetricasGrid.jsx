import { FaBox, FaDollarSign, FaUsers, FaClock, FaCheckCircle, FaTag } from "react-icons/fa";

const MetricasGrid = ({ pedidos, productos, usuarios = 0 }) => {
    const totalIngresos = pedidos
        .filter(p => p.estado === "entregado")
        .reduce((acc, p) => acc + p.detalles.reduce((s, d) => s + d.precio_subtotal, 0), 0);
  
    const pendientes = pedidos.filter(p => p.estado === "pendiente").length;
  
    const entregados = pedidos.filter(p => p.estado === "entregado").length;

    const metricas = [
        { label: "Pedidos Totales", value: pedidos.length, color: "#00a8d8", icon: <FaBox/> },
        { label: "Ingresos", value: `$${totalIngresos.toLocaleString("es-AR")}`, color: "#16a34a", icon: <FaDollarSign/> },
        { label: "Usuarios", value: usuarios, color: "#7c3aed", icon: <FaUsers/> },
        { label: "Pendientes", value: pendientes, color: "#f59e0b", icon: <FaClock/> },
        { label: "Entregados", value: entregados, color: "#007fa3", icon: <FaCheckCircle/> },
        { label: "Ofertas", value: productos.filter(p => p.oferta).length, color: "#e11d48", icon: <FaTag/> },
    ];

    return (
    <div className="metricas-grid">
        {metricas.map(({ label, value, color, icon }) => (
            <div key={label} className="admin-table-card" style={{ borderLeft: `4px solid ${color}` }}>
                <div className="d-flex justify-content-between align-items-center">
                    <div>
                        <p style={{ color: "#6b7280", fontSize: 13, margin: 0 }}>{label}</p>
                        <h4 style={{ fontWeight: 900, margin: "4px 0 0", color: "#1f2933" }}>{value}</h4>
                    </div>
                    <span style={{ fontSize: 32, color: color }}>{icon}</span>
                </div>
            </div>
        ))}
    </div>
  );
};

export default MetricasGrid;