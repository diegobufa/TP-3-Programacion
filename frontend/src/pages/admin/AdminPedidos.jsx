import { useState } from "react";
import PedidosTable from "../../components/adminPedidos/PedidosTable";
import { useAdminOrders } from "../../context/AdminOrdersContext.jsx";

const ESTADOS = ["todos", "pendiente", "confirmado", "enviado", "entregado", "cancelado"];

const AdminPedidos = () => {
  const { pedidos, cargandoPedidos, actualizarEstadosPedidos } = useAdminOrders();
  const [filtros, setFiltros] = useState({ estado: "todos", cliente: "", fecha: "" });
  const [cambiosEstado, setCambiosEstado] = useState({});

  const handleFiltro = (e) => {
    setFiltros((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const cambiarEstado = (id, nuevoEstado) => {
    const pedidoOriginal = pedidos.find((pedido) => pedido.id === id);

    setCambiosEstado((prev) => {
      if (!pedidoOriginal || pedidoOriginal.estado === nuevoEstado) {
        const copia = { ...prev };
        delete copia[id];
        return copia;
      }

      return { ...prev, [id]: nuevoEstado };
    });
  };

  const guardarCambios = async () => {
    const cantidadCambios = Object.keys(cambiosEstado).length;

    if (cantidadCambios === 0) return;

    try {
      await actualizarEstadosPedidos(cambiosEstado);
      setCambiosEstado({});
    } catch (error) {
      alert(error.message || "No se pudieron guardar los cambios");
    }
  };

  const cancelarCambios = () => {
    setCambiosEstado({});
  };

  const pedidosConCambios = pedidos.map((pedido) => ({
    ...pedido,
    estado: cambiosEstado[pedido.id] ?? pedido.estado,
  }));

  const filtrados = pedidosConCambios.filter((pedido) => {
    const okEstado = filtros.estado === "todos" || pedido.estado === filtros.estado;
    const okCliente = !filtros.cliente || pedido.fk_usuario.toString().includes(filtros.cliente);
    const okFecha = !filtros.fecha || pedido.fecha_pedido.startsWith(filtros.fecha);
    return okEstado && okCliente && okFecha;
  });

  const hayCambiosPendientes = Object.keys(cambiosEstado).length > 0;

  if (cargandoPedidos) {
    return <p className="empty-products">Cargando pedidos...</p>;
  }

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4 admin-orders-header">
        <h4 className="fw-bold mb-0">Pedidos</h4>

        <div className="admin-orders-save-actions">
          {hayCambiosPendientes && (
            <span className="admin-orders-pending-text">
              {Object.keys(cambiosEstado).length} cambio(s) sin guardar
            </span>
          )}

          <button
            type="button"
            className="clear-admin-filters-btn px-3"
            onClick={cancelarCambios}
            disabled={!hayCambiosPendientes}
          >
            Cancelar
          </button>

          <button
            type="button"
            className="new-product-btn px-3"
            onClick={guardarCambios}
            disabled={!hayCambiosPendientes}
          >
            Guardar cambios
          </button>
        </div>
      </div>

      <div className="admin-actions-bar mb-3" style={{ gridTemplateColumns: "1fr 200px 200px" }}>
        <input name="cliente" placeholder="Buscar por usuario ID" value={filtros.cliente} onChange={handleFiltro} />
        <select name="estado" value={filtros.estado} onChange={handleFiltro}>
          {ESTADOS.map((estado) => (
            <option key={estado} value={estado}>
              {estado.charAt(0).toUpperCase() + estado.slice(1)}
            </option>
          ))}
        </select>
        <input name="fecha" type="date" value={filtros.fecha} onChange={handleFiltro} />
      </div>

      <PedidosTable
        pedidosFiltrados={filtrados}
        pedidos={pedidosConCambios}
        cambiarEstado={cambiarEstado}
      />
    </>
  );
};

export default AdminPedidos;
