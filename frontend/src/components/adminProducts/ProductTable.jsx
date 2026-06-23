import { FaEdit, FaTrash } from "react-icons/fa";
import { formatoPrecio } from "../../utils/formatPrice";

const ProductTable = ({
  productosFiltrados,
  productos,
  editarProducto,
  eliminarProducto,
}) => {
  return (
    <div className="admin-table-card">
      <table className="admin-products-table">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Categoría</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {productosFiltrados.map((producto) => (
            <tr key={producto.id}>
              <td data-label="Producto">
                <div className="table-product-info">
                  <img
                    src={
                      producto.imageUrl ||
                      "https://placehold.co/100x100?text=Producto"
                    }
                    alt={producto.nombre}
                  />

                  <div>
                    <strong>{producto.nombre}</strong>

                    {producto.marca && producto.marca !== "Sin marca" && (
                      <span className="table-product-brand">
                        {producto.marca}
                      </span>
                    )}

                    {producto.oferta && <small>Oferta activa</small>}
                  </div>
                </div>
              </td>

              <td data-label="Categoría">
                <span className="table-mobile-value">
                  {producto.categoria}
                </span>
              </td>

              <td data-label="Precio">
                <span className="table-mobile-value">
                  {formatoPrecio(producto.precio)}
                </span>
              </td>

              <td data-label="Stock">
                <span className="table-mobile-value">
                  <strong className="stock-number">{producto.stock}</strong>
                </span>
              </td>

              <td data-label="Estado">
                <span className="table-mobile-value">
                  <span
                    className={
                      producto.disponibilidad
                        ? "status-active"
                        : "status-inactive"
                    }
                  >
                    {producto.disponibilidad ? "Disponible" : "Oculto"}
                  </span>
                </span>
              </td>

              <td data-label="Acciones">
                <span className="table-mobile-value">
                  <div className="table-actions">
                    <button
                      type="button"
                      className="edit-product-btn"
                      onClick={() => editarProducto(producto)}
                    >
                      <FaEdit />
                    </button>

                    <button
                      type="button"
                      className="delete-product-btn"
                      onClick={() => eliminarProducto(producto)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </span>
              </td>
            </tr>
          ))}

          {productosFiltrados.length === 0 && (
            <tr>
              <td colSpan="6" className="empty-products">
                No se encontraron productos.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="table-footer">
        Mostrando {productosFiltrados.length} de {productos.length} productos
      </div>
    </div>
  );
};

export default ProductTable;