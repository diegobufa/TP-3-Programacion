import { useCart } from "../context/CartContext.jsx";
import { useNavigate } from "react-router-dom";
import { formatoPrecio } from "../utils/formatPrice";
import PublicPageLayout from "../components/PublicPageLayout";

export const MisPedidosPage = () => {
  const { orders } = useCart();
  const navigate = useNavigate();

  return (
    <PublicPageLayout>
      <div style={{ padding: "20px" }}>
      <h2>Mis Pedidos Historial</h2>
      {orders.length === 0 ? (
        <p>Aún no realizaste ninguna compra.</p>
      ) : (
        <table style={{ width: "100%", marginTop: "20px", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#f4f4f4", textAlign: "left" }}>
              <th style={{ padding: "10px" }}>ID Pedido</th>
              <th>Fecha</th>
              <th>Total</th>
              <th>Estado</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "10px" }}>#{order.id}</td>
                <td>{order.date}</td>
                <td>{formatoPrecio(order.total)}</td>
                <td>
                  <span
                    style={{
                      backgroundColor: "#fff3cd",
                      padding: "3px 8px",
                      borderRadius: "5px",
                    }}
                  >
                    {order.status}
                  </span>
                </td>
                <td>
                  <button
                    type="button"
                    onClick={() => navigate(`/mis-pedidos/${order.id}`)}
                  >
                    Ver Detalle
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      </div>
    </PublicPageLayout>
  );
};
