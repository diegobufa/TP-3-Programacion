import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { PEDIDOS_MOCK } from "./AdminPedidos";
import PedidoDetalleInfo from "../../components/adminPedidos/PedidoDetalleInfo";
import PedidoDetalleProductos from "../../components/adminPedidos/PedidoDetalleProductos";
import PedidoCambiarEstado from "../../components/adminPedidos/PedidCambiarEstado"

const AdminPedidoDetalle = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [pedidos, setPedidos] = useState(PEDIDOS_MOCK);
    const [productos, setProductos] = useState([])
    const pedido = pedidos.find(p => p.id === parseInt(id));

    useEffect(() => {
        fetch("http://localhost:3000/products")
            .then(r => r.json())
            .then(d => setProductos(Array.isArray(d) ? d : []))
            .catch(() => {});
    }, []);

    if (!pedido) return <p className="empty-products">Pedido no encontrado.</p>;

    const cambiarEstado = (nuevoEstado) => {
        setPedidos(prev => prev.map(p => p.id === pedido.id ? { ...p, estado: nuevoEstado } : p));
    };

    return (
        <>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="fw-bold mb-0">Detalle del Pedido</h4>
                <button className="clear-admin-filters-btn px-3" onClick={() => navigate("/admin/pedidos")}>← Volver</button>
            </div>
            <PedidoDetalleInfo 
                pedido={pedido} 
            />
            <PedidoDetalleProductos 
                detalles={pedido.detalles} 
                productos={productos} 
            />
            <PedidoCambiarEstado 
                estadoActual={pedido.estado}
                onChange={cambiarEstado}
            />
        </>
    );
};

export default AdminPedidoDetalle;