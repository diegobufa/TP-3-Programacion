import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";

const Header = ({ textoBusqueda, setTextoBusqueda, setBusqueda }) => {
  const navigate = useNavigate();

  const { openCart } = useCart();

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

        <button className="search-btn" onClick={buscar}>
          <FaSearch />
        </button>
      </div>

      <button>Ingresar</button>

      <div className="cart-btn">
        <button onClick={openCart}>
          🛒 Carrito
        </button>
        <span>0</span>
      </div>
    </header>
  );
};

export default Header;
