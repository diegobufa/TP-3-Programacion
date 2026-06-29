import { useNavigate } from "react-router-dom";
import { categorias } from "../constants/productConstants";

const categoriasSitio = [
  { label: "Catálogo", value: "Catalogo" },
  ...categorias.map((categoria) => ({ label: categoria, value: categoria })),
];

const CategoriesNav = ({
  categoriaSeleccionada = "Catalogo",
  setCategoriaSeleccionada,
  setMostrarTodos,
  setBusqueda,
  setTextoBusqueda,
}) => {
  const navigate = useNavigate();

  const handleCategoria = (categoria) => {
    setCategoriaSeleccionada(categoria);
    setMostrarTodos(true);
    setBusqueda("");
    setTextoBusqueda("");

    navigate("/", {
      state: {
        categoriaSeleccionada: categoria,
        mostrarTodos: true,
        busqueda: "",
      },
    });
  };

  return (
    <nav className="categories" aria-label="Categorías de productos">
      {categoriasSitio.map((categoria) => (
        <button
          key={categoria.value}
          type="button"
          className={categoriaSeleccionada === categoria.value ? "active" : ""}
          onClick={() => handleCategoria(categoria.value)}
        >
          {categoria.label}
        </button>
      ))}
    </nav>
  );
};

export default CategoriesNav;
