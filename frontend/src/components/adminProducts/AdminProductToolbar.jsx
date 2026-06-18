import { FaPlus } from "react-icons/fa";
import { categorias } from "../../constants/productConstants";

const AdminProductToolbar = ({
  busqueda,
  setBusqueda,
  categoriaFiltro,
  setCategoriaFiltro,
  marcaFiltro,
  setMarcaFiltro,
  marcasDisponibles,
  ordenAdmin,
  setOrdenAdmin,
  limpiarFiltrosAdmin,
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

      <select
        value={marcaFiltro}
        onChange={(e) => setMarcaFiltro(e.target.value)}
      >
        <option value="Todas">Todas las marcas</option>

        {marcasDisponibles.map((marca) => (
          <option key={marca} value={marca}>
            {marca}
          </option>
        ))}
      </select>

      <select
        value={ordenAdmin}
        onChange={(e) => setOrdenAdmin(e.target.value)}
      >
        <option value="relevancia">Ordenar por</option>
        <option value="precioMenor">Precio: menor a mayor</option>
        <option value="precioMayor">Precio: mayor a menor</option>
        <option value="stockMayor">Stock: mayor a menor</option>
        <option value="stockMenor">Stock: menor a mayor</option>
        <option value="disponiblesPrimero">Disponibles primero</option>
        <option value="noDisponiblesPrimero">No disponibles primero</option>
      </select>

      <button
        type="button"
        className="clear-admin-filters-btn"
        onClick={limpiarFiltrosAdmin}
      >
        Limpiar
      </button>

      <button
        type="button"
        className="new-product-btn"
        onClick={abrirNuevoProducto}
      >
        <FaPlus /> Nuevo producto
      </button>
    </div>
  );
};

export default AdminProductToolbar;