import { useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";

const ESTADOS = ["pendiente", "confirmado", "enviado", "entregado", "cancelado"];

const badgeColor = (estado) => ({
    pendiente: "status-pendiente",
    confirmado: "status-confirmado",
    enviado: "status-enviado",
    entregado: "status-entregado",
    cancelado: "status-cancelado",
}[estado] ?? "status-pendiente");

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
                        ? <tr><td colSpan={9} className="empty-products">Sin resultados</td></tr>
                        : pedidosFiltrados.map(p => (
                            <tr key={p.id}>
                                <td><strong>{p.numero_pedido}</strong></td>
                                <td><strong style={{ color: "#16a34a" }}>{p.fk_usuario}</strong></td>
                                <td>{new Date(p.fecha_pedido).toLocaleDateString("es-AR")}</td>
                                <td><span className={badgeColor(p.estado)}>{p.estado}</span></td>
                                <td><strong style={{ color: "#00a8d8" }}>{p.detalles.reduce((acc, d) => acc + d.cantidad, 0)}</strong></td>
                                <td>{p.direccion_envio}</td>
                                <td>{p.localidad_envio}</td>
                                <td><strong style={{ color: "#16a34a" }}>${p.detalles.reduce((acc, d) => acc + Number(d.precio_subtotal), 0).toLocaleString("es-AR")}</strong></td>
                                <td style={{ verticalAlign: "middle" }}>
                                    <div className="table-actions">
                                        <select
                                            value={p.estado}
                                            onChange={(e) => cambiarEstado(p.id, e.target.value)}
                                            style={{ 
                                                height: 36, 
                                                borderRadius: 8, 
                                                padding: "0 8px", 
                                                fontSize: 13, 
                                                cursor: "pointer" ,
                                                border: "1px solid #d3d7db",
                                                background: "white",
                                                color: "#111827"
                                            }}
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