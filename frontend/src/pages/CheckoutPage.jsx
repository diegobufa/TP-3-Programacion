import { useState } from "react";
import { useCart } from "../context/CartContext.jsx";
import PublicPageLayout from "../components/PublicPageLayout.jsx";
import { useNavigate } from "react-router-dom";
const CheckoutPage = () => {
    const { cart, getTotal, createOrder } = useCart();
    const navigate = useNavigate();

    const [customerData, setCustomerData] = useState({
        nombre: "",
        email: "",
        direccion: "",
    });

    const handleChange = (e) => {
        setCustomerData({
            ...customerData,
            [e.target.name]: e.target.value,
        });
    };
const handleSubmit = (e) => {
    e.preventDefault();

    if (cart.length === 0) {
        alert("El carrito está vacío");
        return;
    }

    const orderId = createOrder(customerData);

    alert(`Compra realizada con éxito. Pedido N° ${orderId}`);

    setCustomerData({
        nombre: "",
        email: "",
        direccion: "",
    });

    navigate("/mis-pedidos");
};

    return (
        <PublicPageLayout>
            <main className="checkout-page">
                <section className="checkout-card">
                    <div className="checkout-header">
                        <h2>Finalizar compra</h2>
                        <p>Completá tus datos para confirmar el pedido</p>
                    </div>

                    <form className="checkout-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Nombre completo</label>
                            <input
                                type="text"
                                name="nombre"
                                placeholder="Ej: Juan Pérez"
                                value={customerData.nombre}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Correo electrónico</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Ej: correo@email.com"
                                value={customerData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Dirección de envío</label>
                            <input
                                type="text"
                                name="direccion"
                                placeholder="Ej: Calle 123, Firmat"
                                value={customerData.direccion}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="checkout-summary">
                            <span>Total a pagar</span>
                            <strong>
                                ${Number(getTotal()).toLocaleString("es-AR")}
                            </strong>
                        </div>

                        <button type="submit" className="checkout-btn">
                            Confirmar y pagar
                        </button>
                    </form>
                </section>
            </main>
        </PublicPageLayout>
    );
};

export default CheckoutPage;