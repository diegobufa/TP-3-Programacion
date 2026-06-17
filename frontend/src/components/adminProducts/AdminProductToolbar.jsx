import { FaPlus } from "react-icons/fa";
import { categorias } from "../../constants/productConstants";

const AdminProductToolbar = ({
  busqueda,
  setBusqueda,
  categoriaFiltro,
  setCategoriaFiltro,
  abrirNuevoProducto,
}) => {
  return (
    <div className="admin-actions-bar">
      <input
        type="text"
        placeholder="Buscar producto..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />

      <select
        value={categoriaFiltro}
        onChange={(e) => setCategoriaFiltro(e.target.value)}
      >
        <option value="Todas">Todas las categorías</option>

        {categorias.map((categoria) => (
          <option key={categoria} value={categoria}>
            {categoria}
          </option>
        ))}
      </select>

      <button className="new-product-btn" onClick={abrirNuevoProducto}>
        <FaPlus /> Nuevo producto
      </button>
    </div>
  );
};

export default AdminProductToolbar;