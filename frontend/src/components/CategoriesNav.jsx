import { useNavigate } from "react-router-dom";

const CategoriesNav = ({
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
      },
    });
  };

  return (
    <nav className="categories">
        <button onClick={() => handleCategoria("Catalogo")}>Catálogo</button>
        <button onClick={() => handleCategoria("Tv-Audio")}>Tv-Audio</button>
        <button onClick={() => handleCategoria("Cocinas")}>Cocinas</button>
        <button onClick={() => handleCategoria("Tecnologia")}>Tecnología</button>
        <button onClick={() => handleCategoria("Electrodomesticos")}>Electrodomésticos</button>
        <button onClick={() => handleCategoria("Calefaccion")}>Calefacción</button>
        <button onClick={() => handleCategoria("Climatizacion")}>Climatización</button>
        <button onClick={() => handleCategoria("Heladeras")}>Heladeras</button>
        <button onClick={() => handleCategoria("Microondas")}>Microondas</button>
        <button onClick={() => handleCategoria("Lavarropas")}>Lavarropas</button>
       
      
    </nav>
  );
};

export default CategoriesNav;
