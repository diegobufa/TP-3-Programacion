import React from 'react';
import { useCart } from '../context/CartContext.jsx';
import { useNavigate } from 'react-router-dom';

export const CartSidebar = () => {
    const { cart, isCartOpen, closeCart, updateQuantity, removeFromCart, getSubtotal } = useCart();
    const navigate = useNavigate();

    if (!isCartOpen) return null;

    return (
        <div style={{
            position: 'fixed', top: 0, right: 0, width: '350px', height: '100vh',
            backgroundColor: 'white', boxShadow: '-5px 0 15px rgba(0,0,0,0.3)',
            zIndex: 99999, padding: '20px', display: 'flex', flexDirection: 'column',
            color: '#333', textAlign: 'left'
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3>Tu Carrito</h3>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        closeCart();
                    }}
                    style={{
                        fontSize: '24px',
                        cursor: 'pointer',
                        background: 'none',
                        border: 'none',
                        color: '#000',
                        padding: '5px 10px',
                        fontWeight: 'bold'
                    }}
                >
                    ✕
                </button>
            </div>

            <hr style={{ width: '100%', margin: '15px 0' }} />

            <div style={{ flex: 1, overflowY: 'auto' }}>
                {cart.length === 0 ? (
                    <p style={{ textAlign: 'center', color: '#888', marginTop: '20px' }}>El carrito está vacío.</p>
                ) : (
                    cart.map((item) => (
                        <div key={item.id} style={{ borderBottom: '1px solid #eee', padding: '10px 0' }}>
                            <h4>{item.name}</h4>
                            <p>Precio: ${item.price}</p>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '5px' }}>
                                <button onClick={() => updateQuantity(item.id, item.quantity - 1, item.stock)}>-</button>
                                <span>{item.quantity}</span>
                                <button onClick={() => updateQuantity(item.id, item.quantity + 1, item.stock)}>+</button>
                                <button onClick={() => removeFromCart(item.id)} style={{ color: 'red', marginLeft: 'auto', background: 'none', border: 'none', cursor: 'pointer' }}>Eliminar</button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {cart.length > 0 && (
                <div style={{ marginTop: 'auto', paddingTop: '15px', borderTop: '1px solid #ccc' }}>
                    <h4>Total: ${getSubtotal()}</h4>
                    <button
                        style={{ width: '100%', padding: '12px', backgroundColor: 'green', color: 'white', border: 'none', cursor: 'pointer', marginTop: '10px', fontSize: '16px' }}
                        onClick={() => {
                            closeCart();
                            navigate('/checkout');
                        }}
                    >
                        Iniciar Compra
                    </button>
                </div>
            )}
        </div>
    );
};