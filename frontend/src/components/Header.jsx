import { FaSearch, FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";

const Header = ({
  textoBusqueda,
  setTextoBusqueda,
  setBusqueda,
  setCategoriaSeleccionada,
  setMostrarTodos,
}) => {
  const navigate = useNavigate();
  const { openCart, cart } = useCart();
  const { user, logoutUser } = useContext(AuthContext);

  const cantidadCarrito = cart.reduce(
    (acc, item) => acc + Number(item.quantity || 0),
    0,
  );

  const estadoHome = {
    categoriaSeleccionada: "Catalogo",
    mostrarTodos: false,
    busqueda: "",
  };

  const volverAlInicio = () => {
    if (typeof setBusqueda === "function") setBusqueda("");
    if (typeof setTextoBusqueda === "function") setTextoBusqueda("");
    if (typeof setCategoriaSeleccionada === "function") {
      setCategoriaSeleccionada("Catalogo");
    }
    if (typeof setMostrarTodos === "function") setMostrarTodos(false);

    navigate("/", {
      state: {
        ...estadoHome,
        resetHomeAt: Date.now(),
      },
    });
  };

  const buscar = () => {
    const busquedaLimpia = textoBusqueda.trim();

    if (typeof setBusqueda === "function") setBusqueda(busquedaLimpia);
    navigate("/", {
      state: {
        busqueda: busquedaLimpia,
        mostrarTodos: true,
        categoriaSeleccionada: "Catalogo",
        resetHomeAt: Date.now(),
      },
    });

    if (typeof setTextoBusqueda === "function") setTextoBusqueda("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      buscar();
    }
  };

  return (
    <header className="header">
      <button
        type="button"
        className="logo-link logo-button"
        aria-label="Ir al inicio"
        onClick={volverAlInicio}
      >
        <h3>ElectroFest</h3>
      </button>

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
              <button
                type="button"
                onClick={() => navigate("/admin")}
                className="login-btn admin-panel-btn"
              >
                ⚙️ Panel Admin
              </button>
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
