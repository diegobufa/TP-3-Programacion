import React from 'react';
import { useCart } from '../context/CartContext.jsx';

export const DetallePedidoPage = ({ orderId }) => {
    const { orders } = useCart();
    const order = orders.find((o) => o.id === orderId);

    if (!order) {
        return <div style={{ padding: '20px' }}><h2>Pedido no encontrado</h2></div>;
    }

    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto', border: '1px solid #ccc', borderRadius: '8px' }}>
            <h2>Detalle del Pedido #{order.id}</h2>
            <p><strong>Fecha:</strong> {order.date}</p>
            <p><strong>Estado:</strong> {order.status}</p>
            <hr />
            <h4>Datos de Envío:</h4>
            <p><strong>Nombre:</strong> {order.customer.name}</p>
            <p><strong>Dirección:</strong> {order.customer.address}</p>
            <hr />
            <h4>Productos:</h4>
            <ul>
                {order.items.map((item) => (
                    <li key={item.id} style={{ marginBottom: '10px' }}>
                        {item.name} x {item.quantity} - <strong>${item.price * item.quantity}</strong>
                    </li>
                ))}
            </ul>
            <hr />
            <h3 style={{ textAlign: 'right' }}>Total Final: ${order.total}</h3>
        </div>
    );
};