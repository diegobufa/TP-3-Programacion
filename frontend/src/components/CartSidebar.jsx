import { useCart } from "../context/CartContext.jsx";
import { useNavigate } from "react-router-dom";
import { formatoPrecio } from "../utils/formatPrice";

export const CartSidebar = () => {
  const {
    cart,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeFromCart,
    getSubtotal,
  } = useCart();
  const navigate = useNavigate();

  if (!isCartOpen) return null;

  return (
    <div className="cart-sidebar-overlay" onClick={closeCart}>
      <aside className="cart-sidebar" onClick={(e) => e.stopPropagation()}>
        <div className="cart-sidebar-header">
          <h3>Tu Carrito</h3>
          <button type="button" onClick={closeCart} aria-label="Cerrar carrito">
            ✕
          </button>
        </div>

        <div className="cart-sidebar-content">
          {cart.length === 0 ? (
            <p className="cart-empty-message">El carrito está vacío.</p>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="cart-item">
                <img
                  src={item.imageUrl || "https://placehold.co/80x80?text=Producto"}
                  alt={item.nombre}
                />

                <div className="cart-item-info">
                  <h4>{item.nombre}</h4>
                  <p>{formatoPrecio(item.precio)}</p>

                  <div className="cart-item-actions">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, item.quantity - 1, item.stock)}
                    >
                      -
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, item.quantity + 1, item.stock)}
                    >
                      +
                    </button>

                    <button
                      type="button"
                      className="cart-remove-btn"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="cart-sidebar-footer">
            <h4>Total: {formatoPrecio(getSubtotal())}</h4>
            <button
              type="button"
              onClick={() => {
                closeCart();
                navigate("/checkout");
              }}
            >
              Iniciar Compra
            </button>
          </div>
        )}
      </aside>
    </div>
  );
};
