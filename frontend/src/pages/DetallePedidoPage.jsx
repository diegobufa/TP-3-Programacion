import { useEffect, useState } from "react";
import { getOrderById } from "../services/orderApi";
import { formatoPrecio } from "../utils/formatPrice";
import PublicPageLayout from "../components/PublicPageLayout";

export const DetallePedidoPage = ({ orderId }) => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const obtenerPedido = async () => {
      try {
        setLoading(true);
        const data = await getOrderById(orderId);
        setOrder(data);
      } catch (error) {
        console.log("Error al obtener pedido:", error);
        setOrder(null);
      } finally {
        setLoading(false);
      }
    };

    obtenerPedido();
  }, [orderId]);

  if (loading) {
    return (
      <PublicPageLayout>
        <div style={{ padding: "20px" }}>
          <h2>Cargando pedido...</h2>
        </div>
      </PublicPageLayout>
    );
  }

  if (!order) {
    return (
      <PublicPageLayout>
        <div style={{ padding: "20px" }}>
          <h2>Pedido no encontrado</h2>
        </div>
      </PublicPageLayout>
    );
  }

  const total = order.detalles.reduce(
    (acc, detalle) => acc + Number(detalle.precio_subtotal),
    0,
  );

  return (
    <PublicPageLayout>
      <div
        style={{
          padding: "20px",
          maxWidth: "600px",
          margin: "auto",
          border: "1px solid #ccc",
          borderRadius: "8px",
        }}
      >
        <h2>Detalle del Pedido #{order.numero_pedido}</h2>
        <p>
          <strong>Fecha:</strong> {new Date(order.fecha_pedido).toLocaleDateString("es-AR")}
        </p>
        <p>
          <strong>Estado:</strong> {order.estado}
        </p>
        <hr />
        <h4>Datos de Envío:</h4>
        <p>
          <strong>Dirección:</strong> {order.direccion_envio}
        </p>
        <p>
          <strong>Localidad:</strong> {order.localidad_envio}
        </p>
        <p>
          <strong>Provincia:</strong> {order.provincia_envio}
        </p>
        <hr />
        <h4>Productos:</h4>
        <ul>
          {order.detalles.map((detalle) => (
            <li key={detalle.id} style={{ marginBottom: "10px" }}>
              {detalle.producto?.nombre || `Producto #${detalle.fk_producto}`} x {detalle.cantidad} -{" "}
              <strong>{formatoPrecio(Number(detalle.precio_subtotal))}</strong>
            </li>
          ))}
        </ul>
        <hr />
        <h3 style={{ textAlign: "right" }}>
          Total Final: {formatoPrecio(total)}
        </h3>
      </div>
    </PublicPageLayout>
  );
};
