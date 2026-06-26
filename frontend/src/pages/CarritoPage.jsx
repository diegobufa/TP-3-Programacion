import React from 'react';
import { useCart } from '../context/CartContext.jsx';
import { useNavigate } from 'react-router-dom';

export const CarritoPage = () => {
    const { cart, updateQuantity, removeFromCart, getSubtotal } = useCart();
    const navigate = useNavigate();

    if (cart.length === 0) {
        return <div style={{ padding: '20px' }}><h2>Tu carrito está vacío.</h2></div>;
    }

    return (
        <div style={{ padding: '20px' }}>
            <h2>Tu Carrito de Compras</h2>
            <div style={{ borderTop: '1px solid #ccc', marginTop: '10px' }}>
                {cart.map((item) => (
                    <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #eee' }}>
                        <div>
                            <h4>{item.name}</h4>
                            <p>Precio Unitario: ${item.price}</p>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <button onClick={() => updateQuantity(item.id, item.quantity - 1, item.stock)}>-</button>
                            <span>{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, item.quantity + 1, item.stock)}>+</button>
                            <button onClick={() => removeFromCart(item.id)} style={{ color: 'red', marginLeft: '15px' }}>Eliminar</button>
                        </div>
                        <div>
                            <p>Subtotal: ${item.price * item.quantity}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div style={{ marginTop: '20px', textAlign: 'right' }}>
                <h3>Total: ${getSubtotal()}</h3>
                <button
                    style={{ padding: '10px 20px', backgroundColor: 'green', color: 'white', border: 'none', cursor: 'pointer' }}
                    onClick={() => navigate('/checkout')}
                >
                    Proceder al Pago
                </button>
            </div>
        </div>
    );
};