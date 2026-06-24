import { useNavigate } from "react-router-dom";

const badgeColor = (estado) => ({
  confirmado: "status-confirmado", 
  enviado: "status-enviado", 
  entregado: "status-entregado",
  pendiente: "status-pendiente", 
  cancelado: "status-cancelado",
}[estado] ?? "status-pendiente");

const UltimosPedidos = ({ pedidos }) => {
  const navigate = useNavigate();
  return (
    <div className="admin-table-card mb-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <strong style={{ fontSize: 16, fontWeight: 800 }}>Últimos pedidos</strong>
        <button className="new-product-btn px-3" style={{ height: 36 }} onClick={() => navigate("/admin/pedidos")}>Ver más</button>
      </div>
      <table className="admin-products-table">
        <thead>
          <tr>
            <th>Nº Pedido</th>
            <th>Estado</th>
            <th>Productos</th>
            <th>Dirección</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {pedidos.slice(-5).length === 0
            ? <tr><td colSpan={4} className="empty-products">Sin pedidos</td></tr>
            : pedidos.slice(-5).map(p => (
              <tr key={p.id}>
                <td><strong>{p.numero_pedido}</strong></td>
                <td><span className={badgeColor(p.estado)}>{p.estado}</span></td>
                <td><strong style={{ color: "#16a34a" }}>{p.detalles.reduce((acc, d) => acc + d.cantidad, 0)}</strong></td>
                <td>{p.direccion_envio}</td>
                <td><strong style={{ color: "#16a34a" }}>${p.detalles.reduce((acc, d) => acc + d.precio_subtotal, 0).toLocaleString("es-AR")}</strong></td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default UltimosPedidos;