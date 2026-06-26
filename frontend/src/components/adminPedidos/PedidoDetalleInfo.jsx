import { BADGE_COLOR_PEDIDO } from "../../constants/pedidosConstants";
const PedidoDetalleInfo = ({ pedido }) => {
    const total = pedido.detalles.reduce((acc, d) => acc + d.precio_subtotal, 0);
    const cantidad = pedido.detalles.reduce((acc, d) => acc + d.cantidad, 0);

    return (
        <div className="admin-table-card mb-4">
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
                {[
                    { label: "Nº Pedido", value: pedido.numero_pedido },
                    { label: "Fecha", value: new Date(pedido.fecha_pedido).toLocaleDateString("es-AR") },
                    { label: "Estado", value: <span className={BADGE_COLOR_PEDIDO[pedido.estado]}>{pedido.estado}</span> },
                    { label: "Dirección", value: pedido.direccion_envio },
                    { label: "Localidad", value: pedido.localidad_envio },
                    { label: "Provincia", value: pedido.provincia_envio },
                    { label: "Usuario ID", value: `#${pedido.fk_usuario}` },
                    { label: "Productos", value: cantidad },
                    { label: "Total", value: <strong style={{ color: "#16a34a" }}>${total.toLocaleString("es-AR")}</strong> },
                ].map(({ label, value }) => (
                    <div key={label}>
                        <p style={{ color: "#6b7280", fontSize: 13, margin: 0 }}>{label}</p>
                        <strong>{value}</strong>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PedidoDetalleInfo;