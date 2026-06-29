import { FaSearch, FaShoppingCart } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";

const Header = ({ textoBusqueda, setTextoBusqueda, setBusqueda }) => {
  const navigate = useNavigate();

  const { openCart, cart } = useCart();

  const cantidadCarrito = cart.reduce(
    (acc, item) => acc + Number(item.quantity || 0),
    0,
  );
  const { user, logoutUser } = useContext(AuthContext);

  const buscar = () => {
    if (textoBusqueda.trim() === "") return;

    setBusqueda(textoBusqueda);
    navigate("/", {
      state: {
        busqueda: textoBusqueda,
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
      <Link
        to="/"
        state={{
          categoriaSeleccionada: "Catalogo",
          mostrarTodos: false,
          busqueda: "",
        }}
        className="logo-link"
      >
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

        <button className="search-btn" onClick={buscar} type="button">
          <FaSearch />
        </button>
      </div>

      <div className="auth-buttons-container" style={{ display: "flex", gap: "10px", alignItems: "center" }}>
        
        {!user ? (
          <button onClick={() => navigate("/login")} className="login-btn">
            Ingresar
          </button>
        ) : (
          <>
            {user.fk_rol === 2 || 3 &&  (
              <Link to="/admin/usuarios" style={{ color: "#007bff", textDecoration: "none", fontWeight: "bold" }}>
                ⚙️ Panel Usuarios
              </Link>
            )}

            <span style={{ fontSize: "14px", color: "#555" }}>{user.email}</span>

            <button onClick={logoutUser} className="logout-btn">
              Cerrar Sesión
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
