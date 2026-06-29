import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getOrderById } from "../../services/orderApi";
import PedidoDetalleInfo from "../../components/adminPedidos/PedidoDetalleInfo";
import PedidoDetalleProductos from "../../components/adminPedidos/PedidoDetalleProductos";

const AdminPedidoDetalle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pedido, setPedido] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const obtenerPedido = async () => {
      try {
        setCargando(true);
        const data = await getOrderById(id);
        setPedido(data);
      } catch (error) {
        console.log("Error al obtener detalle del pedido:", error);
        setPedido(null);
      } finally {
        setCargando(false);
      }
    };

    obtenerPedido();
  }, [id]);

  if (cargando) return <p className="empty-products">Cargando pedido...</p>;
  if (!pedido) return <p className="empty-products">Pedido no encontrado.</p>;

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="fw-bold mb-0">Detalle del Pedido</h4>
        <button className="clear-admin-filters-btn px-3" onClick={() => navigate("/admin/pedidos")}>← Volver</button>
      </div>
      <PedidoDetalleInfo pedido={pedido} />
      <PedidoDetalleProductos detalles={pedido.detalles} />
    </>
  );
};

export default AdminPedidoDetalle;
