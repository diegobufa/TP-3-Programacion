import { useState } from "react";
import { getPedidos } from "../../services/pedidosApi";
import PedidosTable from "../../components/adminPedidos/PedidosTable";

const ESTADOS = ["todos", "pendiente", "confirmado", "enviado", "entregado", "cancelado"];

/*
  Datos temporales para testeo de funcionalidad
*/
export const PEDIDOS_MOCK = [
  {
    id: 1, numero_pedido: "PED-001", fecha_pedido: "2025-06-01",
    estado: "pendiente", direccion_envio: "Av. Siempre Viva 123",
    provincia_envio: "Santa Fe", localidad_envio: "Rosario", fk_usuario: 1,
    detalles: [
      { id: 1, fk_producto: 1, cantidad: 2, precio_uni: 150000, precio_subtotal: 300000 },
      { id: 2, fk_producto: 3, cantidad: 1, precio_uni: 80000, precio_subtotal: 80000 },
    ]
  },
  {
    id: 2, numero_pedido: "PED-002", fecha_pedido: "2025-06-03",
    estado: "confirmado", direccion_envio: "Calle Falsa 456",
    provincia_envio: "Córdoba", localidad_envio: "Córdoba", fk_usuario: 2,
    detalles: [
      { id: 3, fk_producto: 2, cantidad: 1, precio_uni: 220000, precio_subtotal: 220000 },
    ]
  },
  {
    id: 3, numero_pedido: "PED-003", fecha_pedido: "2025-06-05",
    estado: "enviado", direccion_envio: "San Martín 789",
    provincia_envio: "Buenos Aires", localidad_envio: "La Plata", fk_usuario: 3,
    detalles: [
      { id: 4, fk_producto: 4, cantidad: 3, precio_uni: 50000, precio_subtotal: 150000 },
      { id: 5, fk_producto: 5, cantidad: 1, precio_uni: 95000, precio_subtotal: 95000 },
    ]
  },
  {
    id: 4, numero_pedido: "PED-004", fecha_pedido: "2025-06-08",
    estado: "entregado", direccion_envio: "Belgrano 321",
    provincia_envio: "Mendoza", localidad_envio: "Mendoza", fk_usuario: 1,
    detalles: [
      { id: 6, fk_producto: 2, cantidad: 2, precio_uni: 220000, precio_subtotal: 440000 },
    ]
  },
  {
    id: 5, numero_pedido: "PED-005", fecha_pedido: "2025-06-10",
    estado: "cancelado", direccion_envio: "Rivadavia 654",
    provincia_envio: "Santa Fe", localidad_envio: "Rosario", fk_usuario: 4,
    detalles: [
      { id: 7, fk_producto: 1, cantidad: 1, precio_uni: 150000, precio_subtotal: 150000 },
    ]
  },
  {
    id: 6, numero_pedido: "PED-006", fecha_pedido: "2025-06-12",
    estado: "pendiente", direccion_envio: "Mitre 111",
    provincia_envio: "Santa Fe", localidad_envio: "Santa Fe", fk_usuario: 2,
    detalles: [
      { id: 8, fk_producto: 3, cantidad: 2, precio_uni: 80000, precio_subtotal: 160000 },
      { id: 9, fk_producto: 5, cantidad: 1, precio_uni: 95000, precio_subtotal: 95000 },
    ]
  },
];

const AdminPedidos = () => {
  const [pedidos, setPedidos] = useState(PEDIDOS_MOCK);
  const [filtros, setFiltros] = useState({ estado: "todos", cliente: "", fecha: "" });

  const handleFiltro = (e) => setFiltros(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const cambiarEstado = (id, nuevoEstado) => {
    setPedidos(prev => prev.map(p => p.id === id ? { ...p, estado: nuevoEstado } : p));
  };

  const filtrados = pedidos.filter(p => {
    const okEstado = filtros.estado === "todos" || p.estado === filtros.estado;
    const okCliente = !filtros.cliente || p.fk_usuario.toString().includes(filtros.cliente);
    const okFecha = !filtros.fecha || p.fecha_pedido.startsWith(filtros.fecha);
    return okEstado && okCliente && okFecha;
  });

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="fw-bold mb-0">Pedidos</h4>
      </div>

      <div className="admin-actions-bar mb-3" style={{ gridTemplateColumns: "1fr 200px 200px" }}>
        <input name="cliente" placeholder="Buscar por usuario ID" value={filtros.cliente} onChange={handleFiltro} />
        <select name="estado" value={filtros.estado} onChange={handleFiltro}>
          {ESTADOS.map(e => <option key={e} value={e}>{e.charAt(0).toUpperCase() + e.slice(1)}</option>)}
        </select>
        <input name="fecha" type="date" value={filtros.fecha} onChange={handleFiltro} />
      </div>

      <PedidosTable
        pedidosFiltrados={filtrados}
        pedidos={pedidos}
        cambiarEstado={cambiarEstado}
      />
    </>
  );
};

export default AdminPedidos;