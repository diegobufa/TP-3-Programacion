import { useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";

const ESTADOS = ["pendiente", "confirmado", "enviado", "entregado", "cancelado"];

const badgeColor = (estado) => ({
    pendiente: "status-inactive",
    confirmado: "status-active",
    enviado: "status-active",
    entregado: "status-active",
    cancelado: "status-inactive",
}[estado] ?? "status-inactive");

const PedidosTable = ({ pedidosFiltrados, pedidos, cambiarEstado }) => {
    const navigate = useNavigate();

    return (
        <div className="admin-table-card">
            <table className="admin-products-table">
                <thead>
                    <tr>
                        <th>Nº Pedido</th>
                        <th>ID Usuario</th>
                        <th>Fecha</th>
                        <th>Estado</th>
                        <th>Productos</th>
                        <th>Dirección</th>
                        <th>Localidad</th>
                        <th>Total</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {pedidosFiltrados.length === 0
                        ? <tr><td colSpan={7} className="empty-products">Sin resultados</td></tr>
                        : pedidosFiltrados.map(p => (
                            <tr key={p.id}>
                                <td><strong>{p.numero_pedido}</strong></td>
                                <td>{p.fk_usuario}</td>
                                <td>{new Date(p.fecha_pedido).toLocaleDateString("es-AR")}</td>
                                <td><span className={badgeColor(p.estado)}>{p.estado}</span></td>
                                <td>{p.detalles.reduce((acc, d) => acc + d.cantidad, 0)}</td>
                                <td>{p.direccion_envio}</td>
                                <td>{p.localidad_envio}</td>
                                <td>${p.detalles.reduce((acc, d) => acc + d.precio_subtotal, 0).toLocaleString("es-AR")}</td>
                                <td>
                                <div className="table-actions">
                                    <select
                                        value={p.estado}
                                        onChange={(e) => cambiarEstado(p.id, e.target.value)}
                                        style={{ height: 36, border: "1px solid #e2e8f0", borderRadius: 8, padding: "0 8px", fontSize: 13, cursor: "pointer" }}
                                    >
                                        {ESTADOS.map(e => <option key={e} value={e}>{e.charAt(0).toUpperCase() + e.slice(1)}</option>)}
                                    </select>
                                    <button onClick={() => navigate(`/admin/pedidos/${p.id}`)} style={{ color: "#00a8d8" }}>
                                        <FaEye />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="table-footer">
                Mostrando {pedidosFiltrados.length} de {pedidos.length} pedidos
            </div>
        </div>
    );
};

export default PedidosTable;