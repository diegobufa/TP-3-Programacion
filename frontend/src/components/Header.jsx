import { FaSearch, FaShoppingCart } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";

const Header = ({ textoBusqueda, setTextoBusqueda, setBusqueda }) => {
  const navigate = useNavigate();
  const { openCart, cart } = useCart();
  const { user, logoutUser } = useContext(AuthContext);

  const cantidadCarrito = cart.reduce(
    (acc, item) => acc + Number(item.quantity || 0),
    0,
  );

  const buscar = () => {
    const busquedaLimpia = textoBusqueda.trim();

    setBusqueda(busquedaLimpia);
    navigate("/", {
      state: {
        busqueda: busquedaLimpia,
        mostrarTodos: true,
        categoriaSeleccionada: "Catalogo",
      },
    });

    setTextoBusqueda("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      buscar();
    }
  };

  return (
    <header className="header">
      <Link to="/" className="logo-link" aria-label="Ir al inicio">
        <h3>ElectroFest</h3>
      </Link>

      <div className="search-container">
        <input
          type="text"
          placeholder="Buscar producto"
          value={textoBusqueda}
          onChange={(e) => setTextoBusqueda(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button className="search-btn" onClick={buscar} type="button" aria-label="Buscar">
          <FaSearch />
        </button>
      </div>

      <div className="auth-buttons-container">
        {!user ? (
          <button onClick={() => navigate("/login")} className="login-btn" type="button">
            Ingresar
          </button>
        ) : (
          <>
            {[2, 3].includes(Number(user.fk_rol)) && (
              <Link to="/admin" className="login-btn admin-panel-btn">
                ⚙️ Panel Admin
              </Link>
            )}
            <span className="user-email-display" title={user.email}>
              {user.email}
            </span>
            <button onClick={logoutUser} className="logout-btn" type="button">
              Salir
            </button>
          </>
        )}
      </div>

      <div className="cart-btn">
        <button
          type="button"
          className="cart-icon-btn"
          onClick={openCart}
          aria-label="Abrir carrito"
        >
          <FaShoppingCart />
        </button>

        {cantidadCarrito > 0 && <span>{cantidadCarrito}</span>}
      </div>
    </header>
  );
};

export default Header;
