import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { getOrdersByUser } from "../services/orderApi";
import { formatoPrecio } from "../utils/formatPrice";
import PublicPageLayout from "../components/PublicPageLayout";

export const MisPedidosPage = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const obtenerMisPedidos = async () => {
      if (!user?.id) {
        setOrders([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const data = await getOrdersByUser(user.id);
        setOrders(Array.isArray(data) ? data : []);
      } catch (error) {
        console.log("Error al obtener mis pedidos:", error);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    obtenerMisPedidos();
  }, [user?.id]);

  const calcularTotal = (pedido) =>
    pedido.detalles.reduce((acc, detalle) => acc + Number(detalle.precio_subtotal), 0);

  return (
    <PublicPageLayout>
      <div style={{ padding: "20px" }}>
        <h2>Mis Pedidos Historial</h2>

        {!user?.id ? (
          <p>Tenés que iniciar sesión para ver tus pedidos.</p>
        ) : loading ? (
          <p>Cargando pedidos...</p>
        ) : orders.length === 0 ? (
          <p>Aún no realizaste ninguna compra.</p>
        ) : (
          <table style={{ width: "100%", marginTop: "20px", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ backgroundColor: "#f4f4f4", textAlign: "left" }}>
                <th style={{ padding: "10px" }}>Nº Pedido</th>
                <th>Fecha</th>
                <th>Total</th>
                <th>Estado</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} style={{ borderBottom: "1px solid #eee" }}>
                  <td style={{ padding: "10px" }}>#{order.numero_pedido}</td>
                  <td>{new Date(order.fecha_pedido).toLocaleDateString("es-AR")}</td>
                  <td>{formatoPrecio(calcularTotal(order))}</td>
                  <td>
                    <span
                      style={{
                        backgroundColor: "#fff3cd",
                        padding: "3px 8px",
                        borderRadius: "5px",
                      }}
                    >
                      {order.estado}
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
