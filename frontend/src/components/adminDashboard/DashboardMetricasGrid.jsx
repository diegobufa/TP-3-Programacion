const MetricasGrid = ({ pedidos, productos }) => {
    const totalIngresos = pedidos
        .filter(p => p.estado === "entregado")
        .reduce((acc, p) => acc + p.detalles.reduce((s, d) => s + d.precio_subtotal, 0), 0);
  
    const pendientes = pedidos.filter(p => p.estado === "pendiente").length;
  
    const entregados = pedidos.filter(p => p.estado === "entregado").length;

    const metricas = [
        { label: "Pedidos Totales", value: pedidos.length, color: "#00a8d8", icon: "📦" },
        { label: "Ingresos", value: `$${totalIngresos.toLocaleString("es-AR")}`, color: "#16a34a", icon: "💰" },
        { label: "Pendientes", value: pendientes, color: "#f59e0b", icon: "⏳" },
        { label: "Entregados", value: entregados, color: "#007fa3", icon: "✅" },
    ];

    return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 24 }}>
        {metricas.map(({ label, value, color, icon }) => (
            <div key={label} className="admin-table-card" style={{ borderLeft: `4px solid ${color}` }}>
                <div className="d-flex justify-content-between align-items-center">
                    <div>
                        <p style={{ color: "#6b7280", fontSize: 13, margin: 0 }}>{label}</p>
                        <h4 style={{ fontWeight: 900, margin: "4px 0 0", color: "#1f2933" }}>{value}</h4>
                    </div>
                    <span style={{ fontSize: 32 }}>{icon}</span>
                </div>
            </div>
        ))}
    </div>
  );
};

export default MetricasGrid;