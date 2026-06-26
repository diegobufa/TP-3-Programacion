import React, { useState } from 'react';
import { useCart } from '../context/CartContext.jsx';
import { useNavigate } from 'react-router-dom';

export const CheckoutPage = () => {
    const { cart, getTotal, createOrder } = useCart();
    const navigate = useNavigate();
    const [form, setForm] = useState({ name: '', email: '', address: '' });

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.name || !form.email || !form.address) {
            alert('Por favor, completá todos los campos.');
            return;
        }
        const orderId = createOrder(form);
        alert(`¡Compra confirmada! Tu número de pedido es #${orderId}`);
        navigate(`/mis-pedidos/${orderId}`);
    };

    if (cart.length === 0) {
        return <div style={{ padding: '20px' }}><h2>No hay productos para procesar.</h2></div>;
    }

    return (
        <div style={{ padding: '20px', maxWidth: '500px', margin: 'auto' }}>
            <h2>Finalizar Compra</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
                <input type="text" name="name" placeholder="Nombre Completo" onChange={handleChange} required />
                <input type="email" name="email" placeholder="Correo Electrónico" onChange={handleChange} required />
                <input type="text" name="address" placeholder="Dirección de Envío" onChange={handleChange} required />

                <h3>Total a Pagar: ${getTotal()}</h3>
                <button type="submit" style={{ padding: '12px', backgroundColor: '#0070f3', color: 'white', border: 'none', cursor: 'pointer' }}>
                    Confirmar y Pagar
                </button>
            </form>
        </div>
    );
};